import { setupServer } from 'msw/node';
import { handler } from '../mocks/handler';

export const mswServer = setupServer(...handler);
