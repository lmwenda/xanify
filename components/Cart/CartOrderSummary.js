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
  import { formatPrice } from './PriceTag'
  
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
  
  export const CartOrderSummary = (price) => {
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
        <Link href="/checkout">
          <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
            Checkout
          </Button>
        </Link>
      </Stack>
    )
  }
  