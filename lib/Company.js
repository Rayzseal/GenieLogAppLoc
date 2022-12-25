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
    getEmployees() {
        return this.employees;
    }
    /**
     * Returns the employee object corresponding to a specified id.
     * @param employeeId Id of a employee.
     * @returns Specified employee.
     */
    getEmployee(employeeId) {
        return this.employees.find((employee) => employee.getId() === employeeId);
    }
    /**
     * Returns the employee object corresponding to a specified PersonnalNumber.
     * @param employeePersonnalNumber PersonnalNumber of a employee.
     * @returns Specified employee.
     */
    getEmployeeByPersonnalNumber(employeePersonnalNumber) {
        return this.employees.find((employee) => employee.getPersonnalNumber() === employeePersonnalNumber);
    }
    /**
     * Add an employee.
     * @param employee Employee to be added.
     */
    addEmployee(employee) {
        if (this.employees.find((emp) => emp.getId() === employee.getId()))
            throw new Error("This employee is already in the company.");
        if (this.employees.find((emp) => emp.getEmail() === employee.getEmail()))
            throw new Error("This employee has not a unique email : another employee in the company already has this email.");
        if (this.employees.find((emp) => emp.getPersonnalNumber() === employee.getPersonnalNumber()))
            throw new Error("This employee has not a unique personnal number : another employee in the company already has this personnal number (matricule).");
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
     * @param employee Employee to be deleted.
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
     * Returns a material corresponding to the specified id.
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
    addMaterial(material) {
        if (!Material_1.Material)
            return;
        if (this.materials.find((mat) => mat.getId() === material.getId()))
            throw new Error("This material is already in the company.");
        if (this.materials.find((mat) => mat.getReference() === material.getReference()))
            throw new Error("This material has not a unique reference : another material in the company already has this reference.");
        this.materials.push(material);
    }
    /**
     * Remove a material.
     * @param material Material to be deleted.
     */
    removeMaterialCascade(material) {
        this.materials.splice(this.materials.indexOf(material), 1);
        // Remove the rentals (active or not) associaed with the deleted material
        this.rentals = this.rentals.filter(rental => rental.getMaterial() != material);
    }
    /**
     * Try to remove a specific material from the materials list.
     * If this material already has a rental, the deletion is not performed except if the force paramater is set to true.
     * In this case, the material will be deleted, the active rental and the rentals history also.
     * @param material Material to be deleted.
     * @param force Force the removal of the material, even if there are active rentals.
     */
    removeMaterial(material, force = false) {
        if (this.hasActiveRental(material) && !force)
            throw new Error("Can't remove material with an active location.");
        this.removeMaterialCascade(material);
    }
    /**
     * Get the rentals list of this company.
     * @returns A list of rentals.
     */
    getRentals() {
        return this.rentals;
    }
    /**
     * Return the list of rentals for a specific material.
     * @param materialId The material identifier of wich we want to retrieve the rentals
     * @returns A list of rentals sorted by ending date.
     */
    getRentalsForMaterial(materialId) {
        return this.rentals
            .filter(rental => rental.getMaterial()?.getId() === materialId)
            .sort((a, b) => new Date(b.getEndingDate()).getTime() - new Date(a.getEndingDate()).getTime());
    }
    /**
     * Return the list of rentals for a specific employee.
     * @param employeeId The employee identifier of wich we want to retrieve the rentals
     * @returns A list of rentals sorted by ending date.
     */
    getRentalsForEmployee(employeeId) {
        return this.rentals
            .filter(rental => rental.getEmployee()?.getId() === employeeId)
            .sort((a, b) => new Date(b.getEndingDate()).getTime() - new Date(a.getEndingDate()).getTime());
    }
    /**
     * Rent a material only if the given material if available during this period.
     * @param rental Rent to be added.
     */
    addRental(rental) {
        if (!this.employees.find(e => rental.getEmployee() == e))
            throw new Error("Employee doesn't exist in database");
        if (!this.materials.find(m => rental.getMaterial() == m))
            throw new Error("Material doesn't exist in database");
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
                    throw new Error("Could not add rental, someone is already renting this material during this period : " + r.getStartingDate() + "  rental add : " + rental.getStartingDate() + "-" + rental.getEndingDate());
            }
        });
        this.rentals.push(rental);
    }
    /**
     * Remove a rental from a list.
     * @param rental Rental to be deleted.
     */
    removeRental(rental) {
        this.rentals = this.rentals.filter(r => r !== rental);
    }
    /**
     * Remove a rental from a list.
     * @param rentalId The rental id to be deleted.
     */
    removeRentalById(rentalId) {
        this.rentals = this.rentals.filter(rental => rental.getId() !== rentalId);
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
