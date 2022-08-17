import Head from "next/head";
import { Flex, Box, Badge, Heading, Text, Image, AspectRatio, Skeleton, useBreakpointValue, useColorMode, Button } from "@chakra-ui/react";
import FadeInSection from "../../components/FadeInSection";

const ProductScreen = (product) => {

    const { colorMode, toggleColorMode } = useColorMode();
    const { category, title, description, price, image, id } = product.product

    const addToCart = (e) => {
        e.preventDefault()

        const items = [];
        items.push(JSON.parse(localStorage.getItem('cart')));
        localStorage.setItem('cart', JSON.stringify(id));
    }

    return(
        <Box
            maxW="7xl"
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
        >
            <Head>
                <title>Xanify</title>
            </Head>

            <FadeInSection>
                <Flex flexDirection={{ base: "column-reverse", md: "row" }} justifyContent={"center"} >
                    <Flex flexDirection={"column"} justifyContent={{ base: "center", md: "flex-start" }} mt={{ base: "10", md: "0" }} mr={"44"}>
                            <Box mx={{ base: 5, md: 0 }}>
                                <Badge p={3} borderRadius={"2xl"} colorScheme={colorMode === "light" ? "red" : "green"}>{category}</Badge>
                            </Box>

                            <Box mt="10" mx={{ base: 5, md: 0 }} width={{ base:"80", md: ""}}>
                                <Heading maxWidth={{ md:"64"}} fontWeight={{ base: "sm", md: "medium"}}>{title}</Heading>
                                <Text
                                mt={{ base: "3", md: "0"}} 
                                maxWidth={"96"} 
                                fontSize={{ base: "md" }}>
                                    {description}
                                </Text>
                            </Box>

                            <Box mt="5">
                                <Text mx={{ base: "6", md: "0"}}  fontWeight={"bold"} fontSize={{ base: "xl", md: "3xl"}}>£{price}</Text>
                            </Box>

                            <Box mt="5">
                                <Button onClick={addToCart} p={6} mx={{ base: "6", md: "0"}} width={{base: "72", md:"60"}} colorScheme={"blue"}>Add to Cart</Button>
                            </Box>
                    </Flex>

                    <Flex>
                        <Image
                        src={image}
                        alt={title}
                        draggable="false"
                        fallback={<Skeleton />}
                        borderRadius={useBreakpointValue({
                            base: 'md',
                            md: 'xl',
                        })} />
                    </Flex>
                </Flex>
            </FadeInSection>

        </Box>
    )
}

export const getServerSideProps = async(context) => {
    const id = context.params.id;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product = await response.json()
    return{
        props: {
            product
        }
    }
}

export default ProductScreen;