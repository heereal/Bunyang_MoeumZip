import { getUsersList } from '@/common/api';
import LoadingSpinner from '@/components/GlobalComponents/LoadingSpinner/LoadingSpinner';
import NoResult from '@/components/GlobalComponents/NoResult/NoResult';
import TopBtn from '@/components/GlobalComponents/TopBtn/TopBtn';
import useHomeList from '@/hooks/useHomeList';
import useTabList from '@/hooks/useTabList';
import { selectedRegionList, selectedTypeList } from '@/store/selectors';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import CategoryBar from '../CategoryBar/CategoryBar';
import * as S from './style';

const CountTabs = ({ list }: CountTabPropsListJ) => {
  const [currentTab, SetCurrentTab] = useState<number>(0);

  // getToday()함수를 쓰는 컴포넌트는 클라이언트에서 실행되게 해야 ssr 418, 423오류가 안 생김
  const HomeList = dynamic(
    () => import('../../GlobalComponents/HomeList/HomeList'),
    {
      ssr: false,
    },
  );

  // CategoryBar에서 선택된 지역, 분양 형태 리스트 가져오기
  const [selectedRegionArray] = useRecoilState(selectedRegionList);
  const [selectedTypeArray] = useRecoilState(selectedTypeList);

  // 로그인 여부 확인
  const { data: session } = useSession();

  // Users 데이터 불러오기
  const { data: users, isLoading }: any = useQuery('users', getUsersList, {
    enabled: !!session, // session이 true인 경우에만 useQuery를 실행함
  });

  // 현재 유저의 데이터 불러오기
  const currentUser = users?.find(
    (item: ItemJ) => item.userEmail === session?.user?.email,
  );

  // 현재 유저의 관심 지역 및 분양 형태 통합 리스트
  const currentUserList: {}[] = [];
  currentUser?.regions?.map((item: ItemJ) => currentUserList.push(item));
  currentUser?.types?.map((item: ItemJ) => currentUserList.push(item));

  // 현재 유저의 관심 지역과 분양 형태를 반영해 필터링한 리스트
  const userList = list.filter(
    (item: ItemJ) =>
      currentUserList.includes(item.HOUSE_DTL_SECD_NM) ||
      currentUserList.includes(item.SUBSCRPT_AREA_CODE_NM),
  );

  // 로그인 안 했을 때 보이는 기본 리스트
  // 기본 - 청약 가능, 청약 예정, 무순위, 전체 리스트
  const { todayList, comingList, randomList, AllList } = useHomeList(list);

  // 로그인 했을 때 보이는 유저의 관심 지역 및 분양형태가 반영 된 리스트
  // 현재 유저 - 청약 가능, 청약 예정, 무순위, 전체 리스트
  const {
    todayList: UserTodayList,
    comingList: userComingList,
    randomList: userRandomList,
    AllList: userAllList,
  } = useHomeList(userList);

  // 로그인 관계없이 카테고리를 선택했을 때 보이는 리스트
  // 지역 필터링 리스트
  const regionCategoryList = list.filter((item: ItemJ) =>
    // @ts-ignore
    selectedRegionArray?.includes(item.SUBSCRPT_AREA_CODE_NM),
  );

  // 청약 가능, 예정, 무순위, 전체 리스트
  const {
    todayList: regionCategoryTodayList,
    comingList: regionCategoryComingList,
    randomList: regionCategoryRandomList,
    AllList: regionCategoryAllList,
  } = useHomeList(regionCategoryList);

  // 분양형태 필터링 리스트
  const typeCategoryList = list.filter((item: ItemJ) =>
    // @ts-ignore
    selectedTypeArray?.includes(item.HOUSE_DTL_SECD_NM),
  );

  // 청약 가능, 예정, 무순위, 전체 리스트
  const {
    todayList: typeCategoryTodayList,
    comingList: typeCategoryComingList,
    randomList: typeCategoryRandomList,
    AllList: typeCategoryAllList,
  } = useHomeList(typeCategoryList);

  // 지역 선택 후 분양형태로 한 번 더 필터링한 리스트
  const regionFilteredTypeList = regionCategoryList.filter((item) =>
    // @ts-ignore
    selectedTypeArray.includes(item.HOUSE_DTL_SECD_NM),
  );

  // 청약 가능, 예정, 무순위, 전체 리스트
  const {
    todayList: regionFilteredTypeTodayList,
    comingList: regionFilteredTypeComingList,
    randomList: regionFilteredTypeRandomList,
    AllList: regionFilteredTypeAllList,
  } = useHomeList(regionFilteredTypeList);

  // customHook을 사용한 전체 TabList
  const { ListContent, ListCount } = useTabList(
    regionFilteredTypeAllList,
    regionCategoryAllList,
    typeCategoryAllList,
    userAllList,
    AllList,
  );

  // 청약 가능 TabList
  const { ListContent: TodayListContent, ListCount: TodayListCount } =
    useTabList(
      regionFilteredTypeTodayList,
      regionCategoryTodayList,
      typeCategoryTodayList,
      UserTodayList,
      todayList,
    );

  // 청약 예정 TabList
  const { ListContent: ComingListContent, ListCount: ComingListCount } =
    useTabList(
      regionFilteredTypeComingList,
      regionCategoryComingList,
      typeCategoryComingList,
      userComingList,
      comingList,
    );

  // 무순위 TabList
  const { ListContent: RandomListContent, ListCount: RandomListCount } =
    useTabList(
      regionFilteredTypeRandomList,
      regionCategoryRandomList,
      typeCategoryRandomList,
      userRandomList,
      randomList,
    );

  const tabList = [
    {
      name: '전체',
      content: ListContent,
      count: ListCount,
    },
    {
      name: '청약 가능',
      content: TodayListContent,
      count: TodayListCount,
    },
    {
      name: '청약 예정',
      content: ComingListContent,
      count: ComingListCount,
    },
    {
      name: '무순위',
      content: RandomListContent,
      count: RandomListCount,
    },
  ];

  // 함수가 실행되면 선택된 tab 내용으로 변경
  const clickTabHandler = (index: number) => {
    SetCurrentTab(index);
  };
  return (
    <>
      <S.CountSectionBack>
        <S.CountTabList>
          {tabList.map((el, index) => (
            <li
              key={el.name}
              className={index === currentTab ? 'baseTab focused' : 'baseTab'}
              onClick={() => clickTabHandler(index)}
            >
              <S.CountTabName>{el.name}</S.CountTabName>
              <S.CountTabNum>{el.count}</S.CountTabNum>
            </li>
          ))}
        </S.CountTabList>
      </S.CountSectionBack>
      <CategoryBar />
      {/* 분양 정보가 없을 때 보여줄 문구 */}
      {isLoading ? (
        <LoadingSpinner />
      ) : tabList[currentTab].content.length === 0 ? (
        <div
          style={{
            paddingTop: '12%',
            textAlign: 'center',
            overflowY: 'scroll',
            height: '88%',
            width: '100%',
            backgroundColor: '#f7f7f7',
          }}
        >
          <NoResult text="다른 지역 및 분양 형태를 찾아보세요." />
        </div>
      ) : (
        <S.ListSection>
          {/* 분양 리스트 */}
          {/* 현재 선택된 tab의 list를 map돌려서 HomeList 컴포넌트에 전달 */}
          <S.ListBox>
            {tabList[currentTab].content?.map((item: ItemJ) => {
              return <HomeList key={item.PBLANC_NO} list={item} />;
            })}
          </S.ListBox>

          <TopBtn />
        </S.ListSection>
      )}
    </>
  );
};

export default CountTabs;
