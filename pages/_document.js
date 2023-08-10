import Document, { Html, Head, Main, NextScript } from 'next/document'
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

const MyDocument = () => (
  <Html lang="en">
    <Head>
      {/* <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
          type="text/javascript" charset="utf-8"></script>
        <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
          type="text/javascript" charset="utf-8"></script> */}
      {/* <script type="module" src="https://js.api.here.com/v3/3.1/mapsjs.bundle.js"></script> */}
      {/* <script src="https://js.api.here.com/v3/3.1/mapsjs-clustering.js" type="text/javascript" charset="utf-8"></script> */}
      {/* <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script> */}
      {/* <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script> */}
      {/* <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" /> */}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)


MyDocument.getInitialProps = async (ctx) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument