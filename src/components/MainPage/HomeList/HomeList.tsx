import { useRouter } from 'next/router';
import * as S from './style';

const ListList = ({ list }: PropsListJ) => {
  const router = useRouter();

  return (
    <S.ListArticle onClick={() => router.push(`/detail/${list.PBLANC_NO}`)}>
      <div>
        <div>
          <div>{list.BSNS_MBY_NM}</div>
          <div>좋아요</div>
          <div>{list.HSSPLY_ADRES}</div>
          <div>
            {list.HOUSE_DTL_SECD_NM} {list.HOUSE_SECD_NM}
            {/*TODO: 표시할 때 '서울특별' 이렇게 잘린 애들 주의*/}
            {list.SUBSCRPT_AREA_CODE_NM}
          </div>
        </div>
        <div>작은 사진</div>
      </div>

      <div>
        <div>분양세대</div>
        {list.TOT_SUPLY_HSHLDCO}
      </div>
      {/* TODO: data가 없을 경우 보여줄 화면 추가 */}
      {/* {list.detail.length !== 0 ? ():()} */}
      <div>
        <div>분양면적</div>
        {/* {list.detail[0]?.SUPLY_AR.split('.')[0]}m2 ~
        {list.detail[list.detail.length - 1]?.SUPLY_AR.split('.')[0]}m2 */}
      </div>
      <div>
        <div>전용면적</div>
        {/* 정규식을 이용해 전용면적 숫자 왼쪽에 0이 있으면 제거
        {list.detail[0]?.HOUSE_TY.split('.')[0].replace(/(^0)/, '')}m2 ~
        {list.detail[list.detail.length - 1]?.HOUSE_TY.split('.')[0].replace(
          /(^0)/,
          '',
        )} */}
        m2
      </div>
      <div>
        <div>분양가격</div>
        {/* {list.detail[0]?.LTTOT_TOP_AMOUNT}만원 ~
        {list.detail[list.detail.length - 1]?.LTTOT_TOP_AMOUNT}만원 */}
      </div>

      <div>
        <div>
          <div>특별 청약일</div>
          {list.SPSPLY_RCEPT_BGNDE} ~ {list.SPSPLY_RCEPT_ENDDE}
        </div>
        <div>
          <div>청약 접수일</div>
          {list.RCEPT_BGNDE} ~ {list.RCEPT_ENDDE}
        </div>
      </div>
    </S.ListArticle>
  );
};

export default ListList;
