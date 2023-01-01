"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const crypto_1 = __importDefault(require("crypto"));
const utils_1 = require("./utils");
/**
 * Class to create an employee.
 */
class Employee {
    /**
     * Constructor with parameters of an employee.
     * @param obj
     * @param obj.name Name of an employee.
     * @param obj.surname Surname of an employee.
     * @param obj.email Email of an employee.
     * @param obj.isAdmin Wheter this user is admin or not.
     * @param obj.password Password of an employee.
     * @param obj.personnalNumber Employee number.
     * @param databaseRemapMode=false If this object is a remap performed by the database.
     * When true, it allows the creation to avoid certain constraints like those for the password format because the sha512 format doesn't correspond to the pasword choosen format.
     */
    constructor(obj, databaseRemapMode = false) {
        this.setId(obj.id);
        this.setName(obj.name);
        this.setSurname(obj.surname);
        this.setEmail(obj.email);
        this.setPersonnalNumber(obj.personnalNumber);
        this.isAdmin = obj.isAdmin ?? false;
        if (databaseRemapMode)
            this.password = obj.password;
        else
            this.setPassword(obj.password);
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
        if (/^(\d)+$/.test(name))
            throw new Error("Name can not be composed of just numbers");
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
        if (/^(\d)+$/.test(surname))
            throw new Error("Surname can not be composed of just numbers");
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
            this.password = this.hashPassword(password);
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
            this.id = crypto_1.default.randomUUID();
    }
    /**
     * Hash a given string using sha512 algorithm.
     * It can be used to hash a password before saving or to compare it to another string.
     * @param password The password to hash
     * @private
     */
    hashPassword(password) {
        return crypto_1.default.createHash("sha512").update(password).digest("hex");
    }
    /**
     * Compare this employee password to a given string.
     * The given string can be a user given password in order to check the equality between those two.
     * @param password the given password to compare to this employee password.
     */
    hasPassword(password) {
        return this.password === this.hashPassword(password);
    }
}
exports.Employee = Employee;
