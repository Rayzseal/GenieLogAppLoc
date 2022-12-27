// noinspection JSCheckFunctionSignatures

const { Company }  = require("../lib/Company");
const { Employee }  = require("../lib/Employee");
const { Database } = require("../lib/Database");
const {Material} = require("../lib/Material");
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
            it("Should create the employee with a correct name", (done) => {
                const emp1 = new Employee({
                    name: "Nicolas",
                    surname: "Martin",
                    email: "nicolas.martin@mail.com",
                    password: "Azertyuiop1234",
                    personnalNumber: "ABCD123"
                });

                assert.equal(typeof emp1.getName(), "string", "The name must be a String.");

                done();
            });

            it("Should create the employee with a correct name", (done) => {
                const emp1 = new Employee({
                    name: "Jean Jacques",
                    surname: "Martin",
                    email: "nicolas.martin@mail.com",
                    password: "Azertyuiop1234",
                    personnalNumber: "ABCD123"
                });

                assert.equal(typeof emp1.getName(), "string", "The name must be a String.");

                done();
            });

            it("Should create the employee with a correct name", (done) => {
                const emp1 = new Employee({
                    name: "Jean-Jacques",
                    surname: "Martin",
                    email: "nicolas.martin@mail.com",
                    password: "Azertyuiop1234",
                    personnalNumber: "ABCD123"
                });

                assert.equal(typeof emp1.getName(), "string", "The name must be a String.");

                done();
            });

            it("Should create the employee with a correct name", (done) => {
                const emp1 = new Employee({
                    name: "Nîcolàs",
                    surname: "Martin",
                    email: "nicolas.martin@mail.com",
                    password: "Azertyuiop1234",
                    personnalNumber: "ABCD123"
                });

                assert.equal(typeof emp1.getName(), "string", "The name must be a String.");

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
                }, Error, "The employee is being created with an incorrect format of name");

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

    });
});