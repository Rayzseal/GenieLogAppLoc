"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
const Employee_1 = require("./Employee");
const Material_1 = require("./Material");
const utils_1 = __importDefault(require("./utils"));
class Rental {
    constructor(obj) {
        this.id = (0, utils_1.default)();
        this.setEmployee(obj.employee);
        this.setMaterial(obj.material);
        this.setStartingDate(obj.startingDate);
        this.setEndingDate(obj.endingDate);
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
            if (this.endingDate > date) {
                this.startingDate = date;
            }
            else {
                throw new Error("Starting date should occurs before ending date");
            }
        }
        else {
            this.startingDate = date;
        }
    }
    setEndingDate(date) {
        if (this.startingDate != null) {
            if (this.startingDate < date) {
                this.endingDate = date;
            }
            else {
                throw new Error("Ending date should occurs after begin date");
            }
        }
        else {
            this.endingDate = date;
        }
    }
}
exports.Rental = Rental;
let mat = new Material_1.Material({
    title: "Samsung Galaxy S10",
    version: "V1.6",
    reference: "AN123",
    picture: "https://exemple/image.jpg",
    phoneNumber: "1234567890",
});
let emp = new Employee_1.Employee({
    name: "Jean",
    surname: "Lasalle",
    email: "jean.lasalle@mail.com",
    role: false,
    password: "Azertyuiop1234",
    personnalNumber: "1234ABC",
});
//console.log(emp.getName());
let rental = new Rental({
    employee: emp,
    material: mat,
    startingDate: new Date("2019-01-16"),
    endingDate: new Date("2019-01-17"),
});
