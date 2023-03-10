import * as S from './style';

const InfoLinkBtn = () => {
  return (
    <S.Container>
      <S.BtnBox>
        <a
          target="_blank"
          rel="noreferrer"
          href={
            'https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do'
          }
          style={{ textDecoration: 'none', color: '#356eff' }}
        >
          청약경쟁률 확인
        </a>
      </S.BtnBox>

      <S.BtnBox>
        <a
          href={'https://www.applyhome.co.kr/wa/waa/selectAptPrzwinDescList.do'}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: '#356eff' }}
        >
          청약당첨자 확인
        </a>
      </S.BtnBox>
    </S.Container>
  );
};

export default InfoLinkBtn;
