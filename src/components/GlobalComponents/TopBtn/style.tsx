import styled from 'styled-components';

// Top button
export const TopBtnSection = styled.div`
  position: fixed;
  right: 43%;
  bottom: 5%;
  z-index: 1;
`;
export const TopBtn = styled.button`
  width: 38px;
  height: 38px;
  margin: 283px 20px 0 155px;
  padding: 8px 9px 10px;
  opacity: 0.87;

  background-color: lightgray;
  color: #fff;

  border: 1px solid lavender;
  border-radius: 50%;
  outline: none;

  font-weight: bold;
  font-size: 20px;

  cursor: pointer;

  :hover {
    background-color: lavender;
    color: #fff;
  }
`;
