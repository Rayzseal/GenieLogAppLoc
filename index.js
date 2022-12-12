const express      = require("express");
const app          = express();
const { Employee } = require("./lib/Employee");
const { Database } = require("./lib/Database");

const PORT     = 3000;
const database = Database.load(); // Retrieve the saved datas


// -------------
// Server settings
// -------------
app.use('/public/', express.static("public/"));

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
 * Display the view to create a new user
 */
app.get("/user/create", function (req, res) {
	res.render("user/createUser.ejs");
});
/**
 * Perform the user creation into the database
 */
app.post("/user/create", function (req, res) {
	console.log(`I perform the database actions of the creation`);
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
	res.render("material/viewMaterialList.ejs", {});
});

/**
 * Display the view showing the details about a specific material.
 * @param id {string} The material id referencing the material to get details about.
 */
app.get("/material/:id/", function (req, res) {
	res.render("material/viewMaterial.ejs");
});

// -------------
// Server start
// -------------
app.listen(PORT, () => {
	console.log(`Le serv est lancé sur http://localhost:${PORT}`);

	//database.company.getEmployes().forEach(e => console.log(e.getPersonnalNumber()));

	// Database test additon
	database.company.addEmployee(new Employee({
		personnalNumber: "123ABCD",
		surname: "Intel", 
		name: "letnI",
		password: "Zemodepasse123",
		email: "truc@truc.fr",
	}));
	database.save();
});