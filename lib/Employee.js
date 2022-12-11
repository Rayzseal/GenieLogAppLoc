"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const utils_1 = __importDefault(require("./utils"));
/**
 * Class to create an employee.
 */
class Employee {
    /**
     * Constructor with parameters of an employee.
     * @param name Name of an employee.
     * @param surname Surname of an employee.
     * @param password Password of an employee.
     * @param email Email of an employee.
     * @param idNumber Employee number.
     */
    constructor(name, surname, password, email, idNumber) {
        this.id = (0, utils_1.default)();
        this.role = false;
        this.setName(name);
        this.setSurname(surname);
        this.setPassword(password);
        this.setEmail(email);
        this.setIdNumber(idNumber);
    }
    /**
     *  Getter on id.
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
     * Getter on idNumer.
     * @returns idNumber of user.
     */
    getIdNumber() {
        return this.idNumber;
    }
    /**
     * Setter on name.
     * @param name new name.
     */
    setName(name) {
        var regexp = new RegExp('^[A-Za-z0-9 -]{1,30}$');
        var test = regexp.test(name);
        if (test)
            this.name = name;
        else
            throw new Error("Name is not alphanumeric");
    }
    /**
     * Setter on surname.
     * @param surname new surname.
     */
    setSurname(surname) {
        var regexp = new RegExp('^[A-Za-z0-9 -]{1,30}$');
        var test = regexp.test(surname);
        if (test)
            this.surname = surname;
        else
            throw new Error("Surname is not alphanumeric");
    }
    /**
     * Setter on password.
     * @param password new password.
     */
    setPassword(password) {
        var regexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$');
        var test = regexp.test(password);
        if (test)
            this.password = password;
        else
            throw new Error("Password should contains at least 8 characters with one uppercase letter, one lowercase letter and one number.");
    }
    /**
     * Setter on email.
     * @param email new email.
     */
    setEmail(email) {
        var regexp = new RegExp('^[^@\s]+@[^@\s]+\.[^@\s]+$');
        var test = regexp.test(email);
        if (test)
            this.email = email;
        else
            throw new Error("Email is incorrect");
    }
    /**
     * Setter on role.
     * @param role new role.
     */
    setRole(role) {
        this.role = role;
    }
    /**
     * Setter on idNumber.
     * @param idNumber new idNumber.
     */
    setIdNumber(idNumber) {
        var regexp = new RegExp('^[a-zA-Z0-9]{7}$');
        var test = regexp.test(idNumber);
        if (test)
            this.idNumber = idNumber;
        else
            throw new Error("IdNumber is not alphanumeric");
    }
}
exports.Employee = Employee;
