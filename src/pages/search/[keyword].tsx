import SearchResults from '@/components/SearchPage/SearchResults';
import { useRouter } from 'next/router';
import * as S from '../../styles/search.style';

const SearchResult = () => {
  const router = useRouter();
  const keyword = router.query.keyword;
  return (
    <>
      <div>SearchResult</div>
      <div>{keyword} 의 검색 결과는 몇 건입니다.</div>
      <SearchResults />
    </>
  );
};

export default SearchResult;
