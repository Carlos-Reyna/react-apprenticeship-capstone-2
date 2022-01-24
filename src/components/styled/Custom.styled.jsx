import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 12%);
  grid-auto-rows: 100px;
`;
export const CalendarDayColumn = styled.div`
  position: relative;
  top: 10px;
  left: 9px;
  font-size: 2rem;
  font-family: 'Oswald', sans-serif;
`;

export const CalendarHeader = styled.div`
  display: flex;
  font-size: 4rem;
  font-family: 'Oswald', sans-serif;
  align-content: center;
  justify-content: center;
  flex-direction: row;

  i {
    margin-top: 20px;
  }

  i:hover {
    color: #f0f8ff;
  }
`;

export const CalendarCell = styled.div`
  color: ${(props) => (props.isSelectable ? '#000' : 'gray')};
  border-color: #000;
  border-top: solid;
  border-width: medium;
  top: 5px;
  left: 5px;
  position: relative;
  font-size: 2rem;
  font-family: 'Oswald', sans-serif;

  &:hover {
    color: red;
  }
`;

export const Layout = styled.main``;

// export const
