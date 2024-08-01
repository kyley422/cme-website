import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from 'components/Footer';

// import chakra ui
import { Box, ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'



// sampel theme
const colors = {
  brand: {
    700: '#2a69ac',
    800: '#153e75',
    900: '#1a365d',
  },
}
export const theme = extendTheme({ colors: colors })


function MyApp({ Component, pageProps }) {
  return (
    <Box>
      <Head>
        {/* Add meta tags, title, or other customizations */}
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Box>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;