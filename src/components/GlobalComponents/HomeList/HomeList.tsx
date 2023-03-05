import { getToday } from '@/common/utils';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as S from './style';
import allIcon from 'public/assets/all.png';
import todayIcon from 'public/assets/today.png';
import comingIcon from 'public/assets/coming.png';
import randomIcon from 'public/assets/random.png';

const HomeList = ({ list }: PropsListJ) => {
  const router = useRouter();

  // 오늘 날짜
  const today = getToday();

  return (
    <S.ListArticle onClick={() => router.push(`/detail/${list.PBLANC_NO}`)}>
      {/* 리스트 분류 */}
      <S.TabInfo>
        <Image
          width={28}
          height={22}
          src={
            list.HOUSE_SECD === '04'
              ? randomIcon
              : list.RCEPT_BGNDE <= today
              ? todayIcon
              : list.RCEPT_BGNDE > today
              ? comingIcon
              : allIcon
          }
          alt="allIcon"
          quality={100}
          priority={true}
        />
        <S.TabInfoText>
          {list.HOUSE_SECD === '04'
            ? '무순위'
            : list.RCEPT_BGNDE > today
            ? '청약예정'
            : '청약가능'}
        </S.TabInfoText>
      </S.TabInfo>

      {/* 주택 이름 */}
      <S.CardTitleBox>
        <S.CardTitle>
          {list.HOUSE_NM.length < 13
            ? list.HOUSE_NM
            : list.HOUSE_NM.slice(0, 12) + '...'}
        </S.CardTitle>
      </S.CardTitleBox>

      {/* 분양형태 / 주택 형태 / 지역 이름*/}
      <S.CardCategoryBox>
        {list.HOUSE_DTL_SECD_NM === list.HOUSE_SECD_NM ? (
          <S.CardCategory>{list.HOUSE_DTL_SECD_NM} | </S.CardCategory>
        ) : list.HOUSE_DTL_SECD_NM && list.HOUSE_SECD_NM ? (
          <>
            <S.CardCategory>{list.HOUSE_DTL_SECD_NM} | </S.CardCategory>
            <S.CardCategory>{list.HOUSE_SECD_NM} | </S.CardCategory>
          </>
        ) : !list.HOUSE_DTL_SECD_NM ? (
          <S.CardCategory>{list.HOUSE_SECD_NM} | </S.CardCategory>
        ) : !list.HOUSE_SECD_NM ? (
          <S.CardCategory>{list.HOUSE_DTL_SECD_NM} |</S.CardCategory>
        ) : (
          ''
        )}

        <S.CardCategory>{list.SUBSCRPT_AREA_CODE_NM}</S.CardCategory>
      </S.CardCategoryBox>

      <S.CardAreaContainer>
        <S.CardAreaBox>
          <S.CardAreaTitle>전용면적</S.CardAreaTitle>
          <S.CardArea>
            {list.MIN_HOUSE_TY === list.MAX_HOUSE_TY
              ? list.MAX_HOUSE_TY
              : list.MIN_HOUSE_TY + ' ~ ' + list.MAX_HOUSE_TY}
          </S.CardArea>
        </S.CardAreaBox>
        <S.CardAreaBox>
          <S.CardAreaTitle>분양가격</S.CardAreaTitle>
          <S.CardArea>
            {!list.MIN_LTTOT_TOP_AMOUNT
              ? '공고문 확인'
              : list.MIN_LTTOT_TOP_AMOUNT === list.MAX_LTTOT_TOP_AMOUNT
              ? list.MAX_LTTOT_TOP_AMOUNT
              : list.MIN_LTTOT_TOP_AMOUNT.includes('만원')
              ? list.MIN_LTTOT_TOP_AMOUNT.slice(0, -2) +
                ' ~ ' +
                list.MAX_LTTOT_TOP_AMOUNT
              : list.MIN_LTTOT_TOP_AMOUNT + ' ~ ' + list.MAX_LTTOT_TOP_AMOUNT}
          </S.CardArea>
        </S.CardAreaBox>
      </S.CardAreaContainer>

      <S.CardDateCategory>
        <S.CardDateBox>
          {list.SPSPLY_RCEPT_BGNDE ? (
            <>
              <S.CardDateTitle>특별 청약일</S.CardDateTitle>
              <S.CardDate>
                {list.SPSPLY_RCEPT_BGNDE === list.SPSPLY_RCEPT_ENDDE
                  ? list.SPSPLY_RCEPT_BGNDE.slice(5, 7).replace(/(^0)/, '') +
                    '월 ' +
                    list.SPSPLY_RCEPT_BGNDE.slice(8, 10).replace(/(^0)/, '') +
                    '일'
                  : list.SPSPLY_RCEPT_BGNDE.slice(5, 7).replace(/(^0)/, '') +
                    '월 ' +
                    list.SPSPLY_RCEPT_BGNDE.slice(8, 10).replace(/(^0)/, '') +
                    '일 ~ ' +
                    list.SPSPLY_RCEPT_ENDDE.slice(5, 7).replace(/(^0)/, '') +
                    '월 ' +
                    list.SPSPLY_RCEPT_ENDDE.slice(8, 10).replace(/(^0)/, '') +
                    '일'}
              </S.CardDate>
            </>
          ) : list.PPR_ACP_ST_DT ? (
            <>
              <S.CardDateTitle>사전 접수일</S.CardDateTitle>
              <S.CardDate>
                {list.PPR_ACP_ST_DT === list.PPR_ACP_CLSG_DT
                  ? list.PPR_ACP_ST_DT.slice(5, 7).replace(/(^0)/, '') +
                    '월 ' +
                    list.PPR_ACP_ST_DT.slice(8, 10).replace(/(^0)/, '') +
                    '일'
                  : list.PPR_ACP_ST_DT.slice(5, 7).replace(/(^0)/, '') +
                    '월 ' +
                    list.PPR_ACP_ST_DT.slice(8, 10).replace(/(^0)/, '') +
                    '일 ~ ' +
                    list.PPR_ACP_CLSG_DT.slice(5, 7).replace(/(^0)/, '') +
                    '월 ' +
                    list.PPR_ACP_CLSG_DT.slice(8, 10).replace(/(^0)/, '') +
                    '일'}
              </S.CardDate>
            </>
          ) : list.API === 'LH' ? (
            <S.NoDate>사전 접수일 정보가 없습니다.</S.NoDate>
          ) : (
            <S.NoDate>특별 청약일 정보가 없습니다.</S.NoDate>
          )}
        </S.CardDateBox>
        <S.CardDateBox>
          <S.CardDateTitle>청약 접수일</S.CardDateTitle>
          <S.CardDate>
            {list.RCEPT_BGNDE &&
              list.RCEPT_BGNDE.slice(5, 7).replace(/(^0)/, '') +
                '월 ' +
                list.RCEPT_BGNDE.slice(8, 10).replace(/(^0)/, '') +
                '일' +
                ' ~ ' +
                list.RCEPT_ENDDE.slice(5, 7).replace(/(^0)/, '') +
                '월 ' +
                list.RCEPT_ENDDE.slice(8, 10).replace(/(^0)/, '') +
                '일'}
          </S.CardDate>
        </S.CardDateBox>
      </S.CardDateCategory>
    </S.ListArticle>
  );
};

export default HomeList;
