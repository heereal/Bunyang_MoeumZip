import { getToday } from '@/common/utils';
import Image from 'next/image';
import * as S from './style';
import markericon1 from 'public/assets/markericon1.png';
import markericon2 from 'public/assets/markericon2.png';

const MarkerIcon = ({ result }: any) => {
  const today = getToday();
  return (
    <S.MarkerIconContainer>
      {result?.RCEPT_BGNDE <= today && result?.RCEPT_ENDDE >= today ? (
        <>
          <Image src={markericon1} alt={'청약가능'} height={65} quality={100} />
          <S.MarkerTest>청약가능</S.MarkerTest>
        </>
      ) : (
        <>
          <Image src={markericon2} alt={'청약예정'} height={65} quality={100} />
          <S.MarkerTest>청약예정</S.MarkerTest>
        </>
      )}
    </S.MarkerIconContainer>
  );
};

export default MarkerIcon;
