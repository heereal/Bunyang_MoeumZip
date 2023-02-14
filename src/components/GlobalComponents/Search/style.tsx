import styled from 'styled-components';

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
