import { customAlert } from '@/common/utils';
import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { AiOutlineSearch } from 'react-icons/ai';
import * as S from './style';

const SearchInput = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const searchHandler = () => {
    if (keyword.trim().length <= 1) {
      customAlert('검색어는 2글자 이상 입력해주세요.');
    } else {
      setKeyword('');
      router.push(`/search/${keyword}`);
    }
  };

  // enter 눌러도 검색 가능
  const OnKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  return (
    <S.SearchBox>
      <S.SearchInputContainer>
        <S.SearchInputBox>
          <S.SearchInput
            type="text"
            value={keyword}
            onChange={inputChangeHandler}
            placeholder="분양 정보를 검색해보세요."
            onKeyPress={OnKeyPressHandler}
          />
          <S.SearchBtn onClick={searchHandler} aria-label="검색 하기">
            <AiOutlineSearch style={{ fontSize: 18 }} />
          </S.SearchBtn>
        </S.SearchInputBox>
      </S.SearchInputContainer>
    </S.SearchBox>
  );
};

export default SearchInput;
