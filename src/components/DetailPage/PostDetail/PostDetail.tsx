import { getBookmarksList, getHomeList } from '@/common/api';
import { useBookmark } from '@/hooks';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as S from './style';

const PostDetail = ({ postId }: DetailPagePropsP) => {
  const queryClient = useQueryClient();

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();

  const test = '15881119';
  console.log(test.slice(0, 4));

  // 디테일 페이지에서 사용할 특정한 분양 정보
  const [home, setHome] = useState<HomeP>();
  const [email, setEmail] = useState<string | null | undefined>('');

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
    email!,
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

  useEffect(() => {
    setHome(detail);
    homeListRefetch();
    bookmarksListRefetch();
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
      <S.PageHeader>
        <S.BmrkBox>
          <S.BmrBtn
            onClick={() => editBookmark.mutate()}
            style={{
              color: bookmarksList?.usersList.includes(email)
                ? ' #FFEF5A     '
                : '#bcc0cb',
            }}
          >
            ★
          </S.BmrBtn>
        </S.BmrkBox>

        <S.HeaderTagBox>
          <S.HeaderTag>{home?.HOUSE_DTL_SECD_NM}</S.HeaderTag>
          <S.HeaderTag>{home?.HOUSE_SECD_NM}</S.HeaderTag>
          <S.HeaderTag>{home?.SUBSCRPT_AREA_CODE_NM}</S.HeaderTag>
        </S.HeaderTagBox>
        <S.HeaderTitle>{home?.HOUSE_NM}</S.HeaderTitle>
        <S.HeaderAdres>{home?.FOR_COORDINATES_ADRES}</S.HeaderAdres>
        <S.HeaderBmrk>
          ★ {bookmarksList?.usersList ? bookmarksList?.usersList?.length : '0'}
          명이 관심을 갖고 있어요
        </S.HeaderBmrk>
      </S.PageHeader>
      <S.Container>
        <S.ArticleHead>입주자모집공고 주요정보</S.ArticleHead>
        <S.ArticleBox>
          <S.ArticleTitle>
            <a>{home?.HOUSE_NM}</a>
          </S.ArticleTitle>
          <S.Article>
            <S.BoxTitle>공급위치</S.BoxTitle>
            <S.BoxContent>{home?.HSSPLY_ADRES}</S.BoxContent>
          </S.Article>
          <S.Article>
            <S.BoxTitle>공급규모</S.BoxTitle>
            <S.BoxContent>{home?.TOT_SUPLY_HSHLDCO}</S.BoxContent>
          </S.Article>
          <S.Article>
            <S.BoxTitle>관련문의</S.BoxTitle>
            <S.BoxContent>사업주체 또는 분양사무실로 문의</S.BoxContent>
          </S.Article>
          <S.Article>
            <S.BoxTitle>문의처</S.BoxTitle>
            {home?.MDHS_TELNO.length === 8 ? (
              <S.BoxContent color="#ffffff" style={{ width: '33.3%' }}>
                ☎ {home?.MDHS_TELNO.slice(0, 4)}-{home?.MDHS_TELNO.slice(4, 8)}
              </S.BoxContent>
            ) : (
              <S.BoxContent color="#ffffff" style={{ width: '33.3%' }}>
                ☎ {home?.MDHS_TELNO.slice(0, 3)}-{home?.MDHS_TELNO.slice(3, 7)}-
                {home?.MDHS_TELNO.slice(7, 12)}
              </S.BoxContent>
            )}
          </S.Article>
        </S.ArticleBox>
        {home && (
          <Link href={home.PBLANC_URL} legacyBehavior>
            <div
              style={{
                width: 110,
                height: 40,
                background: '#3D7FFF',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                marginTop: 10,
                cursor: 'pointer',
                fontSize: 13,
                padding: 10,
              }}
            >
              모집공고문 보기
            </div>
          </Link>
        )}

        <S.ArticleHead>청약일정</S.ArticleHead>
        <S.ArticleBox>
          <S.Article>
            <S.BoxTitle color="#f4f4f4">모집공고일</S.BoxTitle>
            <S.BoxContent>{home?.RCRIT_PBLANC_DE}</S.BoxContent>
          </S.Article>
          <S.Article>
            <S.BoxTitle color="#f4f4f4" style={{ height: 204 }}>
              청약접수
            </S.BoxTitle>
            <S.BoxContent style={{ paddingLeft: 0 }}>
              <S.Table>
                <S.THead>
                  <S.Tbody>구분</S.Tbody>
                  <S.Tbody>해당지역</S.Tbody>
                  <S.Tbody>기타경기 </S.Tbody>
                  <S.Tbody>기타지역</S.Tbody>
                </S.THead>
                <S.THead>
                  <S.Tbody>특별공급</S.Tbody>
                  <div style={{ textAlign: 'center', width: '70%' }}>
                    {home?.SPSPLY_RCEPT_BGNDE} ~ {home?.SPSPLY_RCEPT_ENDDE}
                  </div>
                </S.THead>
                <S.THead>
                  <S.Tbody>1순위</S.Tbody>
                  <S.Tbody>{home?.GNRL_RNK1_CRSPAREA_RCEPT_PD}</S.Tbody>
                  <S.Tbody>{home?.GNRL_RNK1_ETC_GG_RCPTDE_PD} </S.Tbody>
                  <S.Tbody>{home?.GNRL_RNK1_ETC_AREA_RCPTDE_PD}</S.Tbody>
                </S.THead>
                <S.THead>
                  <S.Tbody>2순위</S.Tbody>
                  <S.Tbody>{home?.GNRL_RNK2_CRSPAREA_RCEPT_PD}</S.Tbody>
                  <S.Tbody>{home?.GNRL_RNK2_ETC_GG_RCPTDE_PD} </S.Tbody>
                  <S.Tbody>{home?.GNRL_RNK2_ETC_AREA_RCPTDE_PD}</S.Tbody>
                </S.THead>
              </S.Table>
            </S.BoxContent>
          </S.Article>
          <S.Article>
            <S.BoxTitle color="#f4f4f4">당첨자 발표일</S.BoxTitle>
            <S.BoxContent>{home?.PRZWNER_PRESNATN_DE}</S.BoxContent>
          </S.Article>
          <S.Article>
            <S.BoxTitle color="#f4f4f4">계약일</S.BoxTitle>
            <S.BoxContent>
              {home?.CNTRCT_CNCLS_BGNDE} ~ {home?.CNTRCT_CNCLS_ENDDE}
            </S.BoxContent>
          </S.Article>
        </S.ArticleBox>
        <div style={{ color: '#8E8E8E', fontSize: 14, paddingLeft: 10 }}>
          *특별공급 종류에 따라 접수기간 및 장소가 다를 수 있으니 모집공고를
          반드시 확인하시기 바랍니다.
        </div>
        <S.ArticleHead>공급개요 </S.ArticleHead>
        <S.ArticleBox>
          <S.SPLtable>
            <S.SPLNUM style={{ width: '10%', backgroundColor: '#f4f4f4' }}>
              주택번호
            </S.SPLNUM>
            <S.SPLhead color="#f4f4f4">주거전용면적</S.SPLhead>
            <S.SPLhead color="#f4f4f4">공급면적</S.SPLhead>
            <S.SPLhead color="#f4f4f4" style={{ flexDirection: 'column' }}>
              <div style={{ padding: 5 }}>공급세대수</div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  padding: 5,
                }}
              >
                <div style={{ width: '33%' }}>일반</div>
                <div style={{ width: '33%' }}>특별</div>
                <div style={{ width: '33%' }}>총계</div>
              </div>
            </S.SPLhead>
            <S.SPLhead color="#f4f4f4">공급금액(최고가 기준)</S.SPLhead>
          </S.SPLtable>
          {home?.DETAIL.map((item: any) => {
            return (
              <S.SPLtable key={item.MODEL_NO}>
                <S.SPLNUM style={{ width: '10%', backgroundColor: '#f4f4f4' }}>
                  {item.MODEL_NO}
                </S.SPLNUM>

                <S.SPLhead style={{ width: '90%' }}>
                  <S.SPLTY>
                    {item.HOUSE_TY}
                    <a style={{ fontSize: 18, padding: 3 }}>㎡</a>
                  </S.SPLTY>
                  <S.SPLTY>
                    {item.SUPLY_AR}
                    <a style={{ fontSize: 18, padding: 3 }}>㎡</a>(
                    {Math.round(item.SUPLY_AR / 3.3)}평)
                  </S.SPLTY>
                  <S.SPLTY style={{ border: 'none' }}>
                    <S.TYDetail style={{ width: '33%' }}>
                      {item.SUPLY_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '33%' }}>
                      {item.SPSPLY_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '33%' }}>
                      {item.SUPLY_HSHLDCO + item.SPSPLY_HSHLDCO}
                    </S.TYDetail>
                  </S.SPLTY>
                  <S.SPLTY>{item.LTTOT_TOP_AMOUNT}만원</S.SPLTY>
                </S.SPLhead>
              </S.SPLtable>
            );
          })}
        </S.ArticleBox>

        <S.ArticleHead>특별공급</S.ArticleHead>

        <S.ArticleBox>
          <S.SPLtable>
            <S.SpecialHead style={{ width: '20%' }} color="#f4f4f4">
              주거전용면적
            </S.SpecialHead>
            <S.SpecialHead color="#f4f4f4" style={{ flexDirection: 'column' }}>
              <div style={{ padding: 5 }}>공급세대수</div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  padding: 5,
                }}
              >
                <div style={{ width: '12.5%', fontSize: 14 }}>다자녀</div>
                <div style={{ width: '12.5%', fontSize: 14 }}>신혼부부</div>
                <div style={{ width: '12.5%', fontSize: 14 }}>생애최초</div>
                <div style={{ width: '12.5%', fontSize: 14 }}>노부모</div>
                <div style={{ width: '12.5%', fontSize: 14 }}>기관추천</div>
                <div style={{ width: '12.5%', fontSize: 14 }}>기타</div>
                <div style={{ width: '12.5%', fontSize: 14 }}>이전기관</div>
                <div style={{ width: '12.5%', fontSize: 14 }}>총계</div>
              </div>
            </S.SpecialHead>
          </S.SPLtable>
          {home?.DETAIL.map((item: any) => {
            return (
              <S.SPLtable key={item.MODEL_NO}>
                <S.SPLNUM style={{ width: '20%', backgroundColor: '#f4f4f4' }}>
                  {item.HOUSE_TY}
                  <a style={{ fontSize: 18 }}>㎡</a>
                </S.SPLNUM>

                <S.SPLhead style={{ width: '80%' }}>
                  <S.SPLTY>
                    <S.TYDetail style={{ width: '12.5%' }}>
                      {item.MNYCH_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '12.5%' }}>
                      {item.NWWDS_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '12.5%' }}>
                      {item.LFE_FRST_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '12.5%' }}>
                      {item.OLD_PARNTS_SUPORT_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '12.5%' }}>
                      {item.INSTT_RECOMEND_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '12.5%' }}>
                      {item.ETC_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '12.5%' }}>
                      {item.TRANSR_INSTT_ENFSN_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '12.5%' }}>
                      {item.SPSPLY_HSHLDCO}
                    </S.TYDetail>
                  </S.SPLTY>
                </S.SPLhead>
              </S.SPLtable>
            );
          })}
        </S.ArticleBox>
        <div
          style={{
            color: '#8E8E8E',
            fontSize: 14,
            paddingLeft: 10,
            width: '95%',
          }}
        >
          <a>
            *공급세대수는 사업주체의 최초 입주자모집 공고문 기준입니다. 특별공급
            신청 미달 시 잔여물량은 일반공급으로 전환됨에 따라 일반공급 세대
            수가 변경될 수 있으므로 최종 일반공급 세대수는 일반공급 신청일에
            `청약접수 경쟁률`에서 확인 또는 사업주체에 문의하시기 바랍니다.
          </a>
        </div>

        <S.ArticleHead>기타사항</S.ArticleHead>
        <S.ArticleBox>
          <S.SPLtable>
            <S.SPLhead color="#f4f4f4" style={{ width: '33.3%' }}>
              시행사
            </S.SPLhead>
            <S.SPLhead color="#f4f4f4" style={{ width: '33.3%' }}>
              시공사
            </S.SPLhead>
            <S.SPLhead color="#f4f4f4" style={{ width: '33.3%' }}>
              사업주체 전화번호
            </S.SPLhead>
          </S.SPLtable>
          <S.SPLtable>
            <S.SPLhead color="#ffffff" style={{ width: '33.3%' }}>
              {home?.BSNS_MBY_NM}
            </S.SPLhead>
            <S.SPLhead color="#ffffff" style={{ width: '33.3%' }}>
              {home?.CNSTRCT_ENTRPS_NM}
            </S.SPLhead>
            {home?.MDHS_TELNO.length === 8 ? (
              <S.SPLhead color="#ffffff" style={{ width: '33.3%' }}>
                {home?.MDHS_TELNO.slice(0, 4)}-{home?.MDHS_TELNO.slice(4, 8)}
              </S.SPLhead>
            ) : (
              <S.SPLhead color="#ffffff" style={{ width: '33.3%' }}>
                {home?.MDHS_TELNO.slice(0, 3)}-{home?.MDHS_TELNO.slice(3, 6)}-
                {home?.MDHS_TELNO.slice(6, 12)}
              </S.SPLhead>
            )}
          </S.SPLtable>
        </S.ArticleBox>
      </S.Container>
    </S.Section>
  );
};

export default PostDetail;
