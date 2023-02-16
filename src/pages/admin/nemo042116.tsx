import { addHomeList } from '@/common/api';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import theButton from '../../assets/apiCallButton.jpg';
import { useState, useEffect } from 'react';

const MustHaveToDo = ({
  aptList,
  aptRandomList,
  officeList,
  lhDefaultList,
  lhCombineList,
}: any) => {
  const queryClient = useQueryClient();
  const [aptData, setAptData] = useState<any>();
  const newList: any = [];

  // LH
  // 기본 정보 map을 돌려서 얻은 3개의 인자를 url에 넣기

  const LH_BASE_URL = 'https://apis.data.go.kr/B552555';
  const METHOD_LH_DETAIL = 'lhLeaseNoticeDtlInfo1/getLeaseNoticeDtlInfo1';

  const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

  const getURLTest = lhDefaultList.map((item: any) => {
    const listTest = `${item.SPL_INF_TP_CD}, ${item.CCR_CNNT_SYS_DS_CD}, ${item.PAN_ID}`;
    return listTest;
  });
  console.log('getURLTest :>> ', getURLTest);

  // TODO: api콜을 10번 한 다음 5초 있다 다시 하기 - or lhDefaultList 추가로 나눠서 가져오기
  // ex. 전체 / 공고중 / 접수중 or 더 적게 가져와보기
  const lhDetailst = lhDefaultList.map((item: any) => {
    const list = axios
      .get(
        `${LH_BASE_URL}/${METHOD_LH_DETAIL}?serviceKey=${SERVICE_KEY}&SPL_INF_TP_CD=${item.SPL_INF_TP_CD}&CCR_CNNT_SYS_DS_CD=${item.CCR_CNNT_SYS_DS_CD}&PAN_ID=${item.PAN_ID}`,
      )
      .then((res) => res.data);
    return list;
  });

  console.log('getLHDetail:', lhDetailst);

  // const lhDetailList = await axios.get(lhDetailURL).then((res) => res.data);
  // console.log('Detail:', lhDetailList);

  // LH 통합 데이터
  // const lhCombineList = await Promise.all(
  //   lhDefaultList.map(async (item: any) => {
  //     return {
  //       ...item,
  //       detail: lhDetailList.filter((i: any) => i?.dsSch?.PAN_ID),
  //     };
  //   }),
  // );

  // 청약홈 전체 API 통합 리스트
  const allHomeList: any = [];
  aptList.map((item: any) => allHomeList.push(item));
  aptRandomList.map((item: any) => allHomeList.push(item));
  officeList.map((item: any) => allHomeList.push(item));

  // FIXME: 주소의 앞부분을 slice하면 경상남도..가 걸림. 기본 데이터는 경남.
  // TODO: replace?
  // TODO: 무순위나 오피스텔 100몇개 전체 데이터 불러와서 주소 살펴보기
  // console.log(
  //   allHomeList.map((item: any) =>
  //     item.SUBSCRPT_AREA_CODE_NM
  //       ? item.SUBSCRPT_AREA_CODE_NM
  //       : item.HSSPLY_ADRES.slice(0, 2),
  //   ),
  // );
  // console.log(
  //   allHomeList.map((item: any) => (item.detail[0]?.TP ? item.detail.TP : '')),
  // );

  // useEffect(() => {
  //   console.log('useEffect 안:', aptData);
  //   setAptData(newList);
  // }, []);

  // FIXME: 버튼을 처음 누를 때 undefined
  // 버튼 클릭 시 전체 API data가 firebase에 들어감
  const apiCallHandler = async () => {
    allHomeList.map((item: any) => {
      newList.push({
        MIN_SUPLY_AR:
          item?.detail.length === 0
            ? ''
            : item?.detail[0]?.SUPLY_AR
            ? item?.detail[0]?.SUPLY_AR?.split('.')[0].replace(/(^0)/, '')
            : '',

        MAX_SUPLY_AR:
          item?.detail.length === 0
            ? ''
            : item?.detail[0]?.SUPLY_AR
            ? item?.detail[item?.detail?.length - 1].SUPLY_AR?.split(
                '.',
              )[0]?.replace(/(^0)/, '')
            : '',

        MIN_HOUSE_TY:
          item?.detail.length === 0
            ? ''
            : item?.detail[0]?.EXCLUSE_AR
            ? Math.floor(item?.detail[0]?.EXCLUSE_AR)
            : item?.detail[0]?.HOUSE_TY.split('.')[0].replace(/(^0)/, ''),

        MAX_HOUSE_TY:
          item?.detail.length === 0
            ? ''
            : item?.detail[item?.detail?.length - 1]?.EXCLUSE_AR
            ? Math.floor(item?.detail[0]?.EXCLUSE_AR)
            : item?.detail[item?.detail?.length - 1]?.HOUSE_TY.split(
                '.',
              )[0].replace(/(^0)/, ''),

        MIN_LTTOT_TOP_AMOUNT:
          item?.detail.length === 0
            ? ''
            : item?.detail[0]?.LTTOT_TOP_AMOUNT
            ? item?.detail[0]?.LTTOT_TOP_AMOUNT
            : item?.detail[0]?.SUPLY_AMOUNT,

        MAX_LTTOT_TOP_AMOUNT:
          item?.detail.length === 0
            ? ''
            : item?.detail[item?.detail.length - 1]?.LTTOT_TOP_AMOUNT
            ? item?.detail[item?.detail.length - 1]?.LTTOT_TOP_AMOUNT
            : item?.detail[item?.detail.length - 1]?.SUPLY_AMOUNT,

        SPSPLY_HSHLDCO: item.SPSPLY_HSHLDCO ? item.SPSPLY_HSHLDCO : '',
        SUPLY_HSHLDCO: item.SUPLY_HSHLDCO ? item.SUPLY_HSHLDCO : '',
        TOT_SUPLY_HSHLDCO: item.TOT_SUPLY_HSHLDCO,
        HOUSE_NM: item.HOUSE_NM,
        HOUSE_SECD: item.HOUSE_SECD,
        HOUSE_SECD_NM: item.HOUSE_SECD_NM,
        HOUSE_DTL_SECD: item.HOUSE_DTL_SECD ? item.HOUSE_DTL_SECD : '',
        HOUSE_DTL_SECD_NM: item.HOUSE_DTL_SECD_NM ? item.HOUSE_DTL_SECD_NM : '',
        // TODO: 주소가 괄호 안에 있는 것만 쓰거나 알파벳 등이 없어야 좌표가 찍힘
        // 정규식을 써서 주소의 알파벳을 없애기??
        HSSPLY_ADRES: item.HSSPLY_ADRES,
        SUBSCRPT_AREA_CODE: item.UBSCRPT_AREA_CODE
          ? item.UBSCRPT_AREA_CODE
          : '',
        // FIXME: 주소를 슬라이스 하면 경상남도 -> 경상이 됨.
        SUBSCRPT_AREA_CODE_NM: item.SUBSCRPT_AREA_CODE_NM
          ? item.SUBSCRPT_AREA_CODE_NM
          : item.HSSPLY_ADRES.slice(0, 2),

        RCEPT_BGNDE: item.RCEPT_BGNDE
          ? item.RCEPT_BGNDE
          : item.SUBSCRPT_RCEPT_BGNDE,
        RCEPT_ENDDE: item.RCEPT_ENDDE
          ? item.RCEPT_ENDDE
          : item.SUBSCRPT_RCEPT_ENDDE,
        SPSPLY_RCEPT_BGNDE: item.SPSPLY_RCEPT_BGNDE
          ? item.SPSPLY_RCEPT_BGNDE
          : '',
        SPSPLY_RCEPT_ENDDE: item.SPSPLY_RCEPT_ENDDE
          ? item.SPSPLY_RCEPT_ENDDE
          : '',
        GNRL_RNK1_CRSPAREA_RCEPT_PD: item.GNRL_RNK1_CRSPAREA_RCEPT_PD
          ? item.GNRL_RNK1_CRSPAREA_RCEPT_PD
          : '',
        GNRL_RNK1_ETC_GG_RCPTDE_PD: item.GNRL_RNK1_ETC_GG_RCPTDE_PD
          ? item.GNRL_RNK1_ETC_GG_RCPTDE_PD
          : '',
        GNRL_RNK1_ETC_AREA_RCPTDE_PD: item.GNRL_RNK1_ETC_AREA_RCPTDE_PD
          ? item.GNRL_RNK1_ETC_AREA_RCPTDE_PD
          : '',
        GNRL_RNK2_CRSPAREA_RCEPT_PD: item.GNRL_RNK2_CRSPAREA_RCEPT_PD
          ? item.GNRL_RNK2_CRSPAREA_RCEPT_PD
          : '',
        GNRL_RNK2_ETC_GG_RCPTDE_PD: item.GNRL_RNK2_ETC_GG_RCPTDE_PD
          ? item.GNRL_RNK2_ETC_GG_RCPTDE_PD
          : '',
        GNRL_RNK2_ETC_AREA_RCPTDE_PD: item.GNRL_RNK2_ETC_AREA_RCPTDE_PD
          ? item.GNRL_RNK2_ETC_AREA_RCPTDE_PD
          : '',
        HMPG_ADRES: item.HMPG_ADRES,
        RCRIT_PBLANC_DE: item.RCRIT_PBLANC_DE,
        PRZWNER_PRESNATN_DE: item.PRZWNER_PRESNATN_DE,
        CNSTRCT_ENTRPS_NM: item.CNSTRCT_ENTRPS_NM ? item.CNSTRCT_ENTRPS_NM : '',
        BSNS_MBY_NM: item.BSNS_MBY_NM,
        MDHS_TELNO: item.MDHS_TELNO,
        CNTRCT_CNCLS_BGNDE: item.CNTRCT_CNCLS_BGNDE,
        CNTRCT_CNCLS_ENDDE: item.CNTRCT_CNCLS_ENDDE,
        MVN_PREARNGE_YM: item.MVN_PREARNGE_YM,
        SPECLT_RDN_EARTH_AT: item.SPECLT_RDN_EARTH_AT
          ? item.SPECLT_RDN_EARTH_AT
          : '',
        MDAT_TRGET_AREA_SECD: item.MDAT_TRGET_AREA_SECD
          ? item.MDAT_TRGET_AREA_SECD
          : '',
        PBLANC_URL: item.PBLANC_URL,
        PBLANC_NO: item.PBLANC_NO,
        GNRL_RCEPT_BGNDE: item.GNRL_RCEPT_BGNDE ? item.GNRL_RCEPT_BGNDE : '',
        GNRL_RCEPT_ENDDE: item.GNRL_RCEPT_ENDDE ? item.GNRL_RCEPT_ENDDE : '',
        // TODO: 아래 두개는 데이터 콘솔 찍어보고 수정
        // SUBSCRPT_REQST_AMOUNT:item.detail.SUBSCRPT_REQST_AMOUNT,
        TP: item.detail.TP ? item.detail.TP : '',
      });
      setAptData(newList);
    });
    addHomeListMutate.mutate({ aptData });
    console.log('버튼 누른 후:', aptData);
    console.log('데이터 업로드 완료!');
  };

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

//API 전체 데이터
export const getStaticProps: GetStaticProps = async () => {
  // 청약홈
  const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
  // LH
  const LH_BASE_URL = 'https://apis.data.go.kr/B552555';

  // 청약홈
  // APT
  const METHOD_APT_DEFAULT = 'getAPTLttotPblancDetail';
  const METHOD_APT_DETAIL = 'getAPTLttotPblancMdl';
  // APT 무순위
  const METHOD_RANDOM_DEFAULT = 'getRemndrLttotPblancDetail';
  const METHOD_RANDOM_DETAIL = 'getRemndrLttotPblancMdl';
  // 오피스텔/도시형/민간임대
  const METHOD_OFFICE_DEFAULT = 'getUrbtyOfctlLttotPblancDetail';
  const METHOD_OFFICE_DETAIL = 'getUrbtyOfctlLttotPblancMdl';

  // LH TODO: 다시 살펴보기
  const METHOD_LH_DEFAULT = 'lhLeaseNoticeInfo1/lhLeaseNoticeInfo1';
  const METHOD_LH_DETAIL = 'lhLeaseNoticeDtlInfo1/getLeaseNoticeDtlInfo1';

  const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

  // 공고문 기본 정보 리스트 가져오기(2023년 이후 공고)
  // 청약홈
  const aptDefaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_DEFAULT}?page=1&perPage=100&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  const aptRandomDefaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_RANDOM_DEFAULT}?page=1&perPage=100&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  const officeDefaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_OFFICE_DEFAULT}?page=1&perPage=100&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  // LH - 2023년 이후 공고문 전체 리스트 - 없애고 공고중 + 모집중 리스트 만들기
  const lhDefaultList = await axios
    .get(
      `${LH_BASE_URL}/${METHOD_LH_DEFAULT}?serviceKey=${SERVICE_KEY}&PG_SZ=1000&PAGE=1&PAN_ST_DT=20230101`,
    )
    .then((res) => res.data[1].dsList);

  // LH -

  // 공고문 상세정보 전체 리스트 가져오기
  // 청약홈
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

  //LH detailList -

  // APT Default + Detail 통합 List
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

  // APT 무순위 Default + Detail 통합 List
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

  // 오피스텔/도시형/민간임대 Default + Detail 통합 List
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

  // LH Default + Detail 통합 List

  return {
    props: {
      aptList: aptCombineList,
      aptRandomList: aptRandomCombineList,
      officeList: officeCombineList,
      lhDefaultList: lhDefaultList,
    },
    // ISR - 12시간 마다 데이터 업데이트
    revalidate: 43200,
  };
};
