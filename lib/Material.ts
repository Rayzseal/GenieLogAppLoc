import { genUniqueId } from './utils';

/**
 * Class to create a material.
 */
export class Material {
	private id: string;
	private title: string;
	private version: string;
	private reference: string;
	private picture: string | undefined;
	private phoneNumber: string | undefined;

	/**
	 * Constructor with parameters of a material.
	 * @param obj {Object}
	 * @param obj.title Tile of a material.
	 * @param obj.version Version of a material.
	 * @param obj.reference Reference of a material.
	 * @param obj.picture Picture of a material.
	 * @param obj.phoneNumber Phone number of a material.
	 */
	constructor(obj: {
		id?: string;
		title: string;
		version: string;
		reference: string;
		picture?: string;
		phoneNumber?: string;
	}) {
		this.id = obj.id ?? genUniqueId();
		this.setTitle(obj.title);
		this.setVersion(obj.version);
		this.setReference(obj.reference);
		this.setPicture(obj.picture);
		this.setPhoneNumber(obj.phoneNumber);
	}

	/**
	 * Getter on Id.
	 * @returns automaticly generated id of material.
	 */
	public getId(): string {
		return this.id;
	}

	/**
	 * Getter on title.
	 * @returns title of material.
	 */
	public getTitle(): string {
		return this.title;
	}

	/**
	 * Getter on version.
	 * @returns version of material.
	 */
	public getVersion(): string {
		return this.version;
	}

	/**
	 * Getter on reference.
	 * @returns reference of material.
	 */
	public getReference(): string {
		return this.reference;
	}

	/**
	 * Getter on picture.
	 * @returns picture of material.
	 */
	public getPicture(): string | undefined {
		return this.picture;
	}

	/**
	 * Getter on phone number.
	 * @returns phone number of material.
	 */
	public getPhoneNumber(): string | undefined {
		return this.phoneNumber;
	}

	/**
	 * Setter on title.
	 * @param title new title.
	 */
	public setTitle(title: string) {
		if (!title || title.trim() === "")
			throw new Error("Title should not be empty");

		if (/^[a-zA-Z0-9 ._-]{1,30}$/.test(title))
			this.title = title;
		else
			throw new Error("Title is not alphanumeric");
	}

	/**
	 * Setter on version.
	 * @param version new version.
	 */
	public setVersion(version: string) {
		if (/^[a-zA-Z0-9 ._-]{1,30}$/.test(version))
			this.version = version;
		else
			throw new Error("Version is not alphanumeric");
	}

	/**
	 * Setter on reference.
	 * @param reference setter on reference.
	 */
	public setReference(reference: string) {
		if (/^(AN|AP|XX){1}(\d){3}$/.test(reference))
			this.reference = reference;
		else
			throw new Error("Reference should start by either AN for android or AP for apple or XX for other and end with 3 numbers");

	}

	/**
	 * Setter on picture.
	 * @param picture new picture.
	 */
	public setPicture(picture: string | undefined) {
		if (!picture || new RegExp('^(http://|https://){1}[A-Za-z0-9-_./]*(\.jpg|\.png){1}$').test(picture))
			this.picture = picture;
		else
			throw new Error("A link should begin with either http:// or https:// and finish .jpg or .png");
	}

	/**
	 * Setter on phone number.
	 * @param phoneNumber new phone number.
	 */
	public setPhoneNumber(phoneNumber: string | undefined) {
		if (!phoneNumber || /^[0-9]{10}$/.test(phoneNumber))
			this.phoneNumber = phoneNumber;
		else
			throw new Error("PhoneNumber should contains 10 numbers");
	}
}