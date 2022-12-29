"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUUIDFormat = exports.dateInInterval = void 0;
/**
 * Check if a given date is between 2 dates.
 * @param toBeChecked Date to be checked.
 * @param beginDate Begin date of interval.
 * @param endDate End date of interval.
 * @returns True if the date is in the interval, false otherwise.
 */
function dateInInterval(toBeChecked, beginDate, endDate) {
    const toBeCheckedDate = toBeChecked.setHours(1, 0, 0, 0); // reset the time
    return beginDate.getTime() <= toBeCheckedDate && toBeCheckedDate <= endDate.getTime();
}
exports.dateInInterval = dateInInterval;
function isUUIDFormat(toCheck) {
    return new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(toCheck);
}
exports.isUUIDFormat = isUUIDFormat;
