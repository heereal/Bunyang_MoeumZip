import styled from 'styled-components';

// 검색창
export const SearchBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchInput = styled.input`
  /* /* width: 30%; */
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  width: 363px;
  /* width: 60%; */

  border: 1px solid #bcc0cb;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 40px;
  box-sizing: border-box;
  font-size: 12px;
  text-align: left;

  position: absolute;
  left: 34.75%;
  right: 34.83%;
  top: 20%;
  bottom: 20%;

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
