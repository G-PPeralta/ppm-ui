import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
// import { BsPlusLg } from 'react-icons/bs';
// import { FaGreaterThan } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  // FormLabel,
  // HStack,
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
} from "@chakra-ui/react";

import Sidebar from "components/SideBar";

// import { useFornecedores } from 'hooks/useFornecedores';

import { getFornecedor } from "services/get/Fornecedor";
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

  console.log(fornecedores);

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
              py={{ base: "0", sm: "16" }}
              px={{ base: "4", sm: "10" }}
              w={"100%"}
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Heading as="h3" size="md" mt={"-50px"} mb={"15px"}>
                Fornecedores
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
                      color="origem.500"
                      border={"2px"}
                      w={useBreakpointValue({ base: "100%", md: "21%" })}
                      onClick={() => {
                        navigate("/providers-registration");
                      }}
                      mb={"15px"}
                    >
                      Cadastrar Fornecedores
                      <Icon as={AiFillPlusCircle} fontSize="20px" ml={1} />
                    </Button>
                  </Flex>
                  <Flex
                    flexDirection={useBreakpointValue({
                      base: "column",
                      md: "row",
                    })}
                    // border={'green solid 4px'}
                    justifyContent={"flex-start"}
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
                // setEditFornecedor={setEditFornecedor}
              />
              <Stack spacing="6" alignItems={"center"}></Stack>
            </Box>{" "}
          </Flex>
        </Stack>
      </Flex>
    </Sidebar>
  );
}
