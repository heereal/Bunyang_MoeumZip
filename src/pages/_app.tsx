import Layout from '@/components/GlobalComponents/Layout/Layout';
import MapSection from '@/components/GlobalComponents/MapSection/MapSection';
import NewMapSection from '@/components/GlobalComponents/NewMaps/NewMapSection';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

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
                height: '91vh',
                display: 'flex',
              }}
            >
              <Component {...pageProps} />
              {/* {router.asPath === '/' ||
              router.asPath.includes('detail') ||
              router.asPath.includes('search') ||
              router.asPath.includes('admin') ? (
                <MapSection />
              ) : null} */}
              {router.asPath === '/' ||
              router.asPath.includes('detail') ||
              router.asPath.includes('search') ||
              router.asPath.includes('admin') ? (
                <NewMapSection />
              ) : null}
            </div>
          </Layout>
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
