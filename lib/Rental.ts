import {Employee} from "./Employee";
import {Material} from "./Material";

export class Rental {
	private id: Number;
	private employee: Employee;
	private material: Material;
	private startingDate: Date;
	private endingDate: Date | null;

	constructor(employe: Employee, materiel: Material, dateDebut: Date, dateFin: Date | null = null) {
		this.employee = employe;
		this.material = materiel;
		this.startingDate = dateDebut;
		this.endingDate = dateFin;
	}

	getMaterial(): Material {
		return this.material;
	}
}