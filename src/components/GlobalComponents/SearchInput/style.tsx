import styled from 'styled-components';

// 검색창
export const SearchBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchInput = styled.input`
  width: 30.5%;
  height: 36px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin: 0 0 20px;
  padding: 10px 40px 10px 15px;

  border-radius: 20px;
  border: solid 1px #bcc0cb;
  background-color: #fff;

  box-sizing: border-box;

  font-size: 12px;
  text-align: left;

  position: absolute;
  left: 34.75%;
  right: 34.83%;
  top: 20%;
  bottom: 20%;

  :focus-visible {
    outline: none;
  }
`;

export const SearchBtn = styled.button`
  height: 13px;
  object-fit: contain;
  margin: 0.5px 0 0.5px 8px;

  background-color: transparent;
  border: none;
  outline: none;

  position: absolute;
  left: 50.75%;
  right: 24.83%;
  top: 30%;

  cursor: pointer;
`;
