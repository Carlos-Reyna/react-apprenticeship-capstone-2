import { render, fireEvent, waitFor } from '@testing-library/react';
import MediaContainer from '../components/MediaContainer';
import { IMAGE, VIDEO } from '../utils/const';
import { mswServer } from '../utils/msw-server';

const media = {
  url: 'https://apod.nasa.gov/apod/image/2201/OrionCross_LucyH_1080.jpg',
  mediaType: IMAGE,
  title: 'From Orion to the Southern Cross',
  explanation: `This is a sky filled with glowing icons. On the far left is the familiar constellation of Orion, 
divided by its iconic three-aligned belt stars and featuring the famous Orion Nebula, 
both partly encircled by Barnard's Loop. Just left of center in the featured image is the brightest star in the night: Sirius`,
};

const setShowImage = (showImage) => showImage;

const selectedDate = new Date();
beforeAll(() => {
  mswServer.listen();
  let portalRoot = document.getElementById('modal');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal');
    document.body.appendChild(portalRoot);
  }
});
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe('Media test suite', () => {
  test('Component is render', () => {
    render(<MediaContainer media={media} selectedDate={selectedDate} />);
  });

  test('Image container is render', () => {
    const { getByTitle } = render(
      <MediaContainer media={media} selectedDate={selectedDate} />
    );
    const imgElement = getByTitle('img-element');
    expect(imgElement).toBeInTheDocument();
  });

  test('Video container is render', () => {
    media.mediaType = VIDEO;
    const { getByTitle } = render(
      <MediaContainer media={media} selectedDate={selectedDate} />
    );

    const videoElement = getByTitle('video-element');
    expect(videoElement).toBeInTheDocument();
  });

  test('Dimiss modal', async () => {
    const { getByTitle } = render(
      <MediaContainer
        media={media}
        selectedDate={selectedDate}
        setShowImage={setShowImage}
      />
    );

    const dismissBtn = getByTitle('dismiss-btn');
    await waitFor(() => {
      fireEvent.click(dismissBtn);
    });
  });
});
