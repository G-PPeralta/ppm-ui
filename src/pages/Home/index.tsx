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

// function useWindowSize() {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener("resize", updateSize);
//     updateSize();
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);
//   return size;
// }

export function Home() {
  // const [width] = useWindowSize();

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
