import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.nasa.gov/planetary/apod', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ message: 'success' }))
  ),
];
