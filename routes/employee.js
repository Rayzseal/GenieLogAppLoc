const { Employee } = require("../lib/Employee");

module.exports = {
	get: {
		/**
		 * Display the view listing all employees of this app
		 */
		list: (req, res) => {
			res.render("employee/viewEmployeeList.ejs", {
				employeesList: database.company.getEmployees()
			});
		},

		/**
		 * Display the view to create a new employee
		 */
		create: (req, res) => {
			res.render("employee/createEmployee.ejs");
		},

		/**
		 * Display the view showing the details about a specific employee.
		 */
		view: (req, res) => {
			const employeeId = req.params.id;
			const employee   = database.company.getEmployee(employeeId);

			if (!employee)
				return res.redirect("/employees/");

			res.render("employee/viewEmployee.ejs", {
				employee: employee,
				rentals: database.company.getRentalsForEmployee(employeeId)
			});
		},

		/**
		 * Display the view to edit a specific employee.
		 */
		edit: (req, res) => {
			const employeeId = req.params.id;
			const employee   = database.company.getEmployee(employeeId);

			if (!employee)
				return res.redirect("/employees/");

			res.render("employee/editEmployee.ejs", {
				employee: employee
			});
		}
	},
	post: {
		/**
		 * Perform the employee creation into the database
		 */
		create: (req, res) => {
			let createdEmployee;
			try {
				createdEmployee = new Employee({
					personnalNumber: req.body.matricule,
					surname: req.body.surname,
					name: req.body.name,
					password: req.body.password,
					email: req.body.email,
					isAdmin: req.body.isAdmin
				});

				database.company.addEmployee(createdEmployee);
				database.saveToFile();
			} catch (e) {
				return res.send(JSON.stringify({
					success: false,
					message: e.message
				}));
			}

			res.send(JSON.stringify({
				success: true,
				employeeId: createdEmployee.getId()
			}));
		},
		/**
		 * Perform the employee edition into the database.
		 */
		edit: (req, res) => {
			const employeeId = req.params.id;

			try {
				let editedEmployee = database.company.getEmployee(employeeId);

				// The employee is an admin from who we want to remove its administrator rights, but he is the last admin of the platform
				if (editedEmployee.getIsAdmin() && !req.body.isAdmin && database.company.getEmployees().filter(e => e.getIsAdmin()).length === 1)
					return res.send(JSON.stringify({
						success: false,
						message: "Impossible de retirer les droits d'administration de ce compte : veuillez créer un autre compte administrateur auparavant"
					}));

				// The personnal number we try to edit is already associated to another employee
				const employeeByPersonnalNumber = database.company.getEmployeeByPersonnalNumber(req.body.matricule);
				if (employeeByPersonnalNumber && employeeByPersonnalNumber.getId() !== editedEmployee.getId())
					return res.send(JSON.stringify({
						success: false,
						message: `Ce matricule est déjà utilisé par un employé (#${employeeByPersonnalNumber.getId()})`
					}));

				// The email we try to edit is already associated to another employee
				const employeeByEmail = database.company.getEmployeeByEmail(req.body.email);
				if (employeeByEmail && employeeByEmail.getId() !== editedEmployee.getId())
					return res.send(JSON.stringify({
						success: false,
						message: `Cet email est déjà utilisé par un employé (#${employeeByEmail.getId()})`
					}));

				// Perform the edition
				editedEmployee.setName(req.body.name);
				editedEmployee.setSurname(req.body.surname);
				editedEmployee.setEmail(req.body.email);
				editedEmployee.setPersonnalNumber(req.body.matricule);
				editedEmployee.setIsAdmin(req.body.isAdmin);

				// If the logged-in user modify its own profile, then update the session
				if (editedEmployee.getId() === req.session.current_employee.id)
					req.session.current_employee = editedEmployee;

				database.saveToFile();
			} catch (e) {
				return res.send(JSON.stringify({
					success: false,
					message: e.message
				}));
			}

			res.send(JSON.stringify({
				success: true,
				employeeId: employeeId
			}));
		},
		/**
		 * Perform the employee supression into the database.
		 */
		remove: (req, res) => {
			const employeeId = req.params.id;

			// If the logged-in user delete its own profile, then return an error
			if (employeeId === req.session.current_employee.id)
				return res.send(JSON.stringify({
					success: false,
					message: "Vous ne pouvez pas supprimer ce compte auquel vous êtes connecté"
				}));

			try {
				const employeeToDelete = database.company.getEmployee(employeeId);

				// The employee is the last admin of the platform
				if (employeeToDelete.getIsAdmin() && database.company.getEmployees().filter(e => e.getIsAdmin()).length === 1)
					return res.send(JSON.stringify({
						success: false,
						message: "Impossible de supprimer ce compte : veuillez créer un autre compte administrateur auparavant"
					}));

				// Perform the deletion
				database.company.removeEmployee(employeeToDelete, req.body.force);

				database.saveToFile();
			} catch (e) {
				return res.send(JSON.stringify({
					success: false,
					message: e.message
				}));
			}

			res.send(JSON.stringify({
				success: true
			}));
		},
		/**
		 * Perform the employee password reset into the database.
		 */
		resetPassword: (req, res) => {
			const employeeId = req.params.id;

			try {
				const employee = database.company.getEmployee(employeeId);
				employee.setPassword(req.body.password);

				database.saveToFile();
			} catch (e) {
				return res.send(JSON.stringify({
					success: false,
					message: e.message
				}));
			}

			res.send(JSON.stringify({
				success: true
			}));
		}
	}
};