import styled from 'styled-components';

export const HamModalBack = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 500;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const HamModalSection = styled.div`
  width: 207px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  position: relative;
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
  margin-top: 48px;
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
  width: 208px;
  height: 192px;
  padding: 10px 30px;
  margin-top: 47px;
  gap: 12px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HamNav = styled.nav`
  display: flex;
  gap: 12px;

  cursor: pointer;
`;
