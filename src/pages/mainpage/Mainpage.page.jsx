import React, { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar.component';
import MediaContainer from '../../components/MediaContainer';
import UseApod from '../../utils/hooks/UseApod';
import { Layout } from '../../components/styled';

function Mainpage() {
  const current = new Date();
  const [media, setMedia] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(current);
  const [error, setError] = useState(null);
  const [showImage, setShowImage] = useState(true);
  UseApod(selectedDate, setMedia, setIsloading, setError, setShowImage);
  return (
    <Layout>
      {error !== null ? (
        <div title="Error">{error.msg}</div>
      ) : (
        <div title="Tip">
          Move your mouse over a day to see cool things{' '}
          <i className="fa fa-smile-o" />
        </div>
      )}

      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setIsloading={setIsloading}
        setShowImage={setShowImage}
        setMedia={setMedia}
        title="calendar-container"
      />

      <MediaContainer
        isLoading={isLoading}
        media={media}
        showImage={showImage}
        selectedDate={selectedDate}
        setShowImage={setShowImage}
        title="media-container"
      />
    </Layout>
  );
}

export default Mainpage;
