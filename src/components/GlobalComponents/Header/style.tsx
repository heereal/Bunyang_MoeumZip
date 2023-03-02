import styled from 'styled-components';

export const Header = styled.header`
  width: 100vw;
  height: 60px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  box-sizing: border-box;
  padding: 0 25px;
  position: relative;
`;

// Logo box
export const LogoBox = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

// Logo Text
export const LogoText = styled.div`
  font-family: 'PyeongChang';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;

  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
  margin-left: 9px;
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
export const NavContent = styled.nav<{ color: string }>`
  padding: 0 5px;
  height: 17px;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: ${(props) => props.color};

  cursor: pointer;

  :hover {
    color: #356eff;
  }
`;
