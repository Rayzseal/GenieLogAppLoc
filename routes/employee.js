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

			res.render("employee/viewEmployee.ejs", {
				employee: database.company.getEmployee(employeeId)
			});
		},

		/**
		 * Display the view to edit a specific employee.
		 */
		edit: (req, res) => {
			res.render("employee/editEmployee.ejs", {
				name: "Jean",
				surname: "Lasalle",
				email: "exemple@mail.com",
				mat: "1234ABC"
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
					surname: req.body.name,
					name: req.body.name,
					password: req.body.password,
					email: req.body.email
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
		}
	}
};