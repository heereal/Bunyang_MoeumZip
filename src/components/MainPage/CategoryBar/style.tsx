import styled from 'styled-components';

export const CategorySection = styled.section`
  width: 100%;
  height: 62px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 10;

  position: relative;
`;

// 카테고리 Tabs
export const CategoryTabList = styled.ul`
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  padding: 6px 0;

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
export const RegionCategoryContainer = styled.div`
  width: 280px;
  height: 240px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 82%;
  left: 24px;

  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid #e8eaef;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

export const TypeCategoryContainer = styled(RegionCategoryContainer)`
  width: 267px;
  height: 240px;
  left: 98px;
`;

export const CategoryBox = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 24px;
  padding-bottom: 20px;

  box-sizing: border-box;
  gap: 8px;
`;

// 각 카테고리버튼
export const CategoryBtn = styled.button<{
  bg: string;
  bd: string;
  color: string;
}>`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px 9px;
  border-radius: 7px;

  background-color: ${(props) => props.bg};
  border: 1px solid ${(props) => props.bd};

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
    background-color: #f0f4ff;
  }
`;

// 초기화 및 전체 선택 버튼
export const CommonBtnBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 5px;
  padding-bottom: 25px;
  position: absolute;
  top: 88%;
`;

export const CategoryCommonBtn = styled.button<{ color: string }>`
  border: none;

  height: 12px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 2px 12px;
  gap: 6px;

  font-weight: 600;
  font-size: 11px;
  line-height: 12px;
  text-decoration-line: underline;

  background: transparent;
  color: ${(props) => props.color};

  cursor: pointer;

  :hover {
    color: #3d7fff;
  }
`;
