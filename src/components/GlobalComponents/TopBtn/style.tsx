import styled from 'styled-components';

// Top button
export const TopBtnSection = styled.div`
  position: fixed;
  right: 43%;
  bottom: 5%;
  z-index: 1;
`;
export const TopBtn = styled.button`
  font-weight: bold;
  font-size: 20px;
  padding: 15px 10px;
  background-color: lightgray;
  color: #fff;
  border: 1px solid lavender;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: lavender;
    color: #fff;
  }
`;
