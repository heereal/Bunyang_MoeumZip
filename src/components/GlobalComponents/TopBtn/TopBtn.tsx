import { useState, useEffect } from 'react';
import * as S from './style';
import { VscTriangleUp } from 'react-icons/vsc';

const TopBtn = () => {
  const [showButton, setShowButton] = useState(false);
  const topBtnScroll = document.querySelector('#topBtnScroll');

  const [componentScrollY, setComponentScrollY] = useState<
    number | undefined
  >();

  // 버튼 클릭 시 '맨 위로' 실행되는 함수
  const topBtn = () => {
    topBtnScroll?.scroll({
      top: 0,
      behavior: 'smooth',
    });

    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleShowButton = () => {
    setComponentScrollY(topBtnScroll?.scrollTop);
    if (componentScrollY! > 400) {
      setShowButton(true);
    } else if (window.scrollY > 400) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // 웹(반응형X)에서 컴포넌트 내부 스크롤에 따라 top버튼 생성, 제거
  useEffect(() => {
    topBtnScroll?.addEventListener('scroll', handleShowButton);
    return () => {
      topBtnScroll?.removeEventListener('scroll', handleShowButton);
    };
    // eslint-disable-next-line
  }, [componentScrollY]);

  // 반응형일 때 window 스크롤에 따라 top버튼 생성, 제거
  useEffect(() => {
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {showButton && (
        <S.TopBtnSection>
          <S.TopBtn onClick={topBtn} type="button">
            <VscTriangleUp color="white" fontSize={15} />
            TOP
          </S.TopBtn>
        </S.TopBtnSection>
      )}
    </>
  );
};

export default TopBtn;
