const { Database } = require("../lib/Database"); // Our classes
global.database    = Database.load(); // Retrieve the saved datas

module.exports = {
	employee: require("./employee"),
	material: require("./material"),
	rental: require("./rental"),
	global: {
		get: {
			/**
			 * Display the login view of the application
			 */
			login: (req, res) => {
				res.render("login.ejs");
			},
			/**
			 * Display the home page of the application.
			 */
			home: (req, res) => {
				res.render("home.ejs", {
					name: req.session.current_employee.surname
				});
			},
			/**
			 * TODO; The description
			 */
			forbidden: (req, res) => {
				res.render("accessForbidden.ejs");
			}
		}, post: {
			/**
			 * Check the login identifier and password provided in the login view and login the employee if all is good.
			 */
			login: (req, res) => {
				const emp = database.company.getEmployeeByPersonnalNumber(req.body.matricule);

				if (emp && emp.hasPassword(req.body.password))
					req.session.current_employee = emp;
				else
					return res.send(JSON.stringify({
						success: false,
						message: "Identifiant ou mot de passe incorrect"
					}));

				res.send(JSON.stringify({
					success: true
				}));
			},
			/**
			 * Destroys the session and redirect to log in page.
			 */
			logout: (req, res) => {
				// Destroy the session
				req.session.destroy((err) => {
					if (err)
						res.send(err);
				});

				res.redirect("/");
			}
		}
	}
};

