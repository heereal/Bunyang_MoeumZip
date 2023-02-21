import { getHomeList } from '@/common/api';
import { useState } from 'react';
import { useQuery } from 'react-query';
import * as S from './style';

const MyTabs = ({ currentUser }: any) => {
  const [currentTab, setCurrentTab] = useState(1);
  const { data: homeList } = useQuery('HomeList', getHomeList);

  // 전체 분양 정보 리스트에서 내가 북마크한 정보만 필터링하기
  const myBookmarkList = homeList?.allHomeData?.filter(
    (item: ItemJ) =>
      item.PBLANC_NO && currentUser?.bookmarkList?.includes(item.PBLANC_NO),
  );

  return (
    <S.Wrapper>
      <S.TabContainer>
        <S.TabBtn
          font={currentTab === 1 ? '#3D7FFF' : 'black'}
          line={currentTab === 1 ? '#3D7FFF' : '#f4f4f4'}
          onClick={() => setCurrentTab(1)}
        >
          북마크 목록
        </S.TabBtn>
        <S.TabBtn
          font={currentTab === 2 ? '#3D7FFF' : 'black'}
          line={currentTab === 2 ? '#3D7FFF' : '#f4f4f4'}
          onClick={() => setCurrentTab(2)}
        >
          관심 지역
        </S.TabBtn>
        <S.TabBtn
          font={currentTab === 3 ? '#3D7FFF' : 'black'}
          line={currentTab === 3 ? '#3D7FFF' : '#f4f4f4'}
          onClick={() => setCurrentTab(3)}
        >
          관심 분양형태
        </S.TabBtn>
      </S.TabContainer>
      <S.TabContentContainer>
        {/* 북마크 목록 */}
        {currentTab === 1 && (
          <S.BookmarkListContainer></S.BookmarkListContainer>
        )}
      </S.TabContentContainer>
      {/* <S.Line /> */}
      {/* <h2>나의 북마크 목록</h2> */}
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
        {myBookmarkList?.map((item: any, index: number) => {
          return (
            <div key={item.PBLANC_NO}>
              북마크{index + 1}번: {item.HOUSE_NM}
            </div>
          );
        })}
      </div> */}
    </S.Wrapper>
  );
};

export default MyTabs;
