import {readFileSync, writeFileSync} from "fs";
import {Company} from "./Company";

export class Database {
	private readonly company: Company;

	constructor(company: Company) {
		this.company = company;
	}

	static load(path: string = "db.json") {
		try {
			let content = readFileSync(path);
			let company: Company = JSON.parse(content.toString());

			return new Database(Object.assign(new Company(), company));
		} catch (error) {
			console.log(`Can't load database: ${error}, use an empty database instead.`);

			return new Database(new Company());
		}
	}

	save(path: string = "db.json") {
		let json = JSON.stringify(this.company);
		writeFileSync(path, json);
	}
}
