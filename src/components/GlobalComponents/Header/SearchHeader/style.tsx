import styled, { css, keyframes } from 'styled-components';

// 모바일 검색창 애니메이션
export const slideOpen = keyframes`
  
from{
  transform: translateX(50%);
}
to{
  transform: translateX(0);
}
`;

export const slideClose = keyframes`
  
from{
  transform: translateX(0);
}
to{
  transform: translateX(100%);
}
`;

// 검색창
export const SearchBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const SearchInputContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const SearchInputBox = styled.div<{ bd: string }>`
  display: flex;
  width: 100%;
  height: 36px;
  min-width: 250px;
  max-width: 500px;
  border-radius: 20px;
  border: solid 1px ${(props) => props.bd};
  background-color: #fff;

  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

// 여러 컴포넌트에서 공통으로 사용
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

  @media screen and (max-width: 600px) {
    width: 237px;
    height: 20px;
    padding: 0;
  }
`;

export const SearchBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  padding-right: 10px;
  padding-top: 5px;

  cursor: pointer;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

// 모바일(반응형) 검색창 style component
export const MobileSearchBox = styled.div`
  @media screen and (max-width: 600px) {
    display: flex;
    position: fixed;
    top: 2%;
    right: 23%;
  }

  @media screen and (max-width: 450px) {
    width: 280px;
    position: fixed;
    top: 2%;
    right: 25%;
    left: 18%;
  }
`;

export const MobileSearchInputContainer = styled.div<{
  bd: string;
  active: boolean;
}>`
  width: 100%;
  height: 31px;
  justify-content: space-evenly;
  align-items: center;
  gap: 8px;
  padding-left: 10px;
  padding-right: 8px;

  border-radius: 20px;
  border: solid 1px ${(props) => props.bd};
  background-color: #fff;

  /* active true, false에 따라 검색창 애니메이션 적용 */
  ${(props) =>
    props.active
      ? css`
          animation-duration: 0.4s;
          animation-timing-function: ease-out;
          animation-name: ${slideOpen};
          animation-fill-mode: forwards;
        `
      : css`
          animation-duration: 0.5s;
          animation-timing-function: ease-out;
          animation-name: ${slideClose};
          animation-fill-mode: forwards;
        `}

  @media screen and (max-width: 600px) {
    display: flex;
  }
`;

export const MobileSearchCloseBtn = styled.button`
  all: unset;
  width: 20px;
  height: 20px;

  cursor: pointer;
`;
