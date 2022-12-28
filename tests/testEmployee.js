// noinspection JSCheckFunctionSignatures

const { Company }  = require("../lib/Company");
const { Employee } = require("../lib/Employee");
const { Database } = require("../lib/Database");
const assert       = require("assert").strict;

describe("Employee", () => {
	describe("Object creation", () => {
		describe("Id tests", () => {
			// Creating an employee
			it("Should create the employee without having to enter an id", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getId(), "string", "The id must be a String.");

				done();
			});
		});

		describe("Name tests", () => {
			// Creating an employee
			it("Should create the employee with a standard name (no space or special characters)", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getName(), "string", "The name must be a String.");
				assert.equal(emp1.getName(), "Nicolas", "A standard name should be accepted.");

				done();
			});

			it("Should create the employee with a name containing a space", (done) => {
				const emp1 = new Employee({
					name: "Jean Jacques",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(emp1.getName(), "Jean Jacques", "A name containing a space characted should be accepted.");

				done();
			});

			it("Should create the employee with a name containing an hyphen", (done) => {
				const emp1 = new Employee({
					name: "Jean-Jacques",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(emp1.getName(), "Jean-Jacques", "A name containing hyphen should be accepted.");

				done();
			});

			it("Should create the employee with an accentuated name", (done) => {
				const emp1 = new Employee({
					name: "Nîcolàs",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(emp1.getName(), "Nîcolàs", "A name containing accentuated characted should be accepted.");

				done();
			});

			it("Should not create an employee with an incorrect type of name", (done) => {
				const emp1 = new Employee({
					name: 41,
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getName(), "number", "The name must be a of type number.");

				done();
			});

			it("Should throw an error : employee with an incorrect name (format)", (done) => {
				assert.throws(() => {
					new Employee({
						name: "Nicolas/",
						surname: "Martin",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of name");

				assert.throws(() => {
					new Employee({
						name: "",
						surname: "Martin",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of name (empty string)");

				assert.throws(() => {
					new Employee({
						name: " ",
						surname: "Martin",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of name");

				done();
			});

			it("Should throw an error : employee with an incorrect name (size)", (done) => {
				assert.throws(() => {
					new Employee({
						name: "Nicolasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
						surname: "Martin",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of name : too long");

				done();
			});

		});

		describe("Surname tests", () => {
			// Creating an employee
			it("Should create the employee with a correct surname", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getSurname(), "string", "The surname must be a String.");

				done();
			});

			it("Should create the employee with a correct surname", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin Jean",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getSurname(), "string", "The surname must be a String.");

				done();
			});

			it("Should create the employee with a correct surname", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin-Jean",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getSurname(), "string", "The surname must be a String.");

				done();
			});

			it("Should create the employee with a correct surname", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Màrtîn",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getSurname(), "string", "The surname must be a String.");

				done();
			});

			it("Should not create an employee with an incorrect type of name", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: 41,
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getSurname(), "number", "The surname must be a of type number.");

				done();
			});

			it("Should throw an error : employee with an incorrect surname (format)", (done) => {
				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martin/",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of surname");

				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of surname");

				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: " ",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of surname");

				done();
			});

			it("Should throw an error : employee with an incorrect surname (size)", (done) => {
				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of surname : too long");

				done();
			});
		});

		describe("Email tests", () => {
			// Creating an employee
			it("Should create the employee with a correct email", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getEmail(), "string", "The email must be a String.");

				done();
			});

			it("Should create the employee with a correct email (containing special characters)", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nîcolàs.m/artin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getEmail(), "string", "The email must be a String.");

				done();
			});

			it("Should throw an error : employee with an incorrect mail (missing  or incorrect characters)", (done) => {
				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: "nicolas.martinmail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of email : missing @");

				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: "nicolas@martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of email : too many @");

				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: "nicolas.martin@mailcom",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of email : missing extension");

				done();
			});
		});

		describe("Password tests", () => {
			// Creating an employee
			it("Should create the employee with a correct password", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof (emp1), "object", "Should be an object.");

				done();
			});

			it("Should throw an error : employee with an incorrect password (missing characters)", (done) => {
				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: "nicolas.martinmail.com",
						password: "azertyuiop1234",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of password : missing uppercase letter");

				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: "nicolas.martinmail.com",
						password: "Azertyuiop",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of password : missing numbers");

				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: "nicolas.martinmail.com",
						password: "Azer12",
						personnalNumber: "ABCD123"
					});
				}, Error, "The employee is being created with an incorrect format of password : too short");

				done();
			});

		});

		describe("PersonnalNumber tests", () => {
			// Creating an employee
			it("Should create the employee with a correct personnal number", (done) => {
				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.equal(typeof emp1.getPersonnalNumber(), "string", "The personnal number must be a String.");

				done();
			});

			it("Should throw an error : employee with an incorrect personnal number (format)", (done) => {
				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "AB/D123"
					});
				}, Error, "The employee is being created with an incorrect format of personnal number : special characters");

				done();
			});

			it("Should throw an error : employee with an incorrect personnal number (size)", (done) => {
				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABC123"
					});
				}, Error, "The employee is being created with an incorrect format of personnal number : too short");

				assert.throws(() => {
					new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: "ABCD1234"
					});
				}, Error, "The employee is being created with an incorrect format of personnal number : too long");

				done();
			});

		});

	});

	describe("Database insertion", () => {
		const emp1     = new Employee({
			name: "Nicolas",
			surname: "Martin",
			email: "nicolas.martin@mail.com",
			password: "Azertyuiop1234",
			personnalNumber: "ABCD123"
		});
		const database = new Database(new Company()); // Retrieve the saved data

		// Add an employee in the company
		before(() => database.company.addEmployee(emp1));

		describe("Retrieve tests", () => {
			// Can retrieve the added employee
			it("Should return the employee added", (done) => {
				const retrievedEmployee = database.company.getEmployee(emp1.getId());

				assert.equal(retrievedEmployee, emp1, "An added employee is returned by the getter");

				done();
			});
		});

		describe("Unicity tests", () => {
			// Strict copy added
			it("Should not add a employee already in the database", (done) => {
				// Exact same object (same id)
				assert.throws(() => {
					database.company.addEmployee(emp1);
				}, Error, "A same employee is being added several times in the database");

				// Same reference but different id
				assert.throws(() => {
					const sameReferenceDifferentId = new Employee(emp1);
					database.company.addEmployee(sameReferenceDifferentId);
				}, Error, "An employee is being added in the database with an already added employee id");

				assert.throws(() => {
					const emp2 = new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: "nicolas.martin@mail.com",
						password: "Azertyuiop1234",
						personnalNumber: emp1.getPersonnalNumber()
					});
					database.company.addEmployee(emp2);
				}, Error, "An employee with an already used personnal number is being added to the company");

				assert.throws(() => {
					const emp3 = new Employee({
						name: "Nicolas",
						surname: "Martin",
						email: emp1.getEmail(),
						password: "Azertyuiop1234",
						personnalNumber: "12345AB"
					});
					database.company.addEmployee(emp3);
				}, Error, "An employee with an already used email is being added to the company");

				done();
			});
		});
	});

	describe("Database deletion", () => {
		const emp1     = new Employee({
			name: "Nicolas",
			surname: "Martin",
			email: "nicolas.martin@mail.com",
			password: "Azertyuiop1234",
			personnalNumber: "12345AC"
		});
		const database = new Database(new Company()); // Retrieve the saved data

		// Add a material in the company
		before(() => database.company.addEmployee(emp1));

		describe("Retrieve tests", () => {
			// Cannot retrieve the deleted employee
			it("Should not return the deleted material", (done) => {
				database.company.removeEmployee(emp1);

				assert.equal(database.company.getEmployee(emp1.getId()), undefined, "The employee is not removed from the database when called for being deleted.");
				done();
			});
		});
	});
});