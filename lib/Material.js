"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const utils_1 = require("./utils");
/**
 * Class to create a material.
 */
class Material {
    /**
     * Constructor with parameters of a material.
     * @param obj {Object}
     * @param obj.title Tile of a material.
     * @param obj.version Version of a material.
     * @param obj.reference Reference of a material.
     * @param obj.picture Picture of a material.
     * @param obj.phoneNumber Phone number of a material.
     */
    constructor(obj) {
        this.id = obj.id ?? (0, utils_1.genUniqueId)();
        this.setTitle(obj.title);
        this.setVersion(obj.version);
        this.setReference(obj.reference);
        this.setPicture(obj.picture);
        this.setPhoneNumber(obj.phoneNumber);
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
        if (!title || title.trim() === "")
            throw new Error("Title should not be empty");
        if (/^[a-zA-Z0-9 ._-]{1,30}$/.test(title))
            this.title = title;
        else
            throw new Error("Title is not alphanumeric");
    }
    /**
     * Setter on version.
     * @param version new version.
     */
    setVersion(version) {
        if (/^[a-zA-Z0-9 ._-]{1,30}$/.test(version))
            this.version = version;
        else
            throw new Error("Version is not alphanumeric");
    }
    /**
     * Setter on reference.
     * @param reference setter on reference.
     */
    setReference(reference) {
        if (/^(AN|AP|XX){1}(\d){3}$/.test(reference))
            this.reference = reference;
        else
            throw new Error("Reference should start by either AN for android or AP for apple or XX for other and end with 3 numbers");
    }
    /**
     * Setter on picture.
     * @param picture new picture.
     */
    setPicture(picture) {
        if (!picture || new RegExp('^(http://|https://){1}[A-Za-z0-9-_./]*(\.jpg|\.png){1}$').test(picture))
            this.picture = picture;
        else
            throw new Error("A link should begin with either http:// or https:// and finish .jpg or .png");
    }
    /**
     * Setter on phone number.
     * @param phoneNumber new phone number.
     */
    setPhoneNumber(phoneNumber) {
        if (!phoneNumber || /^[0-9]{10}$/.test(phoneNumber))
            this.phoneNumber = phoneNumber;
        else
            throw new Error("PhoneNumber should contains 10 numbers");
    }
}
exports.Material = Material;
