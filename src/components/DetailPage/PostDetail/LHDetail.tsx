import * as S from './style';
interface PropsP {
  home: HomeP | undefined;
}
const LHDetail = ({ home }: PropsP) => {
  return (
    <>
      <S.ArticleHead>공급일정</S.ArticleHead>
      <S.ArticleBox>
        <S.Article>
          <S.BoxTitle color="#f0f4ff">모집공고일</S.BoxTitle>
          <S.BoxContent>
            {home?.RCRIT_PBLANC_DE.slice(0, 4)}-
            {home?.RCRIT_PBLANC_DE.slice(4, 6)}-
            {home?.RCRIT_PBLANC_DE.slice(4, 6)}
          </S.BoxContent>
        </S.Article>
        <S.Article>
          <S.BoxTitle color="#f0f4ff">서류 접수 기간</S.BoxTitle>
          <S.BoxContent>
            {home?.RCEPT_BGNDE}~{home?.RCEPT_ENDDE}
          </S.BoxContent>
        </S.Article>
        <S.Article>
          <S.BoxTitle color="#f0f4ff">당첨자 발표일</S.BoxTitle>
          <S.BoxContent>{home?.PRZWNER_PRESNATN_DE}</S.BoxContent>
        </S.Article>
      </S.ArticleBox>
      {home?.DETAIL[0]?.REGISTER[0].SIL_OFC_GUD_FCTS && (
        <S.ArticleHead>유의사항</S.ArticleHead>
      )}
      <S.ArticleBox>
        {home?.DETAIL[0]?.REGISTER[0].SIL_OFC_GUD_FCTS && (
          <S.Article style={{ backgroundColor: '#f0f4ff' }}>
            <S.BoxTitle>유의사항</S.BoxTitle>
            <S.BoxContent
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: 20,
                backgroundColor: '#ffffff',
              }}
            >
              <div> {home?.DETAIL[0]?.REGISTER[0].SIL_OFC_GUD_FCTS}</div>
            </S.BoxContent>
          </S.Article>
        )}
      </S.ArticleBox>
    </>
  );
};

export default LHDetail;
