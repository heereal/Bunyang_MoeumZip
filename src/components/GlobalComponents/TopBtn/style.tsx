import styled from 'styled-components';

// Top button
export const TopBtnSection = styled.div`
  position: fixed;
  right: 43%;
  bottom: 5%;
  z-index: 1;

  @media screen and (max-width: 768px) {
    right: 5%;
  }
`;

export const TopBtn = styled.button`
  all: unset;

  width: 38px;
  height: 38px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  padding: 2px;

  color: #ffffff;
  background-color: #356eff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-weight: 500;
  font-size: 10px;

  cursor: pointer;

  :hover {
    transition: 0.5s;
    width: 40px;
    height: 40px;
  }
`;
