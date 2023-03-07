import { getToday } from '@/common/utils';
import * as S from './style';

const Overlay = ({ result }: any) => {
  const today = getToday();

  return (
    <S.OverlayContainer>
      <div style={{ fontWeight: 600 }}>{result?.HOUSE_NM}</div>

      <div>
        {!result?.MIN_LTTOT_TOP_AMOUNT
          ? '모집공고문 확인'
          : result?.MIN_LTTOT_TOP_AMOUNT === result?.MAX_LTTOT_TOP_AMOUNT
          ? result?.MAX_LTTOT_TOP_AMOUNT
          : result?.MIN_LTTOT_TOP_AMOUNT.includes('만원')
          ? result?.MIN_LTTOT_TOP_AMOUNT.slice(0, -2) +
            ' ~ ' +
            result?.MAX_LTTOT_TOP_AMOUNT
          : result?.MIN_LTTOT_TOP_AMOUNT + ' ~ ' + result?.MAX_LTTOT_TOP_AMOUNT}
      </div>
    </S.OverlayContainer>
  );
};
export default Overlay;
