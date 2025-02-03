import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from './_app';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Custom head elements */}
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;