import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  // FormLabel,
  // HStack,
  Text,
  // Stack,
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
import { Polo, ProjetosList } from "interfaces/Services";

import Sidebar from "components/SideBar";

// import { useFornecedores } from 'hooks/useFornecedores';

import { getFornecedor } from "services/get/Fornecedor";
import { getPolo, getProjetos } from "services/get/Projetos";
import { putFornecedor } from "services/update/Fornecedor";

import { EditarFornecedorModal } from "./components/EditarFornecedorModal";
import { TabelaFornecedores } from "./components/TabelaFornecedores";

// export interface Fornecedor {
//   id: number;
//   nomefornecedor: string;
//   fornecedor: string;
//   orcamento: number;
//   realizado: number;
//   responsavel: string;
//   descricao: string;
// }

export interface FornecedoreDto {
  id: number;
  nom_usu_create: string;
  poloid: number;
  servicoid: number;
  statusid: number;
  nomefornecedor: string;
  numerocontrato: string;
  representante: string;
  email: string;
  telefone: string;
  invoice: string;
  cnpj: string;
  justificativa: string;
  outrasInformacoes: string;
}

export function Fornecedores() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editFornecedor, setEditFornecedor] = useState({} as FornecedoreDto);
  const [fornecedores, setFornecedores] = useState<FornecedoreDto[]>([]);
  const [filteredFornecedores, setFilteredFornecedores] = useState<
    FornecedoreDto[]
  >([] as FornecedoreDto[]);
  const [projetos, setProjetos] = useState([] as ProjetosList[]);
  const [polos, setPolos] = useState<Polo[]>([] as Polo[]);
  const [loading, setLoading] = useState(true);
  // estados dos filtros
  const [projetoId, setProjetoId] = useState(0);
  const [polo, setPolo] = useState(0);

  function handleEditFornecedor(fornecedor: FornecedoreDto) {
    setEditFornecedor(fornecedor);
    onOpen();
  }

  async function handleGetPolos() {
    const payload = await getPolo();
    setPolos(payload.data);
  }

  function handleUpdateFornecedor(fornecedor: any) {
    // Atualiza o fornecedor na lista
    setFornecedores(
      fornecedores.map((f) => (f.id === fornecedor.id ? fornecedor : f))
    );
    putFornecedor(fornecedor);
    handleGetFornecedores();
    onClose();
  }

  const handleGetFornecedores = async () => {
    const response = await getFornecedor();
    setFornecedores(response.data as FornecedoreDto[]);
    setFilteredFornecedores(response.data as FornecedoreDto[]);
  };

  // console.log(fornecedores);

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

  useEffect(() => {
    handleGetPolos();
  }, []);

  useEffect(() => {
    if (polos.length > 0 && fornecedores.length > 0 && projetos.length > 0)
      setLoading(false);
  }, [polos, fornecedores, projetos]);

  function handleFilterData(id: number, pol: number) {
    if (id !== 0) {
      const filtered = fornecedores.filter((fornec) => fornec.id == id);
      return setFornecedores(filtered);
    }
    if (pol !== 0) {
      const filtered = fornecedores.filter((fornec) => fornec.poloid == pol);
      return setFornecedores(filtered);
    }
    setFornecedores(filteredFornecedores);
  }

  return (
    <Sidebar>
      <Flex
        w={"auto"}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
      >
        {/* <Stack spacing="8"> */}
        {/* <Flex align="center" justify="center" bg={"#EDF2F7"}> */}
        <Box
          py={{ base: "6", sm: "8" }}
          px={{ base: "6", sm: "8" }}
          w={"100%"}
          bg={useBreakpointValue({ base: "transparent", sm: "white" })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{ base: "xl", sm: "xl" }}
        >
          <Flex
            mt={-3}
            ml={-3}
            flexDirection={"row"}
            justify={"space-between"}
            mb={4}
            wrap={"wrap"}
          >
            <Heading>
              <Text
                fontFamily={"Mulish"}
                fontWeight={"700"}
                fontSize={"24px"}
                color={"#2D2926"}
              >
                Fornecedores
              </Text>
            </Heading>
          </Flex>
          <Flex
            flexDirection={useBreakpointValue({
              base: "column",
              md: "column",
            })}
            wrap={"wrap"}
            // border={'red solid 2px'}
          >
            <Flex ml={-3}>
              <Button
                type="button"
                variant="primary"
                h={"56px"}
                borderRadius={"8px"}
                fontSize={"18px"}
                fontWeight={"700"}
                background={"white"}
                border={"2px solid"}
                color={"origem.500"}
                padding={4}
                w={useBreakpointValue({ base: "100%", md: "251px" })}
                _hover={{
                  border: "2px solid",
                  borderColor: "origem.500",
                  background: "origem.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
                onClick={() => {
                  navigate("/cadastrar-fornecedor");
                }}
                mb={"15px"}
                rightIcon={<BiPlus />}
              >
                Cadastrar Fornecedores
              </Button>
            </Flex>

            <Flex justify={"space-between"}>
              <Flex align={"flex-end"} gap={4} wrap={"wrap"} flex={1}>
                <Flex ml={-3}>
                  {/* <FormControl>
                    <FormLabel
                      // fontWeight={"700"}
                      // fontSize={"12px"}
                      // color={"#A7A7A7"}
                      htmlFor="projeto"
                    >
                      <Text
                        fontWeight={"700"}
                        fontSize={"12px"}
                        color={"#949494"}
                      >
                        PROJETO
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontFamily={"Mulish"}
                      fontWeight={"400"}
                      mt={"-9px"}
                      placeholder="Selecione"
                      id="projeto"
                      name="projeto"
                      onChange={(e) => setProjetoId(Number(e.target.value))}
                      width={"208px"}
                      height={"56px"}
                    >
                      <option value={0}>Todos</option>
                      {projetos &&
                        projetos.map((project, index) => (
                          <option value={project.id} key={index}>
                            {project.nomeProjeto}
                          </option>
                        ))}
                    </Select>
                  </FormControl> */}
                  <FormControl>
                    <FormLabel
                      // fontWeight={"700"}
                      // fontSize={"12px"}
                      // color={"#A7A7A7"}
                      htmlFor="projeto"
                    >
                      <Text
                        fontWeight={"700"}
                        fontSize={"12px"}
                        color={"#949494"}
                      >
                        FORNECEDOR
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontFamily={"Mulish"}
                      fontWeight={"400"}
                      mt={"-9px"}
                      placeholder="Selecione"
                      id="projeto"
                      name="projeto"
                      onChange={(e) => setProjetoId(Number(e.target.value))}
                      width={"208px"}
                      height={"56px"}
                    >
                      <option value={0}>Todos</option>
                      {fornecedores &&
                        fornecedores.map((forn, index) => (
                          <option value={forn.id} key={index}>
                            {forn.nomefornecedor}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                </Flex>

                <Flex align={"flex-end"}>
                  <FormControl>
                    <FormLabel
                      fontWeight={"700"}
                      fontSize={"12px"}
                      // color={"#A7A7A7"}
                      htmlFor="projeto"
                    >
                      <Text
                        fontWeight={"700"}
                        fontSize={"12px"}
                        color={"#949494"}
                      >
                        POLO
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontFamily={"Mulish"}
                      fontWeight={"400"}
                      mt={"-9px"}
                      placeholder="Selecione"
                      id="projeto"
                      name="projeto"
                      onChange={(e) => setPolo(Number(e.target.value))}
                      width={"208px"}
                      height={"56px"}
                    >
                      <option color={"#A7A7A7"} value={0}>
                        Todos
                      </option>
                      {!loading &&
                        polos.map((pol, index) => (
                          <option value={pol.id} key={index}>
                            {pol.polo}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                </Flex>
                <Flex>
                  <Button
                    type="button"
                    borderRadius={"8px"}
                    fontWeight={"700"}
                    background={"origem.500"}
                    variant="outline"
                    color="white"
                    borderColor="#0047BB"
                    _hover={{
                      background: "origem.600",
                      transition: "all 0.4s",
                    }}
                    rightIcon={<FiSearch />}
                    onClick={() => {
                      handleFilterData(projetoId, polo);
                      setPolo(0);
                      setProjetoId(0);
                    }}
                    alignSelf={"end"}
                    height={"56px"}
                    width={"101px"}
                    fontSize={"18px"}
                  >
                    Filtrar
                  </Button>
                </Flex>
              </Flex>
              <Flex
                // border={'gray solid 4px'}
                // justifyContent={"flex-start"}
                align={"flex-start"}
                alignSelf={"center"}
                mr={-4}
                mt={4}
              >
                <Button
                  background="transparent"
                  color="#0239C3"
                  float={"right"}
                  fontWeight={"700"}
                  fontSize={"18px"}
                  // alignSelf={"end"}
                >
                  Lixeira
                  <Icon
                    // alignSelf={"end"}
                    as={MdArrowForwardIos}
                    fontSize="20px"
                    fontWeight={"700"}
                    ml={1}
                    color="#0239C3"
                  />
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
            </Flex>
          </Flex>
          <Flex ml={-3} mr={-3} flexDir={"column"}>
            {/*  Componentes aqui */}
            <TabelaFornecedores
              fornecedores={fornecedores}
              onEdit={handleEditFornecedor}
              polos={polos}
              loading={loading}
            />
          </Flex>
          <EditarFornecedorModal
            isOpen={isOpen}
            onClose={onClose}
            fornecedor={editFornecedor}
            onUpdate={handleUpdateFornecedor}
            polos={polos}
          />
          {/* <Stack spacing="6" alignItems={"center"}></Stack> */}
        </Box>{" "}
      </Flex>
      {/* </Flex> */}
    </Sidebar>
  );
}
