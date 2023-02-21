import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 461px;
  
`;

export const EditProfileContainer = styled.div`
  padding: 50px 70px;
  border-radius: 20px;
  /* border: 1px solid lightgray; */
  background-color: white;
  display: flex;
  flex-direction: column;

  align-items: center;
  box-sizing: border-box;
`;

export const Nickname = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 31px;
  text-align: center;
  padding: 28px 0 10px 0;
`;

export const Email = styled.div`
  font-weight: 500;
  font-size: 15px;
  color: #7b7b7b;
  text-align: center;
  margin-bottom: 30px;
`;

export const ProfileBtn = styled.div`
  width: 330px;
  height: 50px;
  font-weight: 600;
  background: #f9fafb;
  border-radius: 20px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7b7b7b;
  margin-bottom: 10px;
  cursor: pointer;
`;
