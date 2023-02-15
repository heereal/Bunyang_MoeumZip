import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 80px;
  background-color: lightslategray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  position: relative;
  z-index: 1000;
`;

// Nav bar
export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// 청약 캘린더, 청약 정보
export const NavContent = styled.nav`
  font-size: 16px;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
`;
