import * as S from './style';
import { useState, KeyboardEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import AlertUI from '../AlertUI/AlertUI';

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');

  const inputChangeHandler = (e: any) => {
    setKeyword(e.target.value);
  };
  const alertTest = () => {
    alert('성공');
  };

  const searchHandler = () => {
    if (keyword.trim().length === 0) {
      // AlertUI 컴포넌트 사용
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <AlertUI
              alertTitle="검색어"
              alertText="검색어를 입력해주세요."
              onClose={onClose}
              onClick={alertTest}
              eventText="알림"
            />
          );
        },
      });
      setKeyword('');
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
