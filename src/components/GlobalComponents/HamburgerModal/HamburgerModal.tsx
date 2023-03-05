import InfoLinkBtn from '@/components/MainPage/InfoLinkBtn/InfoLinkBtn';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import * as S from './style';
import logo from 'public/assets/logo.png';
import Link from 'next/link';

const HamburgerModal = ({ setHamburgerOpen }: any) => {
  const HamModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      //@ts-ignore
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
          <S.CloseBtn onClick={() => setHamburgerOpen(false)}>X</S.CloseBtn>
          <S.HamModalBox>
            <Image
              src={logo}
              alt="logoImg"
              width={56}
              height={70}
              quality={100}
              priority={true}
              style={{ marginLeft: '10%' }}
            />
            <S.LogoText>분양모음집</S.LogoText>
            <S.HamNavBox>
              <div>
                <Link href={'/my'}>마이페이지</Link>
              </div>
              <div>청약캘린더</div>
              <InfoLinkBtn />
            </S.HamNavBox>
          </S.HamModalBox>
        </S.HamModalSection>
      </div>
    </S.HamModalBack>
  );
};

export default HamburgerModal;
