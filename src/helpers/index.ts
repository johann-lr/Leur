export const storeDayEvents = (eventList, year, month, day) => (
    window.localStorage.setItem(`${year}-${month}-${day}`, JSON.stringify(eventList))
);
export const getDayEvents = (year, month, day) => window.localStorage.getItem(`${year}-${month}-${day}`);
