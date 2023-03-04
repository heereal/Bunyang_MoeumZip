import styled from 'styled-components';

// 검색창
export const SearchBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchInputContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchInputBox = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  min-width: 250px;
  max-width: 500px;
  border-radius: 20px;
  border: solid 1px #bcc0cb;
  background-color: #fff;

  box-sizing: border-box;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 40px 10px 15px;
  border-radius: 20px;

  font-size: 12px;
  text-align: left;

  :focus-visible {
    outline: none;
  }
`;

export const SearchBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  padding-right: 10px;
  padding-top: 5px;

  cursor: pointer;
`;
