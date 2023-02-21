import { pathState } from '@/store/selectors';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import * as S from './style';
import { AiOutlineStar } from 'react-icons/ai';

const ListList = ({ list }: PropsListJ) => {
  const router = useRouter();
  const [path, setPath] = useRecoilState(pathState);

  const pathHandler = () => {
    router.push(`/detail/${list.PBLANC_NO}`);
    setPath(list.PBLANC_NO);
  };

  return (
    <S.ListArticle onClick={pathHandler}>
      <S.CardHeader>
        <S.CardCategoryBox>
          <S.CardCategory>{list.HOUSE_DTL_SECD_NM}</S.CardCategory>
          <S.CardCategory>{list.HOUSE_SECD_NM}</S.CardCategory>
          <S.CardCategory>{list.SUBSCRPT_AREA_CODE_NM}</S.CardCategory>
        </S.CardCategoryBox>
        <div>
          {/* TODO: 가운데 채워진 걸로 어떻게 바꾸지? */}
          <AiOutlineStar style={{ color: 'yellow' }} />
        </div>
      </S.CardHeader>

      <S.CardTitle>{list.HOUSE_NM}</S.CardTitle>

      <S.CardDateBox>
        <S.CardDateTitle>특별 청약일</S.CardDateTitle>
        <S.CardDate>
          {list.SPSPLY_RCEPT_BGNDE.slice(5, 7).replace(/(^0)/, '')}월
          {list.SPSPLY_RCEPT_BGNDE.slice(8, 10).replace(/(^0)/, '')}일 ~
          {list.SPSPLY_RCEPT_ENDDE.slice(5, 7).replace(/(^0)/, '')}월
          {list.SPSPLY_RCEPT_ENDDE.slice(8, 10).replace(/(^0)/, '')}일
        </S.CardDate>
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

      <S.CardAreaBox>
        <S.CardAreaTitle>전용면적</S.CardAreaTitle>
        <S.CardArea>
          {list.MIN_HOUSE_TY} ~{list.MAX_HOUSE_TY}
        </S.CardArea>
      </S.CardAreaBox>
      <S.CardAreaBox>
        <S.CardAreaTitle>분양가격</S.CardAreaTitle>
        <S.CardArea>
          {list.MIN_LTTOT_TOP_AMOUNT.replace('만원', '')} ~
          {list.MAX_LTTOT_TOP_AMOUNT}
        </S.CardArea>
      </S.CardAreaBox>
    </S.ListArticle>
  );
};

export default ListList;
