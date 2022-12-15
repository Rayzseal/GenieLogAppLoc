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
            let content = (0, fs_1.readFileSync)(path);
            let company = JSON.parse(content.toString());
            company = Object.assign(new Company_1.Company(), company);
            company.remapClasses();
            return new Database(company);
        }
        catch (error) {
            console.log(`Can't load database: ${error}, use an empty database instead.`);
            return new Database(new Company_1.Company());
        }
    }
    saveToFile(path = DB_FILE) {
        let json = JSON.stringify(this.company);
        (0, fs_1.writeFileSync)(path, json);
    }
}
exports.Database = Database;
