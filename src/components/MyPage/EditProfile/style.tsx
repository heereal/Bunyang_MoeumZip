import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 270px;
  height: 376px;
`;

export const EditProfileContainer = styled.div`
  width: 270px;
  height: 100%;
  padding: 40px 20px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  box-sizing: border-box;
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
`;

// export const ProviderIcon = styled.div<{ bg: string }>`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.bg};
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export const Email = styled.div`
  font-weight: 500;
  font-size: 11px;
  color: #7b7b7b;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  padding-top: 2px;
`;

export const ProfileBtn = styled.div<{bg: string, text: string}>`
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
`;

export const Line = styled.div`
  height: 2px;
  background-color: #f4f4f4;
  width: 100%;
  margin-top: 20px;
`;
