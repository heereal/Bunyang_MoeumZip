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

export const TabNav = styled.div`
  font-size: 16px;
`;

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

export const Mynav = styled.div`
  font-size: 16px;
  cursor: pointer;
`;

export const LogoutNav = styled(Mynav)``;
