import { render, fireEvent, waitFor } from '@testing-library/react';
import { mswServer } from '../utils/msw-server';
import Calendar from '../components/Calendar';
import { getcurrentMonth } from '../utils/DateUtils';

let currentDate = new Date();

const setMedia = (media) => media;
const setSelectedDate = (date) => {
  currentDate = date;
};
const setIsloading = (isLoading) => isLoading;
const setShowImage = (showImage) => showImage;

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

describe('Calendar test suit', () => {
  test('Component is rendered', () => {
    render(<Calendar selectedDate={currentDate} />);
  });

  test('Current month is displayed', () => {
    const { getByTitle } = render(<Calendar selectedDate={currentDate} />);
    const month = getcurrentMonth(currentDate);
    const displayedMonth = getByTitle('month');

    // screen.debug();
    expect(month.trim()).toMatch(displayedMonth.textContent.trim());
  });

  test('Month initialization', () => {
    const testDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    const { getByTitle } = render(<Calendar selectedDate={testDate} />);
    const month = getcurrentMonth(testDate);
    const displayedMonth = getByTitle('month');

    expect(month.trim()).toMatch(displayedMonth.textContent.trim());
  });

  test('Month backward change', () => {
    const testDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    const { getByTitle } = render(<Calendar selectedDate={currentDate} />);
    const month = getcurrentMonth(testDate);
    const displayedMonth = getByTitle('month');
    const backIcon = getByTitle('calendar-control-back');

    fireEvent.click(backIcon);

    expect(month.trim()).toMatch(displayedMonth.textContent.trim());
  });

  test('Month forward change', () => {
    const testDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    const { getByTitle } = render(<Calendar selectedDate={currentDate} />);
    const month = getcurrentMonth(testDate);
    const displayedMonth = getByTitle('month');
    const forwardIcon = getByTitle('calendar-control-forward');

    fireEvent.click(forwardIcon);
    expect(month.trim()).toMatch(displayedMonth.textContent.trim());
  });

  test('Click at valid element', async () => {
    const { queryAllByTitle } = render(
      <Calendar
        selectedDate={currentDate}
        setMedia={setMedia}
        setSelectedDate={setSelectedDate}
        setIsloading={setIsloading}
        setShowImage={setShowImage}
      />
    );

    const buttons = queryAllByTitle('calendar-shown-button');

    await waitFor(() => {
      fireEvent.click(buttons[15]);
    });
  });

  test('Year change is displayed', () => {
    const testDate = new Date(2021, 11, 31);
    const { getByTitle } = render(<Calendar selectedDate={testDate} />);
    // const month = getcurrentMonth(testDate);
    const displayedYear = getByTitle('year');
    const forwardIcon = getByTitle('calendar-control-forward');

    fireEvent.click(forwardIcon);
    expect(displayedYear.textContent.trim()).toMatch('2022');
  });

  test('Month change in current year', () => {
    const testDate = new Date(2022, 1, 1);
    const { getByTitle } = render(<Calendar selectedDate={testDate} />);
    // const month = getcurrentMonth(testDate);
    const displayedMonth = getByTitle('month');
    const backIcon = getByTitle('calendar-control-back');

    fireEvent.click(backIcon);
    expect(displayedMonth.textContent.trim()).toMatch('January');
  });

  test('Month without filling days', () => {
    const testDate = new Date(2022, 5, 1);
    const { getByTitle } = render(<Calendar selectedDate={testDate} />);
    // const month = getcurrentMonth(testDate);
    const displayedMonth = getByTitle('month');
    const backIcon = getByTitle('calendar-control-back');

    fireEvent.click(backIcon);
    expect(displayedMonth.textContent.trim()).toMatch('May');
  });

  test('Month oldest than limit', () => {
    const testDate = new Date(1995, 4, 1);
    const { getByTitle } = render(<Calendar selectedDate={testDate} />);
    // const month = getcurrentMonth(testDate);
    const displayedMonth = getByTitle('month');
    // const backIcon = getByTitle('calendar-control-back');

    // fireEvent.click(backIcon);
    expect(displayedMonth.textContent.trim()).toMatch('May');
  });
});
