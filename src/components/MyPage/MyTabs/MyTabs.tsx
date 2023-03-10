import { getHomeList } from '@/common/api';
import { useState } from 'react';
import { useQuery } from 'react-query';
import * as S from './style';
import SelectMyRegion from '@/components/GlobalComponents/SelectMyRegion/SelectMyRegion';
import SelectMyTypes from '@/components/GlobalComponents/SelectMyTypes/SelectMyTypes';
import HomeList from '@/components/GlobalComponents/HomeList/HomeList';
import { db } from '@/common/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentUserState,
  myRegionArrayState,
  myTypeArrayState,
} from '@/store/selectors';
import NoResult from '@/components/GlobalComponents/NoResult/NoResult';
import { customUIAlert } from '@/common/utils';

const MyTabs = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const { data: homeList } = useQuery('HomeList', getHomeList);

  const myRegionArray = useRecoilValue(myRegionArrayState);
  const myTypeArray = useRecoilValue(myTypeArrayState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  // 전체 분양 정보 리스트에서 내가 북마크한 정보만 필터링하기
  const myBookmarkList = homeList?.allHomeData?.filter(
    (item: ItemJ) =>
      item.PBLANC_NO && currentUser?.bookmarkList?.includes(item.PBLANC_NO),
  );

  // [변경사항 저장] 버튼 클릭 시 작동
  const updateCategoryHandler = async (category: string, array: any) => {
    const updateUser = {
      [category]: array,
    };

    await updateDoc(
      doc(db, 'Users', `${currentUser.provider}_${currentUser.userEmail}`),
      updateUser,
    );
    setCurrentUser({
      ...currentUser,
      [category]: array,
    });
    customUIAlert('관심 카테고리 설정이 수정되었습니다.');
    // 관심카테고리 변경 시 sessionStorage 비우기 -> 변경된 관심카테고리가 필터에 바로 반영
    sessionStorage.clear();
  };

  return (
    <S.Wrapper>
      <S.TabContainer>
        <S.TabBtn
          color={currentTab === 1 ? '#356EFF' : '#BCC0CB'}
          onClick={() => setCurrentTab(1)}
        >
          북마크
        </S.TabBtn>
        <S.TabBtn
          color={currentTab === 2 ? '#356EFF' : '#BCC0CB'}
          onClick={() => setCurrentTab(2)}
        >
          관심 지역
        </S.TabBtn>
        <S.TabBtn
          color={currentTab === 3 ? '#356EFF' : '#BCC0CB'}
          onClick={() => setCurrentTab(3)}
        >
          관심 분양형태
        </S.TabBtn>
        <S.Line />
      </S.TabContainer>

      <S.TabContentContainer>
        {/* 북마크 목록 */}
        {currentTab === 1 && (
          <S.BookmarkListContainer
            style={{
              justifyContent:
                myBookmarkList?.length === 0 ? 'center' : 'flex-start',
            }}
          >
            {!myBookmarkList ? null : myBookmarkList?.length === 0 ? (
              <S.NoResultContainer>
                <NoResult
                  title="아직 찜한 정보가 없어요."
                  text="분양 정보를 검색하고 마음에 드는 매물을 찜해보세요."
                />
              </S.NoResultContainer>
            ) : (
              myBookmarkList?.map((item: ItemJ) => {
                return <HomeList list={item} key={item.PBLANC_NO} />;
              })
            )}
          </S.BookmarkListContainer>
        )}
        {/* 관심 지역 */}
        {currentTab === 2 && (
          <S.SelectCategoryContainer>
            <SelectMyRegion path={'/my'} />
            <S.SubmitBtn
              disabled={myRegionArray === currentUser.regions}
              onClick={() => updateCategoryHandler('regions', myRegionArray)}
            >
              변경사항 저장
            </S.SubmitBtn>
          </S.SelectCategoryContainer>
        )}

        {/* 관심 분양 형태 */}
        {currentTab === 3 && (
          <S.SelectCategoryContainer>
            <SelectMyTypes path={'/my'} />
            <S.SubmitBtn
              disabled={myTypeArray === currentUser.types}
              onClick={() => updateCategoryHandler('types', myTypeArray)}
            >
              변경사항 저장
            </S.SubmitBtn>
          </S.SelectCategoryContainer>
        )}
      </S.TabContentContainer>
    </S.Wrapper>
  );
};

export default MyTabs;
