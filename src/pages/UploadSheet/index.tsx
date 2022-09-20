import { useRef } from "react";
import { FiFile } from "react-icons/fi";
import { MdWarning } from "react-icons/md";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  Select,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import Sidebar from "components/SideBar";

import "./upload.css";

export function UploadSheet() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => inputRef.current?.click();

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
                lg: "80rem",
              })}
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <h1 className="titulo">Carregar Planilha</h1>

              <FormControl>
                <FormLabel>Tipo de Planilha</FormLabel>
                <Select>
                  <option>Tipo</option>
                  <option>Tipo2</option>
                  <option>Tipo3</option>
                </Select>
              </FormControl>

              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Icon as={MdWarning} /> Carregar Planilha X
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <FormControl>
                <InputGroup onClick={handleClick}>
                  <input
                    type="file"
                    ref={(e) => {
                      inputRef.current = e;
                    }}
                    hidden
                  />
                  <Button
                    w={"full"}
                    variant={"secondary"}
                    colorScheme="blue"
                    leftIcon={<Icon as={FiFile} />}
                    isLoading={false}
                    paddingX={24}
                  >
                    {"Importar"}
                  </Button>
                </InputGroup>
              </FormControl>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
