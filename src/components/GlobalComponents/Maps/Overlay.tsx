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
      {result.RCEPT_BGNDE <= today && result.RCEPT_ENDDE >= today && (
        <div>청약가능</div>
      )}
      {result.RCEPT_BGNDE > today && <div>청약예정</div>}

      <div>
        {result?.MIN_LTTOT_TOP_AMOUNT.slice(0, 1)}.
        {result?.MIN_LTTOT_TOP_AMOUNT.slice(1, 2)}억
      </div>
    </S.OverlayContainer>
  );
};
export default Overlay;
