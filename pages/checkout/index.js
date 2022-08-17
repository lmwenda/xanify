import {
    Box,
    Flex,
    Heading,
    HStack,
    Text,
    Link,
    Stack,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CheckoutOrder } from '../../components/Checkout/CheckoutOrder';
import { useRouter } from 'next/router';
import { checkout } from '../../components/Checkout/Checkout';
  
  const Index = () => {
      const router = useRouter() 
      const [ totalPrice, setTotalPrice ] = React.useState(0)
      const [ items, setCartItems ] = React.useState([])
  
      React.useEffect(() => {
          const cart = localStorage.getItem("cart")
          if(typeof cart == "string"){
              const cartItems = JSON.parse(cart)
              setCartItems(cartItems)
              
              const price = cartItems.reduce(
              (totalPrice, item) => totalPrice + item.price, 0)
              setTotalPrice(price)
          }else{
            router.push("/")
          }
      }, [])
  
      return(
  
          <Box
              maxW={{
                  base: '3xl',
                  lg: '7xl',
              }}
              mx="auto"
              px={{
                  base: '4',
                  md: '8',
                  lg: '12',
              }}
              py={{
                  base: '6',
                  md: '8',
                  lg: '12',
              }}
          >
              <Stack
                  direction={{
                      base: 'column',
                      lg: 'row',
                  }}
                  align={{
                      lg: 'flex-start',
                  }}
                  spacing={{
                      base: '8',
                      md: '16',
                  }}
              >
              <Stack
                  spacing={{
                      base: '8',
                      md: '10',
                  }}
                  flex="2"
              >
                  <Heading fontSize="2xl" fontWeight="extrabold">
                      Purchase ({items ? items.length : 0}) items
                  </Heading>
  
                  <Stack spacing="6">
                      <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: totalPrice.toFixed(2).toString(),
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    const name = details.payer.name.given_name;
                                    alert(`Transaction completed by ${name}`);
                                    localStorage.removeItem("cart");
                                    router.push("/")
                                });
                            }}
                        />
                  </Stack>
              </Stack>
  
                  <Flex direction="column" align="center" flex="1">
                      <CheckoutOrder price={totalPrice} />
                      <HStack mt="6" fontWeight="semibold">
                          <p>or</p>
                          <Link href="/cart" color={mode('blue.500', 'blue.200')}>Continue Editing Cart</Link>
                      </HStack>
                  </Flex>
              </Stack>
          </Box>
      )
  }
  
  export default Index;
  