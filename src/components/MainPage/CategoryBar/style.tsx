import styled from 'styled-components';

export const CategorySection = styled.section`
  width: 100%;
  height: 52px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1000;
`;

// 카테고리 Tabs
export const CategoryTabList = styled.ul`
  width: 174px;
  height: 54px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 0px;
  gap: 10px;
  position: fixed;
  margin-left: 24px;
`;

export const CategoryTabs = styled.li`
  list-style: none;
`;

// 지역 Tab
export const RegionTab = styled.button<{ bd: string; bg: string }>`
  width: 100%;
  height: 29px;
  background-color: ${(props) => props.bg};
  border: 1px solid;
  border-color: ${(props) => props.bd};
  border-radius: 10px;

  cursor: pointer;

  :hover {
    border-color: #3d7fff;
    background-color: #f1f6ff;
  }
`;

// 분양형태 Tab
export const TypeTab = styled(RegionTab)`
  width: 100%;
`;

export const TabNameBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TabName = styled.p<{ color: string }>`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  color: ${(props) => props.color};

  :hover {
    color: #3d7fff;
  }
`;

// 지역 및 분양형태 카테고리 선택
export const CategoryContainer = styled.div`
  width: 16%;
  height: 249px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  top: 27%;
  left: 1.7%;
  padding: 5px;

  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

export const CategoryBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 3px 0;
  box-sizing: border-box;
  gap: 13px;

  position: absolute;
  top: 5%;
  left: 6%;
`;

export const CategoryBtn = styled.button<{
  bg: string;
  bd: string;
  color: string;
}>`
  height: 26px;
  background-color: ${(props) => props.bg};
  border-color: ${(props) => props.bd};
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 5px;
  gap: 8px;
  box-sizing: border-box;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${(props) => props.color};

  cursor: pointer;

  :hover {
    color: #3d7fff;
    background-color: #f1f6ff;
  }
`;

// 초기화 및 전체 선택 버튼
export const CommonBtnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 8px;
  position: absolute;
  top: 88%;
`;

export const CategoryCommonBtn = styled(CategoryBtn)<any>`
  text-decoration: underline;
  border: none;
  width: 80px;
  height: 12px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
`;
