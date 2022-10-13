import {
  Box,
  Flex,
  FormControl,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import Sidebar from "components/SideBar";

import ModalLixeira from "./Components/ModalLixeira";
import ModalCadastrarPriorizacao from "./Components/Priorizacao/CadastrarPriorizacao";
import { TabelaPriorizacao } from "./Components/Priorizacao/TabelaPriorizacao";

export function Priorizacao() {
  return (
    <>
      <Sidebar>
        <Stack spacing="8">
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
              h="100vh"
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Flex flexDirection={"row"} justify={"space-between"}>
                <Flex>
                  <Text fontWeight={"700"} fontSize={"24px"} color={"#2D2926"}>
                    Priorização
                  </Text>
                </Flex>
                <Flex gap={5}>
                  <Flex alignItems={"flex-start"}>
                    <FormControl className="toBottom">
                      <ModalCadastrarPriorizacao />
                    </FormControl>
                  </Flex>

                  <Flex alignItems={"flex-start"} alignSelf={"center"}>
                    <ModalLixeira />
                  </Flex>
                </Flex>
              </Flex>
              <>
                <TabelaPriorizacao />
              </>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
