//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro, Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Tela dashboard.

import React, { useEffect, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";
import { AreasDemandadasPorMes } from "interfaces/Services";

import Sidebar from "components/SideBar";

import { DashboardProvider } from "contexts/Dashboard";

import { getAreasDemandadas } from "services/get/Dashboard";

import AreasDemandadasComponent from "./components/AreasDemandadas";
import FaseProjetos from "./components/FaseProjetos";
import NaoPrevisto from "./components/NaoPrevisto";
import Performance from "./components/Performance";
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

  function componentDidMount() {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (Number(reloadCount) < 2) {
      sessionStorage.setItem("reloadCount", String(Number(reloadCount) + 2));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  }

  useEffect(() => {
    handleGetAreasDemandadas();
    componentDidMount();
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
              <Flex align="center" justify={"center"}>
                <Performance />
              </Flex>

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
              <TotalProjetos />
              <Flex w={"100%"}>
                <Projetos />
              </Flex>
              <FaseProjetos />
              <Flex w={"50%"}>
                <AreasDemandadasComponent
                  AreasDemandadasPorMes={areasDemandadas}
                />
              </Flex>
            </Flex>
            <Flex align="center" justify={"center"}>
              <PrevistoxRealizado />
            </Flex>
          </Flex>
        </Sidebar>
      </DashboardProvider>
    </>
  );
}
