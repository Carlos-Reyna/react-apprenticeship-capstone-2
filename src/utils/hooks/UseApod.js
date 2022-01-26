import { useEffect } from 'react';
import { getApodValidDate } from '../DateUtils';
import { ERROR_MSG } from '../const';
/* eslint-disable camelcase */
export default async function UseApod(
  selectedDate,
  setMedia,
  setIsloading,
  setError,
  setShowImage
) {
  useEffect(() => {
    async function getResponse() {
      try {
        const apiValidDate = getApodValidDate(selectedDate);
        const fetchUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_APOD_API_KEY}&date=${apiValidDate}`;
        const resultJson = await fetch(fetchUrl);
        const result = await resultJson.json();
        const { url, title, media_type, explanation } = result;

        setIsloading(false);
        if (resultJson.status !== 200) {
          if (resultJson.status === 400) {
            const { msg } = result;
            setError({ msg: `Error: ${msg}` });
          } else {
            setError({ msg: `Error: ${ERROR_MSG}` });
          }
        } else {
          setMedia({ url, title, explanation, mediaType: media_type });
          setError(null);
        }
      } catch (err) {
        setShowImage(false);
        setIsloading(false);
        setError({ msg: `Error: ${ERROR_MSG}` });
      }
    }
    getResponse();
  }, [selectedDate]);
}
