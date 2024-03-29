"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const Employee_1 = require("./Employee");
const Material_1 = require("./Material");
const Rental_1 = require("./Rental");
const fr_json_1 = __importDefault(require("../translations/fr.json"));
const err = fr_json_1.default;
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
     * @param employeeId Id of an employee.
     * @returns Specified employee.
     */
    getEmployee(employeeId) {
        return this.employees.find((employee) => employee.getId() === employeeId);
    }
    /**
     * Returns the employee object corresponding to a specified personnal number.
     * @param employeePersonnalNumber PersonnalNumber of an employee.
     * @returns Specified employee.
     */
    getEmployeeByPersonnalNumber(employeePersonnalNumber) {
        return this.employees.find((employee) => employee.getPersonnalNumber() === employeePersonnalNumber);
    }
    /**
     * Returns the employee object corresponding to a specified email.
     * @param employeeEmail Email of an employee.
     * @returns Specified employee.
     */
    getEmployeeByEmail(employeeEmail) {
        return this.employees.find((employee) => employee.getEmail() === employeeEmail);
    }
    /**
     * Add an employee.
     * @param employee Employee to be added.
     */
    addEmployee(employee) {
        if (this.employees.find((emp) => emp.getId() === employee.getId()))
            throw new Error(err.company_employee_twice);
        if (this.employees.find((emp) => emp.getEmail() === employee.getEmail()))
            throw new Error(err.company_unique_email);
        if (this.employees.find((emp) => emp.getPersonnalNumber() === employee.getPersonnalNumber()))
            throw new Error(err.company_unique_persoNb);
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
            throw new Error(err.company_delete_employee);
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
     * Returns a material corresponding to the specified reference.
     * @param reference The unique reference of the material to find.
     * @returns Specified material.
     */
    getMaterialByReference(reference) {
        return this.materials.find((material) => material.getReference() === reference);
    }
    /**
     * Add a material.
     * @param material Material to be added.
     */
    addMaterial(material) {
        if (!Material_1.Material)
            return;
        if (this.materials.find((mat) => mat.getId() === material.getId()))
            throw new Error(err.company_material_twice);
        if (this.materials.find((mat) => mat.getReference() === material.getReference()))
            throw new Error(err.company_material_reference);
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
            throw new Error(err.company_delete_material);
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
     * Returns a rental corresponding to the specified id.
     * @param rentalId Id of a rental.
     * @returns Specified rental.
     */
    getRental(rentalId) {
        return this.rentals.find((rental) => rental.getId() === rentalId);
    }
    /**
     * Return the list of rentals for a specific material.
     * @param materialId The material identifier of wich we want to retrieve the rentals
     * @returns A list of rentals sorted by ending date.
     */
    getRentalsForMaterial(materialId) {
        return this.rentals
            .filter(rental => rental.getMaterial()?.getId() === materialId)
            .sort((a, b) => new Date(a.getEndingDate()).getTime() - new Date(b.getEndingDate()).getTime());
    }
    /**
     * Return the list of rentals for a specific employee.
     * @param employeeId The employee identifier of wich we want to retrieve the rentals
     * @returns A list of rentals sorted by ending date.
     */
    getRentalsForEmployee(employeeId) {
        return this.rentals
            .filter(rental => rental.getEmployee()?.getId() === employeeId)
            .sort((a, b) => new Date(a.getEndingDate()).getTime() - new Date(b.getEndingDate()).getTime());
    }
    /**
     * Rent a material only if the given material if available during this period.
     * @param rental Rent to be added.
     */
    addRental(rental) {
        if (!this.employees.find(e => rental.getEmployee() == e))
            throw new Error(err.company_rental_employee);
        if (!this.materials.find(m => rental.getMaterial() == m))
            throw new Error(err.company_rental_material);
        /**
         * - The given starting date of rent in argument is not already during the period of rent for the same material of another rent.
         * - The given ending date of rent in argument is not already during the period of rent for the same material of another rent.
         * - Check if in all the rents already added to the list, if a rent have a starting date that will occur between the interval of the rent to be added.
         * - Check if in all the rents already added to the list, if a rent have an ending date that will occur between the interval of the rent to be added.
         */
        this.rentals.forEach(r => {
            if (r.getMaterial() == rental.getMaterial()) {
                if (((0, utils_1.dateInInterval)(rental.getStartingDate(), r.getStartingDate(), r.getEndingDate()))
                    || ((0, utils_1.dateInInterval)(rental.getEndingDate(), r.getStartingDate(), r.getEndingDate()))
                    || ((0, utils_1.dateInInterval)(r.getStartingDate(), rental.getStartingDate(), rental.getEndingDate()))
                    || ((0, utils_1.dateInInterval)(r.getEndingDate(), rental.getStartingDate(), rental.getEndingDate())))
                    throw new Error(err.company_rental_rented + ` ${r.getStartingDate().toLocaleDateString()}` + "to" + `${r.getEndingDate().toLocaleDateString()} (#${r.getId()})`);
            }
        });
        this.rentals.push(rental);
    }
    /**
     * Remove a rental from a list.
     * If this material already has a rental, the deletion is not performed except if the force paramater is set to true.
     * @param rental Rental to be deleted.
     * @param force Force the removal of the rental, even if this rental is active.
     */
    removeRental(rental, force = false) {
        if (!rental)
            return;
        if (rental.isActive() && !force)
            throw new Error(err.company_delete_rental);
        this.rentals = this.rentals.filter(r => r.getId() !== rental.getId());
    }
    /**
     * Remove a rental from a list.
     * @param rentalId The rental id to be deleted.
     * @param force Force the removal of the rental, even if this rental is active.
     */
    removeRentalById(rentalId, force = false) {
        this.removeRental(this.getRental(rentalId), force);
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
            throw new Error(err.company_type);
        }
    }
    /**
     * Remaps each database saved Object into its corresponding class instance.
     */
    remapClasses() {
        this.employees = this.employees.map((e) => new Employee_1.Employee(e, true));
        this.materials = this.materials.map((m) => new Material_1.Material(m));
        // Deduplicate and fix each rental.employee/material references.
        this.rentals = this.rentals.map((r) => {
            r.employee = this.employees.find(e => e.getPersonnalNumber() == r.employee.personnalNumber);
            r.material = this.materials.find(m => m.getId() == r.material.id);
            return new Rental_1.Rental(r, true);
        });
    }
}
exports.Company = Company;
