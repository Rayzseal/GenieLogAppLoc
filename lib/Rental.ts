import { Employee } from "./Employee";
import { Material } from "./Material";
import { dateInInterval, genUniqueId } from './utils';

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

	/**
	 * Check if a location is active.
	 * @returns False if no location is active right now for the specified rental.
	 */
	public isActive(): boolean {
		return dateInInterval(new Date(), this.startingDate, this.endingDate);
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

	getStartingDate(): Date {
		return this.startingDate;
	}

	getEndingDate(): Date {
		return this.endingDate;
	}

	setEmployee(e: Employee) {
		this.employee = e;
	}

	setMaterial(m: Material) {
		this.material = m;
	}

	setStartingDate(date: Date) {
		if (date instanceof String)
			date = new Date(date);

		if (this.endingDate != null && date > this.endingDate)
			throw new Error("Starting date should occurs before ending date");

		this.startingDate = date;
	}

	setEndingDate(date: Date) {
		if (date instanceof String)
			date = new Date(date);

		if (this.endingDate != null && date < this.endingDate)
			throw new Error("Ending date should occurs after begin date");

		this.endingDate = date;
	}
}