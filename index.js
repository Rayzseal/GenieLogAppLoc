const express      = require("express");
const session			 = require("express-session");
const crypto 			 = require('crypto');
const app          = express();
const { Rental }   = require("./lib/Rental");
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
// Session Creation
// -------------
app.use(session({
	secret: crypto.randomBytes(20).toString('hex'),
	resave : true,
	saveUninitialized : true,
	cookie : {
		secure : false,
		httpOnly : false
	}
}));

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
 * Check the login identifier and password provided in the login view and login the employee if all is good.
 */
app.post("/login", function (req, res) {
	console.log(`I perform the login id and password check before creating the session`);
	const personnalNumber = req.body.matricule;
	const password = req.body.password;

	let emp = database.company.getEmployeeByPersonnalNumber(personnalNumber);

	if (emp && emp.password === password)
		req.session.current_employe = emp;
	else
		return res.send(JSON.stringify({
			success: false,
			message: "Password or Personnal number incorrect"
		}));

	res.send(JSON.stringify({
		success: true
	}));
	res.end();
});

app.post("/logout", function (req, res) {
	console.log(`I perform the session deletion`);
});

/**
 * Display the home page of the application.
 */
app.get("/home", function (req, res) {
	console.log(req.session);
	res.render("home.ejs", {
		name: req.session.current_employe.surname
	});
});

// -------------
// Server employee routes
// -------------
/**
 * Display the view listing all employees of this app
 */
app.get("/employees/", function (req, res) {
	res.render("employee/viewEmployeeList.ejs", {
		employeesList: database.company.getEmployees()
	});
});

/**
 * Display the view to create a new employee
 */
app.get("/employee/create/", function (req, res) {
	res.render("employee/createEmployee.ejs");
});
/**
 * Perform the employee creation into the database
 */
app.post("/employee/create", function (req, res) {

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
});

/**
 * Display the view showing the details about a specific employee.
 * @param id {string} The employee id referencing the employee to get details about.
 */
app.get("/employee/:id/", function (req, res) {
	const employeeId = req.params.id;

	res.render("employee/viewEmployee.ejs", {
		employee: database.company.getEmployee(employeeId)
	});
});

/**
 * Display the view to edit a specific employee.
 * @param id {string} The employee id referencing the employee to edit.
 */
app.get("/employee/:id/edit", function (req, res) {
	res.render("employee/editEmployee.ejs", {
		name: "Jean",
		surname: "Lasalle",
		email: "exemple@mail.com",
		mat: "1234ABC"
	});
});
/**
 * Save the edited datas of a specific employee in the database.
 * @param id {string} The employee id referencing the employee to edit.
 */
app.post("/employee/:id/edit", function (req, res) {
	console.log(`I perform the database actions of the edition`);
});

/**
 * Delete a specifi employee from the database.
 * @param id {string} The employee id referencing the employee to delete.
 */
app.post("/employee/:id/delete", function (req, res) {
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
	const material = database.company.getMaterial(materialId);
	if (!material)
		return res.redirect('/materials');

	res.render("material/viewMaterial.ejs", {
		material: material,
		rentals: database.company.getRentalsForMaterial(materialId),
		employees: database.company.getEmployees()
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

/**
 * Create a new rental for a specific material
 * @param id {string} The material id referencing the material that will be rented.
 */
app.post("/material/:id/rental/create", function (req, res) {
	const materialId = req.params.id;
	let createdRental;
	try {
		createdRental = new Rental({
			employee: database.company.getEmployee(req.body.employeeId),
			material: database.company.getMaterial(materialId),
			startingDate: req.body.startingDate,
			endingDate: req.body.endingDate
		});

		database.company.addRental(createdRental);
		database.saveToFile();
	} catch (e) {
		return res.send(JSON.stringify({
			success: false,
			message: e.message
		}));
	}

	res.send(JSON.stringify({
		success: true,
		rental: createdRental
	}));
});


// -------------
// Other routes
// -------------
app.get("/accessForbidden", function (req, res) {
	res.render("accessForbidden.ejs", {});
});

// -------------
// Server start
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