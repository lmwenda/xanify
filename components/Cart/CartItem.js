import { CloseButton, Flex, Link, Select, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'
import { MdWifiProtectedSetup } from 'react-icons/md'
import { useRouter } from 'next/router'

const QuantitySelect = (props) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  )
}

export const CartItem = (props) => {
  const {
    title,
    id,
    description,
    quantity,
    image,
    currency,
    price,
    onChangeQuantity
  } = props

  const router = useRouter()
  
  const deleteCartItem = (e) => {
    e.preventDefault();

    const arr = JSON.parse(localStorage.getItem("cart"))

    for( var i = 0; i < arr.length; i++){ 
                                   
        if ( arr[i].id === id) { 
            arr.splice(i, 1); 
            localStorage.setItem("cart", JSON.stringify(arr))
            router.reload()
            i--; 
        }
    }
  }

  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={title}
        description={description}
        image={image}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value)
          }}
        />
        <PriceTag price={price} salePrice={price * 0.2} currency={currency} />
        <CloseButton aria-label={`Delete ${title} from cart`} onClick={deleteCartItem} />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: 'flex',
          md: 'none',
        }}
      >
        <Link fontSize="sm" onClick={deleteCartItem} textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value)
          }}
        />
        <PriceTag price={price} salePrice={price / 1.2} currency={currency} />
      </Flex>
    </Flex>
  )
}
