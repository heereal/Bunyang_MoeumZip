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
  const router = useRouter();
  // 화면에 포커스 갈 때마다 refetch되지 않도록 설정
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

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
              router.asPath.includes('search') ||
              router.asPath.includes('admin') ? (
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
