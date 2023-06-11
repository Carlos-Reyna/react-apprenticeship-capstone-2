import React, { useEffect, useState } from 'react';
import {
  getCurrentMonthDays,
  getDatesObject,
  getselectedMonth,
} from '../../utils/DateUtils';
import CalendarDay from '../CalendarDay/CalendarDay.component';
import { CalendarWrapper, CalendarHeader } from '../styled';
import { DAYS_OF_WEEK } from '../../utils/const';
import { CalendarDayColumn } from '../styled/Custom.styled';

function Calendar({
  selectedDate,
  setSelectedDate,
  setIsloading,
  setShowImage,
  setMedia,
}) {
  const [dates, setDates] = useState([]);
  const [displayMonth, setDisplayMonth] = useState(selectedDate.getMonth());
  const [displayYear, setDisplayYear] = useState(selectedDate.getFullYear());

  const handleClick = (date, isSelectable) => {
    setMedia({});
    setSelectedDate(date);
    if (isSelectable) {
      setIsloading(true);
      setShowImage(true);
    }
  };

  useEffect(() => {
    const currentSelected = new Date(displayYear, displayMonth);
    const numberOfDays = getCurrentMonthDays(
      currentSelected.getFullYear(),
      currentSelected.getMonth()
    );
    const datesArray = getDatesObject(numberOfDays, currentSelected);
    setDates(datesArray);
  }, [displayMonth, selectedDate]);

  useEffect(() => {
    const currentDay = new Date();
    const numberOfDays = getCurrentMonthDays(
      currentDay.getFullYear(),
      currentDay.getMonth()
    );
    const datesArray = getDatesObject(numberOfDays, currentDay);
    setDates(datesArray);
  }, []);

  const handleMonthChange = (isAddition) => {
    let monthValue = 0;
    let yearValue = displayYear;
    if (isAddition) {
      monthValue = displayMonth === 11 ? 0 : displayMonth + 1;
      yearValue = displayMonth === 11 ? displayYear + 1 : displayYear;
    } else {
      monthValue = displayMonth === 0 ? 11 : displayMonth - 1;
      yearValue = displayMonth === 0 ? displayYear - 1 : displayYear;
    }

    setDisplayMonth(monthValue);
    setDisplayYear(yearValue);
  };

  return (
    <div title="calendar">
      <CalendarHeader>
        <i
          className="fa fa-chevron-left"
          onClick={() => handleMonthChange(false)}
          aria-hidden="true"
          title="calendar-control-back"
        />
        <span title="month"> {getselectedMonth(displayMonth)}</span>
        <span title="year"> {displayYear} </span>
        <i
          className="fa fa-chevron-right"
          onClick={() => handleMonthChange(true)}
          aria-hidden="true"
          title="calendar-control-forward"
        />
      </CalendarHeader>

      <CalendarWrapper>
        {DAYS_OF_WEEK.map((el) => (
          <CalendarDayColumn key={el} title={el}>
            {el}
          </CalendarDayColumn>
        ))}
        {dates.map((dateObj) => (
          <CalendarDay
            key={dateObj.id}
            dateObject={dateObj}
            handleClick={handleClick}
          />
        ))}
      </CalendarWrapper>
    </div>
  );
}

export default Calendar;
