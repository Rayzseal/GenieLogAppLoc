const express      = require("express");
const app          = express();
const { Employee } = require("./lib/Employee");
const { Material } = require("./lib/Material");
const { Database } = require("./lib/Database");

const PORT     = 3000;
const database = Database.load(); // Retrieve the saved datas


// -------------
// Server settings
// -------------
app.use(express.json());
app.use("/public/", express.static("public/"));

// -------------
// Server global routes
// -------------
/**
 * Display the login view of the application
 */
app.get("/", function (req, res) {
	res.render("login.ejs");
});
/**
 * Check the login identifier and password provided in the login view and login the user if all is good.
 */
app.post("/login", function (req, res) {
	console.log(`I perform the login id and password check before creating the session`);
});

app.post("/logout", function (req, res) {
	console.log(`I perform the session deletion`);
});

/**
 * Display the home page of the application.
 */
app.get("/home", function (req, res) {
	res.render("home.ejs", {
		name: "Teddyx"
	});
});

// -------------
// Server user routes
// -------------
/**
 * Display the view listing all users of this app
 */
app.get("/users/", function (req, res) {
	res.render("user/viewUserList.ejs", {});
});

/**
 * Display the view to create a new user
 */
app.get("/user/create/", function (req, res) {
	res.render("user/createUser.ejs");
});
/**
 * Perform the user creation into the database
 */
app.post("/user/create", function (req, res) {
	database.company.addEmployee(new Employee({
		personnalNumber: req.mat,
		surname: req.name,
		name: req.name,
		password: req.password,
		email: req.email
	}));
});

/**
 * Display the view showing the details about a specific user.
 * @param id {string} The user id referencing the user to get details about.
 */
app.get("/user/:id/", function (req, res) {
	res.render("user/viewuser.ejs", {
		name: "Jean",
		surname: "Lasalle",
		email: "exemple@mail.com",
		mat: "1234ABC"
	});
});

/**
 * Display the view to edit a specific user.
 * @param id {string} The user id referencing the user to edit.
 */
app.get("/user/:id/edit", function (req, res) {
	res.render("user/editUser.ejs", {
		name: "Jean",
		surname: "Lasalle",
		email: "exemple@mail.com",
		mat: "1234ABC"
	});
});
/**
 * Save the edited datas of a specific user in the database.
 * @param id {string} The user id referencing the user to edit.
 */
app.post("/user/:id/edit", function (req, res) {
	console.log(`I perform the database actions of the edition`);
});

/**
 * Delete a specifi user from the database.
 * @param id {string} The user id referencing the user to delete.
 */
app.post("/user/:id/delete", function (req, res) {
	console.log(`I perform the database actions of the deletion`);
});


// -------------
// Server material routes
// -------------
/**
 * Display the view to list all the app materials
 */
app.get("/materials/", function (req, res) {
	res.render("material/viewMaterialList.ejs", {
		materialsList: database.company.getMaterials()
	});
});

/**
 * Display the view to create a new material.
 */
app.get("/material/create", function (req, res) {
	res.render("material/createMaterial.ejs");
});
/**
 * Perform the material creation into the database.
 */
app.post("/material/create", function (req, res) {
	let createdMaterial;
	try {
		createdMaterial = new Material({
			title: req.body.title,
			version: req.body.version,
			reference: req.body.reference,
			picture: req.body.picture,
			phoneNumber: req.body.phoneNumber
		});

		database.company.addMaterial(createdMaterial);
		database.saveToFile();
	} catch (e) {
		return res.send(JSON.stringify({
			success: false,
			message: e.message
		}));
	}

	res.send(JSON.stringify({
		success: true,
		materialId: createdMaterial.getId()
	}));
});

/**
 * Display the view showing the details about a specific material.
 * @param id {string} The material id referencing the material to get details about.
 */
app.get("/material/:id/", function (req, res) {
	const materialId = req.params.id;

	res.render("material/viewMaterial.ejs", {
		material: database.company.getMaterial(materialId)
	});
});

/**
 * Display the view to edit the material.
 * @param id {string} The material id referencing the material to edit.
 */
app.get("/material/:id/edit/", function (req, res) {
	const materialId = req.params.id;

	res.render("material/editMaterial.ejs", {
		material: database.company.getMaterial(materialId)
	});
});


app.get("/accessForbidden", function (req, res) {

	res.render("accessForbidden.ejs", {});
});

// -------------
// Server start
// -------------
app.listen(PORT, () => {
	console.log(`Le serv est lancé sur http://localhost:${PORT}`);

	//database.company.getEmployes().forEach(e => console.log(e.getPersonnalNumber()));

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