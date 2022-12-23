import {randomUUID} from "crypto";

/**
 * Class to create an employee. 
 */
export class Employee {
	private readonly id: string;
	private name: string;
	private surname: string;
	private email: string;
	private password: string;
	private isAdmin: boolean;
	private personnalNumber: string;

	/**
	 * Constructor with parameters of an employee.
	 * @param obj {Object}
	 * @param obj.name Name of an employee.
	 * @param obj.surname Surname of an employee.
	 * @param obj.email Email of an employee.
	 * @param obj.isAdmin Wheter this user is admin or not.
	 * @param obj.password Password of an employee.
	 * @param obj.personnalNumber Employee number.
	 */
	public constructor(obj: {
		name: string,
		surname: string,
		email: string,
		isAdmin?: boolean,
		password: string,
		personnalNumber: string
	}) {
		this.id = randomUUID();
		this.isAdmin = obj.isAdmin ?? false;

		this.setName(obj.name);
		this.setSurname(obj.surname);
		this.setPassword(obj.password);
		this.setEmail(obj.email);
		this.setPersonnalNumber(obj.personnalNumber);
	}

	/**
	 * Getter on id.
	 * @returns automaticly generated id of user.
	 */
	public getId(): string {
		return this.id;
	}

	/**
	 * Getter on name.
	 * @returns name of user.
	 */
	public getName(): string {
		return this.name;
	}

	/**
	 * Getter on surname.
	 * @returns surname of user.
	 */
	public getSurname(): string {
		return this.surname;
	}

	/**
	 * Getter on email.
	 * @returns email of user.
	 */
	public getEmail(): string{
		return this.email;
	}

	/**
	 * Getter on isAdmin.
	 * @returns isAdmin of user (either 1 for admin or 0 for simple user).
	 */
	public getIsAdmin(): boolean {
		return this.isAdmin;
	}

	/**
	 * Getter on personnalNumber.
	 * @returns personnal number of user.
	 */
	public getPersonnalNumber(): string {
		return this.personnalNumber;
	}

	/**
	 * Setter on name.
	 * @param name new name.
	 */
	public setName(name: string) {
		if (/^[A-Za-z0-9 -]{1,30}$/.test(name))
			this.name = name;
		else
			throw new Error("Name is not alphanumeric");
	}

	/**
	 * Setter on surname.
	 * @param surname new surname.
	 */
	public setSurname(surname: string) {
		if (/^[A-Za-z0-9 -]{1,30}$/.test(surname))
			this.surname = surname;
		else
			throw new Error("Surname is not alphanumeric");
	}

	/**
	 * Setter on password.
	 * @param password new password.
	 */
	public setPassword(password: string) {
		if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password))
			this.password = password;
		else
			throw new Error("Password should contains at least 8 characters with one uppercase letter, one lowercase letter and one number.");

	}

	/**
	 * Setter on email.
	 * @param email new email.
	 */
	public setEmail(email: string) {
		if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
			this.email = email;
		else
			throw new Error("Email is incorrect.");
	}

	/**
	 * Setter on isAdmin.
	 * @param adminState new admin state.
	 */
	public setIsAdmin(adminState: boolean) {
		this.isAdmin = adminState;
	}

	/**
	 * Setter on personnalNumber.
	 * @param personnalNumber new personnalNumber.
	 */
	public setPersonnalNumber(personnalNumber: string) {
		if (/^[a-zA-Z0-9]{7}$/.test(personnalNumber))
			this.personnalNumber = personnalNumber;
		else
			throw new Error("Personnal number is not alphanumeric or 7 characters long. : "+personnalNumber);
	}
}