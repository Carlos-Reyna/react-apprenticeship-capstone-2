import React from 'react';
import { CalendarCell, CustomButton } from '../styled';

function CalendarDay({ dateObject, handleClick }) {
  return (
    <CalendarCell isSelectable={dateObject.isSelectable} title={dateObject.id}>
      {dateObject.date.getDate()}

      {dateObject.displayButton ? (
        <CustomButton
          title="calendar-shown-button"
          onClick={() => handleClick(dateObject.date, dateObject.isSelectable)}
        >
          Show
        </CustomButton>
      ) : null}
    </CalendarCell>
  );
}

export default CalendarDay;
