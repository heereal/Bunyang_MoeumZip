import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  height: 420px;
  width: 330px;
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

export const EditProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;

  position: relative;
  align-items: center;
  box-sizing: border-box;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 20px;
`;

export const EditProfileImgLabel = styled.label`
  position: relative;
  border-radius: 50%;
`;

export const CameraIcon = styled.div`
  display: flex;
  position: absolute;
  bottom: -5px;
  right: 0;
  background-color: #f4f4f4;
  border-radius: 50%;
  padding: 8px;
  margin: 5px;
  cursor: pointer;
`;

export const NicknameInput = styled.input`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  padding: 0 10px;
  height: 36px;
  width: 200px;
  border: 1px solid #bcc0cb;
  margin-top: 30px;
  border-radius: 10px;

  :focus {
    outline: none;
    border: 1px solid #4f70e4;
  }
`;

export const ProfileBtn = styled.button`
  all: unset;
  width: 200px;
  height: 36px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  background: #3d7fff;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 6px;
  margin-bottom: 25px;
  cursor: pointer;

  :disabled {
    cursor: default;
    background: #e8eaef;
    color: #7b7b7b;
  }
`;

export const WithdrawUserBtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 35px;
`;

export const WithdrawUserBtn = styled.div`
  color: #7b7b7b;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  right: 25px;
  margin-top: 30px;
  text-decoration: underline;
  text-underline-position: under;

  :hover {
    color: black;
  }
`;
