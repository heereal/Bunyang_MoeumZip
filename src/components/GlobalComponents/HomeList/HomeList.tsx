import { pathState } from '@/store/selectors';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import * as S from './style';

const ListList = ({ list }: PropsListJ) => {
  const router = useRouter();
  const [path, setPath] = useRecoilState(pathState);

  const pathHandler = () => {
    router.push(`/detail/${list.PBLANC_NO}`);
    setPath(list.PBLANC_NO);
  };

  return (
    <S.ListArticle onClick={pathHandler}>
      <div>
        <div>
          <div>
            {list.HOUSE_DTL_SECD_NM} {list.HOUSE_SECD_NM}
            {/*TODO: 표시할 때 '서울특별' 이렇게 잘린 애들 주의*/}
            {list.SUBSCRPT_AREA_CODE_NM}
          </div>
          <div>{list.HOUSE_NM}</div>
          <div>좋아요</div>
          <div>{list.HSSPLY_ADRES}</div>
        </div>
      </div>

      {/* TODO: data가 없을 경우 보여줄 화면 추가 */}
      {/* {list.detail.length !== 0 ? ():()} */}

      <div>
        <div>전용면적</div>
        {list.MIN_HOUSE_TY} ~{list.MAX_HOUSE_TY}
      </div>
      <div>
        <div>분양가격</div>
        {list.MIN_LTTOT_TOP_AMOUNT} ~{list.MAX_LTTOT_TOP_AMOUNT}
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
