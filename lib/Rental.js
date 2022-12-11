"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
const utils_1 = __importDefault(require("./utils"));
class Rental {
    constructor(obj) {
        this.id = (0, utils_1.default)();
        this.employee = obj.employee;
        this.material = obj.material;
        this.startingDate = obj.startingDate;
        this.endingDate = obj.endingDate;
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
        if (this.endingDate != null) {
            if (this.endingDate < date) {
                this.startingDate = date;
            }
            else {
                throw new Error("Starting date should occurs after ending date");
            }
        }
        else {
            this.startingDate = date;
        }
    }
    setEndingDate(date) {
        if (this.startingDate != null) {
            if (this.startingDate > date) {
                this.endingDate = date;
            }
            else {
                throw new Error("Ending date should occurs before begin date");
            }
            this.endingDate = date;
        }
    }
}
exports.Rental = Rental;
