import Link from 'next/link';
import * as S from './style';

const InfoLinkBtn = () => {
  return (
    <S.Container>
      <S.BtnBox>
        <Link
          href={
            'https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do'
          }
          legacyBehavior
        >
          <a style={{ textDecoration: 'none', color: '#356eff' }}>
            청약경쟁률 확인
          </a>
        </Link>
      </S.BtnBox>

      <S.BtnBox>
        <Link
          href={'https://www.applyhome.co.kr/wa/waa/selectAptPrzwinDescList.do'}
          legacyBehavior
        >
          <a style={{ textDecoration: 'none', color: '#356eff' }}>
            청약당첨자 확인
          </a>
        </Link>
      </S.BtnBox>
    </S.Container>
  );
};

export default InfoLinkBtn;
