//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Tela de priorização

import { useState } from "react";

import {
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import Sidebar from "components/SideBar";

import ModalLixeira from "./Components/ModalLixeira";
import ModalCadastrarPriorizacao from "./Components/Priorizacao/CadastrarPriorizacao";
import { TabelaPriorizacao } from "./Components/Priorizacao/TabelaPriorizacao";

export function Priorizacao() {
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <Sidebar>
        <Flex
          w="auto"
          align="center"
          justify="center"
          bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
        >
          <Box
            py={{ base: "6", sm: "8" }}
            px={{ base: "6", sm: "8" }}
            w="100%"
            bg={useBreakpointValue({ base: "transparent", sm: "white" })}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Flex
              mt={-3}
              ml={-3}
              flexDirection={"row"}
              justify={"space-between"}
              mb={1}
              wrap={"wrap"}
            >
              <Heading
                fontFamily={"Mulish"}
                fontWeight={"700"}
                fontSize={"24px"}
                color={"#2D2926"}
              >
                <Text>Priorização</Text>
              </Heading>
              <Flex gap={5}>
                <Flex alignItems={"flex-start"}>
                  <Heading className="toBottom">
                    <ModalCadastrarPriorizacao
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  </Heading>
                </Flex>

                <Flex alignItems={"flex-start"} alignSelf={"center"}>
                  <ModalLixeira />
                </Flex>
              </Flex>
            </Flex>
            <>
              <Flex ml={-3} mr={-3}>
                <TabelaPriorizacao refresh={refresh} setRefresh={setRefresh} />
              </Flex>
            </>
          </Box>
        </Flex>
      </Sidebar>
    </>
  );
}
