import { customUIAlert } from '@/common/utils';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import * as S from './style';
import { useOnEnterKeyPress } from '@/hooks';

const SearchInput = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');

  const { OnKeyPressHandler } = useOnEnterKeyPress();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const searchHandler = () => {
    if (keyword.trim().length <= 1) {
      customUIAlert('검색어는 2글자 이상 입력해주세요.');
    } else {
      setKeyword('');
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <>
      <S.SearchBox>
        <S.SearchInputContainer>
          <S.SearchInputBox>
            <S.SearchInput
              type="text"
              value={keyword}
              onChange={inputChangeHandler}
              placeholder="분양 정보를 검색해보세요."
              onKeyPress={(e) => OnKeyPressHandler(e, searchHandler)}
            />
            <S.SearchBtn onClick={searchHandler} aria-label="검색 하기">
              <AiOutlineSearch style={{ fontSize: 18 }} />
            </S.SearchBtn>
          </S.SearchInputBox>
        </S.SearchInputContainer>
      </S.SearchBox>
      <S.SearchBoxMobile></S.SearchBoxMobile>
    </>
  );
};

export default SearchInput;
