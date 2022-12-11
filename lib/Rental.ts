import {Employee} from "./Employee";
import {Material} from "./Material";
import genUniqueId from './utils';

export class Rental {
	private id: string;
	private employee: Employee;
	private material: Material;
	private startingDate: Date;
	private endingDate: Date | null;

	constructor(employe: Employee, materiel: Material, dateDebut: Date, dateFin: Date | null = null) {
		this.id = genUniqueId();
		this.employee = employe;
		this.material = materiel;
		this.startingDate = dateDebut;
		this.endingDate = dateFin;
	}

	getMaterial(): Material {
		return this.material;
	}
}