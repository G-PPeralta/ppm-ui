import React, { useLayoutEffect, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

import Sidebar from "components/SideBar";

import AreasDemandadas from "./components/AreasDemandadas";
// import BotoesSelecionarPolo from "./components/BotoesSelecionarPolo";
import FaseProjetos from "./components/FaseProjetos";
import NaoPrevisto from "./components/NaoPrevisto";
import PrevistoxRealizado from "./components/PrevistoxRealizado";
import Projetos from "./components/Projetos";
import Realizado from "./components/Realizado";
import TotalOrcamentos from "./components/TotalOrcamentos";
import TotalProjetos from "./components/TotalProjetos";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export function Home() {
  const [width] = useWindowSize();

  return (
    <>
      <Sidebar>
        {/* <BotoesSelecionarPolo /> */}
        <Flex
          w={"auto"}
          display={"flex"}
          wrap={"wrap"}
          align="flex-start"
          direction="row"
          justify="center"
        >
          <Box flex={1} m={1}>
            <TotalProjetos />
          </Box>

          <Box
            m={1}
            flex={width > 1100 ? 0 : 1}
            sx={{ height: 340 }}
            display="flex"
            flexDirection={"column"}
            justifyContent="space-evenly"
          >
            <TotalOrcamentos />
            <Realizado />
            <NaoPrevisto />
          </Box>
          <Box flex={4} m={1}>
            <Projetos />
          </Box>
          <Box flex={1} m={1}>
            <FaseProjetos />
          </Box>
          <Box flex={1} m={1}>
            <AreasDemandadas />
          </Box>
          <Box flex={1} m={1}>
            <PrevistoxRealizado />
          </Box>
        </Flex>
      </Sidebar>
    </>
  );
}
