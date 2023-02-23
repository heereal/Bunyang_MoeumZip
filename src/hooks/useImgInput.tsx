// 이미지 변경 커스텀훅
const useImgInput = (setImg: any) => {
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImg(reader.result);
        }
      };
    }
  };

  const reset = () => {
    setImg('');
  };

  return { onImageChange, reset };
};

export default useImgInput;
