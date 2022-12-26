require("dotenv").config(); // Used to read the content of the .env file
const express      = require("express"); // The server
const session      = require("express-session"); // The sessions managment of the server to know who is logged-in
const crypto       = require("crypto"); // Generate a session secret
const router       = require("./routes"); // The application routes
const { Employee } = require("./lib/Employee"); // Our classes

const PORT                     = 3000;
const app                      = express();
const NO_LOGIN_REQUIRED_ROUTES = ["/", "/login"];
const ADMIN_ONLY_ROUTES        = [
	"/employees/",
	"/employee/create/",
	"/employee/:id/",
	"/employee/:id/edit/",
	"/employee/:id/remove/",
	"/employee/:id/resetPassword/",
	"/material/create/",
	"/material/:id/edit/",
	"/material/:id/remove/",
	"/rental/remove/"
];

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
	console.log(req.method, getRouteFromPath(req.path), `(${req.path})`);
	if (process.env.REQUIRE_LOGIN === "false") {
		req.session.current_employee = new Employee({
			name: "Account",
			surname: "Test",
			email: "test@account.fr",
			password: "testAccount123",
			personnalNumber: "1234567",
			isAdmin: true
		});
	}
	// Make the current_employee available in all ejs template pages
	res.locals.current_employee = req.session.current_employee;

	// Add a / at the end of each route when trying to visit a view
	if (req.method === "GET" && !req.path.endsWith('/'))
		return res.redirect(301, req.path+'/');

	// The user is not logged-in and the page he wants to visit is not one which is accessible whithout login
	if (!req.session.current_employee && !NO_LOGIN_REQUIRED_ROUTES.includes(req.path))
		return res.redirect("/");

	// The user is logged-in but isn't admin and try to visit an admin page
	if (req.session.current_employee && !req.session.current_employee.isAdmin && ADMIN_ONLY_ROUTES.includes(getRouteFromPath(req.path))) {
		if (req.method === "GET") // It's a view someone try to reach
			return res.redirect("/home");
		else
			return res.send({
				success: false,
				message: "Vous devez être administrateur pour effectuer cette opération"
			});
	}

	next();
});

function getRouteFromPath(path) {
	const stack = app._router.stack;
	for (let i = 0; i < stack.length; i++) {
		if (stack[i].route && stack[i].match(path))
			return stack[i].route.path;
	}
}

// -------------
// Routes
// -------------
// Global global routes
app.get("/", router.global.get.login);
app.post("/login/", router.global.post.login);
app.get("/logout", router.global.post.logout);
app.get("/home/", router.global.get.home);
app.get("/accessForbidden/", router.global.get.forbidden);

// Employee routes
app.get("/employees/", router.employee.get.list);
app.get("/employee/create/", router.employee.get.create);
app.post("/employee/create/", router.employee.post.create);
app.get("/employee/:id/", router.employee.get.view);
app.get("/employee/:id/edit/", router.employee.get.edit);
app.post("/employee/:id/edit/", router.employee.post.edit);
app.post("/employee/:id/remove/", router.employee.post.remove);
app.post("/employee/:id/resetPassword/", router.employee.post.resetPassword);

// Material routes
app.get("/materials/", router.material.get.list);
app.get("/material/create/", router.material.get.create);
app.post("/material/create/", router.material.post.create);
app.get("/material/:id/", router.material.get.view);
app.get("/material/:id/edit/", router.material.get.edit);
app.post("/material/:id/edit/", router.material.post.edit);
app.post("/material/:id/remove/", router.material.post.remove);

// Rental routes
app.post("/rental/create/", router.rental.post.create);
app.post("/rental/remove/", router.rental.post.remove);

// Last route if no previous one used (equivalent of 404 route)
app.use((req, res) => res.redirect("/home"));


// -------------
// Server starting
// -------------
app.listen(PORT, () => {
	console.log(`Le serv est lancé sur http://localhost:${PORT}`);
});
