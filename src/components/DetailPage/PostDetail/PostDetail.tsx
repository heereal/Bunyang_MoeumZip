import { getPostInfo, getDetailPostInfo } from '@/common/api';
import { useQuery } from 'react-query';
import * as S from './style';

const PostDetail = ({ postId }: any) => {
  const { data }: any = useQuery('detail', () => {
    return getPostInfo(postId);
  });

  const { data: data2 }: any = useQuery('detail2', () => {
    return getDetailPostInfo(postId);
  });

  const detail = data2?.data.data;
  const home = data?.data.data[0];

  return (
    <S.Section>
      <h1>상세정보</h1>
      <h1>{home?.HOUSE_NM}</h1>
      <div>{home?.HSSPLY_ADRES}</div>
      <h1>입주자모집공고 주요정보 </h1>
      <div>공급규모</div>
      <div>{home?.TOT_SUPLY_HSHLDCO}세대</div>
      <div>입주자모집공고 관련 문의</div>
      <div>사업주체 또는 분양사무실로 문의</div>
      <div>모집공고문 보기</div>
      <div>청약일정</div>
      <div>모집공고일: {home?.RCRIT_PBLANC_DE}</div>
      <div>청약접수</div>
      <div>공급금액, 입주 예정월</div>
    </S.Section>
  );
};

export default PostDetail;
