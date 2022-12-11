"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
const utils_1 = __importDefault(require("./utils"));
class Rental {
    constructor(obj) {
        this.id = (0, utils_1.default)();
        this.employee = obj.employee;
        this.material = obj.material;
        this.startingDate = obj.startingDate;
        this.endingDate = obj.endingDate;
    }
    getMaterial() {
        return this.material;
    }
}
exports.Rental = Rental;
