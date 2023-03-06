import Image from 'next/image';
import NoResultImage from '../../../../public/assets/NoResult.png';
import * as S from './style';

const NoResult = ({ keyword, title, text, text2 }: keywordPropsJ) => {
  return (
    <S.Container>
      <Image
        src={NoResultImage}
        alt="NoResultImage"
        width={100}
        height={100}
        quality={100}
        priority={true}
      />
      <S.NoResultTitle>
        {keyword ? (
          <>
            <span style={{ color: '#3d7eee' }}>{keyword}</span> 검색 결과를 찾을
            수 없습니다.
          </>
        ) : (
          title
        )}
      </S.NoResultTitle>
      <S.NoResultText>{text}</S.NoResultText>
      <S.NoResultText>{text2}</S.NoResultText>
    </S.Container>
  );
};

export default NoResult;
