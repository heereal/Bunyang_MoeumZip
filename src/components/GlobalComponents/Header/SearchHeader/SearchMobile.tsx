import SearchInput from './SearchInput';
import * as S from './style';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import { useState, useRef, useEffect } from 'react';

const SearchMobile = ({ mobileSearchHandler, searchExpanded }: any) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const searchMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      // 인풋창 밖을 눌렀을 때 인풋창 border color 변경
      //@ts-ignore
      if (
        searchMobileRef.current &&
        //@ts-ignore
        !searchMobileRef.current.contains(event?.target)
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
    <S.MobileSearchBox>
      <S.MobileSearchInputContainer
        active={searchExpanded ? true : false}
        onClick={() => setInputFocused(true)}
        ref={searchMobileRef}
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
