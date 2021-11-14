// import Document, { Html, Head, Main, NextScript } from "next/document";

// class MyDocument extends Document {
//   render() {
//     return (
//       <Html>
//         <Head>
//           <script
//             dangerouslySetInnerHTML={{
//               __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({‘gtm.start’:
//                 new Date().getTime(),event:‘gtm.js’});var f=d.getElementsByTagName(s)[0],
//                 j=d.createElement(s),dl=l!=‘dataLayer’?‘&l=‘+l:‘’;j.async=true;j.src=
//                 ’https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//                 })(window,document,‘script’,‘dataLayer’,‘GTM-KBTXVHV’);`,
//             }}
//           />
//         </Head>
//         <body>
//           <noscript
//             dangerouslySetInnerHTML={{
//               __html: `
//               <iframe src=“https://www.googletagmanager.com/ns.html?id=GTM-KBTXVHV”
//               height=“0" width=“0” style=“display:none;visibility:hidden”></iframe>
//                 `,
//             }}
//           />
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from '@material-ui/styles';
import createEmotionServer from '@emotion/server/create-instance';
import theme from '../utils/theme';
// import { GA_TRACKING_ID } from "../lib/gtag";

import { cache } from './_app.js';


const { extractCritical } = createEmotionServer(cache);
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const styles = extractCritical(initialProps.html);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
      <style
        key="emotion-style-tag"
        data-emotion={`css ${styles.ids.join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: styles.css }}
      />,
    ],
  };
};
