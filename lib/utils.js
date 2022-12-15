"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateInInterval = void 0;
/**
 * Check if a given date is between 2 dates.
 * @param toBeChecked Date to be checked.
 * @param beginDate Begin date of interval.
 * @param endDate End date of interval.
 * @returns True if the date is in the interval, false otherwise.
 */
function dateInInterval(toBeChecked, beginDate, endDate) {
    return toBeChecked >= beginDate && toBeChecked <= endDate;
}
exports.dateInInterval = dateInInterval;
