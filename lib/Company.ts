import {Employee} from "./Employee";
import {Material} from "./Material";
import {Rental} from "./Rental";

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
  getEmployes(): ReadonlyArray<Employee> {
    return this.employees;
  }

  /**
   * Add an employee. 
   * @param employee Employee to be added. 
   */
  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  /**
   * Remove an employee. 
   * @param employee Employee to be deleted. 
   */
  private removeEmployeeCascade(employee: Employee) {
    this.rentals = this.rentals.filter(rental => rental.getEmployee() == employee);
  }

  /**
   * Deletes an employee from a list. 
   * @param material Employee to be deleted. 
   * @param cascade True if cascade, false otherwise. 
   */
  removeEmployee(employee: Employee, cascade: boolean = false) {
    if (cascade) {
      this.removeEmployeeCascade(employee);
    } 
    // Can't remove employee with an active location.
    this.locationIsActiveEmployee(employee);

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
   * Returns a materials corresponding to be specified id.
   * @param materialId Id of a material.
   * @returns Specified material. 
   */
  getMaterial(materialId: string): Material | undefined {
		return this.materials.find((material: Material) => material.getId() === materialId)
	}

  /**
   * Add a material.
   * @param material Material to be added. 
   */
  addMaterials(material: Material) {
    this.materials.push(material);
  }

  /**
   * Remove a material. 
   * @param material Material to be deleted. 
   */
  private removeMaterialCascade(material: Material) {
    this.rentals = this.rentals.filter(rental => rental.getMaterial() == material);      
  }

  /**
   * Deletes a material from a list. 
   * @param material Material to be deleted. 
   * @param cascade True if cascade, false otherwise. 
   */
  removeMaterial(material: Material, cascade: boolean = false) {
    if (cascade) {
      this.removeMaterialCascade(material);
    } 
    // Can't remove material with an active location.
    this.locationIsActiveMaterial(material)

		this.materials = this.materials.filter(m => m != material);
	}

  /**
   * List of rentals.
   * @returns A list of rentals.
   */
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
        || (this.dateInInterval(rental.getEndingDate(),r.getStartingDate(),r.getEndingDate()))
        || (this.dateInInterval(r.getStartingDate(), rental.getStartingDate(), rental.getEndingDate()))
        || (this.dateInInterval(r.getEndingDate(), rental.getStartingDate(), rental.getEndingDate())))
          throw new Error("Could not add rental, someone is already renting this material during this period r : "+r.getStartingDate()+"  rental add : "+rental.getStartingDate()+"-"+rental.getEndingDate());  
      }
    });

		this.rentals.push(rental);
	}

  /**
   * Remove a rental from a list. 
   * @param rental Rental to be deleted. 
   */
  removeRental(rental: Rental) {
    if (!this.locationIsActiveRental(rental))
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
   * @returns False if no location is active right now for the specified rental. 
   */
  locationIsActiveRental(rental: Rental): boolean {
    var date = new Date();
    if (this.dateInInterval(date,rental.getStartingDate(),rental.getEndingDate()))
      throw new Error("A location is active at that time."); 
    return false;
  }

  /**
   * Check if a location is active for a given employee.
   * @param emp Given employee to be checked.
   * @returns False if no location is active right now for the specified employee.
   */
  locationIsActiveEmployee(emp: Employee): boolean {
    var tmp: boolean = false;
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
   * @returns False if no location is active right now for the specified material.
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

let company = new Company;


let mat = new Material({
	title: "Samsung Galaxy S10",
	version: "V1.6",
	reference: "AN123",
	picture: "https://exemple/image.jpg",
	phoneNumber: "1234567890",
});
let mat2 = new Material({
	title: "Samsung Galaxy S10",
	version: "V1.6",
	reference: "AN123",
	picture: "https://exemple/image.jpg",
	phoneNumber: "1234567890",
});
let emp = new Employee({
	name: "Jean",
	surname: "Lasalle",
	email: "jean.lasalle@mail.com",
	role: false,
	password: "Azertyuiop1234",
	personnalNumber:"1234ABC",
});
//console.log(emp.getName());
let rental = new Rental({
	employee: emp,
	material: mat,
	startingDate: new Date("2022-12-10"),
	endingDate: new Date("2022-12-12"),
});
let rental2 = new Rental({
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