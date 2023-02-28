import { getToday } from '@/common/utils';
import * as S from './style';

const MarkerIcon = ({ result }: any) => {
  const today = getToday();
  return (
    <S.MarkerIconContainer
      style={{
        backgroundColor:
          result?.RCEPT_BGNDE <= today && result?.RCEPT_ENDDE >= today
            ? '#64c590'
            : '#BD6FD9',
      }}
    >
      {result?.RCEPT_BGNDE <= today && result?.RCEPT_ENDDE >= today
        ? '청약가능'
        : '청약예정'}
    </S.MarkerIconContainer>
  );
};

export default MarkerIcon;
