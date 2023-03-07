import SearchInput from './SearchInput';
import * as S from './style';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import { useState } from 'react';

const SearchMobile = ({ mobileSearchHandler, searchExpanded }: any) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  return (
    <S.MobileSearchBox>
      <S.MobileSearchInputContainer
        active={searchExpanded ? true : false}
        onClick={() => setInputFocused(true)}
        bd={inputFocused ? '#356eff' : '#bcc0cb'}
      >
        <AiOutlineSearch style={{ fontSize: 15 }} />
        <SearchInput />
        <S.MobileSearchCloseBtn onClick={mobileSearchHandler}>
          <AiFillCloseCircle size={15} color={'#BCC0CB'} />
        </S.MobileSearchCloseBtn>
      </S.MobileSearchInputContainer>
    </S.MobileSearchBox>
  );
};

export default SearchMobile;
