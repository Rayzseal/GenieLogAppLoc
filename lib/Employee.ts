export class Employee {
	private id: Number;
	private name: string;
	private firstName: string;
	private password: string;

	constructor(nom: string, prenom: string, password: string) {
		this.name = nom;
		this.firstName = prenom;
		this.password = password;
	}
}