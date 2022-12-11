"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const utils_1 = __importDefault(require("./utils"));
/**
 * Class to create a material.
 */
class Material {
    /**
     * Constructor with parameters of a material.
     * @param title Tile of a material.
     * @param version Version of a material.
     * @param reference Reference of a material.
     * @param picture Picture of a material.
     * @param phoneNumber Phone number of a material.
     */
    constructor(title, version, reference, picture, phoneNumber) {
        this.id = (0, utils_1.default)();
        this.setTitle(title);
        this.setVersion(version);
        this.setReference(reference);
        this.setPicture(picture);
        this.setPhoneNumber(phoneNumber);
    }
    /**
     * Getter on Id.
     * @returns automaticly generated id of material.
     */
    getId() {
        return this.id;
    }
    /**
     * Getter on title.
     * @returns title of material.
     */
    getTitle() {
        return this.title;
    }
    /**
     * Getter on version.
     * @returns version of material.
     */
    getVersion() {
        return this.version;
    }
    /**
     * Getter on reference.
     * @returns reference of material.
     */
    getReference() {
        return this.reference;
    }
    /**
     * Getter on picture.
     * @returns picture of material.
     */
    getPicture() {
        return this.picture;
    }
    /**
     * Getter on phone number.
     * @returns phone number of material.
     */
    getPhoneNumber() {
        return this.phoneNumber;
    }
    /**
     * Setter on title.
     * @param title new title.
     */
    setTitle(title) {
        var regexp = new RegExp('^[a-zA-Z0-9 ._-]{1,30}$');
        var test = regexp.test(title);
        if (test)
            this.title = title;
        else
            throw new Error("Title is not alphanumeric");
    }
    /**
     * Setter on version.
     * @param version new version.
     */
    setVersion(version) {
        var regexp = new RegExp('^([a-zA-Z0-9 ._-]){3,15}$');
        var test = regexp.test(version);
        if (test)
            this.version = version;
        else
            throw new Error("Version is not alphanumeric");
    }
    /**
     * Setter on reference.
     * @param reference setter on reference.
     */
    setReference(reference) {
        var regexp = new RegExp('^(AN|AP|XX){1}(\d){3}$');
        var test = regexp.test(reference);
        if (test)
            this.reference = reference;
        else
            throw new Error("Reference should start by either AN for android or AP for apple or XX for other and end with 3 numbers");
    }
    /**
     * Setter on picture.
     * @param picture new picture.
     */
    setPicture(picture) {
        var regexp = new RegExp('^(http://|https://){1}[A-Za-z0-9-_./]*(\.jpg|\.png){1}$');
        var test = regexp.test(picture);
        if (test)
            this.picture = picture;
        else
            throw new Error("A link should begin with either http:// or https:// and finish .jpg or .png");
    }
    /**
     * Setter on phone number.
     * @param phoneNumber new phone number.
     */
    setPhoneNumber(phoneNumber) {
        var regexp = new RegExp('^[0-9]{10}$');
        var test = regexp.test(phoneNumber);
        if (test)
            this.phoneNumber = phoneNumber;
        else
            throw new Error("PhoneNumber should contains 10 numbers");
    }
}
exports.Material = Material;
