import { useEffect } from 'react';
import { getApodValidDate } from '../DateUtils';
/* eslint-disable camelcase */
export default async function UseApod(
  selectedDate,
  setMedia,
  setIsloading,
  setError
) {
  useEffect(() => {
    async function getResponse() {
      try {
        const apiValidDate = getApodValidDate(selectedDate);
        const fetchUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_APOD_API_KEY}&date=${apiValidDate}`;
        const resultJson = await fetch(fetchUrl);
        const { url, title, media_type, error, explanation } =
          await resultJson.json();

        setIsloading(false);
        if (error !== undefined) {
          if (error.code === 500) {
            setError({ msg: `Error:${error.msg}` });
          } else {
            setError({ msg: `Error:${error.message}` });
          }
        } else {
          setMedia({ url, title, explanation, mediaType: media_type });
          setError(null);
        }
      } catch (err) {
        if (err.code === 500) {
          setError({ msg: `Error:${err.msg}` });
        } else {
          setError({ msg: `Error:${err.message}` });
        }
      }
    }
    getResponse();
  }, [selectedDate]);
}
