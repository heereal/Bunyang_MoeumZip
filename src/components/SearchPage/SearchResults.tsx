const SearchResults = ({ searchResult }: any) => {
  return (
    <div>
      <div>아파트 이름: {searchResult.HOUSE_NM}</div>
      <br />
      <div>주소: {searchResult.HSSPLY_ADRES}</div>
    </div>
  );
};

export default SearchResults;
