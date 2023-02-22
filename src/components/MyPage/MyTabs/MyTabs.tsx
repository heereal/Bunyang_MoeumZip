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
import { customAlert } from '@/common/utils';

const MyTabs = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const { data: homeList } = useQuery('HomeList', getHomeList);

  const [myRegionArray, setMyRegionArray] =
    useRecoilState<any>(myRegionArrayState);
  const [myTypeArray, setMyTypeArray] = useRecoilState<any>(myTypeArrayState);

  // 현재 로그인한 유저의 firestore 유저 정보
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  // 전체 분양 정보 리스트에서 내가 북마크한 정보만 필터링하기
  const myBookmarkList = homeList?.allHomeData?.filter(
    (item: ItemJ) =>
      item.PBLANC_NO && currentUser?.bookmarkList?.includes(item.PBLANC_NO),
  );

  // [변경사항 저장] 버튼 클릭 시 작동
  const updateCategoryHandler = async (category: string, array: any, setState: any) => {
    const updateUser = {
      [category]: array,
    };

    await updateDoc(doc(db, 'Users', currentUser.userEmail), updateUser);
    setCurrentUser({ ...currentUser, [category]: array });
    customAlert('관심 카테고리 설정이 업데이트되었습니다.');
  };

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
          <S.BookmarkListContainer>
            {myBookmarkList?.map((item: ItemJ) => {
              return <HomeList list={item} key={item.PBLANC_NO} />;
            })}
          </S.BookmarkListContainer>
        )}
        {/* 관심 지역 */}
        {currentTab === 2 && (
          <>
            <SelectMyRegion width={'80%'} />
            <S.SubmitBtn
              disabled={myRegionArray === currentUser.regions}
              onClick={() => updateCategoryHandler('regions', myRegionArray)}
            >
              변경사항 저장
            </S.SubmitBtn>
          </>
        )}

        {/* 관심 분양 형태 */}
        {currentTab === 3 && (
          <>
            <SelectMyTypes width={'80%'} />
            <S.SubmitBtn
              disabled={myTypeArray === currentUser.types}
              onClick={() => updateCategoryHandler('types', myTypeArray)}
            >
              변경사항 저장
            </S.SubmitBtn>
          </>
        )}
      </S.TabContentContainer>
    </S.Wrapper>
  );
};

export default MyTabs;
