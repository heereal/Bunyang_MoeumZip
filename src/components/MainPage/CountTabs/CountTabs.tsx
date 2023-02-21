import { getUsersList } from '@/common/api';
import TopBtn from '@/components/GlobalComponents/TopBtn/TopBtn';
import { selectedCategoryList } from '@/store/selectors';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import HomeList from '../../GlobalComponents/HomeList/HomeList';
import * as S from './style';

const CountTabs = ({ list }: CountTabPropsListJ) => {
  const [currentTab, SetCurrentTab] = useState<number>(0);

  // 선택된 지역, 분양 형태 리스트 가져오기
  const [selectedCtList] = useRecoilState<{}[]>(selectedCategoryList);

  // 오늘 날짜 구하기
  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const today = year + '-' + month + '-' + day;

    return today;
  };
  const today = getToday();

  // // 청약 예정일 산정 기간 - 현재 날짜 + 4주
  // const getAddMonth = () => {
  //   const date = new Date();
  //   date.setMonth(date.getMonth() + 1);
  //   // FIXME: 다른 방법은 없는지?
  //   return date
  //     .toLocaleString()
  //     .slice(0, 11)
  //     .split('.')
  //     .join('')
  //     .replace(/( )/g, '-');
  // };
  // const todayAddMonth = getAddMonth();

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
  // 기본 - 청약 가능 리스트
  const todayList = list.filter(
    (item: ItemJ) =>
      item.RCEPT_BGNDE <= today &&
      item.RCEPT_ENDDE >= today &&
      item.HOUSE_SECD !== '04',
  );
  // 기본 - 청약 예정 리스트
  const comingList = list.filter(
    (item: ItemJ) => item.RCEPT_BGNDE > today && item.HOUSE_SECD !== '04',
  );
  // 기본 - TODO: 무순위 리스트 - 이름 변경? -선착순..?
  const randomList = list.filter(
    (item: ItemJ) => item.HOUSE_SECD === '04' && item.RCEPT_BGNDE >= today,
  );

  // 기본 - 전체 리스트
  const basicAllList: {}[] = [];
  todayList.map((item) => basicAllList.push(item));
  comingList.map((item) => basicAllList.push(item));
  randomList.map((item) => basicAllList.push(item));

  // 로그인 했을 때 보이는 유저의 관심 지역 및 분양형태가 반영 된 리스트
  // 현재 유저 - 청약 가능 리스트
  const userTodayList = userList.filter(
    (item: ItemJ) =>
      item.RCEPT_BGNDE <= today &&
      item.RCEPT_ENDDE >= today &&
      item.HOUSE_SECD !== '04',
  );
  // 현재 유저 - 청약 예정 리스트
  const userComingList = userList.filter(
    (item: ItemJ) => item.RCEPT_BGNDE > today && item.HOUSE_SECD !== '04',
  );

  // 유저 - 전체 리스트
  const userAllList: {}[] = [];
  userTodayList.map((item) => userAllList.push(item));
  userComingList.map((item) => userAllList.push(item));
  randomList.map((item) => userAllList.push(item));

  // 로그인 관계없이 카테고리를 선택했을 때 보이는 리스트
  // 카테고리 선택이 반영된 필터링 리스트
  const categoryList = list.filter(
    (item: ItemJ) =>
      selectedCtList.includes(item.HOUSE_DTL_SECD_NM) ||
      selectedCtList.includes(item.SUBSCRPT_AREA_CODE_NM),
  );

  // 카테고리 - 청약 가능 리스트
  const categoryTodayList = categoryList.filter(
    (item: ItemJ) =>
      item.RCEPT_BGNDE <= today &&
      item.RCEPT_ENDDE >= today &&
      item.HOUSE_SECD !== '04',
  );
  // 카테고리 - 청약 예정 리스트
  const categoryComingList = categoryList.filter(
    (item: any) => item.RCEPT_BGNDE > today && item.HOUSE_SECD !== '04',
  );

  // 카테고리 - 전체 리스트
  const categoryAllList: {}[] = [];
  categoryTodayList.map((item) => categoryAllList.push(item));
  categoryComingList.map((item) => categoryAllList.push(item));
  randomList.map((item) => categoryAllList.push(item));

  const tabList = [
    {
      name: '전체',
      content:
        selectedCtList.length !== 0
          ? categoryAllList
          : session
          ? userAllList
          : basicAllList,

      count:
        selectedCtList.length !== 0
          ? categoryAllList.length
          : session
          ? userAllList.length
          : basicAllList.length,
    },
    {
      name: '청약 가능',
      content:
        selectedCtList.length !== 0
          ? categoryTodayList
          : session
          ? userTodayList
          : todayList,
      count:
        selectedCtList.length !== 0
          ? categoryTodayList.length
          : session
          ? userTodayList.length
          : todayList.length,
    },
    {
      name: '청약 예정',
      content:
        selectedCtList.length !== 0
          ? categoryComingList
          : session
          ? userComingList
          : comingList,
      count:
        selectedCtList.length !== 0
          ? categoryComingList.length
          : session
          ? userComingList.length
          : comingList.length,
    },
    {
      name: '무순위',
      content: randomList,
      count: randomList.length,
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
      {/* 분양 리스트 */}

      {tabList[currentTab].content.length === 0 ? (
        <div>분양 정보가 없습니다. </div>
      ) : (
        <S.ListSection>
          {/* 현재 선택된 tab의 list를 map돌려서 HomeList 컴포넌트에 전달 */}

          {tabList[currentTab].content?.map((item: ItemJ) => {
            return <HomeList key={item.PBLANC_NO} list={item} />;
          })}
          <TopBtn />
        </S.ListSection>
      )}
    </>
  );
};

export default CountTabs;
