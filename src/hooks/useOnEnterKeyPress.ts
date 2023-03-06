import { KeyboardEvent } from 'react';

// input 입력 시 enter 키로도 제출 가능
// 사용 예시
// const { OnKeyPressHandler } = useOnEnterKeyPress();
// onKeyPress={(e) => OnKeyPressHandler(e, searchHandler)}
const useOnEnterKeyPress = () => {
  const OnKeyPressHandler = (
    e: KeyboardEvent<HTMLDivElement>,
    func: any,
  ): void => {
    if (e.key === 'Enter') {
      func();
    }
  };
  return { OnKeyPressHandler };
};

export default useOnEnterKeyPress;
