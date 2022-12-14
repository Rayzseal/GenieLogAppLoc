"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
const utils_1 = require("./utils");
class Rental {
    constructor(obj) {
        this.id = (0, utils_1.genUniqueId)();
        this.setEmployee(obj.employee);
        this.setMaterial(obj.material);
        this.setStartingDate(obj.startingDate);
        this.setEndingDate(obj.endingDate);
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
        if (date instanceof String)
            date = new Date(date);
        if (this.endingDate != null && date > this.endingDate)
            throw new Error("Starting date should occurs before ending date");
        this.startingDate = date;
    }
    setEndingDate(date) {
        if (date instanceof String)
            date = new Date(date);
        if (this.endingDate != null && date < this.endingDate)
            throw new Error("Ending date should occurs after begin date");
        this.endingDate = date;
    }
}
exports.Rental = Rental;
