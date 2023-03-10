import * as S from './style';

interface PropsP {
  home: HomeP | undefined;
}

const SpecialSupply = ({ home }: PropsP) => {
  return (
    <>
      {home?.HOUSE_SECD === '06' ||
      home?.HOUSE_SECD === '04' ||
      home?.HOUSE_SECD === '03' ||
      home?.HOUSE_SECD === '02' ? (
        // 계약취소 & 무순위는 특별공급 테이블 안넣음
        <div></div>
      ) : (
        <>
          <S.ArticleHead>특별공급</S.ArticleHead>

          <S.ArticleBox>
            <tbody>
              <tr>
                <S.BoxTitleSpecialHead rowSpan={2}>
                  주거전용면적
                </S.BoxTitleSpecialHead>
                <S.BoxTitleSupply colSpan={8}>공급세대수</S.BoxTitleSupply>
              </tr>
              <tr>
                <S.BoxTitleSpecial>다자녀</S.BoxTitleSpecial>
                <S.BoxTitleSpecial>신혼부부</S.BoxTitleSpecial>
                <S.BoxTitleSpecial>생애최초</S.BoxTitleSpecial>
                <S.BoxTitleSpecial>노부모</S.BoxTitleSpecial>
                <S.BoxTitleSpecial>기관추천</S.BoxTitleSpecial>
                <S.BoxTitleSpecial>기타</S.BoxTitleSpecial>
                <S.BoxTitleSpecial>이전기관</S.BoxTitleSpecial>
                <S.BoxTitleSpecial>총계</S.BoxTitleSpecial>
              </tr>

              {home?.DETAIL.map((item: ItemJ) => {
                return (
                  <tr key={item.MODEL_NO}>
                    <S.BoxContentHouseTY>{item.HOUSE_TY}</S.BoxContentHouseTY>
                    <S.BoxContentSupply>
                      {item.MNYCH_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentSupply>
                      {item.NWWDS_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentSupply>
                      {item.LFE_FRST_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentSupply>
                      {item.OLD_PARNTS_SUPORT_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentSupply>
                      {item.INSTT_RECOMEND_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentSupply>{item.ETC_HSHLDCO}</S.BoxContentSupply>
                    <S.BoxContentSupply>
                      {item.TRANSR_INSTT_ENFSN_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentSupply>
                      {item.SPSPLY_HSHLDCO}
                    </S.BoxContentSupply>
                  </tr>
                );
              })}
            </tbody>
          </S.ArticleBox>
          <div
            style={{
              color: '#8E8E8E',
              fontSize: 14,
              width: '95%',
            }}
          >
            <S.info>
              *공급세대수는 사업주체의 최초 입주자모집 공고문 기준입니다.
              특별공급 신청 미달 시 잔여물량은 일반공급으로 전환됨에 따라
              일반공급 세대 수가 변경될 수 있으므로 최종 일반공급 세대수는
              일반공급 신청일에 `청약접수 경쟁률`에서 확인 또는 사업주체에
              문의하시기 바랍니다.
            </S.info>
          </div>
        </>
      )}
    </>
  );
};

export default SpecialSupply;
