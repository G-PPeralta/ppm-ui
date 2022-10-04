import { useEffect, useState } from "react";
// import { BsPlusLg } from 'react-icons/bs';
// import { FaGreaterThan } from 'react-icons/fa';
import { BiPlus } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  // FormLabel,
  // HStack,
  Text,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Heading,
  Button,
  Icon,
  // Input,
  // FormControl,
  // Select,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { ProjetosList } from "interfaces/Services";

import Sidebar from "components/SideBar";

// import { useFornecedores } from 'hooks/useFornecedores';

import { getFornecedor } from "services/get/Fornecedor";
import { getProjetos } from "services/get/Projetos";
import { putFornecedor } from "services/update/Fornecedor";

import { EditarFornecedorModal } from "./components/EditarFornecedorModal";
import { TabelaFornecedores } from "./components/TabelaFornecedores";

export interface Fornecedor {
  id: number;
  fornecedor: string;
  orcamento: number;
  realizado: number;
  responsavel: string;
  descricao: string;
}

export function Fornecedores() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editFornecedor, setEditFornecedor] = useState({} as Fornecedor);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [projetos, setProjetos] = useState([] as ProjetosList[]);
  const [projetoId, setProjetoId] = useState("");
  console.log(projetoId);

  function handleEditFornecedor(fornecedor: Fornecedor) {
    setEditFornecedor(fornecedor);
    onOpen();
  }

  function handleUpdateFornecedor(fornecedor: Fornecedor) {
    // Atualiza o fornecedor na lista
    setFornecedores(
      fornecedores.map((f) => (f.id === fornecedor.id ? fornecedor : f))
    );
    putFornecedor(fornecedor.id, fornecedor); // API
    onClose();
  }

  const handleGetFornecedores = async () => {
    const response = await getFornecedor();
    setFornecedores(response.data as Fornecedor[]);
  };

  async function handleGetProjetos() {
    const payload = await getProjetos();
    setProjetos(payload.data);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  useEffect(() => {
    handleGetFornecedores();
  }, []);

  return (
    <Sidebar>
      <Flex
        w={"100%"}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
      >
        <Stack spacing="8">
          <Flex>
            <Box
              py={{ base: "6", sm: "8" }}
              px={{ base: "6", sm: "8" }}
              w={"1080px"}
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Heading as="h3" size="md" mt={"-15px"} mb={"25px"}>
                <Text color={"#010101"} fontSize={"24px"} fontWeight={"700"}>
                  Fornecedores
                </Text>
              </Heading>

              <Stack spacing="0">
                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "column",
                  })}
                  // border={'red solid 2px'}
                >
                  <Flex
                  // border={'purple solid 3px'}
                  >
                    <Button
                      ml={useBreakpointValue({ base: 0 })}
                      mt={useBreakpointValue({ base: 2, md: 0 })}
                      type="button"
                      background="white"
                      variant="primary"
                      color="#0047BB"
                      border="2px #0047BB solid"
                      padding={2}
                      borderRadius={6}
                      w={useBreakpointValue({ base: "100%", md: "251px" })}
                      h={"56px"}
                      _hover={{
                        background: "#f5f5f5",
                        transition: "all 0.4s",
                        color: "origem.300",
                        cursor: "pointer",
                        borderColor: "#0047BB",
                      }}
                      onClick={() => {
                        navigate("/providers-registration");
                      }}
                      mb={"15px"}
                    >
                      <Text
                        fontSize={useBreakpointValue({
                          base: "sm",
                          md: "18px",
                        })}
                        color={"origem.500"}
                        fontWeight={"700"}
                      >
                        Cadastrar Fornecedores
                      </Text>
                      <Icon
                        as={BiPlus}
                        fontSize="18px"
                        fontWeight={"700"}
                        ml={1}
                        color={"#0047BB"}
                      />
                    </Button>
                  </Flex>

                  <Flex gap={2}>
                    <FormControl>
                      <FormLabel
                        fontWeight={"700"}
                        fontSize={"12px"}
                        color={"#A7A7A7"}
                        htmlFor="projeto"
                      >
                        <Text
                          fontWeight={"700"}
                          fontSize={"12px"}
                          color={"#A7A7A7"}
                        >
                          PROJETO
                        </Text>
                      </FormLabel>
                      <Select
                        mt={"-9px"}
                        placeholder="Selecione"
                        id="projeto"
                        name="projeto"
                        onChange={(e) => setProjetoId(e.target.value)}
                        width={"208px"}
                        height={"56px"}
                      >
                        <option color={"#A7A7A7"} value={0}>
                          Todos
                        </option>
                        {projetos &&
                          projetos.map((project, index) => (
                            <option value={project.id} key={index}>
                              {project.nomeProjeto}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                    <Flex ml={"7px"}>
                      <FormControl>
                        <FormLabel
                          fontWeight={"700"}
                          fontSize={"12px"}
                          color={"#A7A7A7"}
                          htmlFor="projeto"
                        >
                          <Text
                            fontWeight={"700"}
                            fontSize={"12px"}
                            color={"#A7A7A7"}
                          >
                            POLO
                          </Text>
                        </FormLabel>
                        <Select
                          mt={"-9px"}
                          placeholder="Selecione"
                          id="projeto"
                          name="projeto"
                          onChange={(e) => setProjetoId(e.target.value)}
                          width={"208px"}
                          height={"56px"}
                        >
                          <option color={"#A7A7A7"} value={0}>
                            Todos
                          </option>
                          {projetos &&
                            projetos.map((project, index) => (
                              <option value={project.id} key={index}>
                                {project.nomeProjeto}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </Flex>
                    <Flex>
                      <Button
                        type="button"
                        background="#0047BB"
                        variant="outline"
                        color="white"
                        borderColor="#0047BB"
                        _hover={{
                          background: "white",
                          transition: "all 0.4s",
                          color: "#0047BB",
                        }}
                        rightIcon={<FiSearch />}
                        // onClick={filterByProject}
                        alignSelf={"end"}
                        marginLeft={"5"}
                        height={"56px"}
                        width={"101px"}
                        fontSize={"18px"}
                        mr="460px"
                        ml="10px"
                      >
                        Filtrar
                      </Button>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    // border={'green solid 4px'}
                    justifyContent={"flex-start"}
                    mt={"5px"}
                  >
                    {/* <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Flex
                      // border={'blue solid 2px'}
                      >
                        <FormControl>
                          <FormLabel
                            fontSize="xs"
                            mt={1}
                            color={'black'}
                            // ml={'9px'}
                          >
                            PROJETO
                          </FormLabel>
                          <Input
                            type="text"
                            placeholder="Nome do projeto"
                            w={useBreakpointValue({
                              base: '100%',
                              md: '255px',
                            })}
                            h={useBreakpointValue({
                              md: '56px',
                            })}
                            // ml={'9px'}
                            mr={'20px'}
                            color={'#A7A7A7'}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="xs" mt={1} color={'black'}>
                            POLO
                          </FormLabel>
                          <Select
                            placeholder="Selecione"
                            size="md"
                            name="historico"
                            w={useBreakpointValue({
                              base: '100%',
                              md: '204px',
                            })}
                            h={useBreakpointValue({
                              md: '56px',
                            })}
                            mr={'60px'}
                            color={'#A7A7A7'}
                          >
                            <option value="alagoas">Alagoas</option>
                            <option value="tucano-sul">Tucano Sul</option>
                          </Select>{' '}
                        </FormControl>
                        <FormControl>
                          <Button
                            ml={useBreakpointValue({
                              base: 0,
                              sm: 0,
                              md: -120,
                              lg: -10,
                            })}
                            mt={7}
                            // disabled={!registerForm.isValid}
                            type="submit"
                            background="#0047BB"
                            variant="primary"
                            color="white"
                            border={'2px'}
                            w={useBreakpointValue({
                              base: '100%',
                              md: '28%',
                              lg: '124px',
                            })}
                            h={useBreakpointValue({
                              lg: '59px',
                            })}
                          >
                            Buscar
                            <Icon as={AiOutlineSearch} fontSize="20px" ml={1} />
                          </Button>
                        </FormControl>
                      </Flex>
                    </form> */}
                    {/* <Flex
                      // border={'gray solid 4px'}
                      justifyContent={'flex-end'}
                    >
                      <Button
                        background="transparent"
                        color="#0047BB"
                        float={'right'}
                        mt={'45px'}
                        ml={'290px'}
                        fontSize="17px"
                      >
                        Lixeira
                        <Icon
                          as={FaGreaterThan}
                          fontSize="13px"
                          fontWeight={'none'}
                          ml={1}
                          color="#0047BB"
                        />
                      </Button>
                    </Flex> */}
                  </Flex>
                </Flex>
              </Stack>

              {/*  Componentes aqui */}
              <TabelaFornecedores
                fornecedores={fornecedores}
                onEdit={handleEditFornecedor}
              />
              <EditarFornecedorModal
                isOpen={isOpen}
                onClose={onClose}
                fornecedor={editFornecedor}
                onUpdate={handleUpdateFornecedor}
              />
              <Stack spacing="6" alignItems={"center"}></Stack>
            </Box>{" "}
          </Flex>
        </Stack>
      </Flex>
    </Sidebar>
  );
}
