import { getToday } from '@/common/utils';
import * as S from './style';

const Overlay = ({ result }: any) => {
  const today = getToday();

  return (
    <S.OverlayContainer>
      <div style={{ fontWeight: 600 }}>{result?.HOUSE_NM}</div>

      <div>{result?.HSSPLY_ADRES}</div>
    </S.OverlayContainer>
  );
};
export default Overlay;
