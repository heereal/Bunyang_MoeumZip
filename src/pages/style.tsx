import styled from 'styled-components';

// Tabs
export const TabMenu = styled.ul`
  background-color: white;
  color: black;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 1rem;
  margin-top: 10px;

  .submenu {
    // 기본 TabMenu CSS
    display: flex;
    justify-content: space-between;
    width: calc(100% / 5);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    //선택된 TabMenu CSS
    background-color: lavender;
    color: black;
  }

  /* & div.desc {
    text-align: center;
  } */
`;
