import { addHomeList } from '@/common/api';
import { db } from '@/common/firebase';
import { getToday } from '@/common/utils';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import { async } from '@firebase/util';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import coordinatesBtn from '../../../public/assets/apiCallButton_blue.png';
import lastDbButton from '../../../public/assets/apiCallButton_green.png';
import firsDbtButton from '../../../public/assets/apiCallButton_red.png';
import * as S from '../../styles/admin.style';

const MustHaveToDo = ({
  aptCombineList,
  aptRandomCombineList,
  officeCombineList,
  homeListDB,
  lhCombineList,
  lhNoticeList,
  lhDetailList,
}: ListPropsJ) => {
  const queryClient = useQueryClient();

  // console.log('lhNoticeList', lhNoticeList);
  // console.log('lhDetailList', lhDetailList);
  // console.log(
  //   'detail',
  //   lhDetailList.map((item) => item[0].dsSch[0].PAN_ID),
  // );

  console.log('lhCombineList', lhCombineList);

  // DB에 들어가는 최종 분양 정보 리스트
  const [allHomeData, setAllHomeData] = useState<{ [key: string]: string }[]>(
    [],
  );

  // 새로 들어온 분양 정보
  const [newHomeData, setNewHomeData] = useState<{ [key: string]: string }[]>(
    [],
  );

  const newList: {}[] = [];
  const filteredArr: {}[] = [];

  // 새로 들어온 데이터에 좌표까지 추가한 배열
  const [newGeoArray, setNewGeoArray] = useState<any>([]);

  // 최종으로 DB 업데이트한 시각
  const [btnTime, setBtnTime] = useState<string>('');

  // 지역이름이 없는 APT 무순위, 오피스텔 리스트 합치기
  const randomOfficeList: { [key: string]: string }[] = [];
  aptRandomCombineList?.map((item: ItemJ) => randomOfficeList.push(item));
  officeCombineList?.map((item: ItemJ) => randomOfficeList.push(item));

  // APT 무순위 + 오피스텔 리스트에 주소 앞부분을 잘라 지역 이름 추가하기
  const addAreaNameList = randomOfficeList.map((item) => {
    return {
      ...item,
      SUBSCRPT_AREA_CODE_NM: item.HSSPLY_ADRES.slice(0, 4),
    };
  });

  // 지역 이름 통일하기
  const replaceAreaNameAptOfficeList = addAreaNameList.map((item) => {
    return {
      ...item,
      SUBSCRPT_AREA_CODE_NM:
        item.SUBSCRPT_AREA_CODE_NM === '경상남도'
          ? item.SUBSCRPT_AREA_CODE_NM.replace(/[경상남도]/g, '경남')
          : item.SUBSCRPT_AREA_CODE_NM &&
            item.SUBSCRPT_AREA_CODE_NM === '경상북도'
          ? item.SUBSCRPT_AREA_CODE_NM.replace(/[경상북도]/g, '경북')
          : item.SUBSCRPT_AREA_CODE_NM &&
            item.SUBSCRPT_AREA_CODE_NM === '전라남도'
          ? item.SUBSCRPT_AREA_CODE_NM.replace(/[전라남도]/g, '전남')
          : item.SUBSCRPT_AREA_CODE_NM &&
            item.SUBSCRPT_AREA_CODE_NM === '전라북도'
          ? item.SUBSCRPT_AREA_CODE_NM.replace(/[전라북도]/g, '전북')
          : item.SUBSCRPT_AREA_CODE_NM &&
            item.SUBSCRPT_AREA_CODE_NM === '충청남도'
          ? item.SUBSCRPT_AREA_CODE_NM.replace(/[충청남도]/g, '충남')
          : item.SUBSCRPT_AREA_CODE_NM &&
            item.SUBSCRPT_AREA_CODE_NM === '충청북도'
          ? item.SUBSCRPT_AREA_CODE_NM.replace(/[충청북도]/g, '충북')
          : item.SUBSCRPT_AREA_CODE_NM,
    };
  });

  const today = getToday();

  // 청약홈 전체 API 통합 리스트
  const allHomeList: {}[] = [];
  aptCombineList?.map((item: ItemJ) => allHomeList.push(item));
  replaceAreaNameAptOfficeList.map((item: ItemJ) => allHomeList.push(item));

  // 청약이 마감되지 않은 전체 API 통합 리스트
  const possibleAllHomeList = allHomeList.filter(
    (item: ItemJ) =>
      item.RCEPT_ENDDE >= today || item.SUBSCRPT_RCEPT_ENDDE >= today,
  );

  // firestore에서 불러 온 기존 분양 데이터의 PBLANC_NO만 추출해서 생성한 배열
  const PBLANCArray = homeListDB.map((item) => item.PBLANC_NO);

  // firestore에서 불러 온 기존 데이터 중 접수일이 종료되지 않은 것만 필터링함
  const oldDataArray = homeListDB.filter(
    (item: ItemJ) =>
      item.RCEPT_ENDDE >= today || item.SUBSCRPT_RCEPT_ENDDE >= today,
  );

  // [1번 버튼] 클릭 시 새로 들어온 데이터를 재가공함
  const apiCallHandler = () => {
    // DB 마지막으로 업데이트한 시각
    const onClickDate = new Date().toLocaleString();

    // 기존 데이터 제외 새로 들어온 데이터만 필터링함
    const newDataArray = possibleAllHomeList.filter(
      (item: any) => !PBLANCArray.includes(`${item.PBLANC_NO}`),
    );

    newDataArray.map((item: any) => {
      newList.push({
        COORDINATES: 'x:, y:',
        BUTTON_DATE: onClickDate,
        DETAIL: item.detail,
        FOR_COORDINATES_ADRES: item.HSSPLY_ADRES.split(',')[0].split('외')[0],

        MIN_SUPLY_AR: item?.detail[0]?.SUPLY_AR
          ? item?.detail[0]?.SUPLY_AR?.split('.')[0].replace(/(^0)/, '') + '㎡'
          : '',

        MAX_SUPLY_AR: item?.detail[0]?.SUPLY_AR
          ? item?.detail[item?.detail?.length - 1]?.SUPLY_AR?.split(
              '.',
            )[0]?.replace(/(^0)/, '') + '㎡'
          : '',

        MIN_HOUSE_TY:
          item.detail.length === 0
            ? ''
            : item?.detail[0]?.EXCLUSE_AR
            ? Math.floor(item?.detail[0]?.EXCLUSE_AR) + '㎡'
            : item?.detail[0]?.HOUSE_TY.split('.')[0].replace(/(^0)/, '') +
              '㎡',

        MAX_HOUSE_TY:
          item.detail.length === 0
            ? ''
            : item?.detail[item?.detail?.length - 1]?.EXCLUSE_AR
            ? Math.floor(item?.detail[0]?.EXCLUSE_AR) + '㎡'
            : item?.detail[item?.detail?.length - 1]?.HOUSE_TY.split(
                '.',
              )[0].replace(/(^0)/, '') + '㎡',

        // TODO: 금액이 6자리 이상일 때만 잘라야 억으로 잘림
        MIN_LTTOT_TOP_AMOUNT:
          item.detail.length === 0
            ? ''
            : item?.detail[0]?.LTTOT_TOP_AMOUNT
            ? item?.detail[0]?.LTTOT_TOP_AMOUNT
            : item?.detail[0]?.SUPLY_AMOUNT,

        MAX_LTTOT_TOP_AMOUNT:
          item.detail.length === 0
            ? ''
            : item?.detail[item?.detail?.length - 1]?.LTTOT_TOP_AMOUNT
            ? item?.detail[item?.detail?.length - 1]?.LTTOT_TOP_AMOUNT
            : item?.detail[item?.detail?.length - 1]?.SUPLY_AMOUNT,

        SPSPLY_HSHLDCO: item.SPSPLY_HSHLDCO ? item.SPSPLY_HSHLDCO + '세대' : '',
        SUPLY_HSHLDCO: item.SUPLY_HSHLDCO ? item.SUPLY_HSHLDCO + '세대' : '',
        TOT_SUPLY_HSHLDCO: item.TOT_SUPLY_HSHLDCO + '세대',
        HOUSE_NM: item.HOUSE_NM,
        HOUSE_SECD: item.HOUSE_SECD,
        HOUSE_SECD_NM:
          item.HOUSE_SECD === '02'
            ? '오피스텔'
            : item.HOUSE_SECD_NM.replace(/[주택]/g, '').split('/')[0],
        HOUSE_DTL_SECD: item.HOUSE_DTL_SECD ? item.HOUSE_DTL_SECD : '',
        HOUSE_DTL_SECD_NM: item.HOUSE_DTL_SECD_NM ? item.HOUSE_DTL_SECD_NM : '',
        HSSPLY_ADRES: item.HSSPLY_ADRES,
        SUBSCRPT_AREA_CODE: item.UBSCRPT_AREA_CODE
          ? item.UBSCRPT_AREA_CODE
          : '',
        SUBSCRPT_AREA_CODE_NM: item.SUBSCRPT_AREA_CODE_NM
          ? item.SUBSCRPT_AREA_CODE_NM.slice(0, 2)
          : '',
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
        PBLANC_NO: `${item.PBLANC_NO}`,
        GNRL_RCEPT_BGNDE: item.GNRL_RCEPT_BGNDE ? item.GNRL_RCEPT_BGNDE : '',
        GNRL_RCEPT_ENDDE: item.GNRL_RCEPT_ENDDE ? item.GNRL_RCEPT_ENDDE : '',
        SUBSCRPT_REQST_AMOUNT: item.detail[0]?.SUBSCRPT_REQST_AMOUNT
          ? item.detail[0]?.SUBSCRPT_REQST_AMOUNT + '만원'
          : '',
      });
      setNewHomeData(newList);
    });
    setAllHomeData([...oldDataArray]);
    setBtnTime(onClickDate);

    console.log('1번 버튼 실행 완료👇');
    console.log('firebase에서 불러온 기존 데이터', oldDataArray);
    console.log(`새로 들어온 데이터 ${newHomeData.length}개:`, newHomeData);
    console.log(
      `allHomeData는 총 ${
        oldDataArray.length + newHomeData.length
      }개가 되어야 합니다!`,
    );
  };

  // [2번 버튼] 클릭 시 새로 들어온 데이터에 좌표를 추가하고
  // 기존 + 새로운 데이터를 합쳐서 allHomeData에 담음
  const locationHandler = async () => {
    for (let i = 0; i < newHomeData.length; i++) {
      naver.maps.Service.geocode(
        {
          query: newHomeData[i].FOR_COORDINATES_ADRES,
        },
        (status, response) => {
          if (
            status === naver.maps.Service.Status.OK &&
            response.v2.addresses[0]
          ) {
            filteredArr.push({
              ...newHomeData[i],
              COORDINATES: {
                x: response.v2.addresses[0].x,
                y: response.v2.addresses[0].y,
              },
            });
          } else {
            filteredArr.push({
              ...newHomeData[i],
              COORDINATES: { x: '이거채워야함', y: '이거채워야함' },
            });
            console.log(
              `근무자님, ${oldDataArray.length + i - 1}번째에 있는 ${
                newHomeData[i].FOR_COORDINATES_ADRES
              } 채워주세요~`,
            );
            alert(
              `근무자님, ${oldDataArray.length + i - 1}번째에 있는 ${
                newHomeData[i].FOR_COORDINATES_ADRES
              } 채워주세요~`,
            );
          }
        },
      );
    }
    setNewGeoArray(filteredArr);

    console.log('2번 버튼 실행 완료👇');
    console.log('NewGeoArray:', newGeoArray);
    console.log('allHomeData:', [...oldDataArray, ...newGeoArray]);
    return setAllHomeData([...oldDataArray, ...newGeoArray]);
  };

  // [3번 버튼] 좌표가 생성된 최종 데이터를 다시 DB에 넣음
  const updateInfoHandler = async () => {
    addHomeListMutate.mutate({ allHomeData });

    console.log('firesotre에 업로드 완료👇');
    console.log('allHomeData:', allHomeData);
  };

  // Friebase DB에 homeList 추가
  const addHomeListMutate = useMutation(addHomeList, {
    onSuccess: () => {
      queryClient.invalidateQueries('HomeList');
    },
  });

  // FIXME: 새로고침 해야 날짜가 바뀜!!
  // eslint-disable-next-line
  useEffect(() => setBtnTime(homeListDB[0]?.BUTTON_DATE), []);

  return (
    <>
      <HeadTitle title={'관리자페이지 |'} />
      <S.AdminSection>
        <S.TitleBox>
          <S.DbTimeTitle>{btnTime}</S.DbTimeTitle>
        </S.TitleBox>
        <S.BtnSection>
          <S.ApiCallBtn>
            <Image
              onClick={apiCallHandler}
              src={firsDbtButton}
              alt="APICallButton"
              width={300}
              height={300}
              quality={100}
              style={{ cursor: 'pointer' }}
              priority={true}
            />
            <S.BtnText>DB에 넣기</S.BtnText>
          </S.ApiCallBtn>
          <S.ApiCallBtn>
            <Image
              onClick={locationHandler}
              src={coordinatesBtn}
              alt="coordinatesBtn"
              width={300}
              height={300}
              quality={100}
              style={{ cursor: 'pointer' }}
              priority={true}
            />
            <S.BtnText>좌표 생성</S.BtnText>
          </S.ApiCallBtn>
          <S.ApiCallBtn>
            <Image
              onClick={updateInfoHandler}
              src={lastDbButton}
              alt="APICallButton"
              width={300}
              height={300}
              quality={100}
              style={{ cursor: 'pointer' }}
              priority={true}
            />
            <S.BtnText>다시 DB에 넣기</S.BtnText>
          </S.ApiCallBtn>
        </S.BtnSection>
      </S.AdminSection>
    </>
  );
};

