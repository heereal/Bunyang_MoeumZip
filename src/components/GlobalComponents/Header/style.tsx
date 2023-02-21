import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 58px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 */
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const HSection = styled.div`
  margin-inline: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 1;
`;

// Logo box
export const LogoBox = styled.div`
  width: 20%;
  margin-left: 17px;
`;

// Search Section
export const SearchBox = styled.div`
  width: 50%;
`;

// Nav bar
export const NavBar = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: -37px;
`;

// 청약 캘린더, 청약 정보
export const NavContent = styled.nav`
  font-size: 14px;
  font-weight: bold;
  padding: 0 10px;
  box-sizing: border-box;

  cursor: pointer;
`;
