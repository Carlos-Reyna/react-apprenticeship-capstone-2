import { render } from '@testing-library/react';
import App from '../App';
import { mswServer } from '../utils/msw-server';

beforeAll(() => {
  mswServer.listen();
  let portalRoot = document.getElementById('modal');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal');
    document.body.appendChild(portalRoot);
  }
});

test('renders learn react link', () => {
  render(<App />);
});
