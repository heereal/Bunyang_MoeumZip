import styled from 'styled-components';

export const Header = styled.header`
  width: 100vw;
  height: 48px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  box-sizing: border-box;

  position: relative;
`;

export const HSection = styled.div`
  margin-inline: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 100;
  box-sizing: border-box;
`;

// Logo box
export const LogoBox = styled.div`
  width: 20%;
  margin-left: 17px;
  box-sizing: border-box;
`;

// Search Section
export const SearchBox = styled.div`
  width: 50%;
`;

// Nav bar
export const NavBar = styled.div`
  width: 30%;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 4px 0px;
  gap: 25px;
  box-sizing: border-box;
`;

// 청약 캘린더, 청약 정보
export const NavContent = styled.nav`
  width: 61px;
  height: 17px;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  cursor: pointer;
`;
