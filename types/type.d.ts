//댓글 CUD type
declare interface AddCommentP {
  postId: string;
  comment?: {};
  newComment?: {};
  user?: {
    name: string;
    email: string;
  };
  queryClient?: QueryClient;
}

//댓글 Props
interface CommentPropsP {
  postId: string | string[] | undefined;
  user:
    | { userName?: string; userEmail?: string; userImage?: string }
    | undefined;
  queryClient?: QueryClient;
  comment?: {
    date: number;
    userEmail: string;
    contents: string;
    nickName: string;
    userImage?: string;
  };
  index?: number;
  comments?: [];
  refetch?: refetch;
}

//DetailPage Props
interface DetailPagePropsP {
  postId: string | string[] | undefined;
}

// 모집공고 useState
interface HomeP {
  HOUSE_NM: string;
  HSSPLY_ADRES: string;
  TOT_SUPLY_HSHLDCO: string;
  RCRIT_PBLANC_DE: string;
  PBLANC_NO: string;
  COORDINATES: [{ X: number; Y: number }];
  HOUSE_DTL_SECD_NM: string;
  SUBSCRPT_AREA_CODE_NM: string;
  HOUSE_SECD_NM: string;
  MDHS_TELNO: string;
  PBLANC_URL: string;
  PRZWNER_PRESNATN_DE: string;
  CNTRCT_CNCLS_BGNDE: string;
  CNTRCT_CNCLS_ENDDE: string;
  GNRL_RNK1_CRSPAREA_RCEPT_PD: string;
  GNRL_RNK1_ETC_GG_RCPTDE_PD: string;
  SPSPLY_RCEPT_BGNDE: string;
  [key: string]: string;
  DETAIL: any;
}

//댓글 read type
interface CommentP {
  contents: string;
  date: number;
  nickName: string;
  userEmail: string;
  index?: number;
  userImage?: string;
}

// 'Users' 컬렉션 map 돌렸을 때
interface userProps {
  regions: string[];
  types: string[];
  userEmail: string;
  userName: string;
  userImage: string;
}

// Firebase에서 가져온 data type
interface HomeListDBPropsJ {
  homeList: {
    allHomeData: {}[];
  };
}

// adminPage - API로 받아오는 리스트 Props type
interface ListPropsJ {
  [key: string]: { [key: string]: string }[];
}

// map, filter로 돌리는 리스트의 item(인자) type
interface ItemJ {
  [key: string]: string;
}

// props로 넘기는 list type - props의 이름이 list
interface PropsListJ {
  list: ItemJ;
}

interface CountTabPropsListJ {
  list: ItemJ[];
}

interface CategoryBtnStyledProps {
  bg: string;
  text: string;
  border: string;
}
