"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
class Rental {
    constructor(employe, materiel, dateDebut, dateFin = null) {
        this.employee = employe;
        this.material = materiel;
        this.startingDate = dateDebut;
        this.endingDate = dateFin;
    }
    getMaterial() {
        return this.material;
    }
}
exports.Rental = Rental;
