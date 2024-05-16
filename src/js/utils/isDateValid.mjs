/**
 * Checks if a given date is valid by comparing it to the current date.
 * @param {Date | string | number} date - The date to be checked. It can be a Date object, a string representing a date, or a timestamp.
 * @returns {boolean} True if the given date is valid (after the current date), otherwise false.
 */
export function isDateValid(date) {
    const expirationDate = new Date(date);
    const currentDate = new Date();
    return ((expirationDate.getTime() - currentDate.getTime()) > 0 );
}