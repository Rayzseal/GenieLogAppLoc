// noinspection JSCheckFunctionSignatures

const { Company }  = require("../lib/Company");
const { Rental }   = require("../lib/Rental");
const { Employee } = require("../lib/Employee");
const { Database } = require("../lib/Database");
const { Material } = require("../lib/Material");
const assert       = require("assert").strict;

describe("Company", () => {
	describe("Object creation", () => {
		describe("Creating a company", () => {

			// Creating a company
			it("Should create an empty company", (done) => {
				const comp = new Company({});
				assert.equal(comp.getRentals().length, 0, "The list of rentals must contains no element.");
				assert.equal(comp.getEmployees().length, 0, "The list of employees must contains no element.");
				assert.equal(comp.getMaterials().length, 0, "The list of materials must contains no element.");

				done();
			});

			// Creating a company
			it("Should create the company with objects in it", (done) => {
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

				const rent2 = new Rental({
					employee: emp1,
					material: mat1,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const comp = new Company({});

				comp.addEmployee(emp1);
				comp.addMaterial(mat1);
				comp.addRental(rent1);
				comp.addRental(rent2);

				assert.equal(comp.getRentals().length, 2, "The list of rentals must contains 2 elements.");
				assert.equal(comp.getEmployees().length, 1, "The list of employees must contains 1 element.");
				assert.equal(comp.getMaterials().length, 1, "The list of materials must contains 1 element.");

				done();

			});

		});
		describe("Adding elements to a company", () => {
			it("Company with objects in it, adding multiple rents", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});

				const mat2 = new Material({
					title: "Samsung galaxy s8",
					version: "v123",
					reference: "AN002"
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

				const rent2 = new Rental({
					employee: emp1,
					material: mat1,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const rent3 = new Rental({
					employee: emp1,
					material: mat2,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const comp = new Company({});

				comp.addEmployee(emp1);
				comp.addMaterial(mat1);
				comp.addMaterial(mat2);
				comp.addRental(rent1);
				comp.addRental(rent2);
				comp.addRental(rent3);

				assert.equal(comp.getRentals().length, 3, "The list of rentals must contains 3 elements.");
				assert.equal(comp.getEmployees().length, 1, "The list of employees must contains 1 element.");
				assert.equal(comp.getMaterials().length, 2, "The list of materials must contains 2 elements.");

				done();

			});

			it("Company with objects in it, adding multiple rents (error case)", (done) => {

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

				const rent2 = new Rental({
					employee: emp1,
					material: mat1,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const rent3 = new Rental({
					employee: emp1,
					material: mat1,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const comp = new Company({});

				assert.throws(() => {
					comp.addEmployee(emp1);
					comp.addMaterial(mat1);
					comp.addRental(rent1);
					comp.addRental(rent2);
					//Should cause the Error, since the material is already located at this time
					comp.addRental(rent3);
				}, Error, "Someone is trying to rent a material that is already rented during this period");

				done();
			});
		});

		describe("Deleting elements from a company", () => {

			it("Deleting rentals (not active)", (done) => {

				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});

				const mat2 = new Material({
					title: "Samsung galaxy s8",
					version: "v123",
					reference: "AN002"
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

				const rent2 = new Rental({
					employee: emp1,
					material: mat1,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const rent3 = new Rental({
					employee: emp1,
					material: mat2,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const comp = new Company({});

				comp.addEmployee(emp1);
				comp.addMaterial(mat1);
				comp.addMaterial(mat2);
				comp.addRental(rent1);
				comp.addRental(rent2);
				comp.addRental(rent3);

				assert.equal(comp.getRentals().length, 3, "The list of rentals must contains 3 elements.");

				comp.removeRental(rent1);
				comp.removeRental(rent2);
				comp.removeRental(rent3);

				assert.equal(comp.getRentals().length, 0, "The list of rentals must contains no element.");

				done();
			});

			it("Deleting employees (not active)", (done) => {

				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});

				const mat2 = new Material({
					title: "Samsung galaxy s8",
					version: "v123",
					reference: "AN002"
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

				const rent2 = new Rental({
					employee: emp1,
					material: mat1,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const rent3 = new Rental({
					employee: emp1,
					material: mat2,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const comp = new Company({});

				comp.addEmployee(emp1);
				comp.addMaterial(mat1);
				comp.addMaterial(mat2);
				comp.addRental(rent1);
				comp.addRental(rent2);
				comp.addRental(rent3);

				assert.equal(comp.getRentals().length, 3, "The list of rentals must contains 3 elements.");
				assert.equal(comp.getEmployees().length, 1, "The list of employees must contains 1 element.");

				comp.removeEmployee(emp1);

				assert.equal(comp.getEmployees().length, 0, "The list of employees must contains no element.");
				assert.equal(comp.getRentals().length, 0, "The list of rentals must contains no element.");

				done();
			});

			it("Deleting materials (not active)", (done) => {

				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});

				const mat2 = new Material({
					title: "Samsung galaxy s8",
					version: "v123",
					reference: "AN002"
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

				const rent2 = new Rental({
					employee: emp1,
					material: mat1,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const rent3 = new Rental({
					employee: emp1,
					material: mat2,
					startingDate: new Date("2024-02-01"),
					endingDate: new Date("2025-03-01")
				});

				const comp = new Company({});

				comp.addEmployee(emp1);
				comp.addMaterial(mat1);
				comp.addMaterial(mat2);
				comp.addRental(rent1);
				comp.addRental(rent2);
				comp.addRental(rent3);

				assert.equal(comp.getRentals().length, 3, "The list of rentals must contains 3 elements.");
				assert.equal(comp.getMaterials().length, 2, "The list of materials must contains 2 elements.");

				comp.removeMaterial(mat1);
				comp.removeMaterial(mat2);

				assert.equal(comp.getRentals().length, 0, "The list of rentals must contains no element.");
				assert.equal(comp.getMaterials().length, 0, "The list of materials must contains no element.");

				done();
			});

			it("Deleting employees, materials & rents (active)", (done) => {
				const today = new Date(new Date().setHours(1, 0, 0, 0));

				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});

				const mat2 = new Material({
					title: "Samsung galaxy s8",
					version: "v123",
					reference: "AN002"
				});

				const mat3 = new Material({
					title: "Samsung galaxy s9",
					version: "v-48",
					reference: "AN003"
				});

				const emp1 = new Employee({
					name: "Nicolas",
					surname: "Martin",
					email: "nicolas.martin@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABCD123"
				});

				const emp2 = new Employee({
					name: "Robert",
					surname: "Durant",
					email: "robert.durant@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "ABC4567"
				});

				const emp3 = new Employee({
					name: "Jean",
					surname: "Valjean",
					email: "jean.valjean@mail.com",
					password: "Azertyuiop1234",
					personnalNumber: "VBN1234"
				});

				const rent1 = new Rental({
					employee: emp1,
					material: mat1,
					startingDate: today,
					endingDate: new Date("2023-03-01")
				});

				const rent2 = new Rental({
					employee: emp2,
					material: mat2,
					startingDate: today,
					endingDate: new Date("2024-03-01")
				});

				const rent3 = new Rental({
					employee: emp3,
					material: mat3,
					startingDate: today,
					endingDate: new Date("2024-03-01")
				});

				const comp = new Company({});

				comp.addEmployee(emp1);
				comp.addEmployee(emp2);
				comp.addEmployee(emp3);
				comp.addMaterial(mat1);
				comp.addMaterial(mat2);
				comp.addMaterial(mat3);
				comp.addRental(rent1);
				comp.addRental(rent2);
				comp.addRental(rent3);

				assert.throws(() => {
					comp.removeRental(rent3);
				}, Error, "We cannot remove an active rent");

				assert.throws(() => {
					comp.removeMaterial(mat1);
				}, Error, "We cannot remove a material with an active rent");

				assert.throws(() => {
					comp.removeEmployee(emp2);
				}, Error, "We cannot remove an employee who has an active rent");

				assert.equal(comp.getEmployees().length, 3, "The list of employees must contains 3 elements.");
				assert.equal(comp.getMaterials().length, 3, "The list of materials must contains 3 elements.");
				assert.equal(comp.getRentals().length, 3, "The list of rentals must contains 3 elements.");

				comp.removeMaterial(mat1, true);

				assert.equal(comp.getMaterials().length, 2, "The list of materials must contains 2 elements.");
				assert.equal(comp.getRentals().length, 2, "The list of rentals must contains 2 elements.");

				comp.removeEmployee(emp2, true);

				assert.equal(comp.getEmployees().length, 2, "The list of employees must contains 2 elements.");
				assert.equal(comp.getRentals().length, 1, "The list of rentals must contains 1 element.");

				comp.removeRental(rent3, true);

				assert.equal(comp.getRentals().length, 0, "The list of rentals must contains no element.");

				done();
			});
		});
	});

	describe("Database tests", () => {
		describe("Database insertion", () => {
			const mat1 = new Material({
				title: "Samsung galaxy s7",
				version: "v24587",
				reference: "AN001"
			});

			const mat2 = new Material({
				title: "Samsung galaxy s8",
				version: "v123",
				reference: "AN002"
			});

			const mat3 = new Material({
				title: "Samsung galaxy s9",
				version: "v-48",
				reference: "AN003"
			});

			const emp1 = new Employee({
				name: "Nicolas",
				surname: "Martin",
				email: "nicolas.martin@mail.com",
				password: "Azertyuiop1234",
				personnalNumber: "ABCD123"
			});

			const emp2 = new Employee({
				name: "Robert",
				surname: "Durant",
				email: "robert.durant@mail.com",
				password: "Azertyuiop1234",
				personnalNumber: "ABC4567"
			});

			const emp3 = new Employee({
				name: "Jean",
				surname: "Valjean",
				email: "jean.valjean@mail.com",
				password: "Azertyuiop1234",
				personnalNumber: "VBN1234"
			});

			const rent1 = new Rental({
				employee: emp1,
				material: mat1,
				startingDate: new Date("2025-03-01"),
				endingDate: new Date("2026-03-01")
			});

			const rent2 = new Rental({
				employee: emp2,
				material: mat2,
				startingDate: new Date("2026-04-01"),
				endingDate: new Date("2027-03-01")
			});

			const rent3 = new Rental({
				employee: emp3,
				material: mat3,
				startingDate: new Date("2029-03-01"),
				endingDate: new Date("2030-03-01")
			});

			const database = new Database(new Company()); // Retrieve the saved data


			// Add an employee in the company
			database.company.addEmployee(emp1);
			database.company.addEmployee(emp2);
			database.company.addEmployee(emp3);

			// Add a material in the company
			database.company.addMaterial(mat1);
			database.company.addMaterial(mat2);
			database.company.addMaterial(mat3);

			// Add rents in the company
			database.company.addRental(rent1);
			database.company.addRental(rent2);
			database.company.addRental(rent3);

			describe("Retrieve tests", () => {
				// Can retrieve the added employee
				it("Should return the corrects number of elements added", (done) => {
					assert.equal(database.company.getEmployees().length, 3, "The list of employees must contains 3 elements.");
					assert.equal(database.company.getMaterials().length, 3, "The list of materials must contains 3 elements.");
					assert.equal(database.company.getRentals().length, 3, "The list of rentals must contains 3 elements.");

					done();
				});
			});
			describe("Deletion tests", () => {
				// Can retrieve the added employee
				it("Should return the corrects number of elements after we deleted some", (done) => {
					database.company.removeRental(rent1);
					database.company.removeEmployee(emp2); //--> deletes rent refereced by emp2
					database.company.removeMaterial(mat3); //--> deletes rent refereced by mat3

					assert.equal(database.company.getEmployees().length, 2, "The list of employees must contains 2 elements.");
					assert.equal(database.company.getMaterials().length, 2, "The list of materials must contains 2 elements.");
					assert.equal(database.company.getRentals().length, 0, "The list of rentals must contains no element.");

					done();
				});
			});
		});
	});
});