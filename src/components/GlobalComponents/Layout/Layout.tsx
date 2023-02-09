import Header from "../Header/Header";
const Layout = ({ children }: any) => {
  return (
    <>
      <Header/>
      <div>{children}</div>
    </>
  );
};

export default Layout;
