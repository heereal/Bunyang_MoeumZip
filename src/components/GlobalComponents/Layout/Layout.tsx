import Header from '../Header/Header';
import * as S from './style';
const Layout = ({ children }: any) => {
  return (
    <S.Wrap>
      <S.Container>
        <Header />
        <div> {children}</div>
      </S.Container>
    </S.Wrap>
  );
};

export default Layout;
