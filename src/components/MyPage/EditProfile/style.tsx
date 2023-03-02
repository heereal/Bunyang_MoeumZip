import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  height: 100%;
`;

export const EditProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding: 50px 20px;
  border-radius: 20px;
  border: 1px solid lightgray;
  background-color: white;
  display: flex;
  flex-direction: column;

  position: relative;
  align-items: center;
  box-sizing: border-box;
`;

export const Nickname = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 31px;
  text-align: center;
  padding: 20px 0 5px 0;
`;

export const EmailContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export const ProviderIcon = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: gray;
  margin-right: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Email = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #7b7b7b;
  text-align: center;
`;

export const ProfileBtn = styled.div`
  width: 90%;
  font-weight: 600;
  font-size: 13px;
  background: #f9fafb;
  border-radius: 20px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7b7b7b;
  margin-bottom: 10px;
  cursor: pointer;
  min-height: 40px;
`;

export const Line = styled.div`
  height: 2px;
  background-color: #f4f4f4;
  width: 100%;
  margin-top: 20px;
`;
