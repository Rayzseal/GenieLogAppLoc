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
