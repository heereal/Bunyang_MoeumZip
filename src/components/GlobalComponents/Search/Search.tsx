import * as S from './style';
import { useState, KeyboardEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');

  const inputChangeHandler = (e: any) => {
    setKeyword(e.target.value);
  };

  const searchHandler = () => {
    //TODO: 공백을 검색했을 때도 검색 안 되게 수정하기
    if (!keyword) {
      // TODO: comfirm UI 적용하기
      alert('검색어를 입력해주세요.');
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
      <input
        type="text"
        value={keyword}
        onChange={inputChangeHandler}
        placeholder="관심지역을 검색해보세요."
        onKeyPress={OnKeyPressHandler}
      />
      <S.SearchBtn onClick={searchHandler}>
        <FaSearch style={{ fontSize: 30 }} />
      </S.SearchBtn>
    </S.SearchBox>
  );
};

export default Search;
