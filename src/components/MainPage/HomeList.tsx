import { useRouter } from 'next/router';
import * as S from './style';

const HomeList = ({ home }: any) => {
  const router = useRouter();
  return (
    <S.ListWrap onClick={() => router.push(`/detail/${home.PBLANC_NO}`)}>
      <div>
        <div>
          <div>{home.BSNS_MBY_NM}</div>
          <div>좋아요</div>
          <div>{home.HSSPLY_ADRES}</div>
          <div>
            {home.HOUSE_DTL_SECD_NM} {home.HOUSE_SECD_NM}
            {home.SUBSCRPT_AREA_CODE_NM} {}
          </div>
        </div>
        <div>작은 사진</div>
      </div>

      <div>{home.TOT_SUPLY_HSHLDCO}</div>
      {/* {home.detail.length !== 0 ? ():()} */}
      <div>
        {/* TODO: m2 슬라이스해야함 2자리일때는 앞이 0.. */}
        {home.detail[0]?.SUPLY_AR}m2 ~
        {home.detail[home.detail.length - 1]?.SUPLY_AR}m2
      </div>
      <div>
        {home.detail[0]?.HOUSE_TY}m2 ~
        {home.detail[home.detail.length - 1]?.HOUSE_TY}m2
      </div>
      <div>
        {home.detail[0]?.LTTOT_TOP_AMOUNT}만원 ~
        {home.detail[home.detail.length - 1]?.LTTOT_TOP_AMOUNT}만원
      </div>
      {/*  */}
      <div>
        <div>{home.SPSPLY_RCEPT_BGNDE}</div>
        <div>{home.RCEPT_BGNDE}</div>
      </div>
    </S.ListWrap>
  );
};

export default HomeList;
