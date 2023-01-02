import {Employee} from "./Employee";
import {Material} from "./Material";
import {Rental} from "./Rental";
import frMsg from "../translations/fr.json";
import * as enMsg from "../translations/en.json";
const err = frMsg;

import {dateInInterval} from "./utils"

/**
 * The class company allows the user to add materials, employees and rentals using an existing employee & material.
 */
export class Company {
	private employees: Array<Employee>;
	private materials: Array<Material>;
	private rentals: Array<Rental>;

	constructor() {
		this.employees = [];
		this.materials = [];
		this.rentals = [];
	}

	/**
	 * List of employees.
	 * @returns A list of employees.
	 */
	getEmployees(): ReadonlyArray<Employee> {
		return this.employees;
	}

	/**
	 * Returns the employee object corresponding to a specified id.
	 * @param employeeId Id of an employee.
	 * @returns Specified employee.
	 */
	getEmployee(employeeId: String): Employee | undefined {
		return this.employees.find((employee: Employee) => employee.getId() === employeeId);
	}

	/**
	 * Returns the employee object corresponding to a specified personnal number.
	 * @param employeePersonnalNumber PersonnalNumber of an employee.
	 * @returns Specified employee.
	 */
	getEmployeeByPersonnalNumber(employeePersonnalNumber: String): Employee | undefined {
		return this.employees.find((employee: Employee) => employee.getPersonnalNumber() === employeePersonnalNumber);
	}

	/**
	 * Returns the employee object corresponding to a specified email.
	 * @param employeeEmail Email of an employee.
	 * @returns Specified employee.
	 */
	getEmployeeByEmail(employeeEmail: String): Employee | undefined {
		return this.employees.find((employee: Employee) => employee.getEmail() === employeeEmail);
	}

	/**
	 * Add an employee.
	 * @param employee Employee to be added.
	 */
	addEmployee(employee: Employee) {
		if (this.employees.find((emp: Employee) => emp.getId() === employee.getId()))
			throw new Error(err.company_employee_twice);

		if (this.employees.find((emp: Employee) => emp.getEmail() === employee.getEmail()))
			throw new Error(err.company_unique_email);

		if (this.employees.find((emp: Employee) => emp.getPersonnalNumber() === employee.getPersonnalNumber()))
			throw new Error(err.company_unique_persoNb);

		this.employees.push(employee);
	}

	/**
	 * Remove an employee.
	 * @param employee Employee to be deleted.
	 */
	private removeEmployeeCascade(employee: Employee) {
		this.rentals = this.rentals.filter(rental => rental.getEmployee() != employee);
	}

