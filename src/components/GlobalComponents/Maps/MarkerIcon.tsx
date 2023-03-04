import { getToday } from '@/common/utils';
import Image from 'next/image';
import * as S from './style';
import Variant7 from 'public/assets/Variant7.png';

const MarkerIcon = ({ result }: any) => {
  const today = getToday();
  return (
    <S.MarkerIconContainer>
      <Image src={Variant7} alt={'청약예정'} width={62} height={56} />
      <S.MarkerTest>
        {result?.RCEPT_BGNDE <= today && result?.RCEPT_ENDDE >= today
          ? '청약가능'
          : '청약예정'}
      </S.MarkerTest>
    </S.MarkerIconContainer>
  );
};

export default MarkerIcon;
