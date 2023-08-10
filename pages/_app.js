import '@/styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { wrapper } from "../store/store";
import { Provider } from 'react-redux';
import Layout from '../components/Layout/Layout';
import { ConfigProvider } from 'antd';
import theme from "../utils/themeConfig"
import { appWithTranslation } from 'next-i18next'


function App({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </ConfigProvider>
    </Provider>
  )
}

export default appWithTranslation(App)
