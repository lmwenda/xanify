import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { FaArrowRight } from 'react-icons/fa'
  import { checkout } from './Checkout'
  
  const OrderSummaryItem = (props) => {
    const { label, value, children } = props
    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
          {label}
        </Text>
        {value ? <Text fontWeight="medium">{value}</Text> : children}
      </Flex>
    )
  }
  
  export const CheckoutOrder = (price) => {
    const discount = price.price * 0.3;
    const VAT = price.price * 0.2;
    const finalPrice = price.price + VAT - discount;
    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Order Summary</Heading>
  
        <Stack spacing="6">
          <OrderSummaryItem label="Subtotal" value={`£${price.price.toFixed(2)}`} />
          <OrderSummaryItem label="VAT">
            <Link href="#" textDecor="underline">
              £{VAT.toFixed(2)}
            </Link>
          </OrderSummaryItem>
          <OrderSummaryItem label="Coupon Code">
            <Link href="#" textDecor="underline">
              30% off
            </Link>
          </OrderSummaryItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              £{finalPrice.toFixed(2)}
            </Text>
          </Flex>
        </Stack>
        <Link href="https://buy.stripe.com/test_4gwdTP4Jg1La9z2cMM">
            <Button onClick={(e) => {
              e.preventDefault()  
              checkout({
                lineItems: [
                  {
                    price: "price_1LXpP7KLN8ysY61e55QuHV0e",
                    quantity: 1,
                  }
                ],
              })
            }} colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
                Mystery Order
            </Button>
        </Link>
      </Stack>
    )
  }
  
