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
  padding: 20px;
  border-top: 2px solid #b9b9b9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ImageBox = styled.div`
  width: 8%;
`;

export const InputBox = styled.div`
  width: 95%;
  border-radius: 10px;
  border: 2px solid #b9b9b9;
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.input`
  all: unset;
  padding-left: 10px;
  width: 90%;
  height: 100%;
`;
export const UserNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  font-size: 15px;
`;

export const CommentListBox = styled.div<{ blur: string }>`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  filter: blur(${(props) => props.blur});
`;

export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 92%;
  height: 50px;
  justify-content: center;
`;

export const ContentsBox = styled.div`
  display: flex;
  padding-top: 5px;
  font-weight: 500;
  font-size: 17px;
`;
export const EditInput = styled.input`
  all: unset;
  padding-left: 10px;
  width: 90%;
  height: 100%;
  font-weight: 400;
  border-radius: 10px;
  border: 2px solid #b9b9b9;
  height: 30px;
  background-color: white;
  font-size: 16px;
`;
export const EditSubmit = styled.button`
  all: unset;
  width: 70px;
  text-align: center;
  background-color: #4f70e4;
  border-radius: 7px;
  color: white;
  font-size: 12px;
  padding: 1px;
  cursor: pointer;
`;
export const EditCancel = styled.button`
  all: unset;
  width: 50px;
  text-align: center;
  background-color: #e44f72;
  border-radius: 7px;
  color: white;
  font-size: 12px;
  padding: 1px;
  cursor: pointer;
`;

export const Btn = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 13px;
  height: 25px;
  background: #f1f6ff;
  border-radius: 10px;
  color: #3d7fff;
  font-size: 13px;
  cursor: pointer;
`;
export const BtnBox = styled.div`
  padding-right: 10px;
  margin-top: 3px;
  cursor: pointer;
`;

export const ReplyInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 85%;
`;
export const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 90px;
`;
export const ReplyHeader = styled.div`
  display: flex;
  gap: 10px;
`;

export const ReplyBox = styled.div`
  display: flex;
  flex-direction: column;
`;
