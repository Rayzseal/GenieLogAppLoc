// noinspection JSCheckFunctionSignatures

const { Company }  = require("../lib/Company");
const { Rental }   = require("../lib/Rental");
const { Employee } = require("../lib/Employee");
const { Database } = require("../lib/Database");
const { Material } = require("../lib/Material");
const assert       = require("assert").strict;

describe("Rental", () => {
	describe("Object creation", () => {
		describe("Id tests", () => {
			// Creating a rental
			it("Should create the rental without having to enter an id", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});

				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				const rent1 = new Rental({
					employee: emp1,
					material: mat1,
					startingDate: new Date("2023-02-01"),
					endingDate: new Date("2023-03-01")
				});

				assert.equal(typeof rent1.getId(), "string", "The id must be a String.");

				done();
			});
		});

		describe("Begin & ending date tests", () => {
			// Creating a rental
			it("Should create a rental with valid dates values", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});

				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				const rent1 = new Rental({
					employee: emp1,
					material: mat1,
					startingDate: new Date("2025-02-01"),
					endingDate: new Date("2025-03-01")
				});

				assert.equal(typeof rent1.getStartingDate(), "object", "The starting date must be of type date.");
				assert.equal(typeof rent1.getEndingDate(), "object", "The ending date must be of type date.");

				done();
			});
			it("Should create a rental with valid dates values", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});

				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				assert.throws(() => {
					new Rental({
						employee: emp1,
						material: mat1,
						startingDate: new Date("2025-02-01"),
						endingDate: new Date("2024-03-01")
					});
				}, Error, "The rental is being created with ending date before a the begin date");

				assert.throws(() => {
					new Rental({
						employee: emp1,
						material: mat1,
						startingDate: new Date("2020-02-01"),
						endingDate: new Date("2024-03-01")
					});
				}, Error, "The rental is being created with starting date before today's date");

				done();
			});
		});
	});

	describe("Database insertion", () => {
		const mat1 = new Material({
			title: "Samsung galaxy s7",
			version: "v24587",
			reference: "AN001"
		});

		const emp1 = new Employee({
			name: "Nicolas",
			surname: "Martin",
			email: "nicolas.martin@mail.com",
			password: "Azertyuiop1234",
			personnalNumber: "ABCD123"
		});

		const rent1    = new Rental({
			employee: emp1,
			material: mat1,
			startingDate: new Date("2025-02-01"),
			endingDate: new Date("2025-03-01")
		});
		const database = new Database(new Company()); // Retrieve the saved data

		assert.throws(() => {
			database.company.addRental(rent1);
		}, Error, "A rental is being added but the employee is not yet added to the company");

		// Add an employee in the company
		database.company.addEmployee(emp1);

		assert.throws(() => {
			database.company.addRental(rent1);
		}, Error, "A rental is being added but the material is not yet added to the company");

		// Add a material in the company
		database.company.addMaterial(mat1);

		// Add a rental in the company
		before(() => database.company.addRental(rent1));

		describe("Retrieve tests", () => {
			// Can retrieve the added employee
			it("Should return the rental added", (done) => {
				const retrievedRental = database.company.getRentals(rent1.getId());

				assert.equal(database.company.getRental(rent1.getId()), rent1, "An added rental is returned by the getter");

				done();
			});
		});

		describe("Unicity tests", () => {
			// Strict copy added
			it("Should not add a rental already in the database", (done) => {
				// Exact same object (same id)
				assert.throws(() => {
					database.company.addRental(emp1);
				}, Error, "A same rental is being added several times in the database");

				// Same reference but different id
				assert.throws(() => {
					const sameReferenceDifferentId = new Rental(rent1);
					database.company.addRental(sameReferenceDifferentId);
				}, Error, "A rental is being added in the database with an already added rental id");

				done();
			});
		});
	});

	describe("Database deletion", () => {
		const mat1 = new Material({
			title: "Samsung galaxy s7",
			version: "v24587",
			reference: "AN001"
		});

		const emp1 = new Employee({
			name: "Nicolas",
			surname: "Martin",
			email: "nicolas.martin@mail.com",
			password: "Azertyuiop1234",
			personnalNumber: "ABCD123"
		});

		const rent1    = new Rental({
			employee: emp1,
			material: mat1,
			startingDate: new Date("2025-02-01"),
			endingDate: new Date("2025-03-01")
		});
		const database = new Database(new Company()); // Retrieve the saved data

		// Add a material in the company
		database.company.addEmployee(emp1);
		database.company.addMaterial(mat1);
		database.company.addRental(rent1);

		describe("Retrieve tests", () => {
			// Cannot retrieve the deleted employee
			it("Should not return the deleted rental", (done) => {
				database.company.removeRental(rent1);

				assert.equal(database.company.getRental(rent1.getId()), undefined, "The rental is not removed from the database when called for being deleted.");
				done();
			});
		});
	});
});