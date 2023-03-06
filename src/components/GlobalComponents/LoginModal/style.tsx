import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  height: 420px;
  width: 360px;
  background-color: white;
  padding: 15px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 450px) {
    width: 85%;
  }
`;

export const CloseBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const LogoContainer = styled.div`
  height: 120px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BunyangMoaTitle = styled.h1`
  font-family: 'PyeongChang-Bold';
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  padding: 0 0 25px 0;
`;

export const SocialLoginBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
`;

export const SocialLoginBtn = styled.div<{ bg: string; text: string }>`
  height: 38px;
  width: 80%;
  position: relative;
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.text};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 7px;
  padding: 20px;
`;

export const GoogleLoginBtn = styled(SocialLoginBtn)`
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.25);
`;

export const SocialLoginIcon = styled.div`
  position: absolute;
  left: 20px;
`;
