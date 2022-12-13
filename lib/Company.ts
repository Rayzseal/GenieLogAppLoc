import {Employee} from "./Employee";
import {Material} from "./Material";
import {Rental} from "./Rental";

export class Company {
	private employees: Array<Employee>;
	private materials: Array<Material>;
	private rentals: Array<Rental>;

	constructor() {
		this.employees = [];
		this.materials = [];
		this.rentals = [];
	}

	getEmployes(): ReadonlyArray<Employee> {
		return this.employees;
	}

	addEmployee(employee: Employee) {
		this.employees.push(employee);
	}

	private removeEmployeeCascade(employee: Employee) {
		this.rentals = this.rentals.filter(rental => rental.getEmployee() == employee);
	}

	removeEmployee(employee: Employee, cascade: boolean = false) {
		if (cascade) {
			this.removeEmployeeCascade(employee);
		} else if (this.rentals.find((rental) => rental.getEmployee() == employee)) {
			// Can't remove employee with a dangling reference whithin locations.
			throw "Can't delete the employe while a location is active";
		}

		this.employees = this.employees.filter(e => e != employee);
	}

	getMaterials(): ReadonlyArray<Material> {
		return this.materials;
	}

	getMaterial(materialId: string): Material | undefined {
		return this.materials.find((material: Material) => material.getId() === materialId)
	}

	addMaterials(material: Material) {
		this.materials.push(material);
	}

	private removeMaterialCascade(materiel: Material) {
		this.rentals = this.rentals.filter(rental => rental.getMaterial() == materiel);
	}

	removeMaterial(material: Material, cascade: boolean = false) {
		if (cascade) {
			this.removeMaterialCascade(material);
		} else if (this.rentals.find((rental) => rental.getMaterial() == material)) {
			// Can't remove employee with a dangling reference whithin locations.
			throw "Can't delete the material while a location is active";
		}

		this.materials = this.materials.filter(m => m != material);
	}

	getRentals(): ReadonlyArray<Rental> {
		return this.rentals;
	}

	/**
	 * Rent a material only if the given material if available during this period.
	 * @param rental Rent to be added.
	 */
	addRental(rental: Rental) {
		if (!this.employees.find(e => rental.getEmployee() == e)) {
			throw "Employee doesn't exist in database";
		}

		if (!this.materials.find(m => rental.getMaterial() == m)) {
			throw "Material doesn't exist in database";
		}

		/**
		 * - The given starting date of rent in argument is not already during the period of rent for the same material of another rent.
		 * - The given ending date of rent in argument is not already during the period of rent for the same material of another rent.
		 * - Check if in all the rents already added to the list, if a rent have a starting date that will occurs between the interval of the rent to be added.
		 * - Check if in all the rents already added to the list, if a rent have a ending date that will occurs between the interval of the rent to be added.
		 */
		this.rentals.forEach(r => {
			if (r.getMaterial() == rental.getMaterial()) {
				if ((this.dateInInterval(rental.getStartingDate(), r.getStartingDate(), r.getEndingDate()))
					|| (this.dateInInterval(rental.getEndingDate(), r.getStartingDate(), r.getEndingDate()))
					|| (r.getStartingDate(), rental.getStartingDate(), rental.getEndingDate())
					|| (r.getEndingDate(), rental.getStartingDate(), rental.getEndingDate()))
					throw new Error("Could not add rental, someone is already renting this material during this period");
			}
		});

		this.rentals.push(rental);
	}

	removeRental(rental: Rental) {
		this.rentals = this.rentals.filter(l => l == rental);
	}

	/**
	 * Check if a given date is between 2 dates.
	 * @param toBeChecked Date to be checked.
	 * @param beginDate Begin date of interval.
	 * @param endDate End date of interval.
	 * @returns True if the date is in the interval, false otherwise.
	 */
	dateInInterval(toBeChecked: Date, beginDate: Date, endDate: Date): boolean {
		if (toBeChecked >= beginDate && toBeChecked <= endDate)
			return true;
		return false;
	}

	/**
	 * Check if a location is active.
	 * @param rental Given rent to be checked.
	 * @returns True if a location is active, false otherwise.
	 */
	locationIsActiveRental(rental: Rental): boolean {
		var date = new Date();
		if (this.dateInInterval(date, rental.getStartingDate(), rental.getEndingDate()))
			return true;
		return false
	}

	/**
	 * Check if a location is active for a given employee.
	 * @param emp Given employee to be checked.
	 * @returns True if a location is active, false otherwise.
	 */
	locationIsActiveEmployee(emp: Employee): boolean {
		this.rentals.forEach(r => {
			if (r.getEmployee() == emp) {
				this.locationIsActiveRental(r);
			}
		});
		return false;
	}

	/**
	 * Check if a location is active for a given material.
	 * @param mat Given material to be checked.
	 * @returns True if a location is active, false otherwise.
	 */
	locationIsActiveMaterial(mat: Material): boolean {
		this.rentals.forEach(r => {
			if (r.getMaterial() == mat) {
				this.locationIsActiveRental(r);
			}
		});
		return false;
	}

	remapClasses() {
		// This method basically remaps each Object into its corresponding class instance.

		this.employees = this.employees.map((e: any) => new Employee(e));
		this.materials = this.materials.map((m: any) => new Material(m));

		// Fix each rental.employee/material references.
		this.rentals = this.rentals.map((r: any) => {
			r.employee = this.employees.find(e => e.getPersonnalNumber() == r.employee.personnalNumber);
			r.material = this.materials.find(m => m.getId() == r.material.id);

			return new Rental(r);
		});
	}
}
