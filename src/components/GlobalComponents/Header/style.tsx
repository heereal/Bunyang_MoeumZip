import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 120px;
  background-color: lightslategray;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Logo = styled.img`
  cursor: pointer;
`;

export const HeaderNav = styled.div`
  font-size: 16px;
  cursor: pointer;
`;

// 로그인 여부에 따라 바뀌는 nav
export const Mynav = styled(HeaderNav)``;

export const LogintNav = styled(HeaderNav)`
  cursor: pointer;
`;

// 검색창
export const SearchBox = styled.div`
  input {
    width: 300px;
    height: 50px;
    border-radius: 10px;

    :focus-visible {
      outline: none;
    }
  }
`;

export const SearchBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
