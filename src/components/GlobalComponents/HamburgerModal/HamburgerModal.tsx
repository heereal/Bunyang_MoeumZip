import InfoLinkBtn from '@/components/MainPage/InfoLinkBtn/InfoLinkBtn';
import { useRef, useEffect } from 'react';
import * as S from './style';

const HamburgerModal = ({ setHamburgerOpen }: any) => {
  const HamModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (HamModalRef.current && !HamModalRef.current.contains(event?.target)) {
        setHamburgerOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
  }, []);
  return (
    <S.HamModalBack>
      <div>
        <S.HamModalSection ref={HamModalRef}>
          <button onClick={() => setHamburgerOpen(false)}>X</button>
          <div>
            <div>사진</div>
            <div>분양모음집</div>
            <div>마이페이지</div>
            <div>청약캘린더</div>
            <div>
              <InfoLinkBtn />
            </div>
          </div>
        </S.HamModalSection>
      </div>
    </S.HamModalBack>
  );
};

export default HamburgerModal;
