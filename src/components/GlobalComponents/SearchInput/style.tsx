import styled from 'styled-components';

// 검색창
export const SearchBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled.input`
  width: 310px;
  height: 28px;
  border: transparent;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 40px;
  box-sizing: border-box;
  font-size: 12px;
  text-align: left;
  position: absolute;
  left: 35%;
  top: 10px;
  background-color: lightblue;
  /* TODO: #f9fafb */

  :focus-visible {
    outline: none;
  }
`;

export const SearchBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  position: fixed;
  left: 56%;

  cursor: pointer;
`;