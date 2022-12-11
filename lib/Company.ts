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
    throw new Error("Function not implemented");
  }

  removeEmployee(employee: Employee, cascade: boolean = false) {
    if (cascade) {
      this.removeEmployeeCascade(employee);
    } else if (this.rentals.find((rental) => rental.employee == employee)) {
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
    this.rentals = this.rentals.filter(rental => rental.material == materiel);
  }

  removeMaterial(material: Material, cascade: boolean = false) {
    if (cascade) {
      this.removeMaterialCascade(material);
    } else if (this.rentals.find((rental) => rental.material == material)) {
      // Can't remove employee with a dangling reference whithin locations.
      throw "Can't delete the materiel while a location is active";
    }

    this.materials = this.materials.filter(m => m != material);
  }

  getRentals(): ReadonlyArray<Rental> {
    return this.rentals;
  }

  addRental(rental: Rental) {
    if (!this.employees.find(e => rental.employee == e)) {
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
    this.employees = this.employees.map((e: any) => e instanceof Employee ? e
      : new Employee(
        e.name, e.surname, e.password, e.email, e.idNumber
      ));

    this.materials = this.materials.map((m: any) => m instanceof Material ? m
      : new Material(
        m.title, m.version, m.reference, m.picture, m.phoneNumber
      ));

    this.rentals = this.rentals.map((r: any) => r instanceof Rental ? r
      : new Rental(
        this.employees.find(employee => employee.getId() == r.employee.idNumber) as Employee,
        this.materials.find(material => material.getId() == r.material.idNumber) as Material,
        new Date(r.dateDebut),
        (r.dateFin != null) ? new Date(r.dateFin) : null
      ));
  }
}
