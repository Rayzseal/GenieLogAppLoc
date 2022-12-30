import { readFileSync, writeFileSync } from "fs";
import { Company } from "./Company";

const DEFAULT_DB_FILE = "db.json";

export class Database {
	private readonly company: Company;
	private readonly path: undefined | string;

	constructor(company: Company, path: undefined | string = undefined) {
		this.company = company;
		this.path = path;
	}

	static load(path: string = DEFAULT_DB_FILE) {
		try {
			const company = Object.assign(new Company(), JSON.parse(readFileSync(path).toString()));
			company.remapClasses();

			return new Database(company, path);
		} catch (error) {
			console.log(`Can't load database: ${error}, use an empty database instead.`);

			return new Database(new Company());
		}
	}

	/**
	 * Write the application datas into a file in order to keep those even when the app is turned off.
	 * @param path A specific path where to write the file to.
	 */
	saveToFile() {
		if (this.path !== undefined) {
			writeFileSync(this.path, JSON.stringify(this.company, null, 4));
		}
	}
}
