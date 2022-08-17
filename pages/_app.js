import { ChakraProvider } from '@chakra-ui/react'
import AppHeader from './Header'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
      <AppHeader />

      <br />
      <Component {...pageProps} />
    </ChakraProvider>
}

export default MyApp