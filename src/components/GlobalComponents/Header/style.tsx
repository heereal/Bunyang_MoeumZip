import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 7vh;
  min-height: 60px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 10px;
  @media screen and (max-width: 600px) {
    height: 6vh;
    padding: 0;
  }
`;

// Logo box
export const LogoBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  padding-left: 20px;

  box-sizing: border-box;
  cursor: pointer;
`;

// Logo Text
export const LogoText = styled.div`
  font-family: 'PyeongChang';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;

  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
  margin-left: 9px;
  padding-top: 5px;
  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
`;

// Search Section
export const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
`;

// Nav bar
export const NavBar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10px;
  align-items: center;
  gap: 15px;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const NavBarMobile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  display: none;
  padding-right: 10px;

  @media screen and (max-width: 600px) {
    display: flex;
  }
`;

// 청약 캘린더, 청약 정보
export const NavContent = styled.nav<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  font-weight: 600;
  font-size: 14px;

  color: ${(props) => props.color};

  cursor: pointer;

  :hover {
    color: #356eff;
  }

  @media screen and (max-width: 600px) {
    width: 30%;
  }
`;
export const NavContent2 = styled.nav`
  padding: 0 5px;
  height: 17px;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  display: none;

  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
