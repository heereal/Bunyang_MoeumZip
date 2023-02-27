import { getToday } from '@/common/utils';
import * as S from './style';

const Overlay = ({ result }: any) => {
  const today = getToday();

  return (
    <S.OverlayContainer
      style={{
        backgroundColor:
          result.RCEPT_BGNDE <= today && result.RCEPT_ENDDE >= today
            ? '#64c590'
            : '#BD6FD9',
      }}
    >
      <div>{result?.HOUSE_NM}</div>

      <div>{result?.HSSPLY_ADRES}</div>
    </S.OverlayContainer>
  );
};
export default Overlay;
