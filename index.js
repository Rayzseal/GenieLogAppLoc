require("dotenv").config(); // Used to read the content of the .env file
const express      = require("express"); // The server
const session      = require("express-session"); // The sessions managment of the server to know who is logged-in
const crypto       = require("crypto"); // Generate a session secret
const router       = require("./routes"); // The application routes
const { Employee } = require("./lib/Employee"); // Our classes

const PORT = 3000;
const app  = express();

// -------------
// Server settings
// -------------
app.use(express.json());
app.use("/public/", express.static("public/"));

// -------------	
// Session settings
// -------------
// Creation
app.use(session({
	secret: crypto.randomBytes(20).toString("hex"),
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		httpOnly: false
	}
}));

// Check before accessing to each page
app.use((req, res, next) => {
	const excluding = ["/", "/login"];
	if (process.env.REQUIRE_LOGIN === "false") {
		req.session.current_employe = new Employee({
			name: "Account",
			surname: "Test",
			email: "test@account.fr",
			password: "testAccount123",
			personnalNumber: "1234567",
			role: true
		});
	}

	if (!req.session.current_employe && !excluding.includes(req.path))
		return res.redirect("/");

	next();
});

// -------------
// Routes
// -------------
// Global global routes
app.get("/", router.global.get.slash);
app.post("/login", router.global.post.login);
app.get("/logout", router.global.post.logout);
app.get("/home", router.global.get.home);
app.get("/accessForbidden", router.global.get.forbidden);

// Employee routes
app.get("/employees/", router.employee.get.list);
app.get("/employee/create/", router.employee.get.create);
app.post("/employee/create", router.employee.post.create);
app.get("/employee/:id/", router.employee.get.view);
app.get("/employee/:id/edit", router.employee.get.edit);

// Material routes
app.get("/materials/", router.material.get.list);
app.get("/material/create", router.material.get.create);
app.post("/material/create", router.material.post.create);
app.get("/material/:id/", router.material.get.view);
app.get("/material/:id/edit/", router.material.get.edit);

// Rental routes
app.post("/material/:id/rental/create", router.rental.post.create);

// -------------
// Server starting
// -------------
app.listen(PORT, () => {
	console.log(`Le serv est lancé sur http://localhost:${PORT}`);

	//database.company.getEmployees().forEach(e => console.log(e.getPersonnalNumber()));

	// Database test additon
	// database.company.addEmployee(new Employee({
	// 	personnalNumber: "123ABCD",
	// 	surname: "Intel",
	// 	name: "letnI",
	// 	password: "Zemodepasse123",
	// 	email: "truc@truc.fr",
	// }));

	// database.company.addMaterial(new Material({
	// 	title: "Samsung Galaxy fold",
	// 	version: "v2458-7",
	// 	reference: "AN001",
	// 	phoneNumber: "0685557844"
	// }));

	// database.saveToFile();
});
