"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Company_instances, _Company_removeEmployeCascade, _Company_removeMaterielCascade;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.Company = exports.Location = exports.Materiel = exports.Employe = void 0;
const fs_1 = require("fs");
class Employe {
    constructor(nom, prenom, password) {
        this.nom = nom;
        this.prenom = prenom;
        this.password = password;
    }
}
exports.Employe = Employe;
class Materiel {
    constructor(nom, version, reference, photo, telelphone) {
        this.nom = nom;
        this.version = version;
        this.reference = reference;
        this.photo = photo;
        this.telelphone = telelphone;
    }
}
exports.Materiel = Materiel;
class Location {
    constructor(employe, materiel, dateDebut, dateFin = null) {
        this.employe = employe;
        this.materiel = materiel;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }
}
exports.Location = Location;
class Company {
    constructor() {
        _Company_instances.add(this);
        this.employes = [];
        this.materiels = [];
        this.locations = [];
    }
    getEmployes() {
        return this.employes;
    }
    addEmploye(employe) {
        this.employes.push(employe);
    }
    removeEmploye(employe, cascade = false) {
        if (cascade) {
            __classPrivateFieldGet(this, _Company_instances, "m", _Company_removeEmployeCascade).call(this, employe);
        }
        else if (this.locations.find((location) => location.employe == employe)) {
            // Can't remove employee with a dangling reference whithin locations.
            throw "Can't delete the employe while a location is active";
        }
        this.employes = this.employes.filter(e => e != employe);
    }
    getMateriels() {
        return this.materiels;
    }
    addMateriels(materiel) {
        this.materiels.push(materiel);
    }
    removeMateriel(materiel, cascade = false) {
        if (cascade) {
            __classPrivateFieldGet(this, _Company_instances, "m", _Company_removeMaterielCascade).call(this, materiel);
        }
        else if (this.locations.find((location) => location.materiel == materiel)) {
            // Can't remove employee with a dangling reference whithin locations.
            throw "Can't delete the materiel while a location is active";
        }
        this.materiels = this.materiels.filter(m => m != materiel);
    }
    getLocations() {
        return this.locations;
    }
    addLocation(location) {
        if (!this.employes.find(e => location.employe == e)) {
            throw "Employee doesn't exist in database";
        }
        if (!this.materiels.find(m => location.materiel == m)) {
            throw "Materiel doesn't exist in database";
        }
        this.locations.push(location);
    }
    removeLocation(location) {
        this.locations = this.locations.filter(l => l == location);
    }
}
exports.Company = Company;
_Company_instances = new WeakSet(), _Company_removeEmployeCascade = function _Company_removeEmployeCascade(employe) {
    throw new Error("Function not implemented");
}, _Company_removeMaterielCascade = function _Company_removeMaterielCascade(materiel) {
    this.locations = this.locations.filter(location => location.materiel == materiel);
};
class Database {
    constructor(company) {
        this.company = company;
    }
    static load(path = "db.json") {
        try {
            let content = (0, fs_1.readFileSync)(path);
            let company = JSON.parse(content.toString());
            return new Database(Object.assign(new Company(), company));
        }
        catch (error) {
            console.log(`Can't load database: ${error}, use an empty database instead.`);
            return new Database(new Company());
        }
    }
    save(path = "db.json") {
        let json = JSON.stringify(this.company);
        (0, fs_1.writeFileSync)(path, json);
    }
}
exports.Database = Database;
