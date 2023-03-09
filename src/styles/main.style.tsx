import styled, { css, keyframes } from 'styled-components';

export const bounce = keyframes`

from{
  transform: translateY(3);
}
to{
  transform: translateY(-3px);
}


`;

export const slideUp = keyframes`
  
from{
  transform: translateY(0);
}
to{
  transform: translateY(-84%);
}
`;

export const slideDown = keyframes`
  
from{
  transform: translateY(-84%);
}
to{
  transform: translateY(0);
}
`;

export const arrowUP = keyframes`
from{
  transform: rotate(0);
}
to{
  transform: rotate(180deg);
}
`;

export const arrowDown = keyframes`
from{
  transform: rotate(180deg);
}
to{
  transform: rotate(0);
}
`;

export const MainSection = styled.section<any>`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 250;
  background-color: #ffffff;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 450px) {
    height: 100%;
    position: absolute;
    top: 84%;
    ${(props) =>
      props.active
        ? css`
            animation-duration: 0.25s;
            animation-timing-function: ease-out;
            animation-name: ${slideUp};
            animation-fill-mode: forwards;
          `
        : css`
            animation-duration: 0.25s;
            animation-timing-function: ease-out;
            animation-name: ${slideDown};
            animation-fill-mode: forwards;
          `}
  }
`;
export const MainUpBtnBox = styled.div<any>`
  display: none;

  width: 100%;
  height: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 450px) {
    display: flex;
  }
`;

export const ArrowBox = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  ${(props) =>
    props.active
      ? css`
          animation-duration: 0.25s;
          animation-timing-function: ease-out;
          animation-name: ${arrowUP};
          animation-fill-mode: forwards;
        `
      : css`
          animation-duration: 0.25s;
          animation-timing-function: ease-out;
          animation-name: ${arrowDown};
          animation-fill-mode: forwards;
        `}
`;

export const MainUpBtn = styled.div`
  width: 41px;
  height: 5px;
  background-color: #bcc0cb;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
