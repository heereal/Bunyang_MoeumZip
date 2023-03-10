import NoResult from '@/components/GlobalComponents/NoResult/NoResult';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';

export default function NotFound() {
  const router = useRouter();

  return (
    <Wrapper width={router.asPath.includes('detail') ? '60%' : '100%'}>
      <NextSeo
        title="404 -"
        description="전국 분양정보를 한눈에 확인할 수 있는 플랫폼입니다."
        canonical="https://www.by-zip.com/404"
        openGraph={{
          url: 'https://www.by-zip.com/404',
        }}
      />
      <NoResult
        title="페이지를 찾을 수 없습니다."
        text="입력하신 페이지의 주소가 정확한지 다시 한 번 확인해주세요."
      />
      <Buttons>
        <HomeBtn onClick={() => router.push('/')}>메인으로</HomeBtn>
        <GoBackBtn onClick={() => router.back()}>이전 페이지</GoBackBtn>
      </Buttons>
    </Wrapper>
  );
}

// style Component
const Wrapper = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
`;

const HomeBtn = styled.button`
  all: unset;

  width: 100px;
  height: 25px;

  padding: 8px;
  border-radius: 7px;
  text-align: center;
  font-weight: 500;

  background-color: #356eff;
  color: #ffffff;

  cursor: pointer;

  @media screen and (max-width: 450px) {
    width: 80px;
    height: 20px;
  }
`;

const GoBackBtn = styled(HomeBtn)`
  background-color: #ffffff;
  color: #356eff;
  border: 1px solid #356eff;
`;
