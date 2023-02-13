import styled from 'styled-components';

export const MainSection = styled.section`
  width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Tab + RemoteSideBar를 묶는 부분
export const TabRemoteBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

// Count Tab
export const CountSection = styled.section`
  width: 600px;
  height: 100px;
  margin-bottom: 10px;
`;

export const CountTabBox = styled.ul`
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

export const CountTabNum = styled.text`
  font-size: 24px;
`;

// Tabs(리스트 tab - 청약 가능, 청약 예정, 무순위)
export const TabsSection = styled.section`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
`;

export const TabBox = styled(CountTabBox)`
  width: 100%;
  justify-content: left;
  align-items: left;

  .baseTab {
    // 기본 Tab
    width: calc(100% / 5);
    padding: 20px;
  }
`;

export const Tab = styled(CountTab)`
  width: calc(100% / 4);
  height: 50%;
`;

// remote
export const RemoteAside = styled.aside`
  width: 300px;
  height: 400px;
  border: 1px solid lavender;
`;
