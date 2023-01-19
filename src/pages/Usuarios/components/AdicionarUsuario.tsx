//  CRIADO EM: 7/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO:  Modal adicionar usuário

import { useEffect } from "react";
import { FiPlus } from "react-icons/fi";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Select,
} from "@chakra-ui/react";

import formatCellphone from "utils/formatCellphone";
import { handleCadastrar, handleCancelar } from "utils/handleCadastro";

import { useCadastroUsuario } from "hooks/useUsuarios";

interface RefreshProps {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BotaoAdicionar(getRefreshs: RefreshProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const areas = ["Engenharia", "Operação", "Transporte"];

  const { registerForm } = useCadastroUsuario();

  useEffect(() => {
    registerForm.setFieldValue("senha", "Mudar@123");
  }, []);

  return (
    <>
      <Flex>
        <Button
          onClick={onOpen}
          h={"58px"}
          borderRadius={"8px"}
          background={"#0047BB"}
          border={"2.3px solid"}
          color={"white"}
          variant="primary"
          _hover={{
            background: "white",
            color: "#0047BB",
            transition: "all 0.4s",
          }}
          rightIcon={<FiPlus />}
          fontSize={"18px"}
          fontWeight={"700"}
          fontFamily={"Mulish"}
          alignSelf={"end"}
        >
          Adicionar Usuário
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              backgroundColor={"#2E69FD"}
              display={"flex"}
              justifyContent={"center"}
              color={"white"}
              fontSize={"14px"}
              fontWeight={"700"}
            >
              Cadastrar Usuário
            </ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody>
              <Flex align="end" mt={3} flexDir={"column"} gap={2}>
                <FormControl>
                  <FormLabel
                    fontSize={"12px"}
                    fontWeight={"700"}
                    color={"#949494"}
                    mb={"1px"}
                    htmlFor="nome"
                  >
                    NOME
                  </FormLabel>
                  <Input
                    isRequired
                    placeholder="Nome do Usuário"
                    type="text"
                    id="nome"
                    name="nome"
                    maxLength={40}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color={"black"}
                    _placeholder={{ color: "#949494" }}
                    w={"100%"}
                    border={"1px solid #949494"}
                    h={"56px"}
                    value={registerForm.values.nome}
                    onChange={registerForm.handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize={"12px"}
                    fontWeight={"700"}
                    color={"#949494"}
                    mb={"1px"}
                    htmlFor="nome"
                  >
                    E-MAIL
                  </FormLabel>
                  <Input
                    mb={-1}
                    isRequired
                    placeholder="E-mail"
                    type="text"
                    id="email"
                    name="email"
                    maxLength={40}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color={"black"}
                    _placeholder={{ color: "#949494" }}
                    w={"100%"}
                    border={"1px solid #949494"}
                    h={"56px"}
                    value={registerForm.values.email}
                    onChange={registerForm.handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    htmlFor="regulatorio.opcao_id"
                    fontSize={"12px"}
                    color={"#949494"}
                    fontWeight={"700"}
                    mb={"1px"}
                    w={"550px"}
                    mt={"5px"}
                  >
                    NÍVEL DE ACESSO
                  </FormLabel>
                  <Select
                    id="roleId"
                    name="roleId"
                    placeholder="Selecione"
                    w={"100%"}
                    h={"56px"}
                    fontSize={"14px"}
                    color={"black"}
                    fontWeight={"400"}
                    border={"solid 1px #949494"}
                    value={registerForm.values.perfil}
                    onChange={registerForm.handleChange}
                  >
                    <option value={1}>Administrador</option>
                    <option value={2}>Usuário</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize={"12px"}
                    fontWeight={"700"}
                    color={"#949494"}
                    mb={"1px"}
                    htmlFor="telefone"
                  >
                    TELEFONE
                  </FormLabel>
                  <Input
                    mb={-1}
                    isRequired
                    type="text"
                    id="telefone"
                    name="telefone"
                    maxLength={40}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color={"black"}
                    _placeholder={{ color: "#949494" }}
                    w={"60%"}
                    border={"1px solid #949494"}
                    h={"56px"}
                    value={formatCellphone(registerForm.values.telefone)}
                    onChange={registerForm.handleChange}
                    placeholder={"(00) 90000-0000"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    htmlFor="areaAtuacao"
                    fontSize={"12px"}
                    color={"#949494"}
                    fontWeight={"700"}
                    mb={"1px"}
                    w={"550px"}
                    mt={"5px"}
                  >
                    ÁREA
                  </FormLabel>
                  <Select
                    id="areaAtuacao"
                    name="areaAtuacao"
                    placeholder="Selecione"
                    w={"100%"}
                    h={"56px"}
                    fontSize={"14px"}
                    color={"black"}
                    fontWeight={"400"}
                    border={"solid 1px #949494"}
                    value={registerForm.values.area}
                    onChange={registerForm.handleChange}
                  >
                    {areas.map((perfil: any, index: any) => (
                      <option key={index}>{perfil}</option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>
              <Flex
                flexDirection={useBreakpointValue({
                  base: "column",
                  md: "row",
                })}
              ></Flex>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2} ml={9}>
                <Button
                  variant="ghost"
                  color="red.500"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  w={"208px"}
                  h={"56px"}
                  fontSize={"18px"}
                  fontWeight={"700"}
                  borderRadius={"8px"}
                  fontFamily={"Mulish"}
                >
                  Cancelar
                </Button>
                <Button
                  background="origem.500"
                  variant="primary"
                  color="white"
                  onClick={() => [
                    handleCadastrar(registerForm, onClose),
                    getRefreshs.setRefresh(!getRefreshs.refresh),
                  ]}
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  borderRadius={"8px"}
                  w={"208px"}
                  h={"56px"}
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  disabled={!registerForm.isValid}
                >
                  <>
                    <Text>Cadastrar</Text>
                  </>
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
