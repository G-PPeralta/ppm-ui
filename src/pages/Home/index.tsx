import React, { useEffect, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";
import { AreasDemandadasPorMes } from "interfaces/Services";

import Sidebar from "components/SideBar";

import { DashboardProvider } from "contexts/Dashboard";

import { getAreasDemandadas } from "services/get/Dashboard";

import AreasDemandadasComponent from "./components/AreasDemandadas";
import FaseProjetos from "./components/FaseProjetos";
import NaoPrevisto from "./components/NaoPrevisto";
import PrevistoxRealizado from "./components/PrevistoxRealizado";
import Projetos from "./components/Projetos";
import Realizado from "./components/Realizado";
import TotalOrcamentos from "./components/TotalOrcamentos";
import TotalProjetos from "./components/TotalProjetos";

export function Home() {
  const [areasDemandadas, setAreasDemandadas] = useState<
    AreasDemandadasPorMes[]
  >([] as AreasDemandadasPorMes[]);
  async function handleGetAreasDemandadas() {
    const reqGet = await getAreasDemandadas();
    const dataReq: AreasDemandadasPorMes[] = reqGet.data;
    setAreasDemandadas(dataReq);
  }

  useEffect(() => {
    handleGetAreasDemandadas();
  }, []);

  return (
    <>
      <DashboardProvider>
        <Sidebar>
          <Flex
            w={"auto"}
            display={"flex"}
            wrap={"wrap"}
            align="flex-start"
            direction="row"
            justify="center"
            gap={4}
          >
            <Flex w={"100%"} gap={4} wrap={"wrap"}>
              <Box flex={3}>
                <TotalProjetos />
              </Box>

              <Box
                flex={1}
                display="flex"
                flexDirection={"column"}
                justifyContent="space-evenly"
                gap={4}
              >
                <TotalOrcamentos />
                <Realizado />
                <NaoPrevisto />
              </Box>
            </Flex>
            <Flex w={"100%"} gap={4} wrap={"wrap"} flex={1}>
              <Projetos />
              <FaseProjetos />
              <AreasDemandadasComponent
                AreasDemandadasPorMes={areasDemandadas}
              />
              <PrevistoxRealizado />
            </Flex>
          </Flex>
        </Sidebar>
      </DashboardProvider>
    </>
  );
}
