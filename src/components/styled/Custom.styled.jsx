import styled from 'styled-components';

export const CustomButton = styled.div`
  background-color: #ea4c89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 10px 10px 16px;
  position: relative;
  text-align: center;
  -webkit-text-decoration: none;
  text-decoration: none;
  -webkit-transition: color 100ms;
  transition: color 100ms;
  margin-top: 5px;
  grid-column: span ${(props) => (props.columnSpan ? props.columnSpan : 1)};
  &:hover,
  &:focus {
    background-color: #f082ac;
  }
`;

export const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 13%);
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
  flex-direction: row;

  i {
    margin-top: 20px;
  }

  i:hover {
    color: #34c9eb;
  }

  span {
    margin-right: 5px;
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
  font-size: 1.8rem;
  font-family: 'Oswald', sans-serif;

  &:hover {
    color: #ea4c89;
  }

  & ${CustomButton} {
    display: none;
    width: 100%;
    margin-left: 2px;
  }

  &:hover {
    ${CustomButton} {
      display: inline-block;
    }
  }

  @media (max-width: 768px) {
    & {
      font-size: 1.5rem;
    }

    ${CustomButton} {
      font-size: 1rem;
      margin-top: 3px;
      width: 100%;
      margin-left: 0;
      margin-top: 8px;
    }
  }
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 8%;
  width: 100%;
  min-height: 100vh;
`;

export const Modal = styled.div`
  display: ${(props) => props.display};
  position: fixed;
  z-index: 1;
  padding-top: 60px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

export const ModalBody = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 75%;
  background-color: #fefefe;
  display: flex;
  align-items: baseline;
  flex-direction: column;
  line-height: 30px;

  @media (max-width: 768px) {
    margin: 0;
    padding: 5px;
    width: 98%;
    min-height: 100vh;
    line-height: 30px;
  }
`;

export const TextItem = styled.div`
  font-family: 'Lato', sans-serif;
  font-weight: 600;
`;

export const TextContent = styled.div`
  font-family: 'Lato', sans-serif;
  font-weight: 300;
`;

export const FooterButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 20px;
  width: 100%;
`;