export default MustHaveToDo;

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
      `${BASE_URL}/${METHOD_APT_DEFAULT}?page=1&perPage=1000&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res: any) => res.data.data);

  const aptRandomDefaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_RANDOM_DEFAULT}?page=1&perPage=1000&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res: any) => res.data.data);

  const officeDefaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_OFFICE_DEFAULT}?page=1&perPage=1000&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res: any) => res.data.data);

  // LH - 공고중 리스트
  const lhNoticeList = await axios
    .get(
      `${LH_BASE_URL}/${METHOD_LH_DEFAULT}?serviceKey=${SERVICE_KEY}&PG_SZ=1000&PAGE=1&PAN_SS="공고중"
      `,
    )
    .then((res: any) => res.data[1].dsList);

  // LH - 접수중 리스트
  const lhRegisterList = await axios
    .get(
      `${LH_BASE_URL}/${METHOD_LH_DEFAULT}?serviceKey=${SERVICE_KEY}&PG_SZ=1000&PAGE=1&PAN_SS="접수중"
  `,
    )
    .then((res: any) => res.data[1].dsList);

  // LH - 공고중 + 접수중
  // const lhDefaultList
  // TODO: 지역까지 넣어서 리스트 가져와야 할 경우 map 돌려서 해보기.. 지역을 빈 배열에 넣어서!

  // LH - 2023년 이후 + 공고중 + 임대주택 -> TODO: 변경하기 => 분양주택, 임대주택, 신혼희망타운
  const lhNoticeAList = await axios
    .get(
      `${LH_BASE_URL}/${METHOD_LH_DEFAULT}?serviceKey=${SERVICE_KEY}&PG_SZ=1000&PAGE=1&PAN_ST_DT=20230101&PAN_SS="공고중"&UPP_AIS_TP_CD=06
    `,
    )
    .then((res: any) => res.data[1].dsList);

  // 공고문 상세정보 전체 리스트 가져오기
  // 청약홈
  const aptDetailList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res: any) => res.data.data);

  const aptRandomDetailList = await axios
    .get(
      `${BASE_URL}/${METHOD_RANDOM_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res: any) => res.data.data);

  const officeDetailList = await axios
    .get(
      `${BASE_URL}/${METHOD_OFFICE_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res: any) => res.data.data);

  //LH detailList
  const lhDetailList = await Promise.all(
    lhNoticeList.map((item: any) =>
      axios
        .get(
          `${LH_BASE_URL}/${METHOD_LH_DETAIL}?serviceKey=${SERVICE_KEY}&SPL_INF_TP_CD=${item.SPL_INF_TP_CD}&CCR_CNNT_SYS_DS_CD=${item.CCR_CNNT_SYS_DS_CD}&PAN_ID=${item.PAN_ID}`,
        )
        .then((res) => res.data),
    ),
  );

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
  const lhCombineList = await Promise.all(
    lhNoticeList.map((item: any) => {
      return {
        ...item,
        detail: lhDetailList.filter(
          (i: any) => i[0]?.dsSch[0]?.PAN_ID === item.PAN_ID,
        ),
      };
    }),
  );

  // TODO: client에서 불러오기
  // 통합 리스트 불러오기 - 버튼 누른 날짜 화면에 표시하기
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  const homeList = docSnap.data();
  const homeListDB = homeList?.allHomeData;

  return {
    props: {
      aptCombineList,
      aptRandomCombineList,
      officeCombineList,
      homeListDB,
      lhNoticeList,
      lhDetailList,
      // lhRegisterList,
      lhCombineList,
    },
    // ISR - 6시간 마다 데이터 업데이트
    revalidate: 21600,
  };
};
