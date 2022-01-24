import React, { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar.component';
import MediaContainer from '../../components/MediaContainer';
import UseApod from '../../utils/hooks/UseApod';

function Mainpage() {
  const current = new Date();
  const [media, setMedia] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(current);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);
  UseApod(selectedDate, setMedia, setIsloading, setError);
  return (
    <>
      {error !== null ? <div>{error.msg}</div> : null}

      {showCalendar ? (
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setIsloading={setIsloading}
          setShowCalendar={setShowCalendar}
          setMedia={setMedia}
          title="calendar-container"
        />
      ) : (
        <MediaContainer
          isLoading={isLoading}
          media={media}
          setShowCalendar={setShowCalendar}
        />
      )}
    </>
  );
}

export default Mainpage;
