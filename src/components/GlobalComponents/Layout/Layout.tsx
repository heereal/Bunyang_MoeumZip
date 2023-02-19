import { useRouter } from 'next/router';
import CategoryBar from '../CategoryBar/CategoryBar';
import Header from '../Header/Header';
import * as S from './style';

type PropsP = {
  children: React.ReactNode;
};

const Layout = ({ children }: PropsP) => {
  const router = useRouter();
  return (
    <S.Wrap>
      <S.Container>
        <Header />
        {router.asPath === '/' ? <CategoryBar /> : null}
        {/* <CategoryBar /> */}
        <div> {children} </div>
      </S.Container>
    </S.Wrap>
  );
};

export default Layout;