	/**
	 * Deletes an employee from a list.
	 * @param employee Employee to be deleted.
	 * @param force Force the removal of the employee, even if there are active rentals.
	 */
	removeEmployee(employee: Employee, force: boolean = false) {
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
	getMaterials(): ReadonlyArray<Material> {
		return this.materials;
	}

	/**
	 * Returns a material corresponding to the specified id.
	 * @param materialId Id of a material.
	 * @returns Specified material.
	 */
	getMaterial(materialId: string): Material | undefined {
		return this.materials.find((material: Material) => material.getId() === materialId);
	}

	/**
	 * Returns a material corresponding to the specified reference.
	 * @param reference The unique reference of the material to find.
	 * @returns Specified material.
	 */
	getMaterialByReference(reference: string): Material | undefined {
		return this.materials.find((material: Material) => material.getReference() === reference);
	}

	/**
	 * Add a material.
	 * @param material Material to be added.
	 */
	addMaterial(material: Material) {
		if (!Material)
			return;

		if (this.materials.find((mat: Material) => mat.getId() === material.getId()))
			throw new Error(err.company_material_twice);

		if (this.materials.find((mat: Material) => mat.getReference() === material.getReference()))
			throw new Error(err.company_material_reference);

		this.materials.push(material);
	}

	/**
	 * Remove a material.
	 * @param material Material to be deleted.
	 */
	private removeMaterialCascade(material: Material) {
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
	removeMaterial(material: Material, force: boolean = false) {
		if (this.hasActiveRental(material) && !force)
			throw new Error(err.company_delete_material);

		this.removeMaterialCascade(material);
	}

	/**
	 * Get the rentals list of this company.
	 * @returns A list of rentals.
	 */
	getRentals(): ReadonlyArray<Rental> {
		return this.rentals;
	}

	/**
	 * Returns a rental corresponding to the specified id.
	 * @param rentalId Id of a rental.
	 * @returns Specified rental.
	 */
	getRental(rentalId: string): Rental | undefined {
		return this.rentals.find((rental: Rental) => rental.getId() === rentalId);
	}

	/**
	 * Return the list of rentals for a specific material.
	 * @param materialId The material identifier of wich we want to retrieve the rentals
	 * @returns A list of rentals sorted by ending date.
	 */
	getRentalsForMaterial(materialId: String): ReadonlyArray<Rental> {
		return this.rentals
			.filter(rental => rental.getMaterial()?.getId() === materialId)
			.sort((a: Rental, b: Rental) => new Date(a.getEndingDate()).getTime() - new Date(b.getEndingDate()).getTime());
	}

	/**
	 * Return the list of rentals for a specific employee.
	 * @param employeeId The employee identifier of wich we want to retrieve the rentals
	 * @returns A list of rentals sorted by ending date.
	 */
	getRentalsForEmployee(employeeId: String): ReadonlyArray<Rental> {
		return this.rentals
			.filter(rental => rental.getEmployee()?.getId() === employeeId)
			.sort((a: Rental, b: Rental) => new Date(a.getEndingDate()).getTime() - new Date(b.getEndingDate()).getTime());
	}

	/**
	 * Rent a material only if the given material if available during this period.
	 * @param rental Rent to be added.
	 */
	addRental(rental: Rental) {
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
				if ((dateInInterval(rental.getStartingDate(), r.getStartingDate(), r.getEndingDate()))
					|| (dateInInterval(rental.getEndingDate(), r.getStartingDate(), r.getEndingDate()))
					|| (dateInInterval(r.getStartingDate(), rental.getStartingDate(), rental.getEndingDate()))
					|| (dateInInterval(r.getEndingDate(), rental.getStartingDate(), rental.getEndingDate())))
					throw new Error(err.company_rental_rented+` ${r.getStartingDate().toLocaleDateString()}`+"to"+`${r.getEndingDate().toLocaleDateString()} (#${r.getId()})`);
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
	removeRental(rental: Rental | undefined, force: boolean = false) {
		if (!rental)
			return ;

		if (rental.isActive() && !force)
			throw new Error(err.company_delete_rental);

		this.rentals = this.rentals.filter(r => r.getId() !== rental.getId());
	}

	/**
	 * Remove a rental from a list.
	 * @param rentalId The rental id to be deleted.
	 * @param force Force the removal of the rental, even if this rental is active.
	 */
	removeRentalById(rentalId: string, force: boolean = false) {
		this.removeRental(this.getRental(rentalId), force);
	}

	/**
	 * Check if a location is active for a given employee or material.
	 * @param referee Given employee or material to be checked.
	 * @returns False if no location is active right now for the specified employee.
	 */
	hasActiveRental(referee: Employee | Material): boolean {
		if (referee instanceof Employee) {
			// Check if the employee has an active rental.
			return this.rentals.find(rental =>
				rental.isActive() && (rental.getEmployee() == referee)
			) != undefined;

		} else if (referee instanceof Material) {
			// Check if the material has an active rental.
			return this.rentals.find(rental =>
				rental.isActive() && (rental.getMaterial() == referee)
			) != undefined;

		} else {
			throw new Error(err.company_type);
		}
	}

	/**
	 * Remaps each database saved Object into its corresponding class instance.
	 */
	remapClasses() {
		this.employees = this.employees.map((e: any) => new Employee(e, true));
		this.materials = this.materials.map((m: any) => new Material(m));

		// Deduplicate and fix each rental.employee/material references.
		this.rentals = this.rentals.map((r: any) => {
			r.employee = this.employees.find(e => e.getPersonnalNumber() == r.employee.personnalNumber);
			r.material = this.materials.find(m => m.getId() == r.material.id);

			return new Rental(r, true);
		});
	}
}