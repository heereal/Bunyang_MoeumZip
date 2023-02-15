import { useRouter } from 'next/router';
import * as S from './style';

const HomeList = ({ home }: any) => {
  const router = useRouter();

  return (
    <S.ListArticle onClick={() => router.push(`/detail/${home.PBLANC_NO}`)}>
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

      <div>
        <div>분양세대</div>
        {home.TOT_SUPLY_HSHLDCO} 세대
      </div>
      {/* TODO: data가 없을 경우 보여줄 화면 추가 */}
      {/* {home.detail.length !== 0 ? ():()} */}
      <div>
        <div>분양면적</div>
        {home.detail[0]?.SUPLY_AR.split('.')[0]}m2 ~
        {home.detail[home.detail.length - 1]?.SUPLY_AR.split('.')[0]}m2
      </div>
      <div>
        <div>전용면적</div>
        {/* 정규식을 이용해 전용면적 숫자 왼쪽에 0이 있으면 제거 */}
        {home.detail[0]?.HOUSE_TY.split('.')[0].replace(/(^0)/, '')}m2 ~
        {home.detail[home.detail.length - 1]?.HOUSE_TY.split('.')[0].replace(
          /(^0)/,
          '',
        )}
        m2
      </div>
      <div>
        <div>분양가격</div>
        {home.detail[0]?.LTTOT_TOP_AMOUNT}만원 ~
        {home.detail[home.detail.length - 1]?.LTTOT_TOP_AMOUNT}만원
      </div>

      <div>
        <div>
          <div>특별 청약일</div>
          {home.SPSPLY_RCEPT_BGNDE} ~ {home.SPSPLY_RCEPT_ENDDE}
        </div>
        <div>
          <div>청약 접수일</div>
          {home.RCEPT_BGNDE} ~ {home.RCEPT_ENDDE}
        </div>
      </div>
    </S.ListArticle>
  );
};

export default HomeList;
