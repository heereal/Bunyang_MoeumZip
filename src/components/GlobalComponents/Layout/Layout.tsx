import Header from '../Header/Header';
import * as S from './style';

type PropsP = {
  children: React.ReactNode;
};

const Layout = ({ children }: PropsP) => {
  return (
    <S.Wrap>
      <S.Container>
        <Header />
        <div> {children} </div>
      </S.Container>
    </S.Wrap>
  );
};

export default Layout;
