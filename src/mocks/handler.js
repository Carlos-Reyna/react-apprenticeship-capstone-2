import { rest } from 'msw';
import { IMAGE } from '../utils/const';

const media = {
  url: 'https://apod.nasa.gov/apod/image/2201/OrionCross_LucyH_1080.jpg',
  mediaType: IMAGE,
  title: 'From Orion to the Southern Cross',
  explanation: `This is a sky filled with glowing icons. On the far left is the familiar constellation of Orion, 
divided by its iconic three-aligned belt stars and featuring the famous Orion Nebula, 
both partly encircled by Barnard's Loop. Just left of center in the featured image is the brightest star in the night: Sirius`,
};

export const handler = [
  rest.get('https://api.nasa.gov/planetary/apod', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ message: 'success', media }))
  ),
];

export const mockHandlerException = [
  rest.get('https://api.nasa.gov/planetary/apod', (req, res, ctx) =>
    res(
      ctx.status(400),
      ctx.json({ msg: 'Date must be between Jun 16, 1995 and Jan 25, 2022.' })
    )
  ),
];

export const serverErrorHandler = [
  rest.get('https://api.nasa.gov/planetary/apod', (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ msg: 'Internal server error' }))
  ),
];
