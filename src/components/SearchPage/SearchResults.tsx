// TODO: WireFrame대로 수정하기

const Lists = ({ list }: PropsListJ) => {
  return (
    <div>
      <br />
      <div>사진</div>
      <div>아파트 이름: {list.HOUSE_NM}</div>
      <div>주소: {list.HSSPLY_ADRES}</div>
      <div>
        {list.HOUSE_DTL_SECD_NM} {list.HOUSE_SECD_NM}
        {list.SUBSCRPT_AREA_CODE_NM}
      </div>
      <div>좋아요</div>

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
      <br />
    </div>
  );
};

export default Lists;
