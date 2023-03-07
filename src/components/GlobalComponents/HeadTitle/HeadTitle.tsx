import Head from 'next/head';

interface TitleProps {
  title: string;
}

const HeadTitle = ({ title }: TitleProps) => {
  return (
    <Head>
      <title>{`${title} 분양모음집`}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadTitle;
