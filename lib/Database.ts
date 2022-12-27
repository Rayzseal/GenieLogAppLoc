import {readFileSync, writeFileSync} from "fs";
import {Company} from "./Company";

const DB_FILE = "db.json";

export class Database {
	private readonly company: Company;

	constructor(company: Company) {
		this.company = company;
	}

	static load(path: string = DB_FILE) {
		try {
			let content = readFileSync(path);
			let company: Company = JSON.parse(content.toString());
			company = Object.assign(new Company(), company);

			company.remapClasses();

			return new Database(company);
		} catch (error) {
			console.log(`Can't load database: ${error}, use an empty database instead.`);

			return new Database(new Company());
		}
	}

	saveToFile(path: string = DB_FILE) {
		writeFileSync(path, JSON.stringify(this.company, null, 4));
	}
}
