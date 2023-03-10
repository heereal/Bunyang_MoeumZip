import * as S from './style';

interface PropsP {
  home: HomeP | undefined;
}

export const ExtraInfo = ({ home }: PropsP) => {
  return (
    <>
      <S.ArticleHead>기타사항</S.ArticleHead>
      <S.ArticleBox>
        <tbody>
          <tr>
            <S.BoxTitleETC>시행사</S.BoxTitleETC>
            <S.BoxTitleETC>시공사</S.BoxTitleETC>
            <S.BoxTitleETC> 사업주체 전화번호</S.BoxTitleETC>
          </tr>
          <tr>
            <S.BoxContentETC>{home?.BSNS_MBY_NM}</S.BoxContentETC>
            <S.BoxContentETC> {home?.CNSTRCT_ENTRPS_NM}</S.BoxContentETC>
            {home?.MDHS_TELNO.length === 8 ? (
              <S.BoxContentETC>
                {home?.MDHS_TELNO.slice(0, 4)}-{home?.MDHS_TELNO.slice(4, 8)}
              </S.BoxContentETC>
            ) : (
              <S.BoxContentETC>
                {home?.MDHS_TELNO.slice(0, 3)}-{home?.MDHS_TELNO.slice(3, 6)}-
                {home?.MDHS_TELNO.slice(6, 12)}
              </S.BoxContentETC>
            )}
          </tr>
        </tbody>
      </S.ArticleBox>
    </>
  );
};
