import {
  Box,
  Flex,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Text,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import Sidebar from "components/SideBar";
// import { FiPlusCircle, FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { ModalAddAtividade } from "../components/ModalAddAtividade";
import { TabelaAtividades } from "../components/TabelaAtividades";
import { TabelaFerramentas } from "../components/TabelaFerramentas";
import { TabelaServicos } from "../components/TabelaServicos";

const LookaheadData = [
  {
    id: 1,
    projeto: "SPT - 123",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    projeto: "SPT - 001",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    projeto: "SPT - 002",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    projeto: "SPT - 003",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    projeto: "SPT - 004",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 6,
    projeto: "SPT - 005",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 7,
    projeto: "SPT - 006",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 8,
    projeto: "SPT - 007",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 9,
    projeto: "SPT - 008",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 10,
    projeto: "SPT - 009",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 11,
    projeto: "SPT - 0010",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 12,
    projeto: "SPT - 0011",
    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export function LookaheadDetalhe() {
  const { id } = useParams();
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
              <Flex direction="column">
                <Text fontWeight="bold">Relatorio Lookahead</Text>
                <Text>
                  {id && LookaheadData.find((x) => x.id == +id)?.projeto}
                </Text>
                <Flex
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Flex alignItems="flex-end">
                    <FormControl>
                      <ModalAddAtividade />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="pole">SEMANA</FormLabel>
                      <Select
                        id="poloId"
                        name="pole"
                        width={250}
                        marginRight="15px"
                      >
                        {/* {projetos &&
                          projetos.map(function (proj, index) {
                            return (
                              <option value={proj.id} key={index}>
                                {proj.id} - {proj.nome.substring(0, 12)}
                              </option>
                            );
                          })} */}
                        <option value="1">22/08/2022 - 28/08/2022</option>
                        <option value="1">29/08/2022 - 04/09/2022</option>
                        <option value="1">05/09/2022 - 11/09/2022</option>
                        <option value="1">12/08/2022 - 18/09/2022</option>
                      </Select>
                    </FormControl>

                    {/* <FormControl className="toBottom">
                      <Button
                        color="white"
                        background="origem.300"
                        variant="primary"
                        _hover={{
                          background: "origem.500",
                          transition: "all 0.4s",
                        }}
                        rightIcon={<FiSearch />}
                      >
                        Buscar
                      </Button>
                    </FormControl> */}
                  </Flex>
                </Flex>

                <Flex direction="column">
                  <TabelaAtividades />
                  <TabelaFerramentas />
                  <TabelaServicos />
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
