import { BsSearch } from "react-icons/bs";

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { BotaoAdicionar } from "./components/AdicionarUsuario";

export function Usuarios() {
  // const [loading, _setLoading] = useState(true);

  return (
    <>
      <Sidebar>
        <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
          <Box
            py={{ base: "6", sm: "8" }}
            px={{ base: "6", sm: "10" }}
            w="100%"
            bg="white"
            boxShadow={{
              base: "none",
              sm: "md",
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Flex direction="column" ml={-5} mt={-4} mr={-5}>
              <Flex
                justify={"space-between"}
                mb={2}
                wrap={"wrap"}
                align={"center"}
              >
                <FormLabel htmlFor="name">
                  <Text
                    mb={3}
                    fontSize={"24px"}
                    color={"#2D2926"}
                    fontWeight={"700"}
                    fontFamily={"Mulish"}
                  >
                    Buscar Usuários
                  </Text>
                </FormLabel>
              </Flex>
              <Flex direction={"row"} justify={"space-between"}>
                <Flex flexDir="row" wrap={"wrap"}>
                  <Flex align={"start"} direction={"column"} mr="16px">
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      NOME/EMAIL
                    </Text>
                    <Input
                      h={"56px"}
                      fontSize={"14px"}
                      fontFamily={"Mulish"}
                      fontWeight={"400"}
                      width={"410px"}
                      color={"black"}
                      isRequired
                      placeholder="Digite o nome ou o e-mail"
                      _placeholder={{ color: "#949494" }}
                      id="name"
                      type="text"
                      name="name"
                    />
                  </Flex>
                  <Flex direction={"column"} mr="16px">
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      PERMISSÃO
                    </Text>
                    <Select
                      fontSize={"14px"}
                      fontFamily={"Mulish"}
                      fontWeight={"400"}
                      h={"56px"}
                      w={"208px"}
                      id="permission"
                      name="permission"
                      width={300}
                    >
                      <option>Todos</option>
                    </Select>
                  </Flex>
                  <Flex>
                    <Button
                      h={"56px"}
                      borderRadius={"8px"}
                      fontSize={"18px"}
                      fontWeight={"700"}
                      background={"white"}
                      variant="primary"
                      color="origem.500"
                      borderColor="#0047BB"
                      border={"2px"}
                      alignSelf={"end"}
                      _hover={{
                        background: "origem.500",
                        color: "white",
                        transition: "all 0.4s",
                      }}
                      rightIcon={<BsSearch />}
                    >
                      Filtrar
                    </Button>
                  </Flex>
                </Flex>
                <Flex align={"start"} alignSelf={"end"}>
                  <BotaoAdicionar />
                </Flex>
              </Flex>
              xxxxxxxxxxx
            </Flex>
          </Box>
        </Flex>
      </Sidebar>
    </>
  );
}
