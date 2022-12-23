/**
 * Check if a given date is between 2 dates.
 * @param toBeChecked Date to be checked.
 * @param beginDate Begin date of interval.
 * @param endDate End date of interval.
 * @returns True if the date is in the interval, false otherwise.
 */
export function dateInInterval(toBeChecked: Date, beginDate: Date, endDate: Date): boolean {
	return beginDate <= toBeChecked && toBeChecked <= endDate;
}

export function isUUIDFormat(toCheck: string) {
	return new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(toCheck);
}