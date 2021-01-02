/**
 * Helper method to store events in the local storage of the browser
 * @param eventList
 * @param year
 * @param month
 * @param day
 */
export const storeDayEvents = (eventList: any[], year: number, month: number, day: number): void => (
    window.localStorage.setItem(`${year}-${month}-${day}`, JSON.stringify(eventList))
);

/**
 * Helper method to receive event for a given day (from localstorage)
 * @param year
 * @param month
 * @param day
 */
export const getDayEvents = (year: number, month: number, day: number) =>
    window.localStorage.getItem(`${year}-${month}-${day}`);
