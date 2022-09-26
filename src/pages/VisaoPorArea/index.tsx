import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";
import StatusProjeto from "components/StatusProjeto";

import { statusProjeto } from "utils/validateDate";

import { getAtividadesAreaMock } from "services/get/AtividadesArea";

import AccordionArea from "./components/AccordionArea";
import BotaoVisaoGeral from "./components/BotaoVisaoGeral";
import { Area } from "./interfaces";

function VisaoPorArea() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([] as Area[]);

  const innerWidth = useBreakpointValue({ base: 0, md: 1, lg: 2, xl: 3 });

  useEffect(() => {
    setTimeout(() => {
      setData(getAtividadesAreaMock);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Sidebar>
        {!loading ? (
          <Stack spacing="8">
            <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
              <Box
                py={{ base: "6", sm: "8" }}
                px={{ base: "6", sm: "8" }}
                w={"100%"}
                bg={"white"}
                borderRadius={{ base: "xl", sm: "xl" }}
              >
                <Flex justify={"space-between"} mb={5} wrap={"wrap"}>
                  <Heading as="h3" size="md" mb={3} mt={innerWidth}>
                    Visão por Área
                  </Heading>
                </Flex>

                <Flex
                  direction={"column"}
                  justify={"space-between"}
                  gap={6}
                  wrap={"wrap"}
                  mb={4}
                >
                  <Flex gap={2} wrap={"wrap"}>
                    <BotaoVisaoGeral />
                  </Flex>
                  <Flex gap={4} wrap={"wrap"}>
                    {statusProjeto.map((status, index) => (
                      <StatusProjeto
                        key={index}
                        status={status.status}
                        color={status.color}
                      />
                    ))}
                  </Flex>
                </Flex>

                <Flex align={"center"} justify={"center"} direction={"column"}>
                  {data.map((area: Area, index: number) => (
                    <AccordionArea key={index} area={area} />
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Stack>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}

export default VisaoPorArea;
