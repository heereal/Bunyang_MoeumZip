import { addHomeList } from '@/common/api';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import theButton from '../../assets/apiCallButton.jpg';
import { useState, useEffect } from 'react';

const MustHaveToDo = ({ aptList, aptRandomList, officeList }: any) => {
  const queryClient = useQueryClient();
  const [aptData, setAptData] = useState<any>();

  // console.log('aptList :>> ', aptList);
  // console.log('aptRandomList :>> ', aptRandomList);
  // console.log('officeList :>> ', officeList);
  // const allList: any = [];
  // const combineData = () => {
  //   aptList.map((item: any) => allList.push(item));
  //   aptRandomList.map((item: any) => allList.push(item));
  //   officeList.map((item: any) => allList.push(item));

  //   return allList;
  // };
  // combineData();
  // console.log(allList);

  // const allDataList = {
  //   SUPLY_AR: '',
  //   HOUSE_TY: '',
  //   LTTOT_TOP_AMOUNT: '',
  //   SPSPLY_HSHLDCO: '',
  //   SUPLY_HSHLDCO: '',
  //   TOT_SUPLY_HSHLDCO: '',
  //   HOUSE_NM: '',
  //   HOUSE_SECD_NM: '',
  //   HOUSE_DTL_SECD_NM: '',
  //   HSSPLY_ADRES: '',
  //   SUBSCRPT_AREA_CODE_NM: '',
  //   RCEPT_BGNDE: '',
  //   RCEPT_ENDDE: '',
  //   SPSPLY_RCEPT_BGNDE: '',
  //   SPSPLY_RCEPT_ENDDE: '',

  //   RCRIT_PBLANC_DE: '',
  //   PRZWNER_PRESNATN_DE: '',
  //   CNSTRCT_ENTRPS_NM: '',
  //   BSNS_MBY_NM: '',
  //   MDHS_TELNO: '',
  //   CNTRCT_CNCLS_BGNDE: '',
  //   CNTRCT_CNCLS_ENDDE: '',
  //   MVN_PREARNGE_YM: '',
  //   SPECLT_RDN_EARTH_AT: '',
  //   MDAT_TRGET_AREA_SECD: '',
  //   PBLANC_URL: '',
  // };

  // console.log(allDataList.HOUSE_NM = );

  // useEffect(() => {
  //   aptList.map((item: any) => setAptData(item));
  // }, []);

  // console.log(aptList);

  // const test: any = [];
  // const testste = aptList.map((item: any) => {
  //   allDataList.HOUSE_NM = item.HOUSE_NM;
  // });
  // console.log(testste);

  // SUPLY_AR: item.detail
  // HOUSE_TY: item.HOUSE_TY,
  // LTTOT_TOP_AMOUNT: item.LTTOT_TOP_AMOUNT,
  // SPSPLY_HSHLDCO: item.SPSPLY_HSHLDCO,
  // SUPLY_HSHLDCO: item.SUPLY_HSHLDCO,
  // TOT_SUPLY_HSHLDCO: item.TOT_SUPLY_HSHLDCO,
  // HOUSE_NM: item.HOUSE_NM,
  // HOUSE_SECD_NM: item.HOUSE_SECD_NM,
  // HOUSE_DTL_SECD_NM: item.HOUSE_DTL_SECD_NM,
  // HSSPLY_ADRES: item.HSSPLY_ADRES,
  // SUBSCRPT_AREA_CODE_NM: item.SUBSCRPT_AREA_CODE_NM,
  // RCEPT_BGNDE: item.RCEPT_BGNDE,
  // RCEPT_ENDDE: item.RCEPT_ENDDE,
  // SPSPLY_RCEPT_BGNDE: item.SPSPLY_RCEPT_BGNDE,
  // SPSPLY_RCEPT_ENDDE: item.SPSPLY_RCEPT_ENDDE,

  // RCRIT_PBLANC_DE: item.RCRIT_PBLANC_DE,
  // PRZWNER_PRESNATN_DE: item.PRZWNER_PRESNATN_DE,
  // CNSTRCT_ENTRPS_NM: item.CNSTRCT_ENTRPS_NM,
  // BSNS_MBY_NM: item.BSNS_MBY_NM,
  // MDHS_TELNO: item.MDHS_TELNO,
  // CNTRCT_CNCLS_BGNDE: item.CNTRCT_CNCLS_BGNDE,
  // CNTRCT_CNCLS_ENDDE: item.CNTRCT_CNCLS_ENDDE,
  // MVN_PREARNGE_YM: item.MVN_PREARNGE_YM,
  // SPECLT_RDN_EARTH_AT: item.SPECLT_RDN_EARTH_AT,
  // MDAT_TRGET_AREA_SECD: item.MDAT_TRGET_AREA_SECD,
  // PBLANC_URL: item.PBLANC_URL,

  // 버튼 클릭 시 전체 API data가 firebase에 들어감
  const apiCallHandler = async () => {
    // aptList.map((item: any) => setAptData(item));
    // const newData = { aptList };

    aptList.map((item: any) => {
      const allList = [
        {
          // SUPLY_AR: item.SUPLY_AR,
          // HOUSE_TY: item.HOUSE_TY,
          // LTTOT_TOP_AMOUNT: item.LTTOT_TOP_AMOUNT,
          // SPSPLY_HSHLDCO: item.SPSPLY_HSHLDCO,
          // SUPLY_HSHLDCO: item.SUPLY_HSHLDCO,
          TOT_SUPLY_HSHLDCO: item.TOT_SUPLY_HSHLDCO,
          HOUSE_NM: item.HOUSE_NM,
          HOUSE_SECD_NM: item.HOUSE_SECD_NM,
          HOUSE_DTL_SECD_NM: item.HOUSE_DTL_SECD_NM,
          HSSPLY_ADRES: item.HSSPLY_ADRES,
          SUBSCRPT_AREA_CODE_NM: item.SUBSCRPT_AREA_CODE_NM,
          RCEPT_BGNDE: item.RCEPT_BGNDE,
          RCEPT_ENDDE: item.RCEPT_ENDDE,
          SPSPLY_RCEPT_BGNDE: item.SPSPLY_RCEPT_BGNDE,
          SPSPLY_RCEPT_ENDDE: item.SPSPLY_RCEPT_ENDDE,

          // RCRIT_PBLANC_DE: item.RCRIT_PBLANC_DE,
          // PRZWNER_PRESNATN_DE: item.PRZWNER_PRESNATN_DE,
          // CNSTRCT_ENTRPS_NM: item.CNSTRCT_ENTRPS_NM,
          // BSNS_MBY_NM: item.BSNS_MBY_NM,
          // MDHS_TELNO: item.MDHS_TELNO,
          // CNTRCT_CNCLS_BGNDE: item.CNTRCT_CNCLS_BGNDE,
          // CNTRCT_CNCLS_ENDDE: item.CNTRCT_CNCLS_ENDDE,
          // MVN_PREARNGE_YM: item.MVN_PREARNGE_YM,
          // SPECLT_RDN_EARTH_AT: item.SPECLT_RDN_EARTH_AT,
          // MDAT_TRGET_AREA_SECD: item.MDAT_TRGET_AREA_SECD,
          // PBLANC_URL: item.PBLANC_URL,
        },
      ];

      setAptData(allList);
    });
    addHomeListMutate.mutate(aptData);
    console.log('데이터 업로드 완료!');
  };
  console.log(aptData);
  const addHomeListMutate = useMutation(addHomeList, {
    onSuccess: () => {
      queryClient.invalidateQueries('HomeList');
    },
  });

  return (
    <>
      <HeadTitle title={'관리자페이지'} />
      <div>
        <ApiCallBtn>
          <Image
            onClick={apiCallHandler}
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

// 청약홈 API 전체 데이터 사전 렌더링
export const getStaticProps: GetStaticProps = async () => {
  const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
  // APT
  const METHOD_APT_DEFAULT = 'getAPTLttotPblancDetail';
  const METHOD_APT_DETAIL = 'getAPTLttotPblancMdl';
  // APT 무순위
  const METHOD_RANDOM_DEFAULT = 'getRemndrLttotPblancDetail';
  const METHOD_RANDOM_DETAIL = 'getRemndrLttotPblancMdl';
  // 오피스텔/도시형/민간임대
  const METHOD_OFFICE_DEFAULT = 'getUrbtyOfctlLttotPblancDetail';
  const METHOD_OFFICE_DETAIL = 'getUrbtyOfctlLttotPblancMdl';

  const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

  // 공고문 기본 정보 리스트 가져오기(2023년 이후 공고)
  const aptDefaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_DEFAULT}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  const aptRandomDefaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_RANDOM_DEFAULT}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  const officeDefaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_OFFICE_DEFAULT}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  // 공고문 상세정보 전체 리스트 가져오기
  const aptDetailList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) =>
      res.data.data.filter((item: any) => item.PBLANC_NO >= 2023000000),
    );

  const aptRandomDetailList = await axios
    .get(
      `${BASE_URL}/${METHOD_RANDOM_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) =>
      res.data.data.filter((item: any) => item.PBLANC_NO >= 2023000000),
    );

  const officeDetailList = await axios
    .get(
      `${BASE_URL}/${METHOD_OFFICE_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) =>
      res.data.data.filter((item: any) => item.PBLANC_NO >= 2023000000),
    );

  // APT Default + Detail List
  const aptCombineList = await Promise.all(
    aptDefaultList.map(async (item: any) => {
      return {
        ...item,
        detail: aptDetailList.filter(
          (i: any) => i.PBLANC_NO === item.PBLANC_NO,
        ),
      };
    }),
  );

  // APT 무순위 Default + Detail List
  const aptRandomCombineList = await Promise.all(
    aptRandomDefaultList.map(async (item: any) => {
      return {
        ...item,
        detail: aptRandomDetailList.filter(
          (i: any) => i.PBLANC_NO === item.PBLANC_NO,
        ),
      };
    }),
  );

  // 오피스텔/도시형/민간임대 Default + Detail List
  const officeCombineList = await Promise.all(
    officeDefaultList.map(async (item: any) => {
      return {
        ...item,
        detail: officeDetailList.filter(
          (i: any) => i.PBLANC_NO === item.PBLANC_NO,
        ),
      };
    }),
  );

  return {
    props: {
      aptList: aptCombineList,
      aptRandomList: aptRandomCombineList,
      officeList: officeCombineList,
    },
    // ISR - 12시간 마다 데이터 업데이트
    revalidate: 43200,
  };
};
