import Layout from '@/components/GlobalComponents/Layout/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  // 서로 다른 사용자와 요청 사이에 데이터가 공유되지 않음
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
