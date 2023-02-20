import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 65px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  position: relative;
  z-index: 100;
`;

export const HSection = styled.div`
  margin-inline: auto;
  justify-content: space-between;
  align-items: center;
  display: flex;
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 1;
`;

// Logo box
export const LogoBox = styled.div`
  width: calc(100% / 4);
  margin-left: 27px;
`;

// Search Section
export const SearchBox = styled.div`
  width: calc(100% / 3);
`;

// Nav bar
export const NavBar = styled.div`
  width: calc(100% / 3);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 27px;
`;

// 청약 캘린더, 청약 정보
export const NavContent = styled.nav`
  font-size: 16px;
  font-weight: bold;
  padding: 0 10px;
  box-sizing: border-box;

  cursor: pointer;
`;
