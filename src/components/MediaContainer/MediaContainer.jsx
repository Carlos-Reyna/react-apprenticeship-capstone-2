import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { VIDEO } from '../../utils/const';
import {
  Modal,
  ModalBody,
  TextContent,
  TextItem,
  CustomButton,
} from '../styled';
import { getApodValidDate } from '../../utils/DateUtils';

function MediaContainer({
  media,
  isLoading,
  showImage,
  setShowImage,
  selectedDate,
}) {
  const [display, setDisplay] = useState('none');

  useEffect(() => {
    if (showImage) {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  }, [showImage]);

  return ReactDOM.createPortal(
    <Modal display={display} title="media-modal">
      <ModalBody>
        {isLoading ? (
          <div className="fa-2x">
            {' '}
            Getting your request <i className="fas fa-spinner fa-spin" />
          </div>
        ) : (
          <ModalContent
            media={media}
            setShowImage={setShowImage}
            selectedDate={selectedDate}
          />
        )}
      </ModalBody>
    </Modal>,
    document.getElementById('modal')
  );
}

function ModalContent({ media, setShowImage, selectedDate }) {
  return (
    <div>
      {media.mediaType === VIDEO ? (
        <iframe
          height="400px"
          width="100%"
          title="video-element"
          src={media.url}
        />
      ) : (
        <img
          height="400px"
          width="100%"
          src={media.url}
          title="img-element"
          alt="corrupted img"
        />
      )}

      <TextItem title="title-container">
        Title:
        <TextContent>
          {media.title} at {getApodValidDate(selectedDate)}{' '}
        </TextContent>{' '}
      </TextItem>
      <TextItem title="explanation-container">
        Explanation: <TextContent>{media.explanation}</TextContent>{' '}
      </TextItem>

      <CustomButton
        onClick={() => setShowImage(false)}
        type="button"
        title="dismiss-btn"
      >
        Dismiss
      </CustomButton>
    </div>
  );
}

export default MediaContainer;
