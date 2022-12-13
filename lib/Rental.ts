import { Employee } from "./Employee";
import { Material } from "./Material";
import genUniqueId from './utils';

export class Rental {
	private id: string;
	private employee: Employee;
	private material: Material;
	private startingDate: Date;
	private endingDate: Date;

	constructor(obj: {
		id?: string,
		employee: Employee,
		material: Material,
		startingDate: Date,
		endingDate: Date
	}) {
		this.id = genUniqueId();
		this.setEmployee(obj.employee);
		this.setMaterial(obj.material);
		this.setStartingDate(obj.startingDate);
		this.setEndingDate(obj.endingDate);
	}

	getId(): string {
		return this.id;
	}

	getMaterial(): Material {
		return this.material;
	}

	getEmployee(): Employee {
		return this.employee;
	}

	getStartingDate() : Date {
		return this.startingDate;
	}

	getEndingDate() : Date {
		return this.endingDate;
	}

	setEmployee(e : Employee) {
		this.employee = e;
	}

	setMaterial(m : Material) {
		this.material = m;
	}

	setStartingDate(date: Date) {
		if (this.endingDate!=null) {
			if (this.endingDate > date) {
				this.startingDate = date;
			} else {
				throw new Error("Starting date should occurs before ending date");
			}
		} else {
			this.startingDate = date;
		}
	}

	setEndingDate(date : Date) {
		if (this.startingDate!=null) {
			if (this.startingDate < date) {
				this.endingDate = date;
			} else {
				throw new Error("Ending date should occurs after begin date");
			}
		} else {
			this.endingDate = date;
		}
	}
	
}