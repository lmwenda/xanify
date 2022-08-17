import { ChakraProvider } from '@chakra-ui/react'
import AppHeader from './Header';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps }) {
  return ( 
  <PayPalScriptProvider options={{ "client-id": process.env.NEXT_API_PAYPAL_KEY }}>
    <ChakraProvider>
      <AppHeader />
      <Component {...pageProps} />
    </ChakraProvider>
  </PayPalScriptProvider>
  );
}

export default MyApp