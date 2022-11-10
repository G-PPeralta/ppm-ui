import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { useToast } from "contexts/Toast";

import { getUsers } from "services/post/Usuario";

import { BotaoAdicionar } from "./components/AdicionarUsuario";
import { BotaoAtualizar } from "./components/AtualizarUsuario";
import ModalDeletarUsuario from "./components/DeletarUsuario";

export function Usuarios() {
  // const [loading, _setLoading] = useState(true);
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [permissao, setPermissao] = useState("");
  const [refresh, setRefresh] = useState(false);

  const data = [
    {
      area: "Time Origem",
      deletado: false,
      email: "geovana.augusta@origemenergia.com",
      id: 1,
      login: "geovana.augusta",
      nome: "Geovana Augusta",
      perfil: "Administrador",
      primeiroAcesso: true,
      telefone: "(99) 99999-99999",
    },
    {
      area: "Time Origem",
      deletado: false,
      email: "peralta.m@origemenergia.com",
      id: 2,
      login: "peralta.m",
      nome: "Gabriel Peralta",
      perfil: "Administrador",
      primeiroAcesso: true,
      telefone: "(99) 99999-99999",
    },
    {
      area: "Time Origem",
      deletado: false,
      email: "giovana.potenza@origemenergia.com",
      id: 3,
      login: "giovana.potenza",
      nome: "Giovana Potenza",
      perfil: "Administrador",
      primeiroAcesso: true,
      telefone: "(99) 99999-99999",
    },
    {
      area: "Time Origem",
      deletado: false,
      email: "pedro.m@origemenergia.com",
      id: 3,
      login: "pedro.franca",
      nome: "Pedro França",
      perfil: "Administrador",
      primeiroAcesso: true,
      telefone: "(99) 99999-99999",
    },
  ];

  const fetchUsers = async () => {
    // const { data } = await getUsers();
    setUsers(data);
    setFilteredUsers(data);
  };

  useEffect(() => {
    try {
      fetchUsers();
    } catch (error) {
      toast.error("Erro ao obter os usuários");
    }
  }, []);

  const handleFilter = () => {
    if (input === "" || permissao === "") {
      setFilteredUsers(users);
    }
    if (input !== "" && permissao === "Todos") {
      // console.log({ permissao });s

      const filteredArray = users.filter((user) =>
        user.nome.toUpperCase().includes(input.toUpperCase())
      );
      setFilteredUsers(filteredArray);
    }
    if (input !== "" && permissao !== "Todos") {
      const filteredArray = users
        .filter((user: any) =>
          user.nome.toUpperCase().includes(input.toUpperCase())
        )
        .filter((us: any) =>
          us.perfil.toUpperCase().includes(permissao.toUpperCase())
        );
      setFilteredUsers(filteredArray);
    }
    if (input === "" && permissao !== "Todos") {
      // console.log({ permissao });

      const filteredArray = users.filter((user) =>
        user.perfil.toUpperCase().includes(permissao.toUpperCase())
      );
      setFilteredUsers(filteredArray);
    }
  };
  // console.log(permissao);

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <>
      <Sidebar>
        <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
          <Box
            py={{ base: "6", sm: "8" }}
            px={{ base: "6", sm: "10" }}
            w="100%"
            bg="white"
            boxShadow={{
              base: "none",
              sm: "md",
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Flex direction="column" ml={-5} mt={-4} mr={-5}>
              <Flex
                justify={"space-between"}
                mb={2}
                wrap={"wrap"}
                align={"center"}
              >
                <FormLabel htmlFor="name">
                  <Text
                    mb={3}
                    fontSize={"24px"}
                    color={"#2D2926"}
                    fontWeight={"700"}
                    fontFamily={"Mulish"}
                  >
                    Buscar Usuários
                  </Text>
                </FormLabel>
              </Flex>
              <Flex direction={"row"} justify={"space-between"}>
                <Flex flexDir="row" wrap={"wrap"}>
                  <Flex align={"start"} direction={"column"} mr="16px">
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      NOME/EMAIL
                    </Text>
                    <Input
                      h={"56px"}
                      fontSize={"14px"}
                      fontFamily={"Mulish"}
                      fontWeight={"400"}
                      width={"410px"}
                      color={"black"}
                      isRequired
                      placeholder="Digite o nome ou o e-mail"
                      _placeholder={{ color: "#949494" }}
                      id="name"
                      type="text"
                      name="name"
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </Flex>
                  <Flex direction={"column"} mr="16px">
                    <Text
                      fontWeight={"700"}
                      fontSize={"12px"}
                      color={"#949494"}
                    >
                      PERMISSÃO
                    </Text>
                    <Select
                      fontSize={"14px"}
                      fontFamily={"Mulish"}
                      fontWeight={"400"}
                      h={"56px"}
                      w={"208px"}
                      id="permission"
                      name="permission"
                      width={300}
                      onChange={(e) => setPermissao(e.target.value)}
                    >
                      <option>Todos</option>
                      <option value={"Administrador"}>Administrador</option>
                      <option value={"Usuário"}>Usuário</option>
                    </Select>
                  </Flex>
                  <Flex>
                    <Button
                      h={"58px"}
                      borderRadius={"8px"}
                      fontSize={"18px"}
                      fontWeight={"700"}
                      background={"white"}
                      variant="primary"
                      color="origem.500"
                      borderColor="#0047BB"
                      border={"2px"}
                      alignSelf={"end"}
                      _hover={{
                        background: "origem.500",
                        color: "white",
                        transition: "all 0.4s",
                      }}
                      rightIcon={<BsSearch />}
                      onClick={handleFilter}
                    >
                      Filtrar
                    </Button>
                  </Flex>
                </Flex>
                <Flex align={"start"} alignSelf={"end"}>
                  <BotaoAdicionar setRefresh={setRefresh} refresh={refresh} />
                </Flex>
              </Flex>
              <Box mt={"1.5rem"}>
                <Flex
                  display={{ base: "none", md: "flex" }}
                  flexDirection={{ base: "column", lg: "row" }}
                  w="100%"
                >
                  <Flex w={{ base: "100%", lg: "40%" }} ml={3}>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"700"}
                      fontStyle={"normal"}
                      fontFamily={"Mulish"}
                      lineHeight={"20px"}
                      letterSpacing={"0.3px"}
                    >
                      Usuário
                    </Text>
                  </Flex>
                  <Flex w={{ base: "100%", lg: "55%" }} ml={5}>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"700"}
                      fontStyle={"normal"}
                      fontFamily={"Mulish"}
                      lineHeight={"20px"}
                      letterSpacing={"0.3px"}
                    >
                      Contato
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              {filteredUsers.length > 0 ? (
                <Box>
                  {filteredUsers.map((user) => (
                    <Flex
                      ml={-2}
                      mr={-2}
                      paddingX="2"
                      // marginY="10px"
                      align="center"
                      justifyContent="space-between"
                      alignItems="center"
                      flexDirection={{ base: "column", md: "row" }}
                      key={user.nome}
                    >
                      <Flex
                        flexDirection={{
                          base: "column",
                          lg: "row",
                        }}
                        w="100%"
                        minHeight={"6rem"}
                        display={"flex"}
                        alignItems={"center"}
                        borderTop={"1px"}
                        borderColor="gray.200"
                        mt={"0.6rem"}
                        py={"1rem"}
                      >
                        <Flex
                          w={{ base: "100%", lg: "45%" }}
                          flexDirection="column"
                          px="10px"
                        >
                          <Flex flexDirection="row">
                            <Flex mr={20} color={"#585858"}>
                              <FaUserCircle size={55} />
                            </Flex>
                            <Flex flexDirection="column">
                              <Text
                                color="#2D2926"
                                fontWeight={"400"}
                                fontSize={"14px"}
                                fontFamily={"Mulish"}
                              >
                                {user.perfil}
                              </Text>

                              <Text
                                color="#2D2926"
                                fontWeight={"700"}
                                fontSize={"16px"}
                                fontFamily={"Mulish"}
                              >
                                {user.nome}
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                        <Flex
                          w={{ base: "100%", lg: "45%" }}
                          flexDirection="column"
                        >
                          <Text
                            color="#2D2926"
                            fontWeight={"700"}
                            fontSize={"16px"}
                            fontFamily={"Mulish"}
                          >
                            {`Email: ${user.email}`}
                          </Text>
                          <Text
                            color="#2D2926"
                            fontWeight={"700"}
                            fontSize={"16px"}
                            fontFamily={"Mulish"}
                          >
                            {`Telefone: ${user.telefone}`}
                          </Text>
                        </Flex>

                        <Flex
                          w={{ base: "100%", lg: "auto" }}
                          flexDirection="column"
                        >
                          <Flex flexDirection="row" gap={4}>
                            <BotaoAtualizar
                              setRefresh={setRefresh}
                              refresh={refresh}
                            />

                            <ModalDeletarUsuario />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  ))}
                </Box>
              ) : (
                <>
                  <Text fontSize="16px" fontWeight={"bold"}>
                    Não há dados
                  </Text>
                  <Flex
                    ml={-2}
                    mr={-2}
                    paddingX="2"
                    // marginY="10px"
                    align="center"
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection={{ base: "column", md: "row" }}
                    // key={user.nome}
                  >
                    <Flex
                      flexDirection={{
                        base: "column",
                        lg: "row",
                      }}
                      w="100%"
                      minHeight={"6rem"}
                      display={"flex"}
                      alignItems={"center"}
                      borderTop={"1px"}
                      borderColor="gray.200"
                      mt={"0.6rem"}
                      py={"1rem"}
                    >
                      <Flex
                        w={{ base: "100%", lg: "45%" }}
                        flexDirection="column"
                        px="10px"
                      >
                        <Flex flexDirection="row">
                          <Flex flexDirection="column">
                            <Text
                              color="#2D2926"
                              fontWeight={"400"}
                              fontSize={"14px"}
                              fontFamily={"Mulish"}
                            >
                              {/* {user.perfil} */}
                            </Text>

                            <Text
                              color="#2D2926"
                              fontWeight={"700"}
                              fontSize={"16px"}
                              fontFamily={"Mulish"}
                            >
                              {/* {user.nome} */}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </>
              )}
            </Flex>
          </Box>
        </Flex>
      </Sidebar>
    </>
  );
}
