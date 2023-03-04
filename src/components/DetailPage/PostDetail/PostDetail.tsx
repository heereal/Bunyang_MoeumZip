import { getBookmarksList, getHomeList } from '@/common/api';
import { useBookmark } from '@/hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
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

const PostDetail = ({ postId }: DetailPagePropsP) => {
  const queryClient = useQueryClient();

  // 유저의 세션 정보 받아오기
  const { data: session, status }: any = useSession();

  // 디테일 페이지에서 사용할 특정한 분양 정보
  const [home, setHome] = useState<HomeP>();
  const [email, setEmail] = useState<string | null | undefined>('');

  // 탭 선택 시 사용
  const [isRealPriceTab, setIsRealPriceTab] = useState(false);

  // 아파트 매매 실거라개 '읍면동'으로 필터링한 리스트
  const [dongList, setDongList] = useState([]);

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
      queryClient.invalidateQueries('Bookmarks');
    },
  });

  const detail = data?.allHomeData.find(
    (home: { PBLANC_NO: string }) => `${home.PBLANC_NO}` === postId,
  );

  // '시군구' 정보 기준으로 현재 디테일 페이지에 해당하는 지역 코드 찾기
  const LAWD_CD: any = LAWD_CD_Code.find(
    (item: string) => item.split(':')[1] === detail?.HSSPLY_ADRES.split(' ')[1],
  );

  // 아파트 매매 실거래가 API 가져오기
  const { data: APTRealPriceList, refetch: APTRealPriceRefetch } = useQuery(
    'APTRealPriceList',
    () => getAPTRealPriceList(LAWD_CD),
    {
      enabled: !!LAWD_CD, // LAWD_CD이 있는 경우에만 useQuery를 실행함

      // 지역코드로 불러온 아파트 매매 실거래가 리스트에서 '읍면동' 기준으로 필터링하기
      onSuccess: (APTRealPriceList) => {
        setDongList(
          APTRealPriceList?.filter(
            (item: any) =>
              (item.법정동.split(' ')[0] === ''
                ? item.법정동.split(' ')[1]
                : item.법정동.split(' ')[0]) ===
              (detail.HSSPLY_ADRES.split('(').length > 1
                ? detail.HSSPLY_ADRES.split('(')[1].slice(0, 3)
                : detail.HSSPLY_ADRES.split(' ')[2]),
          ).reverse(),
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

  // firestore에서 유저 정보 불러오면 state에 저장함
  useEffect(() => {
    if (session) {
      setEmail(session?.user?.email);
    }
    // eslint-disable-next-line
  }, [session]);

  return (
    <S.Section>
      <NextSeo
        title={`${home?.HOUSE_NM ? home?.HOUSE_NM : '상세페이지'} -`}
        description={`${
          home?.HOUSE_NM ? home?.HOUSE_NM : '모집공고'
        }의 분양상세정보, 주변아파트 실거래가를 제공합니다.`}
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
          font={!isRealPriceTab ? '#3D7FFF' : 'black'}
          line={!isRealPriceTab ? '#3D7FFF' : '#f4f4f4'}
          onClick={() => setIsRealPriceTab(false)}
        >
          분양 상세 정보
        </S.TabBtn>
        <S.TabBtn
          font={isRealPriceTab ? '#3D7FFF' : 'black'}
          line={isRealPriceTab ? '#3D7FFF' : '#f4f4f4'}
          onClick={() => setIsRealPriceTab(true)}
        >
          주변 아파트 매매 실거래가
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
