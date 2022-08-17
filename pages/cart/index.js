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
import { CartItem } from '../../components/Cart/CartItem'
import { CartOrderSummary } from '../../components/Cart/CartOrderSummary'

const Index = (products) => {
    const [ totalPrice, setTotalPrice ] = React.useState(0)
    const [ cartItems, setCartItems ] = React.useState([ { 
        id: 0,
        image: "",
        category: "",
        price: 0
     } ])

    React.useEffect(() => {
        async function cartHandler(){
            const cartIDs = localStorage.getItem("cart")
    
            if(typeof cartIDs == "string"){
                for (let i=products.products.length;i--;){
                    let item=products.products[i];
                    setTotalPrice(item.price + totalPrice)
                    for (let i=cartIDs.length;i--;){
                        let id=cartIDs[i]
                        if(item.id === id){
                            setCartItems([...cartItems, { id: item.id, image: item.image, category: item.category, price: item.price }])
                        }
                    }
                }
            }
            else {
                return;
            }
        }
        cartHandler()
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
                    Shopping Cart ({cartItems.length - 1} items)
                </Heading>

                <Stack spacing="6">
                    {
                        cartItems.length - 1 >= 1 ? 
                            cartItems.map((item) => (
                                <CartItem key={item.id} {...item} />
                            ))
                        :
                            <Box  px={'5'} py={'1'} rounded={"lg"} bg={'blue.400'}>
                                <Text color={"white"} fontSize={"2xl"} lineHeight='tall'>
                                    Empty Shopping Cart...
                                </Text>
                            </Box>
                    }
                </Stack>
            </Stack>

                <Flex direction="column" align="center" flex="1">
                    <CartOrderSummary price={totalPrice >= 1 ? totalPrice : 0} />
                    <HStack mt="6" fontWeight="semibold">
                        <p>or</p>
                        <Link href="/" color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
                    </HStack>
                </Flex>
            </Stack>
        </Box>
    )
}

export default Index;


export const getStaticProps = async() => {
  const response = await fetch('https://fakestoreapi.com/products')
  const products = await response.json()
  
  return {
    props: {
      products 
    }
  }
}