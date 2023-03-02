import * as S from './style';

interface PropsP {
  home: HomeP | undefined;
}

const SpecialSupply = ({ home }: PropsP) => {
  return (
    <>
      {home?.HOUSE_SECD === '06' ||
      home?.HOUSE_SECD === '04' ||
      home?.HOUSE_SECD === '02' ? (
        // 계약취소 & 무순위는 특별공급 테이블 안넣음
        <div></div>
      ) : (
        <>
          <S.ArticleHead>특별공급</S.ArticleHead>

          <S.ArticleBox>
            <S.SPLtable>
              <S.SpecialHead style={{ width: '20%' }} color="#f4f4f4">
                주거전용면적
              </S.SpecialHead>
              <S.SpecialHead
                color="#f4f4f4"
                style={{ flexDirection: 'column' }}
              >
                <div style={{ padding: 5 }}>공급세대수</div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: 5,
                  }}
                >
                  <div style={{ width: '12.5%', fontSize: 14 }}>다자녀</div>
                  <div style={{ width: '12.5%', fontSize: 14 }}>신혼부부</div>
                  <div style={{ width: '12.5%', fontSize: 14 }}>생애최초</div>
                  <div style={{ width: '12.5%', fontSize: 14 }}>노부모</div>
                  <div style={{ width: '12.5%', fontSize: 14 }}>기관추천</div>
                  <div style={{ width: '12.5%', fontSize: 14 }}>기타</div>
                  <div style={{ width: '12.5%', fontSize: 14 }}>이전기관</div>
                  <div style={{ width: '12.5%', fontSize: 14 }}>총계</div>
                </div>
              </S.SpecialHead>
            </S.SPLtable>
            {home?.DETAIL.map((item: ItemJ) => {
              return (
                <S.SPLtable key={item.MODEL_NO}>
                  <S.SPLNUM
                    style={{ width: '20%', backgroundColor: '#f4f4f4' }}
                  >
                    {item.HOUSE_TY}
                    <a style={{ fontSize: 18 }}>㎡</a>
                  </S.SPLNUM>

                  <S.SPLhead style={{ width: '80%' }}>
                    <S.SPLTY>
                      <S.TYDetail style={{ width: '12.5%' }}>
                        {item.MNYCH_HSHLDCO}
                      </S.TYDetail>
                      <S.TYDetail style={{ width: '12.5%' }}>
                        {item.NWWDS_HSHLDCO}
                      </S.TYDetail>
                      <S.TYDetail style={{ width: '12.5%' }}>
                        {item.LFE_FRST_HSHLDCO}
                      </S.TYDetail>
                      <S.TYDetail style={{ width: '12.5%' }}>
                        {item.OLD_PARNTS_SUPORT_HSHLDCO}
                      </S.TYDetail>
                      <S.TYDetail style={{ width: '12.5%' }}>
                        {item.INSTT_RECOMEND_HSHLDCO}
                      </S.TYDetail>
                      <S.TYDetail style={{ width: '12.5%' }}>
                        {item.ETC_HSHLDCO}
                      </S.TYDetail>
                      <S.TYDetail style={{ width: '12.5%' }}>
                        {item.TRANSR_INSTT_ENFSN_HSHLDCO}
                      </S.TYDetail>
                      <S.TYDetail style={{ width: '12.5%' }}>
                        {item.SPSPLY_HSHLDCO}
                      </S.TYDetail>
                    </S.SPLTY>
                  </S.SPLhead>
                </S.SPLtable>
              );
            })}
          </S.ArticleBox>
          <div
            style={{
              color: '#8E8E8E',
              fontSize: 14,
              paddingLeft: 10,
              width: '95%',
            }}
          >
            <a>
              *공급세대수는 사업주체의 최초 입주자모집 공고문 기준입니다.
              특별공급 신청 미달 시 잔여물량은 일반공급으로 전환됨에 따라
              일반공급 세대 수가 변경될 수 있으므로 최종 일반공급 세대수는
              일반공급 신청일에 `청약접수 경쟁률`에서 확인 또는 사업주체에
              문의하시기 바랍니다.
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default SpecialSupply;
