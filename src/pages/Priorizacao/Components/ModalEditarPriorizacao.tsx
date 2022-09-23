import { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";

import {
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { getProjetosRanking } from "services/get/Projetos-Ranking";

import ModalCadastrarPriorizacaoBeneficio from "./ModalCadastrarPriorizacaoBeneficio";
import { TabelaPriorizacao } from "./TabelaPriorizacao";

export function ModalEditarPriorizacao() {
  const wd = window.innerWidth;
  const [data, setData] = useState<{}>({});
  // const [loading, setLoading] = useState(false);

  const getData = async () => {
    const priorizacao = await getProjetosRanking();
    setData(priorizacao);
  };

  console.log(data);

  useEffect(() => {
    getData();
  }, []);
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
              <Box display={wd > 100 ? "flex" : ""}>
                <Stack spacing="5">
                  <Flex flexDirection={"row"} alignItems={"flex-start"}>
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
                        <ModalCadastrarPriorizacaoBeneficio />
                      </FormControl>
                    </Flex>
                    <Flex alignItems={"flex-end"}>
                      <Button
                        background="transparent"
                        color="#0047BB"
                        float={"right"}
                        fontSize="17px"
                      >
                        Lixeira
                        <Icon
                          as={FaGreaterThan}
                          fontSize="13px"
                          fontWeight={"none"}
                          ml={1}
                          color="#0047BB"
                        />
                      </Button>
                    </Flex>
                  </Flex>

                  <>
                    <TabelaPriorizacao />
                  </>
                </Stack>
              </Box>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
