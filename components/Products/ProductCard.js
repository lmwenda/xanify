import {
    AspectRatio,
    Box,
    HStack,
    Image,
    Skeleton,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
  import Link from 'next/link'
  import * as React from 'react'
  import { Rating } from './Rating'
  import { FavouriteButton } from './FavouriteButton'
  import { PriceTag } from './PriceTag'
  
  export const ProductCard = (props) => {
    const { product, rootProps } = props
    const { title, image, price, id, salePrice } = product
    const [ reviews, setReviews ] = React.useState(null)

    React.useEffect(() => {
        setReviews(Math.floor(Math.random() * 1000) + 1)
    }, [])

    return (
      <Stack
      spacing={useBreakpointValue({
          base: '4',
          md: '5',
        })}
        {...rootProps}
        >
        <Box position="relative">
          
          <AspectRatio ratio={4 / 3}>
            <Image
              src={image}
              alt={title}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({
                base: 'md',
                md: 'xl',
              })}
            />
          </AspectRatio>
          <FavouriteButton
            position="absolute"
            top="4"
            right="4"
            aria-label={`Add ${title} to your favourites`}
          />
        </Box>
        <Stack>
          <Stack spacing="1">
            <Link href={`/product/${id}`}>
              <Text fontWeight="medium" _hover={{ cursor: 'pointer' }} fallback={<Skeleton />} color={useColorModeValue('gray.700', 'gray.400')}>
                {title}
              </Text>
            </Link>
            <PriceTag price={price} salePrice={salePrice} currency="GBP" />
          </Stack>
          <HStack>
            <Rating defaultValue={Math.floor(Math.random() * 5) + 1} size="sm" />
            <Text fontSize="sm" fallback={<Skeleton />} color={useColorModeValue('gray.600', 'gray.400')}>
              {reviews} reviews
            </Text>
          </HStack>
        </Stack>
      </Stack>
    )
  }
  