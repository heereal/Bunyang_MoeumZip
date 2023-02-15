import { MouseEventHandler, useEffect } from 'react';
import * as S from './style';

// 공통 alert UI
const AlertUI: React.FC<{
  alertTitle?: string;
  alertText: string;
  onClose: MouseEventHandler<HTMLElement>;
  onClick?: MouseEventHandler;
  eventText?: string;
}> = (props) => {
  // FIXME: onCliCk event 후에 onClose 실행시키고 싶음
  // useEffect(() => {
  //   if (props.onClick)
  //     setTimeout(() => {
  //       props.onClose;
  //     }, 1000);
  // });

  return (
    // TODO: semantic 태그로 변경하기
    <S.AlertSection>
      <S.AlertBox>
        <S.TextBox>
          <title>{props.alertTitle}</title>
          <S.AlertText>{props.alertText}</S.AlertText>
        </S.TextBox>
        <S.BtnBox>
          <S.ConfirmBtn onClick={props.onClose}>
            {props.alertTitle ? '취소' : '확인'}
          </S.ConfirmBtn>
          {props.alertTitle ? (
            <button onClick={props.onClick}>{props.eventText}</button>
          ) : (
            ''
          )}
        </S.BtnBox>
      </S.AlertBox>
    </S.AlertSection>
  );
};

export default AlertUI;
