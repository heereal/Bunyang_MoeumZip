import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import theButton from '../../assets/apiCallButton.jpg';

const MustHaveToDo = () => {
  // 버튼 클릭 시 전체 API data가 firebase에 들어감

  return (
    <>
      <HeadTitle title={'관리자페이지'} />
      <div>
        <ApiCallBtn>
          <Image
            // onClick={ }
            src={theButton}
            alt="APICallButton"
            width={500}
            height={500}
            quality={100}
            style={{ cursor: 'pointer' }}
            priority={true}
          />
        </ApiCallBtn>
      </div>
    </>
  );
};

export default MustHaveToDo;

// styled component
const ApiCallBtn = styled.button`
  background-color: transparent;
  border: none;
`;

// API 통합 데이터 사전 렌더링
export const getStaticProps: GetStaticProps = async () => {
  const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
  const METHOD_APT_ALL = 'getAPTLttotPblancDetail';
  const METHOD_APT_DETAIL = 'getAPTLttotPblancMdl';

  const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

  // 공고문 리스트 가져오기
  const defaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_ALL}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  // 공고문 상세정보 전체 리스트 가져오기
  const detailList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) =>
      // 2023년 이후 올라온 공고문 가져오기
      res.data.data.filter((item: any) => item.PBLANC_NO >= 2023000000),
    );

  // Default + Detail List 합치기
  const combineHomeList = await Promise.all(
    defaultList.map(async (item: any) => {
      return {
        ...item,
        detail: detailList.filter((i: any) => i.PBLANC_NO === item.PBLANC_NO),
      };
    }),
  );

  return {
    props: { homeList: combineHomeList },
    // ISR - 12시간 마다 데이터 업데이트
    revalidate: 43200,
  };
};
