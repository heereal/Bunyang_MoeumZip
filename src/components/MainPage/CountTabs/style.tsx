import styled from 'styled-components';

// Count Tab
export const CountSection = styled.section`
  width: 600px;
  height: 100px;
`;

export const CountTabList = styled.ul`
  background-color: white;
  width: 100%;
  height: 80%;

  color: black;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  margin: 16px 0;

  .baseTab {
    // 기본 Tab
    display: flex;
    width: calc(100% / 4);
    height: 80%;

    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    //선택된 Tab
    background-color: lavender;
    color: black;
  }
`;

export const CountTab = styled.li`
  width: calc(100% / 4);
  height: 80%;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  box-sizing: border-box;
`;

export const CountTabNum = styled.h4`
  font-size: 24px;
`;

// 리스트
export const ListSection = styled.section`
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: left;
  justify-content: left;
  overflow-y: scroll;
`;
