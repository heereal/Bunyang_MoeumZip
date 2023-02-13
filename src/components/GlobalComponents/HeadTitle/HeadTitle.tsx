import Head from 'next/head';

const HeadTitle = ({ title }: any) => {
  return (
    <Head>
      <title>{title} | 분양모아</title>
    </Head>
  );
};

export default HeadTitle;
