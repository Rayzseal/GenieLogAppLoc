"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const crypto_1 = require("crypto");
const utils_1 = require("./utils");
/**
 * Class to create an employee.
 */
class Employee {
    /**
     * Constructor with parameters of an employee.
     * @param obj {Object}
     * @param obj.name Name of an employee.
     * @param obj.surname Surname of an employee.
     * @param obj.email Email of an employee.
     * @param obj.isAdmin Wheter this user is admin or not.
     * @param obj.password Password of an employee.
     * @param obj.personnalNumber Employee number.
     */
    constructor(obj) {
        this.isAdmin = obj.isAdmin ?? false;
        // TODO: add tests on id setter format
        this.setId(obj.id);
        this.setName(obj.name);
        this.setSurname(obj.surname);
        this.setPassword(obj.password);
        this.setEmail(obj.email);
        this.setPersonnalNumber(obj.personnalNumber);
    }
    /**
     * Getter on id.
     * @returns automaticly generated id of user.
     */
    getId() {
        return this.id;
    }
    /**
     * Getter on name.
     * @returns name of user.
     */
    getName() {
        return this.name;
    }
    /**
     * Getter on surname.
     * @returns surname of user.
     */
    getSurname() {
        return this.surname;
    }
    /**
     * Getter on email.
     * @returns email of user.
     */
    getEmail() {
        return this.email;
    }
    /**
     * Getter on isAdmin.
     * @returns isAdmin of user (either 1 for admin or 0 for simple user).
     */
    getIsAdmin() {
        return this.isAdmin;
    }
    /**
     * Getter on personnalNumber.
     * @returns personnal number of user.
     */
    getPersonnalNumber() {
        return this.personnalNumber;
    }
    /**
     * Setter on name.
     * @param name new name.
     */
    setName(name) {
        if (/^(\s+)?$/.test(name))
            throw new Error("Name is empty");
        if (/^[A-Za-z0-9À-ÿ -]{1,30}$/.test(name))
            this.name = name;
        else
            throw new Error("Name is not alphanumeric (accentuation authorized)");
    }
    /**
     * Setter on surname.
     * @param surname new surname.
     */
    setSurname(surname) {
        if (/^(\s+)?$/.test(surname))
            throw new Error("Surname is empty");
        if (/^[A-Za-z0-9À-ÿ -]{1,30}$/.test(surname))
            this.surname = surname;
        else
            throw new Error("Surname is not alphanumeric (accentuation authorized)");
    }
    /**
     * Setter on password.
     * @param password new password.
     */
    setPassword(password) {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password))
            this.password = password;
        else
            throw new Error("Password should contains at least 8 characters with one uppercase letter, one lowercase letter and one number.");
    }
    /**
     * Setter on email.
     * @param email new email.
     */
    setEmail(email) {
        if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
            this.email = email;
        else
            throw new Error("Email is incorrect.");
    }
    /**
     * Setter on isAdmin.
     * @param adminState new admin state.
     */
    setIsAdmin(adminState) {
        this.isAdmin = adminState;
    }
    /**
     * Setter on personnalNumber.
     * @param personnalNumber new personnalNumber.
     */
    setPersonnalNumber(personnalNumber) {
        if (/^[a-zA-Z0-9]{7}$/.test(personnalNumber))
            this.personnalNumber = personnalNumber;
        else
            throw new Error("Personnal number is not alphanumeric or 7 characters long. : " + personnalNumber);
    }
    /**
     * Setter on employee id.
     * @param id the id to give to this material. This is need to respect the uuidv4 format. Otherwise, the material will be given a random uuid.
     * @private
     */
    setId(id) {
        if (id && (0, utils_1.isUUIDFormat)(id))
            this.id = id;
        else
            this.id = (0, crypto_1.randomUUID)();
    }
}
exports.Employee = Employee;
