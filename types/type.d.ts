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
  user: { name?: string; email?: string } | undefined;
  queryClient?: QueryClient;
  comment?: {
    date: number;
    userEmail: string;
    contents: string;
    nickName: string;
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
  HOUSE_NM: number;
  HSSPLY_ADRES: string;
  TOT_SUPLY_HSHLDCO: string;
  RCRIT_PBLANC_DE: string;
  PBLANC_NO: string;
  COORDINATES: [{ X: number; Y: number }];
}

//댓글 read type
interface CommentP {
  contents: string;
  date: number;
  nickName: string;
  userEmail: string;
  index?: number;
}

// 'Users' 컬렉션 map 돌렸을 때
interface userProps {
  regions: string[];
  types: string[];
  userEmail: string;
  userName: string;
  userImage: string;
}
