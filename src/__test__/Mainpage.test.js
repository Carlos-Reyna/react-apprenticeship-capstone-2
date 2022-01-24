import { render } from '@testing-library/react';
import Mainpage from '../pages/mainpage/Mainpage.page';
import { mswServer } from '../utils/msw-server';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
describe('Testing mainpage function', () => {
  test('Main page is rendered', () => {
    render(<Mainpage />);
  });

  test('Image element is present', () => {
    const { getByTitle } = render(<Mainpage />);
    const image = getByTitle('img-element');
    expect(image).toBeInTheDocument();
  });

  test('Calendar container is present', () => {
    const { getByTitle } = render(<Mainpage />);
    const calendarContainer = getByTitle('calendar-container');
    expect(calendarContainer).toBeInTheDocument();
  });
});
