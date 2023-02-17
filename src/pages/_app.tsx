import Layout from '@/components/GlobalComponents/Layout/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import MapSection from '@/components/GlobalComponents/MapSection/MapSection';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps) => {
  // 서로 다른 사용자와 요청 사이에 데이터가 공유되지 않음
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session} refetchOnWindowFocus={false}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Layout>
            <div
              style={{
                width: '100vw',
                height: '85vh',
                display: 'flex',
              }}
            >
              <Component {...pageProps} />
              {router.asPath === '/' ||
              router.asPath.includes('detail') ||
              router.asPath.includes('search') ? (
                <MapSection />
              ) : null}
            </div>
          </Layout>
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
