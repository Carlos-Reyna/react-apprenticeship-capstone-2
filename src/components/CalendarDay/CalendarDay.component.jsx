import React from 'react';
import { CalendarCell } from '../styled';

function CalendarDay({ dateObject, handleClick }) {
  return (
    <CalendarCell
      onClick={() => handleClick(dateObject.date, dateObject.isSelectable)}
      isSelectable={dateObject.isSelectable}
    >
      {' '}
      {dateObject.date.getDate()}
    </CalendarCell>
  );
}

export default CalendarDay;
