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
  height: 460px;
  width: 400px;
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
  font-size: 20px;
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
  bottom: 0;
  right: 0;
  background-color: #F4F4F4;
  border-radius: 50%;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
`;

export const NicknameInput = styled.input`
  font-size: 15px;
  line-height: 31px;
  text-align: center;
  padding: 0 20px;
  height: 43px;
  width: 70%;
  border: 2px solid #f4f4f4;
  margin-top: 20px;
  border-radius: 10px;

  :focus {
    outline: none;
  }
`;

export const ProfileBtn = styled.button`
  all: unset;
  width: 70%;
  height: 43px;
  font-weight: 700;
  font-size: 15px;
  background: #3d7fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 20px;
  cursor: pointer;

  :disabled {
    cursor: default;
    background: #8E8E8E;
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
  }
`;
