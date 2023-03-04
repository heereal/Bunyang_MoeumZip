import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 750px;
  height: 100%;
  margin-left: 70px;
  /* overflow-y: scroll; */

  @media screen and (max-width: 870px) {
    margin-left: 20px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 10px;
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

  @media screen and (max-width: 870px) {
    padding: 11px 26px;
  }
`;

export const Line = styled.div`
  background-color: #bcc0cb;
  position: absolute;
  height: 1.5px;
  bottom: 0;
  width: 95%;
  z-index: 0;

  @media screen and (max-width: 870px) {
    width: 95%;
  }
`;

export const TabContentContainer = styled.div<{ scroll: boolean }>`
  padding: 15px 0;
  position: relative;
  overflow-y: auto;
  min-height: 320px;
`;

export const BookmarkListContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  /* overflow-y: scroll; */
`;

export const NoResultContainer = styled.div`
  padding: 40px 0 0 50px;

  @media screen and (max-width: 870px) {
    padding: 40px 0 0 20px;
  }
`;

export const SelectCategoryContainer = styled.div`
  position: relative;
  display: flex;
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
  bottom: -40px;

  :disabled {
    cursor: default;
    background-color: #e8eaef;
    color: #7b7b7b;
  }
`;
