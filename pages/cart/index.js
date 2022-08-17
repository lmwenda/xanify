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

const Index = () => {
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
                    Shopping Cart ({items ? items.length : 0} items)
                </Heading>

                <Stack spacing="6">
                    {
                        items ? 
                            items.map((item) => (
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
                    <CartOrderSummary price={totalPrice} />
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
