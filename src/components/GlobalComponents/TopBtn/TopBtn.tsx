import { useState, useEffect } from 'react';
import * as S from './style';

const TopBtn = () => {
  const [showButton, setShowButton] = useState(false);

  // 버튼 클릭 시 '맨 위로' 실행되는 함수
  const topBtn = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);
  return (
    <>
      {showButton && (
        <S.TopBtnSection>
          <S.TopBtn onClick={topBtn} type="button">
            Top
          </S.TopBtn>
        </S.TopBtnSection>
      )}
    </>
  );
};

export default TopBtn;