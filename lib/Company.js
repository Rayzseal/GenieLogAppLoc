"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Company_instances, _Company_removeEmployeeCascade, _Company_removeMaterialCascade;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
class Company {
    constructor() {
        _Company_instances.add(this);
        this.employees = [];
        this.materials = [];
        this.rentals = [];
    }
    getEmployes() {
        return this.employees;
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    removeEmployee(employee, cascade = false) {
        if (cascade) {
            __classPrivateFieldGet(this, _Company_instances, "m", _Company_removeEmployeeCascade).call(this, employee);
        }
        else if (this.rentals.find((rental) => rental.employee == employee)) {
            // Can't remove employee with a dangling reference whithin locations.
            throw "Can't delete the employe while a location is active";
        }
        this.employees = this.employees.filter(e => e != employee);
    }
    getMaterials() {
        return this.materials;
    }
    addMaterials(material) {
        this.materials.push(material);
    }
    removeMaterial(material, cascade = false) {
        if (cascade) {
            __classPrivateFieldGet(this, _Company_instances, "m", _Company_removeMaterialCascade).call(this, material);
        }
        else if (this.rentals.find((rental) => rental.material == material)) {
            // Can't remove employee with a dangling reference whithin locations.
            throw "Can't delete the materiel while a location is active";
        }
        this.materials = this.materials.filter(m => m != material);
    }
    getRentals() {
        return this.rentals;
    }
    addRental(rental) {
        if (!this.employees.find(e => rental.employee == e)) {
            throw "Employee doesn't exist in database";
        }
        if (!this.materials.find(m => rental.getMaterial() == m)) {
            throw "Materiel doesn't exist in database";
        }
        this.rentals.push(rental);
    }
    removeRental(rental) {
        this.rentals = this.rentals.filter(l => l == rental);
    }
}
exports.Company = Company;
_Company_instances = new WeakSet(), _Company_removeEmployeeCascade = function _Company_removeEmployeeCascade(employee) {
    throw new Error("Function not implemented");
}, _Company_removeMaterialCascade = function _Company_removeMaterialCascade(materiel) {
    this.rentals = this.rentals.filter(rental => rental.material == materiel);
};
