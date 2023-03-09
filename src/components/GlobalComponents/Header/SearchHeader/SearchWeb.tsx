import SearchInput from './SearchInput';
import * as S from './style';
import { useState, useRef, useEffect } from 'react';

const SearchBox = () => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const searchWebRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      // 인풋창 밖을 눌렀을 때 인풋창 border color 변경
      //@ts-ignore
      if (
        searchWebRef.current &&
        //@ts-ignore
        !searchWebRef.current.contains(event?.target)
      ) {
        setInputFocused(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <S.SearchBox>
      <S.SearchInputContainer>
        <S.SearchInputBox
          ref={searchWebRef}
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
