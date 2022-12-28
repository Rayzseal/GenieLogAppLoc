"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const crypto_1 = require("crypto");
const utils_1 = require("./utils");
const fieldsSize = {
    title: { min: 1, max: 30 },
    version: { min: 2, max: 15 },
    reference: 5,
    phoneNumber: 10
};
/**
 * Class to create a material.
 */
class Material {
    /**
     * Constructor with parameters of a material.
     * @param obj
     * @param obj.id The identifier of the material.
     * @param obj.title Tile of a material.
     * @param obj.version Version of a material.
     * @param obj.reference Reference of a material.
     * @param obj.picture Picture of a material.
     * @param obj.phoneNumber Phone number of a material.
     */
    constructor(obj) {
        this.setId(obj.id);
        this.setTitle(obj.title);
        this.setVersion(obj.version);
        this.setReference(obj.reference);
        this.setPicture(obj.picture);
        this.setPhoneNumber(obj.phoneNumber);
    }
    /**
     * Getter on the id.
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
    setTitle(title = "") {
        title = title.trim();
        if (!title || title === "")
            throw new Error("Title should not be empty");
        if (title.length < fieldsSize.title.min || title.length > fieldsSize.title.max)
            throw new Error(`Title field length is not between ${fieldsSize.title.min} and ${fieldsSize.title.max} characters : size is ${title.length}`);
        if (!new RegExp(/[^a-zA-Z\d\s:\u00C0-\u00FF]/g).test(title))
            this.title = title;
        else
            throw new Error("Title is not alphanumeric");
    }
    /**
     * Setter on version.
     * @param version new version.
     */
    setVersion(version = "") {
        version = version.trim();
        if (!version || version === "")
            throw new Error("Version should not be empty");
        if (version.length < fieldsSize.version.min || version.length > fieldsSize.version.max)
            throw new Error(`Version field length is not between ${fieldsSize.version.min} and ${fieldsSize.version.max} characters : size is ${version.length}`);
        if (!new RegExp(/[^a-zA-Z\d\s:\u00C0-\u00FF]/g).test(version))
            this.version = version;
        else
            throw new Error("Version is not alphanumeric");
    }
    /**
     * Setter on reference.
     * @param reference setter on reference.
     */
    setReference(reference = "") {
        reference = reference.trim();
        if (reference.length !== fieldsSize.reference)
            throw new Error(`"Reference" field size is different from ${fieldsSize.reference} : current size is ${reference.length}`);
        if (/^(AN|AP|XX)(\d){3}$/.test(reference))
            this.reference = reference;
        else
            throw new Error("Reference should start by either AN for android or AP for apple or XX for other and end with 3 numbers");
    }
    /**
     * Setter on picture.
     * @param picture new picture.
     */
    setPicture(picture) {
        if (!picture)
            return;
        picture = picture.trim();
        if (new RegExp('^(http://|https://)[A-Za-z0-9-_./]*(\.jpg|\.png)$').test(picture))
            this.picture = picture;
        else
            throw new Error("A link should begin with either http:// or https:// and finish .jpg or .png");
    }
    /**
     * Setter on phone number.
     * @param phoneNumber new phone number.
     */
    setPhoneNumber(phoneNumber) {
        if (!phoneNumber)
            return;
        phoneNumber = phoneNumber.trim();
        if (phoneNumber.length !== fieldsSize.phoneNumber)
            throw new Error(`Phone number field size is different of ${fieldsSize.phoneNumber} : size is ${phoneNumber.length}`);
        if (/^[0-9]/.test(phoneNumber))
            this.phoneNumber = phoneNumber;
        else
            throw new Error(`PhoneNumber should only contains ${fieldsSize.phoneNumber} numbers`);
    }
    /**
     * Setter on material id.
     * @param id the id to give to this material. This is need to respect the uuidv4 format. Otherwise, the material will be given a random uuid.
     * @private
     */
    setId(id) {
        if (id && (0, utils_1.isUUIDFormat)(id))
            this.id = id;
        else
            this.id = (0, crypto_1.randomUUID)();
    }
}
exports.Material = Material;
