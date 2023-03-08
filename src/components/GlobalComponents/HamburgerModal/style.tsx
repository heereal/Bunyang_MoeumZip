import styled, { css, keyframes } from 'styled-components';

// 햄버거 모달 애니메이션
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

// 햄버거 모달 배경
export const HamModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const HamModalSection = styled.div<{ active: boolean }>`
  width: 207px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  position: relative;

  /* active true, false에 따라 모달 애니메이션 적용 */
  ${(props) =>
    props.active
      ? css`
          animation-duration: 0.4s;
          animation-timing-function: ease-out;
          animation-name: ${slideOpen};
          animation-fill-mode: forwards;
        `
      : css`
          animation-duration: 0.3s;
          animation-timing-function: ease-out;
          animation-name: ${slideClose};
          animation-fill-mode: forwards;
        `}
`;

// 닫기 버튼
export const CloseBtn = styled.button`
  width: 22px;
  height: 22px;
  all: unset;
  margin: 20px 75% 0 11px;

  cursor: pointer;
`;

// Logo, Nav를 모두 감싸는 box
export const HamModalBox = styled.div`
  margin-top: 38px;
  width: 207px;
`;

// LogoBox
export const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogoText = styled.p`
  font-family: 'PyeongChang-Bold';
  font-weight: 700;
  font-size: 14px;
  margin-top: 13px;
`;

// NavBox
export const HamNavBox = styled.div`
  width: 100%;
  height: 192px;

  margin-top: 47px;
  gap: 12px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HamNav = styled.nav`
  width: 100%;
  display: flex;
  gap: 12px;
  padding: 10px 30px;

  font-weight: 600;
  font-size: 15px;

  cursor: pointer;

  div {
    margin-top: 4px;
  }
`;
