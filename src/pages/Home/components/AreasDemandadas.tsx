//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Card areas demandadas dashboard.

import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { AreasDemandadasPorMes } from "interfaces/Services";

import { Loading } from "components/Loading";

import { getAreasDemandadas } from "services/get/Dashboard";

import { AreasDemandantesGrafico } from "./GraficoAreas";
import PercentPieChart from "./PercentPieAreas";

type Props = {
  AreasDemandadasPorMes: AreasDemandadasPorMes[];
};

export default function AreasDemandadasComponent({
  AreasDemandadasPorMes,
}: Props) {
  const innerWidth = window.innerWidth;

  const [areasDemandadas, setAreasDemandadas] = useState<any[]>([] as any[]);
  const [reqGet, setReqGet] = useState<any[]>([] as any[]);
  const [loading, setLoading] = useState(true);
  async function handleGetAreasDemandadas() {
    try {
      const reqGet = await getAreasDemandadas();

      setReqGet(reqGet.data);
      const dataReq: any[] = reqGet.data.reduce((acc: any, curr: any) => {
        const { solicitante, data, quantia } = curr;

        const index = acc.findIndex((item: any) => item.data === data);

        if (index === -1) {
          return [
            ...acc,
            {
              data,
              [solicitante[0].toUpperCase() + solicitante.substring(1)]:
                quantia,
            },
          ];
        }

        return [
          ...acc.slice(0, index),
          {
            ...acc[index],
            [solicitante[0].toUpperCase() + solicitante.substring(1)]: quantia,
          },
          ...acc.slice(index + 1),
        ];
      }, []);
      setAreasDemandadas(dataReq);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const getTotalAreas =
    reqGet &&
    reqGet
      .map((i: any) => Number(i.quantia))
      .reduce((partialSum: number, a: number) => partialSum + a, 0);

  const data =
    reqGet.length > 0 &&
    reqGet.map((infoArea) => ({
      name: infoArea.solicitante,
      value: (infoArea.quantia / getTotalAreas) * 100,
    }));

  useEffect(() => {
    handleGetAreasDemandadas();
  }, []);

  if (loading) {
    <Loading />;
  }
  return (
    <Flex w={"100%"} align="center" justify="center" bg={"#EDF2F7"}>
      <Box
        py={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        px={useBreakpointValue({ base: 8, sm: 8, md: 6 })}
        w={"100%"}
        h={"370px"}
        flex={3}
        bg={"white"}
        boxShadow={{
          base: "none",
          sm: useColorModeValue("md", "md-dark"),
        }}
        borderRadius={"xl"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={4}
      >
        <Box w={"fit-content"} h={230}>
          <Text
            sx={{
              fontSize: 18,
              fontWeight: "700",
              fontFamily: "Mulish",
              alignSelf: "center",
            }}
            color="#000000"
            textAlign={"center"}
          >
            Áreas Demandantes
          </Text>

          <Box display={"flex"} w={"100%"} justifyContent="space-between">
            <Box
              pt={6}
              minW={innerWidth >= 428 ? "350px" : "120px"}
              flex={1}
              ml={-10}
              mr={-20}
            >
              <Flex>
                <Flex align={"center"} justify={"center"}>
                  <AreasDemandantesGrafico data={areasDemandadas || []} />
                </Flex>
                <Flex mt={-20} ml={-19}>
                  <PercentPieChart data={data || []} />
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
