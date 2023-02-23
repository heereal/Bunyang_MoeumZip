import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
  /* border: 1px solid lightgray; */
  margin-left: 70px;
  overflow-y: scroll;
`;

export const TabContainer = styled.div`
  display: flex;
`;

export const TabBtn = styled.div<{ font: string; line: string }>`
  font-weight: 700;
  font-size: 15px;
  padding: 15px 35px;
  border-bottom: 5px solid ${(props) => props.line};
  color: ${(props) => props.font};
  cursor: pointer;
`;

export const Line = styled.div`
  background-color: #f4f4f4;
  height: 5px;
  /* position: absolute; */
  top: -5px;
`;

export const TabContentContainer = styled.div`
  padding: 28px 0;
  position: relative;
`;

export const BookmarkListContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  /* overflow-y: scroll; */
`;

export const BookmarkInfoContainer = styled.div`
  width: 250px;
  height: 300px;
  background: #ffffff;
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 20px;
  margin-right: 10px;
`;

export const SubmitBtn = styled.button`
  all: unset;
  width: 220px;
  height: 43px;
  font-weight: 700;
  font-size: 15px;
  background: #3d7fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  position: absolute;
  bottom: 10px;

  :disabled {
    cursor: default;
    background: #8E8E8E;
  }
`;
