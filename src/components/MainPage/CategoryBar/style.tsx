import styled from 'styled-components';

export const CategorySection = styled.section`
  width: 100%;
  max-width: 750px;
  height: 62px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: relative;

  @media screen and (max-width: 450px) {
    max-width: 450px;
    height: 33px;
    margin-top: -10px;
    margin-bottom: 10px;
  }
`;

export const CategoryContainer = styled.div`
  width: 50%;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
  @media screen and (max-width: 450px) {
    max-width: 360px;
  }
`;

// 카테고리 Tabs
export const CategoryTabList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 10px;
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
  border-radius: 7px;
  padding: 12px 9px;
  display: flex;
  align-items: center;

  cursor: pointer;

  :hover {
    border-color: #3d7fff;
  }
  @media screen and (max-width: 450px) {
    height: 25px;
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
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
  color: ${(props) => props.color};

  :hover {
    color: #3d7fff;
  }
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

// 지역 및 분양형태 카테고리 선택
export const RegionCategoryContainer = styled.div`
  width: 290px;
  height: 235px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  position: absolute;
  top: 95%;
  left: 24px;

  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid #e8eaef;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  @media screen and (max-width: 450px) {
    width: 335px;
    height: 170px;
  }
`;

export const TypeCategoryContainer = styled(RegionCategoryContainer)`
  width: 306px;
  height: 235px;

  @media screen and (max-width: 450px) {
    width: 355px;
    height: 170px;
  }
`;

export const CategoryBox = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 30px;
  margin-top: 20px;
  padding-bottom: 30px;

  box-sizing: border-box;
  gap: 2px 8px;

  @media screen and (max-width: 450px) {
    margin-left: 10px;
  }
`;

// 각 카테고리버튼
export const CategoryBtn = styled.button<{
  bg: string;
  bd: string;
  color: string;
}>`
  min-width: 39px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 7px;

  background-color: ${(props) => props.bg};
  border: 1px solid ${(props) => props.bd};

  box-sizing: border-box;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${(props) => props.color};

  cursor: pointer;

  :hover {
    color: #3d7fff;
    background-color: #f0f4ff;
  }

  @media screen and (max-width: 450px) {
    min-width: 39px;
    height: 25px;
    font-size: 13px;
    padding: 10px 5px;
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

  padding: 0 12px;
  padding-bottom: 30px;
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
  font-size: 13px;
  line-height: 12px;
  text-decoration-line: underline;

  background: transparent;
  color: ${(props) => props.color};

  cursor: pointer;

  :hover {
    color: #3d7fff;
  }
`;
