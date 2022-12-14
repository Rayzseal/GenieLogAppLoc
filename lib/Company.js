"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const Employee_1 = require("./Employee");
const Material_1 = require("./Material");
const Rental_1 = require("./Rental");
const utils_1 = require("./utils");
/**
 * The class company allows the user to add materials, employees and rentals using an existing employee & material.
 */
class Company {
    constructor() {
        this.employees = [];
        this.materials = [];
        this.rentals = [];
    }
    /**
     * List of employees.
     * @returns A list of employees.
     */
    getEmployes() {
        return this.employees;
    }
    /**
     * Add an employee.
     * @param employee Employee to be added.
     */
    addEmployee(employee) {
        this.employees.push(employee);
    }
    /**
     * Remove an employee.
     * @param employee Employee to be deleted.
     */
    removeEmployeeCascade(employee) {
        this.rentals = this.rentals.filter(rental => rental.getEmployee() != employee);
    }
    /**
     * Deletes an employee from a list.
     * @param material Employee to be deleted.
     * @param force Force the removal of the employee, even if there are active rentals.
     */
    removeEmployee(employee, force = false) {
        // Can't remove employee with an active rental.
        if (!force && this.hasActiveRental(employee)) {
            throw "Can't delete the employe while a rental is active";
        }
        this.removeEmployeeCascade(employee);
        this.employees = this.employees.filter(e => e != employee);
    }
    /**
     * List of materials.
     * @returns A list of materials.
     */
    getMaterials() {
        return this.materials;
    }
    /**
     * Returns a materials corresponding to be specified id.
     * @param materialId Id of a material.
     * @returns Specified material.
     */
    getMaterial(materialId) {
        return this.materials.find((material) => material.getId() === materialId);
    }
    /**
     * Add a material.
     * @param material Material to be added.
     */
    addMaterials(material) {
        this.materials.push(material);
    }
    /**
     * Remove a material.
     * @param material Material to be deleted.
     */
    removeMaterialCascade(material) {
        this.rentals = this.rentals.filter(rental => rental.getMaterial() != material);
    }
    /**
     * Deletes a material from a list.
     * @param material Material to be deleted.
     * @param force Force the removal of the material, even if there are active rentals.
     */
    removeMaterial(material, force = false) {
        if (!force && this.hasActiveRental(material)) {
            throw new Error("Can't remove material with an active location.");
        }
        this.removeMaterialCascade(material);
        this.materials = this.materials.filter(m => m != material);
    }
    /**
     * List of rentals.
     * @returns A list of rentals.
     */
    getRentals() {
        return this.rentals;
    }
    /**
     * Rent a material only if the given material if available during this period.
     * @param rental Rent to be added.
     */
    addRental(rental) {
        if (!this.employees.find(e => rental.getEmployee() == e)) {
            throw new Error("Employee doesn't exist in database");
        }
        if (!this.materials.find(m => rental.getMaterial() == m)) {
            throw new Error("Material doesn't exist in database");
        }
        /**
          * - The given starting date of rent in argument is not already during the period of rent for the same material of another rent.
          * - The given ending date of rent in argument is not already during the period of rent for the same material of another rent.
          * - Check if in all the rents already added to the list, if a rent have a starting date that will occurs between the interval of the rent to be added.
          * - Check if in all the rents already added to the list, if a rent have a ending date that will occurs between the interval of the rent to be added.
        */
        this.rentals.forEach(r => {
            if (r.getMaterial() == rental.getMaterial()) {
                if (((0, utils_1.dateInInterval)(rental.getStartingDate(), r.getStartingDate(), r.getEndingDate()))
                    || ((0, utils_1.dateInInterval)(rental.getEndingDate(), r.getStartingDate(), r.getEndingDate()))
                    || ((0, utils_1.dateInInterval)(r.getStartingDate(), rental.getStartingDate(), rental.getEndingDate()))
                    || ((0, utils_1.dateInInterval)(r.getEndingDate(), rental.getStartingDate(), rental.getEndingDate())))
                    throw new Error("Could not add rental, someone is already renting this material during this period r : " + r.getStartingDate() + "  rental add : " + rental.getStartingDate() + "-" + rental.getEndingDate());
            }
        });
        this.rentals.push(rental);
    }
    /**
     * Remove a rental from a list.
     * @param rental Rental to be deleted.
     */
    removeRental(rental) {
        this.rentals = this.rentals.filter(l => l == rental);
    }
    /**
     * Check if a location is active for a given employee or material.
     * @param referee Given employee or material to be checked.
     * @returns False if no location is active right now for the specified employee.
     */
    hasActiveRental(referee) {
        if (referee instanceof Employee_1.Employee) {
            // Check if the employee has an active rental.
            return this.rentals.find(rental => rental.isActive() && (rental.getEmployee() == referee)) != undefined;
        }
        else if (referee instanceof Material_1.Material) {
            // Check if the material has an active rental.
            return this.rentals.find(rental => rental.isActive() && (rental.getMaterial() == referee)) != undefined;
        }
        else {
            throw new Error("Invalid type used for referee");
        }
    }
    remapClasses() {
        // This method basically remaps each Object into its corresponding class instance.
        this.employees = this.employees.map((e) => new Employee_1.Employee(e));
        this.materials = this.materials.map((m) => new Material_1.Material(m));
        // Deduplicate and fix each rental.employee/material references.
        this.rentals = this.rentals.map((r) => {
            r.employee = this.employees.find(e => e.getPersonnalNumber() == r.employee.personnalNumber);
            r.material = this.materials.find(m => m.getId() == r.material.id);
            return new Rental_1.Rental(r);
        });
    }
}
exports.Company = Company;
let company = new Company;
let mat = new Material_1.Material({
    title: "Samsung Galaxy S10",
    version: "V1.6",
    reference: "AN123",
    picture: "https://exemple/image.jpg",
    phoneNumber: "1234567890",
});
let mat2 = new Material_1.Material({
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
let rental = new Rental_1.Rental({
    employee: emp,
    material: mat,
    startingDate: new Date("2022-12-10"),
    endingDate: new Date("2022-12-12"),
});
let rental2 = new Rental_1.Rental({
    employee: emp,
    material: mat2,
    startingDate: new Date("2022-12-25"),
    endingDate: new Date("2022-12-30"),
});
company.addEmployee(emp);
company.addMaterials(mat);
company.addMaterials(mat2);
company.addRental(rental2);
company.addRental(rental);
/*
console.log(company.getRentals().length);
company.removeRental(rental2);
console.log(company.getRentals().length);
*/
//console.log(company.locationIsActiveRental(rental));
console.log(company.getEmployes().length);
company.removeEmployee(emp);
console.log(company.getEmployes().length);
console.log(company.getRentals().at(0)?.getEmployee());
//console.log(company.locationIsActiveEmployee(emp));
