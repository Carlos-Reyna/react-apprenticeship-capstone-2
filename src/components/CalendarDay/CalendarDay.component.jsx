import React from 'react';
import { CalendarCell, CustomButton } from '../styled';

function CalendarDay({ dateObject, handleClick }) {
  return (
    <CalendarCell isSelectable={dateObject.isSelectable}>
      {' '}
      {dateObject.date.getDate()}
      {dateObject.isSelectable ? (
        <CustomButton
          onClick={() => handleClick(dateObject.date, dateObject.isSelectable)}
        >
          Show
        </CustomButton>
      ) : null}
    </CalendarCell>
  );
}

export default CalendarDay;
