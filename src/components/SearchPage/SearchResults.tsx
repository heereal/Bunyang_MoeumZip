const SearchResults = ({ searchResult }: any) => {
  return (
    <div>
      <br />
      <div>사진</div>
      <div>아파트 이름: {searchResult.HOUSE_NM}</div>
      <div>주소: {searchResult.HSSPLY_ADRES}</div>
      <div>
        {searchResult.HOUSE_DTL_SECD_NM} {searchResult.HOUSE_SECD_NM}
        {searchResult.SUBSCRPT_AREA_CODE_NM}
      </div>
      <div>좋아요</div>

      <div>
        <div>
          <div>특별 청약일</div>
          {searchResult.SPSPLY_RCEPT_BGNDE} ~ {searchResult.SPSPLY_RCEPT_ENDDE}
        </div>
        <div>
          <div>청약 접수일</div>
          {searchResult.RCEPT_BGNDE} ~ {searchResult.RCEPT_ENDDE}
        </div>
      </div>
      <br />
    </div>
  );
};

export default SearchResults;
