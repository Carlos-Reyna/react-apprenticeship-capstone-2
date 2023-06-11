import { MONTHS, OLDEST_APOD_VALID_DATE } from './const';

export function getselectedMonth(selectedMonth) {
  return MONTHS[selectedMonth];
}

export function getCurrentMonthDays(year, month) {
  // Get The number of days that the current month has 0 to represent the last day, and month+1 to force it to be the current month
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

export function getcurrentMonth(month) {
  return MONTHS[month.getMonth()];
}

export function getDatesObject(numberOfDays, date) {
  const arrayDates = [];

  const currentDate = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDay = new Date(year, month, 1);
  const priorMonth = month === 0 ? 11 : month - 1;
  const priorYear = month === 0 ? year - 1 : year;
  const priorNumberOfDays = getCurrentMonthDays(priorYear, priorMonth);
  const dateDiff = priorNumberOfDays - firstDay.getDay();

  if (dateDiff > 0) {
    for (let index = dateDiff; index < priorNumberOfDays; index += 1) {
      const isSelectable = false;
      const displayButton = false;
      const newDate = new Date(priorYear, priorMonth, index + 1);
      arrayDates.push({
        date: newDate,
        id: newDate.getTime(),
        isSelectable,
        displayButton,
      });
    }
  }

  for (let index = 0; index < numberOfDays; index += 1) {
    const newDate = new Date(year, month, index + 1);
    let isSelectable = !(newDate >= currentDate);
    const displayButton = true;
    isSelectable = newDate <= OLDEST_APOD_VALID_DATE ? false : isSelectable;
    arrayDates.push({
      date: newDate,
      id: newDate.getTime(),
      isSelectable,
      displayButton,
    });
  }

  return arrayDates;
}

export function getApodValidDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
