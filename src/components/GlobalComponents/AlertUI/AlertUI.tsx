import { MouseEventHandler } from 'react';
import * as S from './style';

// 공통 alert UI
const AlertUI: React.FC<{
  alertText: string;
  alertDetailA?: string;
  alertDetailB?: string;
  onClose: MouseEventHandler<HTMLElement>;
  onClick?: MouseEventHandler<HTMLElement>;
  eventText?: string;
}> = (props) => {
  return (
    <S.AlertBack>
      <S.AlertSection>
        <S.AlertBox>
          <S.TextBox>
            <S.AlertText>{props.alertText}</S.AlertText>
            {props.alertDetailA && (
              <S.AlertDetailText>{props.alertDetailA}</S.AlertDetailText>
            )}
            {props.alertDetailB && (
              <S.AlertDetailText>{props.alertDetailB}</S.AlertDetailText>
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
