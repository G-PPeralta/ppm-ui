import {
  Box,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import { Gantt } from "components/Gantt";
import Sidebar from "components/SideBar";

function Statistics() {
  const toolbarOptions = ["ZoomIn", "ZoomOut"];
  return (
    <>
      <Sidebar>
        <Stack spacing="8">
          <Box
            py={{ base: "0", sm: "10" }}
            px={{ base: "4", sm: "10" }}
            w={"100%"}
            bg={useBreakpointValue({ base: "transparent", sm: "white" })}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Heading as="h3" size="md" mb={5}>
              Estatísticas
            </Heading>
            <Gantt toolbarOptions={toolbarOptions} />
          </Box>
        </Stack>
      </Sidebar>
    </>
  );
}

export { Statistics };
