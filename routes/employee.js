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

			try {
				database.company.removeEmployee(database.company.getEmployee(employeeId), req.body.force);

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