import { render, fireEvent, act } from '@testing-library/react';
import { Modal } from '../components/styled';
import {
  handler,
  mockHandlerException,
  serverErrorHandler,
} from '../mocks/handler';
import Mainpage from '../pages/mainpage/Mainpage.page';
import { ERROR_MSG } from '../utils/const';
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
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe('Testing mainpage function', () => {
  test('Main page is rendered', () => {
    render(<Mainpage />);
  });

  test('Calendar container is present', () => {
    const { getByTitle } = render(<Mainpage />);
    const calendarContainer = getByTitle('calendar');
    expect(calendarContainer).toBeInTheDocument();
  });

  test('Modal element is present', () => {
    const { queryAllByTitle, getByTitle } = render(<Mainpage />);
    const cellCalendar = queryAllByTitle('calendar-shown-button')[0];

    fireEvent.click(cellCalendar);

    const modal = getByTitle('media-modal');
    expect(modal).toBeInTheDocument();
  });

  test('Mock error response', async () => {
    mswServer.use(mockHandlerException);
    const { queryAllByTitle, findByTitle } = render(
      <Mainpage>
        <Modal />
      </Mainpage>
    );
    const cellCalendar = queryAllByTitle('calendar-shown-button')[0];

    act(() => {
      fireEvent.click(cellCalendar);
    }, 3000);

    const errorDisplay = await findByTitle('Error');

    expect.toBeInTheDocument(errorDisplay);
  });

  test('Mock error response', async () => {
    mswServer.use(...mockHandlerException);
    const { queryAllByTitle, findByTitle } = render(
      <Mainpage>
        <Modal />
      </Mainpage>
    );
    const cellCalendar = queryAllByTitle('calendar-shown-button')[0];

    act(() => {
      fireEvent.click(cellCalendar);
    }, 3000);

    const errorDisplay = await findByTitle('Error');

    expect.toBeInTheDocument(errorDisplay);
  });

  test('Error is not displayed', async () => {
    mswServer.use(...handler);
    const { queryAllByTitle } = render(<Mainpage />);
    const cellCalendar = queryAllByTitle('calendar-shown-button')[10];

    act(() => {
      fireEvent.click(cellCalendar);
    }, 3000);

    const errorDisplay = await queryAllByTitle('Error');

    expect(errorDisplay.length).toBe(0);
  });

  test('Text error is displayed from api', async () => {
    mswServer.use(...mockHandlerException);
    const { queryAllByTitle, findByTitle } = render(<Mainpage />);
    const cellCalendar = queryAllByTitle('calendar-shown-button')[10];

    act(() => {
      fireEvent.click(cellCalendar);
    }, 3000);

    const errorDisplay = await findByTitle('Error');
    expect(errorDisplay.textContent).toMatch(
      'Date must be between Jun 16, 1995 and Jan 25, 2022.'
    );
  });

  test('Generic error text ', async () => {
    mswServer.use(...serverErrorHandler);
    const { queryAllByTitle, findByTitle } = render(<Mainpage />);
    const cellCalendar = queryAllByTitle('calendar-shown-button')[10];

    act(() => {
      fireEvent.click(cellCalendar);
    }, 3000);

    const errorDisplay = await findByTitle('Error');
    expect(errorDisplay.textContent).toMatch(ERROR_MSG);
  });
});
