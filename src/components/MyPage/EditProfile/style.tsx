import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 270px;
  height: 376px;

  @media screen and (max-width: 650px) {
    height: 265px;
  }
`;

export const EditProfileContainer = styled.div`
  width: 270px;
  height: 100%;
  padding: 40px 20px 0 20px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  box-sizing: border-box;

  .profileImage {
    @media screen and (max-width: 650px) {
      width: 100px;
      height: 100px;
    }
  }

  @media screen and (max-width: 650px) {
    box-shadow: none;
    width: 100%;
    padding: 20px;
  }
`;

export const Nickname = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  padding: 20px 0 5px 0;
`;

export const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .providerLogo {
    @media screen and (max-width: 730px) {
      width: 19px;
      height: 19px;
    }
  }
`;

export const Email = styled.div`
  font-weight: 500;
  font-size: 11px;
  color: #7b7b7b;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  padding-top: 2px;

  @media screen and (max-width: 730px) {
    font-size: 13px;
  }
`;

export const ProfileBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  @media screen and (max-width: 650px) {
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
`;

export const ProfileBtn = styled.div<{ bg: string; text: string }>`
  width: 90%;
  max-width: 230px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  background: ${(props) => props.bg};
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.text};
  margin-bottom: 10px;
  cursor: pointer;
  min-height: 40px;

  @media screen and (max-width: 650px) {
    width: 77px;
    height: 28px;
    padding: 0 8px;
    font-size: 14px;
    line-height: 14px;
    box-sizing: content-box;
  }
`;

export const AdminBtn = styled.div`
  width: 90%;
  max-width: 230px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  min-height: 40px;
  background-color: lavender;
  position: fixed;
  @media screen and (max-width: 650px) {
    width: 77px;
    height: 28px;
    padding: 0 8px;
    font-size: 14px;
    line-height: 14px;
    box-sizing: content-box;
  }
`;

export const Line = styled.div`
  height: 2px;
  background-color: #f4f4f4;
  width: 100%;
  margin-top: 20px;
`;
