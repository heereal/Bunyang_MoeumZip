import styled from 'styled-components';
import naver from '../../../assets/naver.png';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  height: 600px;
  width: 580px;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  width: 100%;
`;

export const LogoContainer = styled.div`
  background-color: lightgray;
  height: 145px;
  width: 145px;
  border-radius: 50%;
  margin-top: 7px;
`;

export const BunyangMoaTitle = styled.h1`
  font-size: 30px;
  padding: 23px 0 32px 0;
`;

export const SocialLoginBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SocilaLoginBtn = styled.div<{ bg: string; text: string }>`
  height: 50px;
  width: 400px;
  position: relative;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.text};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 9px;
  padding: 20px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.25);
`;

export const SocialLoginIcon = styled.div`
  position: absolute;
  left: 20px;
`;
