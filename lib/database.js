"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Company_instances, _Company_employes, _Company_materiels, _Company_locations, _Company_removeEmployeCascade, _Company_removeMaterielCascade;
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
        _Company_employes.set(this, void 0);
        _Company_materiels.set(this, void 0);
        _Company_locations.set(this, void 0);
        __classPrivateFieldSet(this, _Company_employes, [], "f");
        __classPrivateFieldSet(this, _Company_materiels, [], "f");
        __classPrivateFieldSet(this, _Company_locations, [], "f");
    }
    getEmployes() {
        return __classPrivateFieldGet(this, _Company_employes, "f");
    }
    addEmploye(employe) {
        __classPrivateFieldGet(this, _Company_employes, "f").push(employe);
    }
    removeEmploye(employe, cascade = false) {
        if (cascade) {
            __classPrivateFieldGet(this, _Company_instances, "m", _Company_removeEmployeCascade).call(this, employe);
        }
        else if (__classPrivateFieldGet(this, _Company_locations, "f").find((location) => location.employe == employe)) {
            // Can't remove employee with a dangling reference whithin locations.
            throw "Can't delete the employe while a location is active";
        }
        __classPrivateFieldSet(this, _Company_employes, __classPrivateFieldGet(this, _Company_employes, "f").filter(e => e != employe), "f");
    }
    getMateriels() {
        return __classPrivateFieldGet(this, _Company_materiels, "f");
    }
    addMateriels(materiel) {
        __classPrivateFieldGet(this, _Company_materiels, "f").push(materiel);
    }
    removeMateriel(materiel, cascade = false) {
        if (cascade) {
            __classPrivateFieldGet(this, _Company_instances, "m", _Company_removeMaterielCascade).call(this, materiel);
        }
        else if (__classPrivateFieldGet(this, _Company_locations, "f").find((location) => location.materiel == materiel)) {
            // Can't remove employee with a dangling reference whithin locations.
            throw "Can't delete the materiel while a location is active";
        }
        __classPrivateFieldSet(this, _Company_materiels, __classPrivateFieldGet(this, _Company_materiels, "f").filter(m => m != materiel), "f");
    }
    getLocations() {
        return __classPrivateFieldGet(this, _Company_locations, "f");
    }
    addLocation(location) {
        if (!__classPrivateFieldGet(this, _Company_employes, "f").find(e => location.employe == e)) {
            throw "Employee doesn't exist in database";
        }
        if (!__classPrivateFieldGet(this, _Company_materiels, "f").find(m => location.materiel == m)) {
            throw "Materiel doesn't exist in database";
        }
        __classPrivateFieldGet(this, _Company_locations, "f").push(location);
    }
    removeLocation(location) {
        __classPrivateFieldSet(this, _Company_locations, __classPrivateFieldGet(this, _Company_locations, "f").filter(l => l == location), "f");
    }
}
exports.Company = Company;
_Company_employes = new WeakMap(), _Company_materiels = new WeakMap(), _Company_locations = new WeakMap(), _Company_instances = new WeakSet(), _Company_removeEmployeCascade = function _Company_removeEmployeCascade(employe) {
    throw new Error("Function not implemented");
}, _Company_removeMaterielCascade = function _Company_removeMaterielCascade(materiel) {
    __classPrivateFieldSet(this, _Company_locations, __classPrivateFieldGet(this, _Company_locations, "f").filter(location => location.materiel == materiel), "f");
};
class Database {
    constructor() {
        this.company = new Company();
    }
    static load(path = "db.json") {
        try {
            let content = (0, fs_1.readFileSync)(path);
            return JSON.parse(content.toString());
        }
        catch (error) {
            console.log(`Can't load database: ${error}, use an empty database instead.`);
            return new Database();
        }
    }
    static save(path = "db.json") {
        let json = JSON.stringify(this);
        (0, fs_1.writeFileSync)(path, json);
    }
}
exports.Database = Database;
