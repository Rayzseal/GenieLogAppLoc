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
                const comp    = new Company({ });
                assert.equal(comp.getRentals().length, 0 , "The list of rentals must contains no element.");
                assert.equal(comp.getEmployees().length, 0 , "The list of employees must contains no element.");
                assert.equal(comp.getMaterials().length, 0 , "The list of materials must contains no element.");

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

                const comp    = new Company({ });

                comp.addEmployee(emp1);
                comp.addMaterial(mat1);
                comp.addRental(rent1);
                comp.addRental(rent2);

                assert.equal(comp.getRentals().length, 2 , "The list of rentals must contains 2 elements.");
                assert.equal(comp.getEmployees().length, 1 , "The list of employees must contains 1 element.");
                assert.equal(comp.getMaterials().length, 1 , "The list of materials must contains 1 element.");

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

                const comp    = new Company({ });

                comp.addEmployee(emp1);
                comp.addMaterial(mat1);
                comp.addMaterial(mat2);
                comp.addRental(rent1);
                comp.addRental(rent2);
                comp.addRental(rent3);

                assert.equal(comp.getRentals().length, 3 , "The list of rentals must contains 2 elements.");
                assert.equal(comp.getEmployees().length, 1 , "The list of employees must contains 1 element.");
                assert.equal(comp.getMaterials().length, 2 , "The list of materials must contains 1 element.");

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

                const comp    = new Company({ });

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

        describe("Deleting elements to a company", () => {

            it ("",(done )=> {

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

                const comp    = new Company({ });

                comp.addEmployee(emp1);
                comp.addMaterial(mat1);
                comp.addMaterial(mat2);
                comp.addRental(rent1);
                comp.addRental(rent2);
                comp.addRental(rent3);

                done();

            });

        });

    });
});