import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  margin-left: 70px;
  overflow-y: scroll;
`;

export const TabContainer = styled.div`
  display: flex;
  position: relative;
`;

export const TabBtn = styled.div<{ color: string }>`
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  padding: 11px 48px;
  border-bottom: 2px solid ${(props) => props.color};
  color: ${(props) => props.color};
  cursor: pointer;
  z-index: 1;
`;

export const Line = styled.div`
  background-color: #bcc0cb;
  position: absolute;
  height: 1.5px;
  bottom: 0;
  width: 80%;
  z-index: 0;
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

export const NoResultContainer = styled.div`
  padding: 40px 0 0 50px;
`;

export const SubmitBtn = styled.button`
  all: unset;
  width: 220px;
  height: 43px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  background-color: #3d7fff;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  position: absolute;
  bottom: 0;

  :disabled {
    cursor: default;
    background-color: #e8eaef;
    color: #7b7b7b;
  }
`;
