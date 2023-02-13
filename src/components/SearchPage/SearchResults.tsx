const SearchResults = ({ searchResult }: any) => {
  return (
    <div>
      <text>아파트 이름: {searchResult.HOUSE_NM}</text>
      <br />
      <text>주소: {searchResult.HSSPLY_ADRES}</text>
    </div>
  );
};

export default SearchResults;
