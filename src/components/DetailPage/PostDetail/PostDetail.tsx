import { getBookmarksList, getHomeList } from '@/common/api';
import { useBookmark } from '@/hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import APTRealPrice from '../APTRealPrice/APTRealPrice';
import DetailHeader from './DetailHeader';
import DetailKeyInfo from './DetailKeyInfo';
import { ExtraInfo } from './ExtraInfo';
import SpecialSupply from './SpecialSupply';
import * as S from './style';
import SubscriptionSchedule from './SubscriptionSchedule';
import SupplyInfo from './SupplyInfo';
import { getAPTRealPriceList } from '@/common/api';
import { LAWD_CD_Code } from '@/common/LAWD_CD';
import LHDetail from './LHDetail';
import { NextSeo } from 'next-seo';
import { getPreviousMonth } from '@/common/utils';

const PostDetail = ({ postId, detail }: DetailPagePropsP) => {
  const queryClient = useQueryClient();

  // 유저의 세션 정보 받아오기
  const { data: session, status }: any = useSession();

  // 디테일 페이지에서 사용할 특정한 분양 정보
  const [home, setHome] = useState<HomeP>();

  // 탭 선택 시 사용
  const [isRealPriceTab, setIsRealPriceTab] = useState(false);

  // 아파트 매매 실거래가 '읍면동'으로 필터링한 리스트
  const [dongList, setDongList] = useState([]);

  // 아파트 매매 실거래가 api 호출 시 전달하는 실거래 자료의 계약년월 query parameter
  const previousMonth = useMemo(() => {
    return getPreviousMonth();
  }, []);

  // 북마크 리스트 볼러오기
  const { data: bookmarksList, refetch: bookmarksListRefetch } = useQuery(
    'Bookmarks',
    () => {
      if (typeof postId === 'string') {
        return getBookmarksList(postId);
      }
    },
    {
      enabled: !!home,
    },
  );

  // 커스텀 훅 실행
  const { onClickBookmarkBtnHandler } = useBookmark(
    status,
    `${session?.user?.provider}_${session?.user?.email}`,
    bookmarksList,
    postId,
  );

  // 분양 정보 모두 불러온 후에 setHome 실행
  const { data, refetch: homeListRefetch } = useQuery('detail', getHomeList);

  // [북마크] 버튼 클릭 시 작동
  const editBookmark = useMutation('Bookmarks', onClickBookmarkBtnHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries('Bookmarks'), bookmarksListRefetch();
    },
  });

  // const detail = data?.allHomeData.find(
  //   (home: { PBLANC_NO: string }) => `${home.PBLANC_NO}` === postId,
  // );

  // '시군구' 정보 기준으로 현재 디테일 페이지에 해당하는 지역 코드 찾기
  const LAWD_CD: any = LAWD_CD_Code.find(
    (item: string) => item.split(':')[1] === detail?.HSSPLY_ADRES.split(' ')[1],
  );

  // 아파트 매매 실거래가 API 가져오기
  const { data: APTRealPriceList, refetch: APTRealPriceRefetch } = useQuery(
    'APTRealPriceList',
    () => getAPTRealPriceList(LAWD_CD, previousMonth),
    {
      enabled: !!LAWD_CD, // LAWD_CD이 있는 경우에만 useQuery를 실행함

      // 지역코드로 불러온 아파트 매매 실거래가 내림차순 정렬
      onSuccess: (APTRealPriceList: any) => {
        setDongList(
          APTRealPriceList.sort((a: any, b: any) => b.dealDay - a.dealDay),
        );
      },
    },
  );

  useEffect(() => {
    setHome(detail);
    homeListRefetch();
    bookmarksListRefetch();
    APTRealPriceRefetch();
    // eslint-disable-next-line
  }, [detail]);

  return (
    <S.Section>
      <NextSeo
        title={`${home?.HOUSE_NM ? home?.HOUSE_NM : '상세페이지'} -`}
        description={`${
          home?.HOUSE_NM ? home?.HOUSE_NM : '모집공고'
        }의 분양상세정보, 주변아파트 실거래가를 제공합니다.`}
        canonical={`https://www.by-zip.com/detail/${postId}`}
        openGraph={{
          url: `https://www.by-zip.com/detail/${postId}`,
        }}
      />
      <DetailHeader
        bookmarksList={bookmarksList}
        home={home}
        editBookmark={editBookmark}
        session={session}
      />

      {/* 탭 선택 */}
      <S.TabContainer>
        <S.TabBtn
          font={!isRealPriceTab ? '#3D7FFF' : '#7B7B7B'}
          line={!isRealPriceTab ? '#3D7FFF' : '#f4f4f4'}
          onClick={() => setIsRealPriceTab(false)}
        >
          분양 상세 정보
        </S.TabBtn>
        <S.TabBtn
          font={isRealPriceTab ? '#3D7FFF' : '#7B7B7B'}
          line={isRealPriceTab ? '#3D7FFF' : '#f4f4f4'}
          onClick={() => setIsRealPriceTab(true)}
        >
          <span>주변 아파트 매매</span> <span>실거래가</span>
        </S.TabBtn>
      </S.TabContainer>

      {/* 분양 상세 정보 탭 */}
      {home?.API === '청약홈' && !isRealPriceTab && (
        <S.Container>
          <DetailKeyInfo home={home} />
          <SubscriptionSchedule home={home} />
          <SupplyInfo home={home} />
          <SpecialSupply home={home} />
          <ExtraInfo home={home} />
        </S.Container>
      )}

      {home?.API === 'LH' && !isRealPriceTab && (
        <S.Container>
          <DetailKeyInfo home={home} />
          <LHDetail home={home} />
        </S.Container>
      )}

      {/* 아파트 매매 실거래가 탭 */}
      {isRealPriceTab && <APTRealPrice dongList={dongList} />}
    </S.Section>
  );
};

export default PostDetail;
