import { useState, useEffect } from 'react';
import * as S from './style';

const TopBtn = () => {
  const [showButton, setShowButton] = useState(false);
  const topBtnScroll = document.querySelector('#topBtnScroll');

  const [scrollY, setScrollY] = useState<number | undefined>();

  // 버튼 클릭 시 '맨 위로' 실행되는 함수
  const topBtn = () => {
    topBtnScroll?.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleShowButton = () => {
    setScrollY(topBtnScroll?.scrollTop);
    if (scrollY! > 400) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    topBtnScroll?.addEventListener('scroll', handleShowButton);
    return () => {
      topBtnScroll?.removeEventListener('scroll', handleShowButton);
    };
    // eslint-disable-next-line
  }, [scrollY]);

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
