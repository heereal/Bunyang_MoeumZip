import * as S from './style';
import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert';
import AlertUI from '../AlertUI/AlertUI';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const SearchInput = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const options = {
    title: '',
    message: '검색어를 입력해주세요.',
    buttons: [
      {
        label: '확인',
        onClick: () => onclose,
      },
      // {
      //   label: 'No',
      //   onClick: () => alert('Click No'),
      // },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    // willUnmount: () => {},
    // afterClose: () => {},
    // onClickOutside: () => {},
    onKeypress: () => onclose,
    // onKeypressEscape: () => {},
    overlayClassName: 'overlay-custom-class-name',
  };

  const searchHandler = () => {
    if (keyword.trim().length === 0) {
      // AlertUI 컴포넌트 사용
      confirmAlert(options);

      // {
      //   customUI: ({ onClose }) => {
      //     return (
      //       <AlertUI alertText="검색어를 입력해주세요." onClose={onClose} />
      //     );
      //   },
      // }
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
      <S.SearchInput
        type="text"
        value={keyword}
        onChange={inputChangeHandler}
        placeholder="분양 정보를 검색해보세요."
        onKeyPress={OnKeyPressHandler}
      />
      <S.SearchBtn onClick={searchHandler}>
        <AiOutlineSearch style={{ fontSize: 20, color: '#BCC0CB' }} />
      </S.SearchBtn>
    </S.SearchBox>
  );
};

export default SearchInput;
