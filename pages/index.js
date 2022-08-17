import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import { ProductGrid } from '../components/Products/ProductGrid'
import { ProductCard } from '../components/Products/ProductCard'
import FadeInSection from '../components/FadeInSection'
import { useState, useEffect } from 'react'

export default function Home(products) {
  return (
    <Box
    maxW="7xl"
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Head>
      <title>Xanify</title>
    </Head>
    <ProductGrid>
      {products.products.map((product) => (
        <FadeInSection key={product.id}>
          <ProductCard product={product} />
        </FadeInSection>
      ))}
    </ProductGrid>
  </Box>
  )
}

export const getStaticProps = async() => {
  const response = await fetch('https://fakestoreapi.com/products')
  const products = await response.json()
  
  return {
    props: {
      products 
    }
  }
}