import { MouseEventHandler } from 'react';
import * as S from './style';

// TODO: type 지정하기

// 공통 alert UI
const AlertUI: React.FC<{
  alertDetail?: string;
  alertText: string;
  onClose: MouseEventHandler<HTMLElement>;
  onClick?: any;
  eventText?: string;
}> = (props) => {
  return (
    <S.AlertBack>
      <S.AlertSection>
        <S.AlertBox>
          <S.TextBox>
            <S.AlertText>{props.alertText}</S.AlertText>
            {props.alertDetail ? (
              <S.AlertDetailText>{props.alertDetail}</S.AlertDetailText>
            ) : (
              ''
            )}
          </S.TextBox>
          <S.BtnBox>
            {props.onClick ? (
              <>
                <S.CancelBtn onClick={props.onClose}>취소</S.CancelBtn>
                <S.ConfirmBtn onClick={props.onClick}>
                  {props.eventText}
                </S.ConfirmBtn>
              </>
            ) : (
              <S.AlertBtn onClick={props.onClose}>확인</S.AlertBtn>
            )}
          </S.BtnBox>
        </S.AlertBox>
      </S.AlertSection>
    </S.AlertBack>
  );
};

export default AlertUI;
