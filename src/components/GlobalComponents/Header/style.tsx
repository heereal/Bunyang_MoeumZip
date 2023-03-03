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
  width: 108px;
  height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin: 1px 1px 0 0;

  box-sizing: border-box;
  cursor: pointer;
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
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 0 43px;
  padding: 4px 0;
  gap: 35px;
  box-sizing: border-box;
`;

// 청약 캘린더, 청약 정보
export const NavContent = styled.nav<{ color: string }>`
  height: 17px;
  padding: 0 10px 0 2px;

  font-weight: 600;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;

  color: ${(props) => props.color};

  cursor: pointer;

  :hover {
    color: #356eff;
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
