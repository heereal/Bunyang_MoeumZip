import styled from 'styled-components';

export const MainSection = styled.section`
  width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TabRemoteBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

// Tabs
export const TabsSection = styled.section`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
`;

export const TabMenu = styled.ul`
  background-color: white;
  color: black;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin: 1rem 0;

  .submenu {
    // 기본 TabMenu CSS
    display: flex;
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
`;

// remote
export const RemoteAside = styled.aside`
  width: 300px;
  height: 400px;
  border: 1px solid lavender;
`;
