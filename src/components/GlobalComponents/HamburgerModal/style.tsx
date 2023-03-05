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

export const CloseBtn = styled.button`
  width: 22px;
  height: 22px;
  all: unset;
  margin: 14px 80% 0 11px;

  cursor: pointer;
`;

export const HamModalBox = styled.div`
  margin-top: 68px;
`;
