import {Employee} from "./Employee";
import {Material} from "./Material";
import {dateInInterval} from './utils';
import {randomUUID} from "crypto";
import frMsg from "../errorMessagesTranslations/fr.json";
import * as enMsg from "../errorMessagesTranslations/en.json";
const err = frMsg;


export class Rental {
	private readonly id: string;
	private employee: Employee;
	private material: Material;
	private startingDate: Date;
	private endingDate: Date;

	/**
	 * Constructor with parameters of a rental.
	 * @param obj
	 * @param obj.employee The employee that is renting/has rented a specific material
	 * @param obj.material The material rented by an employee for a certain duration.
	 * @param obj.startingDate The rental strarting date.
	 * @param obj.endingDate The rental ending date.
	 * @param databaseRemapMode=false If this object is a remap performed by the database.
	 * When true, it allows the creation to avoid certain constraints like those for the starting and ending rental dates that require a date not to be in the past while th databse have to store rentals even if those started in the past : the database restore could have caused problems .
	 */
	constructor(obj: {
		employee: Employee,
		material: Material,
		startingDate: Date | string,
		endingDate: Date | string
	}, databaseRemapMode: boolean = false) {
		this.id = randomUUID();
		this.setEmployee(obj.employee);
		this.setMaterial(obj.material);

		if (databaseRemapMode) {
			this.startingDate = typeof obj.startingDate === "string" ? new Date(obj.startingDate) : obj.startingDate;
			this.endingDate = typeof obj.endingDate === "string" ? new Date(obj.endingDate) : obj.endingDate;
		} else {
			this.setStartingDate(obj.startingDate);
			this.setEndingDate(obj.endingDate);
		}
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

	setStartingDate(date: Date | string) {
		if (typeof date === "string")
			date = new Date(date);

		if (date.getTime() < new Date().setHours(1, 0, 0, 0))
			throw new Error(err.rental_st_past);

		if (this.endingDate && date > this.endingDate)
			throw new Error(err.rental_stbfen);

		this.startingDate = date;
	}

	setEndingDate(date: Date | string) {
		if (typeof date === "string")
			date = new Date(date);

		if (date.getTime() < new Date().setHours(1, 0, 0, 0))
			throw new Error(err.rental_en_past);

		if (this.startingDate && date < this.startingDate)
			throw new Error(err.rental_enafst);

		this.endingDate = date;
	}
}