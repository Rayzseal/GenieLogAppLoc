import { Employee } from "./Employee";
import { Material } from "./Material";
import genUniqueId from './utils';

export class Rental {
	private id: string;
	private employee: Employee;
	private material: Material;
	private startingDate: Date;
	private endingDate: Date | null;

	constructor(obj: {
		id: string,
		employee: Employee,
		material: Material,
		startingDate: Date,
		endingDate: Date | null
	}) {
		this.id = genUniqueId();
		this.employee = obj.employee;
		this.material = obj.material;
		this.startingDate = obj.startingDate;
		this.endingDate = obj.endingDate;
	}

	getMaterial(): Material {
		return this.material;
	}
}