import styled from 'styled-components';

// 검색창
export const SearchBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* position: absolute; */
`;

export const SearchInput = styled.input`
  width: 30%;
  height: 36px;

  border: 1px solid #bcc0cb;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 40px;
  box-sizing: border-box;
  font-size: 12px;
  text-align: left;

  position: absolute;
  top: 20%;
  left: 30%;
  background-color: #ffffff;

  :focus-visible {
    outline: none;
  }
`;

export const SearchBtn = styled.button`
  width: 20px;
  background-color: transparent;
  border: none;
  outline: none;
  position: absolute;
  left: 57%;
  top: 30%;

  cursor: pointer;
`;
