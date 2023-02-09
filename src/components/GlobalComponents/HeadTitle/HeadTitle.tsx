import Head from 'next/head';

const HeadTitle = ({ title }: any) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default HeadTitle;
