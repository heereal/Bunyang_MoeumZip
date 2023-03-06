import SearchInput from './SearchInput';
import * as S from './style';
import { useState } from 'react';

const SearchBox = () => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  return (
    <S.SearchBox>
      <S.SearchInputContainer>
        <S.SearchInputBox
          onClick={() => setInputFocused(true)}
          bd={inputFocused ? '#356eff' : '#bcc0cb'}
        >
          <SearchInput />
        </S.SearchInputBox>
      </S.SearchInputContainer>
    </S.SearchBox>
  );
};

export default SearchBox;
