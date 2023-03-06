import { getUsersList } from '@/common/api';
import LoadingSpinner from '@/components/GlobalComponents/LoadingSpinner/LoadingSpinner';
import NoResult from '@/components/GlobalComponents/NoResult/NoResult';
import useHomeList from '@/hooks/useHomeList';
import useTabList from '@/hooks/useTabList';
import { selectedRegionList, selectedTypeList } from '@/store/selectors';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import CategoryBar from '../CategoryBar/CategoryBar';
import * as S from './style';
import allIcon from 'public/assets/all.png';
import todayIcon from 'public/assets/today.png';
import comingIcon from 'public/assets/coming.png';
import randomIcon from 'public/assets/random.png';

const CountTabs = ({ list }: CountTabPropsListJ) => {
  const [currentTab, SetCurrentTab] = useState<number>(0);

  // getToday()함수를 쓰는 컴포넌트는 클라이언트에서 실행되게 해야
  // (서버와 클라이언트 시간이 맞지 않을 때)ssr 418, 423오류가 안 생김
  const HomeList = dynamic(
    () => import('../../GlobalComponents/HomeList/HomeList'),
    {
      ssr: false,
    },
  );

  const TopBtn = dynamic(
    () => import('@/components/GlobalComponents/TopBtn/TopBtn'),
    {
      ssr: false,
    },
  );

  // useHomeList도 getToday함수를 쓰지만 컴포넌트가 아니라 dynamic import를 쓸 수 없어
  // useEffect로 클라이언트에서 실행
  useEffect(() => {
    useHomeList;
  }, []);

  // CategoryBar에서 선택된 지역, 분양 형태 리스트 가져오기
  const [selectedRegionArray] = useRecoilState(selectedRegionList);
  const [selectedTypeArray] = useRecoilState(selectedTypeList);

  // 로그인 여부 확인
  const { data: session }: any = useSession();

  // Users 데이터 불러오기
  const { data: users, isLoading }: any = useQuery('users', getUsersList, {
    enabled: !!session, // session이 true인 경우에만 useQuery를 실행함
  });

  // 현재 유저의 데이터 불러오기
  const currentUser = users?.find(
    (item: ItemJ) =>
      item.userEmail === session?.user?.email &&
      item.provider === session?.user?.provider,
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
  // 현재 유저 회원정보에 따른 관심지역 리스트의 청약 가능, 청약 예정, 무순위, 전체 리스트
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

  // 지역 필터링 리스트의 청약 가능, 예정, 무순위, 전체 리스트
  const {
    todayList: regionCategoryTodayList,
    comingList: regionCategoryComingList,
    randomList: regionCategoryRandomList,
    AllList: regionCategoryAllList,
  } = useHomeList(regionCategoryList);

  // 분양형태 필터링 리스트
  const typeCategoryList = list.filter((item: ItemJ) =>
    // @ts-ignore
    selectedTypeArray?.includes(item.HOUSE_DTL_SECD_NM || item.HOUSE_SECD_NM),
  );

  //분양형태 필터링 리스트의 청약 가능, 예정, 무순위, 전체 리스트
  const {
    todayList: typeCategoryTodayList,
    comingList: typeCategoryComingList,
    randomList: typeCategoryRandomList,
    AllList: typeCategoryAllList,
  } = useHomeList(typeCategoryList);

  // 지역 선택 후 분양형태로 한 번 더 필터링한 리스트
  const regionFilteredTypeList = regionCategoryList.filter((item: ItemJ) =>
    // @ts-ignore
    selectedTypeArray.includes(item.HOUSE_DTL_SECD_NM),
  );

  // 지역 및 분양형태 필터링 리스트의 청약 가능, 예정, 무순위, 전체 리스트
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
        <S.CountTabList
          bd={
            currentTab === 0
              ? '#356EFF'
              : currentTab === 1
              ? '#3EDE87'
              : currentTab === 2
              ? '#FF4141'
              : '#CB5EFF'
          }
          bs={
            currentTab === 0
              ? '#91b0ff'
              : currentTab === 1
              ? '#3EDE87'
              : currentTab === 2
              ? '#FFA6A6'
              : '#E8B8FF'
          }
        >
          {tabList.map((el, index) => (
            <S.BaseCountTab
              key={el.name}
              className={index === currentTab ? 'baseTab focused' : 'baseTab'}
              onClick={() => clickTabHandler(index)}
              bd={
                index === 0
                  ? '#356EFF'
                  : index === 1
                  ? '#3EDE87'
                  : index === 2
                  ? '#FF4141'
                  : '#CB5EFF'
              }
              bs={
                index === 0
                  ? '#91b0ff'
                  : index === 1
                  ? '#3EDE87'
                  : index === 2
                  ? '#FFA6A6'
                  : '#E8B8FF'
              }
            >
              <S.CountTabName>
                <S.CountTapImgBox>
                  <Image
                    width={28}
                    height={22}
                    src={
                      index === 0
                        ? allIcon
                        : index === 1
                        ? todayIcon
                        : index === 2
                        ? comingIcon
                        : randomIcon
                    }
                    alt="allIcon"
                    quality={100}
                    priority={true}
                  />
                </S.CountTapImgBox>
                <S.CountTapImgBoxMobile>
                  <Image
                    width={17}
                    height={13}
                    src={
                      index === 0
                        ? allIcon
                        : index === 1
                        ? todayIcon
                        : index === 2
                        ? comingIcon
                        : randomIcon
                    }
                    alt="allIcon"
                    quality={100}
                    priority={true}
                  />
                </S.CountTapImgBoxMobile>
                <p style={{ paddingTop: '3px' }}>{el.name}</p>
              </S.CountTabName>
              <S.CountTabNum>{el.count}</S.CountTabNum>
            </S.BaseCountTab>
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
          <NoResult
            title="현재 설정하신 필터에 해당되는 분양 정보가 없습니다."
            text="다른 지역 및 분양 형태를 찾아보세요."
          />
        </div>
      ) : (
        <S.ListSection id="topBtnScroll">
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
