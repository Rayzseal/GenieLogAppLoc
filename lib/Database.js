"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs_1 = require("fs");
const Company_1 = require("./Company");
const DB_FILE = "db.json";
class Database {
    constructor(company) {
        this.company = company;
    }
    static load(path = DB_FILE) {
        try {
            const company = Object.assign(new Company_1.Company(), JSON.parse((0, fs_1.readFileSync)(path).toString()));
            company.remapClasses();
            return new Database(company);
        }
        catch (error) {
            console.log(`Can't load database: ${error}, use an empty database instead.`);
            return new Database(new Company_1.Company());
        }
    }
    /**
     * Write the application datas into a file in order to keep those even when the app is turned off.
     * @param path A specific path where to write the file to.
     */
    saveToFile(path = DB_FILE) {
        (0, fs_1.writeFileSync)(path, JSON.stringify(this.company, null, 4));
    }
}
exports.Database = Database;
