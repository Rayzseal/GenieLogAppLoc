export class Material {
	private id: Number;
	private title: string;
	private version: string;
	private reference: string;
	private picture: string;
	private phoneNumber: string;

	constructor(nom: string, version: string, reference: string, photo: string, telelphone: string) {
		this.title = nom;
		this.version = version;
		this.reference = reference;
		this.picture = photo;
		this.phoneNumber = telelphone;
	}
}