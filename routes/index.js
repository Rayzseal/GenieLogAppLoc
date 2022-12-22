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
			slash: (req, res) => {
				res.render("login.ejs");
			},

			/**
			 * Display the home page of the application.
			 */
			home: (req, res) => {
				res.render("home.ejs", {
					name: req.session.current_employe.surname
				});
			},

			forbidden: (req, res) => {
				res.render("accessForbidden.ejs", {});
			}
		}, post: {
			/**
			 * Check the login identifier and password provided in the login view and login the employee if all is good.
			 */
			login: (req, res) => {
				const personnalNumber = req.body.matricule;
				const password        = req.body.password;

				let emp = database.company.getEmployeeByPersonnalNumber(personnalNumber);

				if (emp && emp.password === password)
					req.session.current_employe = emp;
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
			 * Destroys the session and redirect to login.
			 */
			logout: (req, res) => {
				// Destroy the session
				req.session.destroy((err) => {
					if(err) res.send(err);
				});
				res.redirect("/");
			}
		}
	}
};

