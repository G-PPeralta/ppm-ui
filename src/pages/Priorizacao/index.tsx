import {
  Box,
  Flex,
  FormControl,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import ModalLixeira from "./Components/ModalLixeira";
import ModalCadastrarPriorizacao from "./Components/Priorizacao/CadastrarPriorizacao";
import { TabelaPriorizacao } from "./Components/Priorizacao/TabelaPriorizacao";

export function Priorizacao() {
  // const wd = window.innerWidth;

  return (
    <>
      <Sidebar>
        <Stack spacing="8">
          <Flex
            w={useBreakpointValue({ base: "100%", md: "auto" })}
            align="center"
            justify="center"
            bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
          >
            <Box
              py={{ base: "0", sm: "16" }}
              px={{ base: "4", sm: "10" }}
              w={useBreakpointValue({
                base: "20rem",
                sm: "35rem",
                md: "60rem",
                lg: "70rem",
              })}
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Stack spacing="5">
                <Flex
                  flexDirection={"row"}
                  alignItems={"flex-end"}
                  justify={"space-between"}
                >
                  <Flex>
                    <Text
                      fontWeight={"700"}
                      fontSize={"22px"}
                      color={"#2D2926"}
                      mr={"650px"}
                    >
                      Priorização
                    </Text>
                  </Flex>
                  <Flex>
                    <FormControl className="toBottom">
                      <ModalCadastrarPriorizacao />
                    </FormControl>
                  </Flex>
                  <Flex alignItems={"flex-end"}>
                    <ModalLixeira />
                  </Flex>
                </Flex>
                <>
                  <TabelaPriorizacao />
                </>
              </Stack>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
