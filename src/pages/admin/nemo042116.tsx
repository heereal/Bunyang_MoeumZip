import { addHomeList } from '@/common/api';
import { db } from '@/common/firebase';
import { getToday } from '@/common/utils';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
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
  lhCombineList,
  homeListDB,
}: ListPropsJ) => {
  const queryClient = useQueryClient();

  // DB에 들어가는 최종 분양 정보 리스트
  const [allHomeData, setAllHomeData] = useState<{ [key: string]: string }[]>(
    [],
  );

  // 새로 들어온 분양 정보
  const [newHomeData, setNewHomeData] = useState<{ [key: string]: string }[]>(
    [],
  );

  // 재가공한 전체 API데이터를 담는 배열
  const newList: {}[] = [];
  const filteredArr: {}[] = [];

  // 재가공한 LH 행복주택~ 데이터를 담는 배열
  const reprocessingHappyLHList: {}[] = [];

  // 재가공한 LH 신혼희망~ 데이터를 담는 배열
  const reprocessingMarriageLHList: {}[] = [];

  // 새로 들어온 데이터에 좌표까지 추가한 배열
  const [newGeoArray, setNewGeoArray] = useState<any>([]);

  // 최종으로 DB 업데이트한 시각
  const [btnTime, setBtnTime] = useState<string>('');

  // LH 통합 데이터(기본 + 상세)에서 행복 주택, 국민 임대 등으로 분리
  const splitHappyLH = lhCombineList.filter(
    (item) =>
      item.SPL_INF_TP_CD === '051' ||
      item.SPL_INF_TP_CD === '061' ||
      item.SPL_INF_TP_CD === '062' ||
      item.SPL_INF_TP_CD === '063',
  );

  // LH 통합 데이터(기본 + 상세)에서 신혼 희망 타운, 분양 주택 등으로 분리
  const splitMarriageLH = lhCombineList.filter(
    (item) =>
      item.SPL_INF_TP_CD === '050' ||
      item.SPL_INF_TP_CD === '390' ||
      item.SPL_INF_TP_CD === '060',
  );

  // LH - 행복 주택~ 데이터 재가공 - KEY, Data 형식을 청약홈과 통일시키기
  splitHappyLH.map((item: any) => {
    reprocessingHappyLHList.push({
      // LH에만 있는 것
      SPL_INF_TP_CD: item.SPL_INF_TP_CD,
      PAN_NT_ST_DT: item.PAN_NT_ST_DT
        ? item.PAN_NT_ST_DT.replace(/['.']/g, '-')
        : '',
      CLSG_DT: item.CLSG_DT ? item.CLSG_DT.replace(/['.']/g, '-') : '',
      AHFL_URL: item.detail[0][1].dsAhflInfo
        ? item.detail[0][1].dsAhflInfo[1].AHFL_URL
        : '',
      API: 'LH',
      // 청약홈과 통일
      PBLANC_NO: item.PAN_ID,
      HOUSE_DTL_SECD_NM: item.AIS_TP_CD_NM,
      SUBSCRPT_AREA_CODE_NM: item.CNP_CD_NM,
      RCRIT_PBLANC_DE: item.PAN_DT,
      PBLANC_URL: item.DTL_URL,
      MIN_HOUSE_TY: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].DDO_AR.split('~')[0].split('.')[0] + '㎡'
        : '',
      MAX_HOUSE_TY: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].DDO_AR.split('~')[1].split('.')[0] + '㎡'
        : '',
      TOT_SUPLY_HSHLDCO: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].HSH_CNT
        : '',
      HOUSE_NM: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].LCC_NT_NM
        : '',
      HSSPLY_ADRES: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].LGDN_ADR +
          ' ' +
          item.detail[0][1].dsSbd[0].LGDN_DTL_ADR
        : '',
      MVN_PREARNGE_YM_LH: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].MVIN_XPC_YM.replace('.', '년 ') + '월'
        : '',
      RCEPT_BGNDE: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].SBSC_ACP_ST_DT.replace(/['.']/g, '-')
        : '',
      RCEPT_ENDDE: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].SBSC_ACP_CLSG_DT.replace(/['.']/g, '-')
        : '',
      CNTRCT_CNCLS_BGNDE: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].CTRT_ST_DT.replace(/['.']/g, '-')
        : '',
      CNTRCT_CNCLS_ENDDE: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].CTRT_ED_DT.replace(/['.']/g, '-')
        : '',
      PRZWNER_PRESNATN_DE: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].PZWR_ANC_DT.replace(/['.']/g, '-')
        : '',
      PPR_ACP_ST_DT: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].PPR_ACP_ST_DT.replace(/['.']/g, '-')
        : '',
      PPR_ACP_CLSG_DT: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].PPR_ACP_CLSG_DT.replace(/['.']/g, '-')
        : '',
      MDHS_TELNO: item.detail[0][1].dsCtrtPlc
        ? item.detail[0][1].dsCtrtPlc[0].SIL_OFC_TLNO.split(',')[0].replace(
            /[-]/g,
            '',
          )
        : '',
      MIN_LTTOT_TOP_AMOUNT: null,
      MAX_LTTOT_TOP_AMOUNT: null,
      detail: [
        {
          PBLANC_NO: item.PAN_ID,
          HOUSE_MANAGE_NO: item.PAN_ID,
          HOUSE_TY: item.detail[0][1].dsSbd
            ? item.detail[0][1].dsSbd[0].DDO_AR
            : '',
          TOT_SUPLY_HSHLDCO: item.detail[0][1].dsSbd
            ? item.detail[0][1].dsSbd[0].HSH_CNT
            : '',
          MODEL_NO: null,
          SUPLY_AR: null,
          SUPLY_HSHLDCO: null,
          SPSPLY_HSHLDCO: null,
          NWWDS_HSHLDCO: null,
          LFE_FRST_HSHLDCO: null,
          INSTT_RECOMEND_HSHLDCO: null,
          OLD_PARNTS_SUPORT_HSHLDCO: null,
          TRANSR_INSTT_ENFSN_HSHLDCO: null,
          MNYCH_HSHLDCO: null,
          ETC_HSHLDCO: null,
          LTTOT_TOP_AMOUNT: null,
          FILE: item.detail[0][1].dsAhflInfo,
          REGISTER: item.detail[0][1].dsCtrtPlc,
          DETAIL: item.detail[0][1].dsSbd,
          IMAGE: item.detail[0][1].dsSbdAhfl,
          SCHEDULE: item.detail[0][1].dsSplScdl,
        },
      ],
    });
  });

  // LH - 신혼희망타운~ 데이터 재가공
  splitMarriageLH.map((item: any) => {
    reprocessingMarriageLHList.push({
      // LH에만 있는 것
      SPL_INF_TP_CD: item.SPL_INF_TP_CD,
      PAN_NT_ST_DT: item.PAN_NT_ST_DT
        ? item.PAN_NT_ST_DT.replace(/['.']/g, '-')
        : '',
      CLSG_DT: item.CLSG_DT ? item.CLSG_DT.replace(/['.']/g, '-') : '',
      AHFL_URL: item.detail[0][1].dsAhflInfo
        ? item.detail[0][1].dsAhflInfo[1].AHFL_URL
        : '',

      // 청약홈과 통일
      API: 'LH',
      PBLANC_NO: item.PAN_ID,
      HOUSE_DTL_SECD_NM: item.AIS_TP_CD_NM,
      SUBSCRPT_AREA_CODE_NM: item.CNP_CD_NM,
      RCRIT_PBLANC_DE: item.PAN_DT,
      PBLANC_URL: item.DTL_URL,
      MIN_HOUSE_TY: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].MIN_MAX_RSDN_DDO_AR.split('~')[0].split(
            '.',
          )[0] + '㎡'
        : '',
      MAX_HOUSE_TY: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].MIN_MAX_RSDN_DDO_AR.split('~')[1].split(
            '.',
          )[0] + '㎡'
        : '',
      TOT_SUPLY_HSHLDCO: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].SUM_TOT_HSH_CNT
        : '',
      HOUSE_NM: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].BZDT_NM
        : '',
      HSSPLY_ADRES: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].LCT_ARA_ADR +
          ' ' +
          item.detail[0][1].dsSbd[0].LCT_ARA_DTL_ADR
        : '',
      MVN_PREARNGE_YM_LH: item.detail[0][1].dsSbd
        ? item.detail[0][1].dsSbd[0].MVIN_XPC_YM
        : '',
      RCEPT_BGNDE: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].ACP_DTTM.split('~')[0]
            .slice(0, 11)
            .replace(/['.']/g, '-')
        : '',
      RCEPT_ENDDE: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].ACP_DTTM.split('~')[1]
            .slice(0, 11)
            .replace(/['.']/g, '-')
        : '',
      CNTRCT_CNCLS_BGNDE: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].CTRT_ST_DT.slice(0, 4) +
          '-' +
          item.detail[0][1].dsSplScdl[0].CTRT_ST_DT.slice(4, 6) +
          '-' +
          item.detail[0][1].dsSplScdl[0].CTRT_ST_DT.slice(-2)
        : '',
      CNTRCT_CNCLS_ENDDE: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].CTRT_ED_DT.slice(0, 4) +
          '-' +
          item.detail[0][1].dsSplScdl[0].CTRT_ED_DT.slice(4, 6) +
          '-' +
          item.detail[0][1].dsSplScdl[0].CTRT_ED_DT.slice(-2)
        : '',
      PRZWNER_PRESNATN_DE: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].PZWR_ANC_DT.slice(0, 4) +
          '-' +
          item.detail[0][1].dsSplScdl[0].PZWR_ANC_DT.slice(4, 6) +
          '-' +
          item.detail[0][1].dsSplScdl[0].PZWR_ANC_DT.slice(-2)
        : '',

      PPR_ACP_ST_DT: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].PZWR_PPR_SBM_ST_DT.slice(0, 4) +
          '-' +
          item.detail[0][1].dsSplScdl[0].PZWR_PPR_SBM_ST_DT.slice(4, 6) +
          '-' +
          item.detail[0][1].dsSplScdl[0].PZWR_PPR_SBM_ST_DT.slice(-2)
        : '',
      PPR_ACP_CLSG_DT: item.detail[0][1].dsSplScdl
        ? item.detail[0][1].dsSplScdl[0].PZWR_PPR_SBM_ED_DT.slice(0, 4) +
          '-' +
          item.detail[0][1].dsSplScdl[0].PZWR_PPR_SBM_ED_DT.slice(4, 6) +
          '-' +
          item.detail[0][1].dsSplScdl[0].PZWR_PPR_SBM_ED_DT.slice(-2)
        : '',
      MDHS_TELNO: item.detail[0][1].dsCtrtPlc
        ? item.detail[0][1].dsCtrtPlc[0].SIL_OFC_TLNO.split(',')[0].replace(
            /[-]/g,
            '',
          )
        : '',
      MIN_LTTOT_TOP_AMOUNT: null,
      MAX_LTTOT_TOP_AMOUNT: null,
      detail: [
        {
          PBLANC_NO: item.PAN_ID,
          HOUSE_MANAGE_NO: item.PAN_ID,
          HOUSE_TY: item.detail[0][1].dsSbd[0].MIN_MAX_RSDN_DDO_AR,
          TOT_SUPLY_HSHLDCO: item.detail[0][1].dsSbd[0].SUM_TOT_HSH_CNT,
          MODEL_NO: null,
          SUPLY_AR: null,
          SUPLY_HSHLDCO: null,
          SPSPLY_HSHLDCO: null,
          NWWDS_HSHLDCO: null,
          LFE_FRST_HSHLDCO: null,
          INSTT_RECOMEND_HSHLDCO: null,
          OLD_PARNTS_SUPORT_HSHLDCO: null,
          TRANSR_INSTT_ENFSN_HSHLDCO: null,
          MNYCH_HSHLDCO: null,
          ETC_HSHLDCO: null,
          LTTOT_TOP_AMOUNT: null,
          FILE: item.detail[0][1].dsAhflInfo,
          REGISTER: item.detail[0][1].dsCtrtPlc,
          DETAIL: item.detail[0][1].dsSbd,
          IMAGE: item.detail[0][1].dsSbdAhfl,
          SCHEDULE: item.detail[0][1].dsSplScdl,
        },
      ],
    });
  });

  // 재가공한 LH 행복 주택~ 리스트 + 신혼희망타운~ 리스트를 통합한 전체 LH 리스트
  const reprocessingAllLHList: {}[] = [];
  reprocessingHappyLHList.map((item) => reprocessingAllLHList.push(item));
  reprocessingMarriageLHList.map((item) => reprocessingAllLHList.push(item));

  // 지역이름이 없는 1.APT 무순위, 2.오피스텔 리스트 + 지역이름이 4자인 3.LH 리스트 합치기
  const randomOfficeLHList: { [key: string]: string }[] = [];
  aptRandomCombineList?.map((item: ItemJ) => randomOfficeLHList.push(item));
  officeCombineList?.map((item: ItemJ) => randomOfficeLHList.push(item));
  reprocessingAllLHList?.map((item: ItemJ) => randomOfficeLHList.push(item));

  // APT 무순위 + 오피스텔 리스트는 주소 앞부분을 잘라 지역 이름 추가하기
  // LH 리스트는 지역이름(4자) 그대로 넣기
  const addAreaNameList = randomOfficeLHList.map((item) => {
    return {
      ...item,
      SUBSCRPT_AREA_CODE_NM: item.SUBSCRPT_AREA_CODE_NM
        ? item.SUBSCRPT_AREA_CODE_NM
        : item.HSSPLY_ADRES.slice(0, 4),
    };
  });

  // 지역 이름 통일하기
  const replaceAreaNameAptOfficeLHList = addAreaNameList.map((item) => {
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

  // 청약홈 + LH 전체 API 통합 리스트
  const allHomeList: {}[] = [];
  aptCombineList?.map((item: ItemJ) => allHomeList.push(item));
  replaceAreaNameAptOfficeLHList.map((item: ItemJ) => allHomeList.push(item));

  // 오늘 날짜 구하기
  const today = getToday();
  // 청약이 마감되지 않은 청약홈 + LH 전체 API 통합 리스트
  const possibleAllHomeList = allHomeList.filter(
    (item: ItemJ) =>
      item.RCEPT_ENDDE >= today || item.SUBSCRPT_RCEPT_ENDDE >= today,
  );

  // firestore에서 불러 온 기존 분양 데이터의 PBLANC_NO만 추출해서 생성한 배열
  const PBLANCArray = homeListDB.map((item) => item.PBLANC_NO);

  // firestore에서 불러 온 기존 데이터 중 접수일이 종료되지 않은 것만 필터링함
  const oldDataArray = homeListDB.filter(
    (item: ItemJ) => item.RCEPT_ENDDE >= today,
  );

  // Friebase DB에 homeList 추가
  const addHomeListMutate = useMutation(addHomeList, {
    onSuccess: () => {
      queryClient.invalidateQueries('HomeList');
    },
  });

  // [1번 버튼] 클릭 시 새로 들어온 데이터를 재가공함
  const apiCallHandler = () => {
    // DB 마지막으로 업데이트한 시각
    const onClickDate = new Date().toLocaleString();

    // 기존 데이터 제외 새로 들어온 데이터만 필터링함
    const newDataArray = possibleAllHomeList.filter(
      (item: any) => !PBLANCArray.includes(`${item.PBLANC_NO}`),
    );

    // API 전체 통합 데이터 재가공하기
    newDataArray.map((item: any) => {
      newList.push({
        API: item.API ? 'LH' : '청약홈',
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
        MIN_HOUSE_TY: item.MIN_HOUSE_TY
          ? item.MIN_HOUSE_TY
          : item?.detail[0]?.EXCLUSE_AR
          ? Math.floor(item?.detail[0]?.EXCLUSE_AR) + '㎡'
          : item?.detail[0]?.HOUSE_TY.split('.')[0].replace(/(^0)/, '') + '㎡',

        MAX_HOUSE_TY: item.MAX_HOUSE_TY
          ? item.MAX_HOUSE_TY
          : item?.detail[item?.detail?.length - 1]?.EXCLUSE_AR
          ? Math.floor(item?.detail[0]?.EXCLUSE_AR) + '㎡'
          : item?.detail[item?.detail?.length - 1]?.HOUSE_TY.split(
              '.',
            )[0].replace(/(^0)/, '') + '㎡',

        MIN_LTTOT_TOP_AMOUNT:
          item.detail[0]?.LTTOT_TOP_AMOUNT?.split(',')[0].length < 2
            ? item.detail[0]?.LTTOT_TOP_AMOUNT + '만원'
            : item.detail[0]?.LTTOT_TOP_AMOUNT?.split(',')[0].length === 2
            ? item.detail[0]?.LTTOT_TOP_AMOUNT?.slice(0, 1) +
              '.' +
              item.detail[0]?.LTTOT_TOP_AMOUNT?.slice(1, 2) +
              '억'
            : item.detail[0]?.LTTOT_TOP_AMOUNT?.split(',')[0].length === 3
            ? item.detail[0]?.LTTOT_TOP_AMOUNT?.slice(0, 2) +
              '.' +
              item.detail[0]?.LTTOT_TOP_AMOUNT?.slice(2, 3) +
              '억'
            : item?.detail[0]?.SUPLY_AMOUNT?.split(',')[0].length < 2
            ? item?.detail[0]?.SUPLY_AMOUNT + '만원'
            : item?.detail[0]?.SUPLY_AMOUNT?.split(',')[0].length === 2
            ? item?.detail[0]?.SUPLY_AMOUNT?.slice(0, 1) +
              '.' +
              item?.detail[0]?.SUPLY_AMOUNT?.slice(1, 2) +
              '억'
            : item?.detail[0]?.SUPLY_AMOUNT?.split(',')[0].length === 3
            ? item?.detail[0]?.SUPLY_AMOUNT?.slice(0, 2) +
              '.' +
              item?.detail[0]?.SUPLY_AMOUNT?.slice(2, 3) +
              '억'
            : '',

        MAX_LTTOT_TOP_AMOUNT:
          item.detail[item?.detail?.length - 1]?.LTTOT_TOP_AMOUNT?.split(',')[0]
            .length < 2
            ? item.detail[item?.detail?.length - 1]?.LTTOT_TOP_AMOUNT + '만원'
            : item.detail[item?.detail?.length - 1]?.LTTOT_TOP_AMOUNT?.split(
                ',',
              )[0].length === 2
            ? item.detail[item?.detail?.length - 1]?.LTTOT_TOP_AMOUNT?.slice(
                0,
                1,
              ) +
              '.' +
              item.detail[item?.detail?.length - 1]?.LTTOT_TOP_AMOUNT?.slice(
                1,
                2,
              ) +
              '억'
            : item.detail[item?.detail?.length - 1]?.LTTOT_TOP_AMOUNT?.split(
                ',',
              )[0].length === 3
            ? item.detail[item?.detail?.length - 1]?.LTTOT_TOP_AMOUNT?.slice(
                0,
                2,
              ) +
              '.' +
              item.detail[item?.detail?.length - 1]?.LTTOT_TOP_AMOUNT?.slice(
                2,
                3,
              ) +
              '억'
            : item?.detail[item?.detail?.length - 1]?.SUPLY_AMOUNT?.split(
                ',',
              )[0].length < 2
            ? item?.detail[item?.detail?.length - 1]?.SUPLY_AMOUNT + '만원'
            : item?.detail[item?.detail?.length - 1]?.SUPLY_AMOUNT?.split(
                ',',
              )[0].length === 2
            ? item?.detail[item?.detail?.length - 1]?.SUPLY_AMOUNT?.slice(
                0,
                1,
              ) +
              '.' +
              item?.detail[item?.detail?.length - 1]?.SUPLY_AMOUNT?.slice(
                1,
                2,
              ) +
              '억'
            : item?.detail[item?.detail?.length - 1]?.SUPLY_AMOUNT?.split(
                ',',
              )[0].length === 3
            ? item?.detail[item?.detail?.length - 1]?.SUPLY_AMOUNT?.slice(
                0,
                2,
              ) +
              '.' +
              item?.detail[item?.detail?.length - 1]?.SUPLY_AMOUNT?.slice(
                2,
                3,
              ) +
              '억'
            : '',
        SPSPLY_HSHLDCO: item.SPSPLY_HSHLDCO ? item.SPSPLY_HSHLDCO + '세대' : '',
        SUPLY_HSHLDCO: item.SUPLY_HSHLDCO ? item.SUPLY_HSHLDCO + '세대' : '',
        TOT_SUPLY_HSHLDCO: item.TOT_SUPLY_HSHLDCO + '세대',
        HOUSE_NM: item.HOUSE_NM,
        HOUSE_SECD: item.HOUSE_SECD ? item.HOUSE_SECD : '',
        HOUSE_SECD_NM: !item.HOUSE_SECD_NM
          ? ''
          : item.HOUSE_SECD === '02'
          ? '오피스텔'
          : item.HOUSE_SECD_NM.replace(/[주택]/g, '').split('/')[0],
        HOUSE_DTL_SECD: item.HOUSE_DTL_SECD ? item.HOUSE_DTL_SECD : '',
        HOUSE_DTL_SECD_NM: item.HOUSE_DTL_SECD_NM
          ? item.HOUSE_DTL_SECD_NM
          : item.HOUSE_SECD === '06'
          ? '계약취소'
          : '',
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
        HMPG_ADRES: item.HMPG_ADRES ? item.HMPG_ADRES : '',
        RCRIT_PBLANC_DE: item.RCRIT_PBLANC_DE ? item.RCRIT_PBLANC_DE : '',
        PRZWNER_PRESNATN_DE: item.PRZWNER_PRESNATN_DE
          ? item.PRZWNER_PRESNATN_DE
          : '',
        CNSTRCT_ENTRPS_NM: item.CNSTRCT_ENTRPS_NM ? item.CNSTRCT_ENTRPS_NM : '',
        BSNS_MBY_NM: item.BSNS_MBY_NM ? item.BSNS_MBY_NM : '',
        MDHS_TELNO: item.MDHS_TELNO ? item.MDHS_TELNO : '',
        CNTRCT_CNCLS_BGNDE: item.CNTRCT_CNCLS_BGNDE
          ? item.CNTRCT_CNCLS_BGNDE
          : '',
        CNTRCT_CNCLS_ENDDE: item.CNTRCT_CNCLS_ENDDE
          ? item.CNTRCT_CNCLS_BGNDE
          : '',
        MVN_PREARNGE_YM: item.MVN_PREARNGE_YM_LH
          ? item.MVN_PREARNGE_YM_LH
          : item.MVN_PREARNGE_YM.slice(0, 4) +
            '년 ' +
            item.MVN_PREARNGE_YM.slice(-2) +
            '월',
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
        // LH에만 있는 것
        SPL_INF_TP_CD: item.SPL_INF_TP_CD ? item.SPL_INF_TP_CD : '',
        PAN_NT_ST_DT: item.PAN_NT_ST_DT ? item.PAN_NT_ST_DT : '',
        CLSG_DT: item.CLSG_DT ? item.CLSG_DT : '',
        PPR_ACP_ST_DT: item.PPR_ACP_ST_DT ? item.PPR_ACP_ST_DT : '',
        PPR_ACP_CLSG_DT: item.PPR_ACP_CLSG_DT ? item.PPR_ACP_CLSG_DT : '',
        AHFL_URL: item.AHFL_URL ? item.AHFL_URL : '',
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
              `근무자님, ${oldDataArray.length + i}번째에 있는 ${
                newHomeData[i].FOR_COORDINATES_ADRES
              } 채워주세요~`,
            );
            alert(
              `근무자님, ${oldDataArray.length + i}번째에 있는 ${
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

  // FIXME: 새로고침 해야 날짜가 바뀜!!
  // eslint-disable-next-line
  useEffect(() => setBtnTime(homeListDB[0]?.BUTTON_DATE), []);

  return (
    <>
      <NextSeo
        title="관리자페이지 -"
        description="희령, 윤숙, 성환의 관리자 페이지 입니당😛"
      />
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

  // LH
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

  // LH 기본 - 공고중 리스트
  const lhNoticeALLList = await axios
    .get(
      `${LH_BASE_URL}/${METHOD_LH_DEFAULT}?serviceKey=${SERVICE_KEY}&PG_SZ=1000&PAGE=1&PAN_SS="공고중"
      `,
    )
    .then((res: any) => res.data[1].dsList);

  // LH 기본 - 공고중 리스트에서 토지, 상가, 주거복지 제외한 리스트
  const lhNoticeList = lhNoticeALLList?.filter(
    (item: ItemJ) =>
      item.UPP_AIS_TP_CD !== '01' &&
      item.UPP_AIS_TP_CD !== '22' &&
      item.UPP_AIS_TP_CD !== '13',
  );

  // LH 기본 - 접수중 리스트
  const lhRegisterALLList = await axios
    .get(
      `${LH_BASE_URL}/${METHOD_LH_DEFAULT}?serviceKey=${SERVICE_KEY}&PG_SZ=1000&PAGE=1&PAN_SS="접수중"
  `,
    )
    .then((res: any) => res.data[1].dsList);

  // LH 기본 - 접수중 리스트에서 토지, 상가, 주거복지 제외한 리스트
  const lhRegisterList = lhRegisterALLList.filter(
    (item: ItemJ) =>
      item.UPP_AIS_TP_CD !== '01' &&
      item.UPP_AIS_TP_CD !== '22' &&
      item.UPP_AIS_TP_CD !== '13',
  );

  // LH 기본 - 공고중 + 접수중 리스트(토지, 상가, 주거복지 제외)
  const lhDefaultList: {}[] = [];
  lhNoticeList?.map((item: ItemJ) => lhDefaultList.push(item));
  lhRegisterList.map((item: ItemJ) => lhDefaultList.push(item));

  // 공고문 상세정보 리스트 가져오기
  // 청약홈 - 상세 정보 전체 가져오기
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

  //LH detailList - 기본 리스트에서 request parameter를 3개 넘겨 해당 상세 정보 가져오기
  const lhDetailList = await Promise.all(
    lhDefaultList.map((item: any) =>
      axios
        .get(
          `${LH_BASE_URL}/${METHOD_LH_DETAIL}?serviceKey=${SERVICE_KEY}&SPL_INF_TP_CD=${item.SPL_INF_TP_CD}&CCR_CNNT_SYS_DS_CD=${item.CCR_CNNT_SYS_DS_CD}&PAN_ID=${item.PAN_ID}`,
        )
        .then((res) => res.data),
    ),
  );

  // APT Default + Detail 통합 List
  const aptCombineList = await Promise.all(
    aptDefaultList.map((item: any) => {
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
    aptRandomDefaultList.map((item: any) => {
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
    officeDefaultList.map((item: any) => {
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
    lhDefaultList.map((item: any) => {
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
      lhCombineList,
      homeListDB,
    },
    // ISR - 1시간 마다 데이터 업데이트
    revalidate: 3600,
  };
};
