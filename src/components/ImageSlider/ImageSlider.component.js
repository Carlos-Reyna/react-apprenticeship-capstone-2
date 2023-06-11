import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  FooterButtons,
  CustomButton,
  Modal,
  ModalBody,
  TextContent,
  TextItem,
} from '../styled';

const ImageSlider = ({ showSlider, setShowSlider }) => {
  const timer = useRef(null);
  const [display, setDisplay] = useState('none');

  const [images] = useState([
    {
      id: '213123123',
      src: '/assets/ana1.png',
    },
    {
      id: '5634534',
      src: '/assets/ana2.png',
    },
    {
      id: '12312344',
      src: '/assets/ana3.png',
    },
    {
      id: '6564564',
      src: '/assets/ana4.png',
    },
  ]);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleNext = () => {
    const index =
      images.findIndex((image) => image.id === selectedImage.id) + 1;
    if (index === images.length) {
      setSelectedImage(images[0]);
    } else {
      setSelectedImage(images[index]);
    }
  };

  useEffect(() => {
    if (showSlider) {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  }, [showSlider]);

  useEffect(() => {
    timer.current = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      clearInterval(timer.current);
    };
  }, [selectedImage]);

  const handleImageChange = (isNext) => {
    clearInterval(timer.current);
    if (isNext) {
      handleNext();
    } else {
      const index =
        images.findIndex((image) => image.id === selectedImage.id) + -1;
      if (index < 0) {
        setSelectedImage(images[images.length - 1]);
      } else {
        setSelectedImage(images[index]);
      }
    }
  };

  return ReactDOM.createPortal(
    <Modal display={display} title="media-modal">
      <ModalBody>
        <img
          height="600px"
          width="100%"
          src={selectedImage.src}
          title="img-element"
          alt="corrupted img"
        />
        <FooterButtons>
          <CustomButton onClick={() => handleImageChange(false)}>
            Back
          </CustomButton>
          <TextItem title="explanation-container">
            <TextContent>
              Image{' '}
              {`${
                images.findIndex((image) => image.id === selectedImage.id) + 1
              } of ${images.length}`}
            </TextContent>{' '}
          </TextItem>
          <CustomButton onClick={() => handleImageChange(true)}>
            Next
          </CustomButton>
          <CustomButton columnSpan={3} onClick={() => setShowSlider(false)}>
            Dismiss
          </CustomButton>
        </FooterButtons>
      </ModalBody>
    </Modal>,
    document.getElementById('modal')
  );
};
export default ImageSlider;
