/**
 * Check if a given date is between 2 dates.
 * @param toBeChecked Date to be checked.
 * @param beginDate Begin date of interval.
 * @param endDate End date of interval.
 * @returns True if the date is in the interval, false otherwise.
 */
export function dateInInterval(toBeChecked: Date, beginDate: Date, endDate: Date): boolean {
	return toBeChecked >= beginDate && toBeChecked <= endDate;
}

export function genUniqueId(): string {
	const dateStr = Date
		.now()
		.toString(36); // convert num to base 36 and stringify

	const randomStr = Math
		.random()
		.toString(36)
		.substring(2, 8); // start at index 2 to skip decimal point

	return `${dateStr}-${randomStr}`;
}