import React from 'react';
import { VIDEO } from '../../utils/const';

function MediaContainer({ media, isLoading, setShowCalendar }) {
  if (isLoading) {
    return (
      <div className="fa-2x">
        {' '}
        Getting your request <i className="fas fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => setShowCalendar(true)} type="button">
        Return
      </button>
      {media.mediaType === VIDEO ? (
        <iframe
          height="250px"
          width="355px"
          title="video-element"
          src={media.url}
        />
      ) : (
        <img
          height="250px"
          width="355px"
          src={media.url}
          title="img-element"
          alt="corrupted img"
        />
      )}

      <div title="title-container">Title: {media.title}</div>
      <div title="explanation-container">Explanation: {media.explanation}</div>
    </div>
  );
}

export default MediaContainer;
