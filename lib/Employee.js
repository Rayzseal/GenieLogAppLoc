"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const crypto_1 = require("crypto");
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
     * @param obj.role Wheter this user is admin or not.
     * @param obj.password Password of an employee.
     * @param obj.personnalNumber Employee number.
     */
    constructor(obj) {
        this.id = (0, crypto_1.randomUUID)();
        this.role = obj.role ?? false;
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
     * Getter on role.
     * @returns role of user (either 1 for admin or 0 for simple user).
     */
    getRole() {
        return this.role;
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
        if (/^[A-Za-z0-9 -]{1,30}$/.test(name))
            this.name = name;
        else
            throw new Error("Name is not alphanumeric");
    }
    /**
     * Setter on surname.
     * @param surname new surname.
     */
    setSurname(surname) {
        if (/^[A-Za-z0-9 -]{1,30}$/.test(surname))
            this.surname = surname;
        else
            throw new Error("Surname is not alphanumeric");
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
     * Setter on role.
     * @param role new role.
     */
    setRole(role) {
        this.role = role;
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
}
exports.Employee = Employee;
