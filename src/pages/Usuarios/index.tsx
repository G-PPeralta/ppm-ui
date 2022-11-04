import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

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

import { BotaoAdicionar } from "./components/AdicionarUsuario";

export function Usuarios() {
  // const [loading, _setLoading] = useState(true);
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [input, setInput] = useState("");

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
    if (input === "") {
      setFilteredUsers(users);
    }
    const filteredArray = users.filter(
      (user) => user.nome.includes(input) || user.email.includes(input)
    );
    setFilteredUsers(filteredArray);
  };

  useEffect(() => {
    handleFilter();
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
                    >
                      <option>Todos</option>
                    </Select>
                  </Flex>
                  <Flex>
                    <Button
                      h={"56px"}
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
                      // onClick={handleFilter()}
                    >
                      Filtrar
                    </Button>
                  </Flex>
                </Flex>
                <Flex align={"start"} alignSelf={"end"}>
                  <BotaoAdicionar />
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

              <Box marginTop="10px">
                {filteredUsers.map((user) => (
                  <Flex
                    paddingX="2"
                    marginY="10px"
                    align="center"
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection={{ base: "column", md: "row" }}
                    key={user.id}
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
                        <Text textColor="gray.500">{user.perfil}</Text>
                        <Text>{user.nome}</Text>
                      </Flex>
                      <Flex
                        w={{ base: "100%", lg: "45%" }}
                        flexDirection="column"
                      >
                        <Text textColor="gray.500">{user.email}</Text>
                        <Text>{user.telefone}</Text>
                      </Flex>

                      <Flex
                        w={{ base: "100%", lg: "auto" }}
                        flexDirection="column"
                      >
                        <Flex flexDirection="row">
                          <Button
                            type="submit"
                            background="white"
                            variant="solid"
                            border={"2px solid #0047BB"}
                            borderRadius={"8px"}
                            flex={"none"}
                            mt={{ base: 1 }}
                            order={0}
                            flexGrow={0}
                            p={"16px 8px"}
                            color="origem.500"
                            fontWeight={"700"}
                            fontFamily={"Mulish"}
                            fontStyle={"normal"}
                            fontSize={"18px"}
                            lineHeight={"23px"}
                            textAlign={"center"}
                            letterSpacing={"0.3px"}
                            boxShadow="0px 4px 12px rgba(55, 81, 255, 0.24)"
                            w={{ base: "100%", md: "98px" }}
                            h={"55px"}
                            _hover={{
                              background: "origem.500",
                              transition: "all 0.4s",
                              color: "white",
                            }}
                            // onClick={() => {
                            //   navigate(`/update-user/${user.id}`);
                            // }}
                          >
                            Atualizar
                          </Button>
                          <Button
                            type="button"
                            background="white"
                            variant="none"
                            color="red"
                            mt={{ md: 1 }}
                            marginLeft="2"
                            w={"56px"}
                            h={"56px"}
                            _hover={{
                              background: "red",
                              transition: "all 0.4s",
                              color: "white",
                            }}
                            // onClick={onOpen}
                          >
                            {/* <Icon as={CgTrashEmpty} fontSize="24px" /> */}
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
                <Button
                  type="submit"
                  background="origem.15"
                  variant="primary"
                  lineHeight={"23px"}
                  boxShadow="0px 4px 12px rgba(55, 81, 255, 0.24)"
                  fontFamily={"Mulish"}
                  fontWeight={"700"}
                  fontSize={"16px"}
                  fontStyle={"normal"}
                  textAlign={"center"}
                  visibility={{ base: "visible", md: "hidden" }}
                  letterSpacing={"0.3px"}
                  borderRadius={"8px"}
                  color="white"
                  w={{ base: "100%", md: "208px" }}
                  h="56px"
                  mt="1rem"
                  _hover={{
                    background: "#012A91",
                    transition: "all 0.4s",
                  }}
                  // onClick={() => {
                  //   navigate("/register");
                  // }}
                >
                  Adicionar Usuário
                  {/* <Icon as={AiOutlinePlus} fontSize="20px" ml={1} /> */}
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Sidebar>
    </>
  );
}
