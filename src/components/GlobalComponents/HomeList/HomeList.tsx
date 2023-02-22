import { pathState } from '@/store/selectors';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import * as S from './style';
import { AiOutlineStar } from 'react-icons/ai';
import { getToday } from '@/common/utils';

const ListList = ({ list }: PropsListJ) => {
  const router = useRouter();
  const [path, setPath] = useRecoilState(pathState);

  const pathHandler = () => {
    router.push(`/detail/${list.PBLANC_NO}`);
    setPath(list.PBLANC_NO);
  };

  // 오늘 날짜
  const today = getToday();

  return (
    <S.ListArticle onClick={pathHandler}>
      <S.CardHeader>
        <S.CardCategoryBox>
          {list.HOUSE_DTL_SECD_NM ? (
            <S.CardCategory>{list.HOUSE_DTL_SECD_NM}</S.CardCategory>
          ) : (
            ''
          )}
          <S.CardCategory>{list.HOUSE_SECD_NM}</S.CardCategory>
          <S.CardCategory>{list.SUBSCRPT_AREA_CODE_NM}</S.CardCategory>
        </S.CardCategoryBox>
      </S.CardHeader>

      <S.CardTitleBox>
        <S.CardTitle>
          {list.HOUSE_NM.length < 13
            ? list.HOUSE_NM
            : list.HOUSE_NM.slice(0, 13) + '...'}
        </S.CardTitle>
      </S.CardTitleBox>
      {/* 분류 띠 */}
      <S.Ribbon
        bg={
          list.HOUSE_SECD === '04'
            ? '#D2C975'
            : list.RCEPT_BGNDE > today
            ? '#BD6FD9'
            : '#64c590'
        }
      >
        <S.RibbonText>
          {list.HOUSE_SECD === '04'
            ? '무순위'
            : list.RCEPT_BGNDE > today
            ? '청약예정'
            : '청약가능'}
        </S.RibbonText>
      </S.Ribbon>

      <div>
        <S.CardDateBox>
          {list.SPSPLY_RCEPT_BGNDE ? (
            <>
              <S.CardDateTitle>특별 청약일</S.CardDateTitle>
              <S.CardDate>
                {list.SPSPLY_RCEPT_BGNDE.slice(5, 7).replace(/(^0)/, '')}월
                {list.SPSPLY_RCEPT_BGNDE.slice(8, 10).replace(/(^0)/, '')}일 ~
                {list.SPSPLY_RCEPT_ENDDE.slice(5, 7).replace(/(^0)/, '')}월
                {list.SPSPLY_RCEPT_ENDDE.slice(8, 10).replace(/(^0)/, '')}일
              </S.CardDate>
            </>
          ) : (
            <S.NoDate>특별 청약일이 없습니다.</S.NoDate>
          )}
        </S.CardDateBox>
        <S.CardDateBox>
          <S.CardDateTitle>청약 접수일</S.CardDateTitle>
          <S.CardDate>
            {list.RCEPT_BGNDE.slice(5, 7).replace(/(^0)/, '')}월
            {list.RCEPT_BGNDE.slice(8, 10).replace(/(^0)/, '')}일 ~
            {list.RCEPT_ENDDE.slice(5, 7).replace(/(^0)/, '')}월
            {list.RCEPT_ENDDE.slice(8, 10).replace(/(^0)/, '')}일
          </S.CardDate>
        </S.CardDateBox>
      </div>

      <div>
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
            {list.MIN_LTTOT_TOP_AMOUNT === list.MAX_LTTOT_TOP_AMOUNT
              ? list.MAX_LTTOT_TOP_AMOUNT
              : list.MIN_LTTOT_TOP_AMOUNT + ' ~ ' + list.MAX_LTTOT_TOP_AMOUNT}
          </S.CardArea>
        </S.CardAreaBox>
      </div>
    </S.ListArticle>
  );
};

export default ListList;
