import SearchInput from './SearchInput';
import * as S from './style';

const SearchBox = () => {
  return (
    <S.SearchBox>
      <S.SearchInputContainer>
        <S.SearchInputBox>
          <SearchInput />
        </S.SearchInputBox>
      </S.SearchInputContainer>
    </S.SearchBox>
  );
};

export default SearchBox;
