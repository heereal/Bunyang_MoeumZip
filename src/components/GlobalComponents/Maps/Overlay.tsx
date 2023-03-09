import { getToday } from '@/common/utils';
import * as S from './style';

const Overlay = ({ result }: any) => {
  const today = getToday();

  return (
    <S.OverlayContainer>
      <div style={{ fontWeight: 600 }}>{result?.HOUSE_NM}</div>

      <div>
        {result?.RCEPT_BGNDE &&
          result?.RCEPT_BGNDE.slice(5, 7).replace(/(^0)/, '') +
            '월 ' +
            result?.RCEPT_BGNDE.slice(8, 10).replace(/(^0)/, '') +
            '일' +
            ' ~ ' +
            result?.RCEPT_ENDDE.slice(5, 7).replace(/(^0)/, '') +
            '월 ' +
            result?.RCEPT_ENDDE.slice(8, 10).replace(/(^0)/, '') +
            '일'}
      </div>
    </S.OverlayContainer>
  );
};
export default Overlay;
