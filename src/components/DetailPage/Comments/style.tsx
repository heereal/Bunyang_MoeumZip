import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 30px;
`;

export const CommentHeader = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 10px;
`;

export const CommentCount = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 10px;
  padding-left: 10px;
  color: #3d7fff;
`;

export const AddCommentBox = styled.div`
  padding: 20px 20px 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const ImageBox = styled.div`
  height: 100%;
`;

export const InputBox = styled.div<any>`
  width: 95%;
  border-bottom: ${(props) => props.border};
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  all: unset;
  padding-left: 5px;
  width: 80%;
  height: 100%;
`;
export const UserNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  height: 25px;
  font-weight: 600;
`;

export const CommentListBox = styled.div<{ blur: string }>`
  padding: 20px 20px 20px 0;
  display: flex;
  justify-content: center;
  width: 100%;
  filter: blur(${(props) => props.blur});
  gap: 10px;
  height: 100%;
  margin-bottom: 3px;
`;

export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 92%;
  height: 50px;
  justify-content: center;
  height: 100%;
`;

export const ContentsBox = styled.div`
  display: flex;
  padding-top: 5px;
  padding-left: 2px;
  font-weight: 500;
  font-size: 16px;
`;
export const EditInput = styled.input`
  all: unset;
  padding-left: 5px;
  width: 100%;
  height: 100%;
  font-weight: 400;
  border-bottom: 2px solid black;
  height: 20px;
  background-color: white;
  font-size: 16px;
`;
export const EditSubmit = styled.button`
  all: unset;
  width: 45px;
  height: 25px;
  text-align: center;
  background-color: #356eff;
  border-radius: 7px;
  color: white;
  font-size: 12px;
  padding: 1px;
  cursor: pointer;
`;
export const EditCancel = styled.button`
  all: unset;
  width: 45px;
  height: 25px;
  text-align: center;
  background-color: #e8eaef;
  border-radius: 7px;
  color: #7b7b7b;
  font-size: 12px;
  padding: 1px;
  cursor: pointer;
`;

export const Btn = styled.div`
  display: flex;
  align-items: center;

  height: 25px;
  color: #8e8e8e;
  font-size: 13px;
  cursor: pointer;
`;
export const BtnBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  cursor: pointer;
  gap: 5px;
`;

export const SubmitBtn = styled.div`
  background: #356eff;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 33px;
  cursor: pointer;
  padding: 8px;
  color: white;
  font-weight: 500;
  font-size: 15px;
`;

export const ReplyInputBox = styled.div<any>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 85%;
  filter: blur(${(props) => props.blur});
  margin-top: -14px;
  margin-left: -7px;
  color: #8e8e8e;
  font-size: 14px;
  padding-bottom: 10px;
`;
export const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 60px;
`;
export const ReplyHeader = styled.div`
  display: flex;
  gap: 10px;
`;

export const ReplyBox = styled.div`
  display: flex;
  flex-direction: column;
`;
