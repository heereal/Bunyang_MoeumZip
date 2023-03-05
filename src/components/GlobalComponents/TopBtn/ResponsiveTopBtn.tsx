import { useState, useEffect } from 'react';
import * as S from './style';
import { VscTriangleUp } from 'react-icons/vsc';

const ResponsiveTopBtn = () => {
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
      if (window.scrollY > 300) {
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
        <S.ResponsiveTopBtnSection>
          <S.TopBtn onClick={topBtn} type="button">
            <VscTriangleUp color="white" fontSize={15} />
            TOP
          </S.TopBtn>
        </S.ResponsiveTopBtnSection>
      )}
    </>
  );
};

export default ResponsiveTopBtn;
