import '@/styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { wrapper } from "../store/store";
import { Provider } from 'react-redux';
import RootLayout from "@/components/RootLayout/RootLayout"
import { ConfigProvider } from 'antd';
import theme from "../utils/themeConfig"
import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function App({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on('routeChangeComplete', () => NProgress.done())
    return () => router.events.off('routeChangeComplete', NProgress.remove())
  }, [router])

  return (
    <SessionProvider session={props.session}>
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          </Head>
          <Layout Component={Component} pageProps={props.pageProps} />
        </ConfigProvider>
      </Provider>
    </SessionProvider>
  )
}

const Layout = ({ Component, pageProps }) => {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  } else {
    return <RootLayout><Component {...pageProps} /></RootLayout>
  }
};

export default appWithTranslation(App)
