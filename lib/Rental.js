"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
const utils_1 = require("./utils");
const crypto_1 = require("crypto");
const fr_json_1 = __importDefault(require("../translations/fr.json"));
const err = fr_json_1.default;
class Rental {
    /**
     * Constructor with parameters of a rental.
     * @param obj
     * @param obj.employee The employee that is renting/has rented a specific material
     * @param obj.material The material rented by an employee for a certain duration.
     * @param obj.startingDate The rental strarting date.
     * @param obj.endingDate The rental ending date.
     * @param databaseRemapMode=false If this object is a remap performed by the database.
     * When true, it allows the creation to avoid certain constraints like those for the starting and ending rental dates that require a date not to be in the past while th databse have to store rentals even if those started in the past : the database restore could have caused problems .
     */
    constructor(obj, databaseRemapMode = false) {
        this.id = (0, crypto_1.randomUUID)();
        this.setEmployee(obj.employee);
        this.setMaterial(obj.material);
        if (databaseRemapMode) {
            this.startingDate = typeof obj.startingDate === "string" ? new Date(obj.startingDate) : obj.startingDate;
            this.endingDate = typeof obj.endingDate === "string" ? new Date(obj.endingDate) : obj.endingDate;
        }
        else {
            this.setStartingDate(obj.startingDate);
            this.setEndingDate(obj.endingDate);
        }
    }
    /**
     * Check if a location is active.
     * @returns False if no location is active right now for the specified rental.
     */
    isActive() {
        return (0, utils_1.dateInInterval)(new Date(), this.startingDate, this.endingDate);
    }
    getId() {
        return this.id;
    }
    getMaterial() {
        return this.material;
    }
    getEmployee() {
        return this.employee;
    }
    getStartingDate() {
        return this.startingDate;
    }
    getEndingDate() {
        return this.endingDate;
    }
    setEmployee(e) {
        this.employee = e;
    }
    setMaterial(m) {
        this.material = m;
    }
    setStartingDate(date) {
        if (typeof date === "string")
            date = new Date(date);
        if (date.getTime() < new Date().setHours(1, 0, 0, 0))
            throw new Error(err.rental_st_past);
        if (this.endingDate && date > this.endingDate)
            throw new Error(err.rental_stbfen);
        this.startingDate = date;
    }
    setEndingDate(date) {
        if (typeof date === "string")
            date = new Date(date);
        if (date.getTime() < new Date().setHours(1, 0, 0, 0))
            throw new Error(err.rental_en_past);
        if (this.startingDate && date < this.startingDate)
            throw new Error(err.rental_enafst);
        this.endingDate = date;
    }
}
exports.Rental = Rental;
