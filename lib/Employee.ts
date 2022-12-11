import genUniqueId from './utils';

/**
 * Class to create an employee. 
 */
export class Employee {
	private id: string;
	private name: string;
	private surname: string;
	private email : string;
	private password: string;
	private role : boolean;
	private idNumber : string;

	/**
	 * Constructor with parameters of an employee. 
	 * @param name Name of an employee. 
	 * @param surname Surname of an employee. 
	 * @param password Password of an employee. 
	 * @param email Email of an employee. 
	 * @param idNumber Employee number. 
	 */
	constructor(name: string, surname: string, password: string, email : string, idNumber : string) {
		this.id = genUniqueId();
		this.role = false;
		this.setName(name);
		this.setSurname(surname);
		this.setPassword(password);
		this.setEmail(email);
		this.setIdNumber(idNumber);
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
	public setName(name : string) {
		var regexp = new RegExp('^[A-Za-z0-9 -]{1,30}$');
		var test = regexp.test(name);
		if (test)
			this.name = name;
		else
			throw new Error("Name is not alphanumeric");		
	}

	/**
	 * Setter on surname.
	 * @param surname new surname.
	 */
	public setSurname(surname : string) {
		var regexp = new RegExp('^[A-Za-z0-9 -]{1,30}$');
		var test = regexp.test(surname);
		if (test)
			this.surname = surname;
		else
			throw new Error("Surname is not alphanumeric");
	}

	/**
	 * Setter on password.
	 * @param password new password.
	 */
	public setPassword(password : string) {
		var regexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$');
		var test = regexp.test(password);
		if (test)
			this.password = password;
		else
			throw new Error("Password should contains at least 8 characters with one uppercase letter, one lowercase letter and one number.");
		
	}

	/**
	 * Setter on email.
	 * @param email new email.
	 */
	public setEmail(email : string) {
		var regexp = new RegExp('^[^@\s]+@[^@\s]+\.[^@\s]+$');
		var test = regexp.test(email);
		if (test)
			this.email = email;
		else
			throw new Error("Email is incorrect");
	}

	/**
	 * Setter on role.
	 * @param role new role.
	 */
	public setRole(role : boolean) {
		this.role = role;
	}

	/**
	 * Setter on idNumber.
	 * @param idNumber new idNumber.
	 */
	public setIdNumber(idNumber: string) {
		var regexp = new RegExp('^[a-zA-Z0-9]{7}$');
		var test = regexp.test(idNumber);
		if (test)
			this.idNumber = idNumber;
		else
			throw new Error("IdNumber is not alphanumeric");
	}
}