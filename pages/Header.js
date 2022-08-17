import {
    Accordion,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
  } from "@chakra-ui/react";
  import React from "react";
  import {
    MdDarkMode,
    MdLightMode,
    MdOutlineShoppingCart,
    MdMenu,
    MdShoppingCart
  } from "react-icons/md";
  import Link from "next/link"
  
  function AppHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
  
    return (
      <>
        <Box
          bg={useColorModeValue("gray.50", "zinc.600")}
          px={4}
          mx={{ base: 0, md: 80 }}
          position={{ base: "sticky", md: "relative"}}
          top={0}
          boxShadow={{ base: "md", md: "none"}}
          zIndex={2}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <HStack alignItems={"center"} spacing={4}>
              <IconButton
                size={"sm"}
                variant={"ghost"}
                icon={
                  <MdMenu
                    style={{
                      transform: "translateX(65%)",
                    }}
                  />
                }
                display={{
                  md: "none",
                }}
                aria-label={"Open Menu"}
                onClick={isOpen ? onClose : onOpen}
              />
              <Link href="/">
                <Heading _hover={{ cursor: "pointer" }} color={colorMode == "light" ? "gray.700" : "gray.100"} fontWeight={"bold"} size={"md"}>
                    Xanify
                </Heading>
              </Link>
            </HStack>
            <HStack alignItems={"center"} spacing={2}>
              <Box display={{ base: "none", md: "block" }}>
                <Link href="/cart">
                    <IconButton 
                        size={"md"}
                        icon={colorMode === "light" ? <MdShoppingCart /> : <MdOutlineShoppingCart />} 
                        aria-label="Shopping Basket"
                    />
                </Link>
              </Box>
              <IconButton
                size={"md"}
                icon={colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
                aria-label={"Change Color Theme"}
                onClick={toggleColorMode}
              />
            </HStack>
          </Flex>
        </Box>
        <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              borderBottomWidth={"1px"}
              display={"flex"}
              alignItems={"center"}>
              <Heading size={"sm"} as={Link} href={"/"} onClick={onClose}>
                Xanify
              </Heading>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody p={0}>
              <Accordion allowMultiple>
                <Flex flexDirection={"column"} experimental_spaceY={"2"} spacing={1}>
                    <Link href="/">
                        <Button colorScheme={colorMode === "light" ? "whiteAlpha" : ""}>
                            <Text color={colorMode === "light" ? "gray.800" : "gray.100"}>Home</Text>
                        </Button>
                    </Link>

                    <Link href="/wishlist">
                        <Button colorScheme={colorMode === "light" ? "whiteAlpha" : ""}>
                            <Text color={colorMode === "light" ? "gray.800" : "gray.100"}>Wishlist</Text>
                        </Button>
                    </Link>

                    <Link href="/cart">
                        <Button colorScheme={colorMode === "light" ? "whiteAlpha" : ""}>
                            <Text color={colorMode === "light" ? "gray.800" : "gray.100"}>Shopping Cart</Text>
                        </Button>
                    </Link>
                </Flex>
              </Accordion>
            </DrawerBody>

            <DrawerFooter>
                <Text>Powered by Xanify</Text>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  
  export default AppHeader;
