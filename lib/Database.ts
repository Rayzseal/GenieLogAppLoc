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
			const company = Object.assign(new Company(), JSON.parse(readFileSync(path).toString()));
			company.remapClasses();

			return new Database(company);
		} catch (error) {
			console.log(`Can't load database: ${error}, use an empty database instead.`);

			return new Database(new Company());
		}
	}

	/**
	 * Write the application datas into a file in order to keep those even when the app is turned off.
	 * @param path A specific path where to write the file to.
	 */
	saveToFile(path: string = DB_FILE) {
		writeFileSync(path, JSON.stringify(this.company, null, 4));
	}
}
