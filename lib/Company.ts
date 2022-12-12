import { Employee } from "./Employee";
import { Material } from "./Material";
import { Rental } from "./Rental";

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
      throw "Can't delete the materiel while a location is active";
    }

    this.materials = this.materials.filter(m => m != material);
  }

  getRentals(): ReadonlyArray<Rental> {
    return this.rentals;
  }

  addRental(rental: Rental) {
    if (!this.employees.find(e => rental.getEmployee() == e)) {
      throw "Employee doesn't exist in database";
    }

    if (!this.materials.find(m => rental.getMaterial() == m)) {
      throw "Materiel doesn't exist in database";
    }

    this.rentals.push(rental);
  }

  removeRental(rental: Rental) {
    this.rentals = this.rentals.filter(l => l == rental);
  }

  remapClasses() {
    // This method basically remaps each Object into its corresponding class instance.
    //TOOD verify here !! loop error
    
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
