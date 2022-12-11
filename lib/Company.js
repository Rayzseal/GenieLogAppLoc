"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const Employee_1 = require("./Employee");
const Material_1 = require("./Material");
const Rental_1 = require("./Rental");
class Company {
    constructor() {
        this.employees = [];
        this.materials = [];
        this.rentals = [];
    }
    getEmployes() {
        return this.employees;
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    removeEmployeeCascade(employee) {
        this.rentals = this.rentals.filter(rental => rental.employee == employee);
    }
    removeEmployee(employee, cascade = false) {
        if (cascade) {
            this.removeEmployeeCascade(employee);
        }
        else if (this.rentals.find((rental) => rental.employee == employee)) {
            // Can't remove employee with a dangling reference whithin locations.
            throw "Can't delete the employe while a location is active";
        }
        this.employees = this.employees.filter(e => e != employee);
    }
    getMaterials() {
        return this.materials;
    }
    addMaterials(material) {
        this.materials.push(material);
    }
    removeMaterialCascade(materiel) {
        this.rentals = this.rentals.filter(rental => rental.material == materiel);
    }
    removeMaterial(material, cascade = false) {
        if (cascade) {
            this.removeMaterialCascade(material);
        }
        else if (this.rentals.find((rental) => rental.material == material)) {
            // Can't remove employee with a dangling reference whithin locations.
            throw "Can't delete the materiel while a location is active";
        }
        this.materials = this.materials.filter(m => m != material);
    }
    getRentals() {
        return this.rentals;
    }
    addRental(rental) {
        if (!this.employees.find(e => rental.employee == e)) {
            throw "Employee doesn't exist in database";
        }
        if (!this.materials.find(m => rental.getMaterial() == m)) {
            throw "Materiel doesn't exist in database";
        }
        this.rentals.push(rental);
    }
    removeRental(rental) {
        this.rentals = this.rentals.filter(l => l == rental);
    }
    remapClasses() {
        // This method basically remaps each Object into its corresponding class instance.
        this.employees = this.employees.map((e) => new Employee_1.Employee(e));
        this.materials = this.materials.map((m) => new Material_1.Material(m));
        // Fix each rental.employee/material references.
        this.rentals = this.rentals.map((r) => {
            r.employee = this.employees.find(e => e.getPersonnalNumber() == r.employee.personnalNumber);
            r.material = this.materials.find(m => m.getId() == r.material.id);
            return new Rental_1.Rental(r);
        });
    }
}
exports.Company = Company;
