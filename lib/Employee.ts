import genUniqueId from './utils';

/**
 * Class to create an employee. 
 */
export class Employee {
	private id: string;
	private name: string;
	private surname: string;
	private email: string;
	private password: string;
	private role: boolean;
	private idNumber: string;

	/**
	 * Constructor with parameters of an employee. 
	 * @param name Name of an employee. 
	 * @param surname Surname of an employee. 
	 * @param password Password of an employee. 
	 * @param email Email of an employee. 
	 * @param idNumber Employee number. 
	 */
	public constructor(obj: {
		id?: string,
		name: string,
		surname: string,
		email: string,
		role?: boolean,
		password: string,
		idNumber: string
	}) {
		this.id = obj.id ?? genUniqueId();
		this.role = obj.role ?? false;
		this.setName(obj.name);
		this.setSurname(obj.surname);
		this.setPassword(obj.password);
		this.setEmail(obj.email);
		this.setIdNumber(obj.idNumber);
	}

	/**
	 * Getter on id.
	 * @returns automaticly generated id of user.
	 */
	public getId() {
		return this.id;
	}

	/**
	 * Getter on name.
	 * @returns name of user.
	 */
	public getName() {
		return this.name;
	}

	/**
	 * Getter on surname.
	 * @returns surname of user.
	 */
	public getSurname() {
		return this.surname;
	}

	/**
	 * Getter on email.
	 * @returns email of user.
	 */
	public getEmail() {
		return this.email;
	}

	/**
	 * Getter on role.
	 * @returns role of user (either 1 for admin or 0 for simple user).
	 */
	public getRole() {
		return this.role;
	}

	/**
	 * Getter on idNumer.
	 * @returns idNumber of user.
	 */
	public getIdNumber() {
		return this.idNumber;
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
			throw new Error("Email is incorrect");
	}

	/**
	 * Setter on role.
	 * @param role new role.
	 */
	public setRole(role: boolean) {
		this.role = role;
	}

	/**
	 * Setter on idNumber.
	 * @param idNumber new idNumber.
	 */
	public setIdNumber(idNumber: string) {
		if (/^[a-zA-Z0-9]{7}$/.test(idNumber))
			this.idNumber = idNumber;
		else
			throw new Error("IdNumber is not alphanumeric");
	}
}