import { useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";

import {
  Flex,
  Box,
  IconButton,
  // useBreakpointValue,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Select,
  Text,
  // useDisclosure,
} from "@chakra-ui/react";
import { AtividadesProjeto } from "interfaces/Services";

import { RequiredField } from "components/RequiredField/RequiredField";

import { handleCancelar, handleCadastrar } from "utils/handleCadastro";

import { useModalCadastroTarefa } from "hooks/useModalCadastroTarefa";

interface CadastroTarefaProps {
  isModalOpen: any;
  closeModal: any;
  atividadesProjeto: AtividadesProjeto[];
  newRender: any;
}

function CadastroTarefasModal({
  isModalOpen,
  closeModal,
  atividadesProjeto,
  newRender,
}: CadastroTarefaProps) {
  const { id } = useParams();
  const { registerForm, setAtividade } = useModalCadastroTarefa(
    newRender,
    closeModal
  );

  useEffect(() => setAtividade(id), [id]);

  const regex = /[^\w\s]/gi;

  return (
    <Flex>
      <Box
        display={"flex"}
        alignItems={"center"}
        border="2px"
        padding={2}
        borderRadius={6}
        borderColor={"origem.300"}
        _hover={{
          background: "#f5f5f5",
          transition: "all 0.4s",
          color: "origem.300",
          cursor: "pointer",
          borderColor: "origem.500",
        }}
      >
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          mr={2}
          isRound={true}
          size="sm"
        />
        {/* <Text
          fontSize={useBreakpointValue({ base: "sm", md: "sm" })}
          fontWeight={"bold"}
          color={"origem.500"}
        >
          EDITAR FORNECEDOR
        </Text> */}
      </Box>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Cadastrar tarefa
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <FormControl
              marginBottom={1}
              padding={1}
              display={"flex"}
              justifyContent={"space-between"}
              gap={3}
            >
              <Flex flexDir={"column"} flexGrow={4}>
                {" "}
                <FormLabel
                  htmlFor="nomeTarefa"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  <Flex gap={1}>
                    <RequiredField />
                    <Text>TAREFA</Text>
                  </Flex>
                </FormLabel>
                <Input
                  maxLength={50}
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  fontSize={"14px"}
                  width={"300px"}
                  height={"56px"}
                  color={"black"}
                  _placeholder={{ color: "#949494" }}
                  isRequired
                  placeholder="Nome tarefa"
                  type="text"
                  id="nomeTarefa"
                  name="nomeTarefa"
                  value={registerForm.values.nomeTarefa.replace(regex, "")}
                  onChange={registerForm.handleChange}
                />
              </Flex>
              <Flex flexDir={"column"} flexGrow={1}>
                <FormLabel
                  htmlFor="data"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  <Flex gap={1}>
                    <RequiredField />
                    <Text>DATA</Text>{" "}
                  </Flex>
                </FormLabel>

                <Input
                  fontSize={"14px"}
                  max="9999-12-31"
                  maxLength={1}
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"156px"}
                  height={"56px"}
                  _placeholder={{ color: "black" }}
                  id="data"
                  type="date"
                  name="data"
                  value={registerForm.values.data}
                  onChange={registerForm.handleChange}
                />
              </Flex>
            </FormControl>
            <FormControl
              padding={1}
              marginBottom={1}
              width={"204px"}
              display="flex"
              gap={4}
            >
              <Flex direction={"column"}>
                <FormLabel
                  htmlFor="atividadeRel"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  <Flex gap={1}>
                    <RequiredField />
                    ATIVIDADE RELACIONADA
                  </Flex>
                </FormLabel>
                <Select
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  color={"black"}
                  _placeholder={{ color: "#949494" }}
                  fontSize={"14px"}
                  width={"208px"}
                  height={"56px"}
                  id="atividadeRel"
                  name="atividadeRel"
                  placeholder="Selecione"
                  value={registerForm.values.atividadeRel}
                  onChange={registerForm.handleChange}
                >
                  <option value="">Selecione</option>
                  {atividadesProjeto.map((atividade, index) => (
                    <option value={atividade.nom_atividade} key={index}>
                      {atividade.nom_atividade}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Flex direction={"column"}>
                <FormLabel
                  htmlFor="atividadeRel"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  <Flex gap={1}>
                    <RequiredField /> RESPONSÁVEL{" "}
                  </Flex>
                </FormLabel>
                <Input
                  maxLength={50}
                  placeholder="Responsável"
                  type="text"
                  fontSize={"14px"}
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  color={"black"}
                  _placeholder={{ color: "#949494" }}
                  width={"208px"}
                  height={"56px"}
                  id="responsavel"
                  name="responsavel"
                  value={registerForm.values.responsavel}
                  onChange={registerForm.handleChange}
                ></Input>
              </Flex>
            </FormControl>
            <FormControl padding={1}>
              <FormLabel
                htmlFor="acao"
                color="#949494"
                fontSize="12px"
                fontWeight="700"
                mt={"6px"}
              >
                <Flex gap={1}>
                  <RequiredField />
                  DESCRIÇÃO DA TAREFA
                </Flex>
              </FormLabel>
              <Textarea
                fontSize={"14px"}
                maxLength={255}
                borderRadius={"8px"}
                border={"1px solid #A7A7A7"}
                mt={"-9px"}
                width={"456px"}
                height={"121px"}
                color={"black"}
                _placeholder={{ color: "#949494" }}
                isRequired
                placeholder="Descrição da tarefa"
                id="descricao"
                name="descricao"
                value={registerForm.values.descricao}
                onChange={registerForm.handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="primary"
                color="#F40606"
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
                onClick={() => handleCancelar(registerForm, closeModal)}
                width={"208px"}
                height={"56px"}
                fontSize="18px"
                fontWeight="700"
                fontFamily={"Mulish"}
              >
                Cancelar
              </Button>
              <Button
                disabled={!registerForm.isValid || !registerForm.dirty}
                width={"208px"}
                height={"56px"}
                fontSize="18px"
                fontWeight="700"
                fontFamily={"Mulish"}
                background="origem.500"
                variant="primary"
                color="white"
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
                onClick={() => handleCadastrar(registerForm, closeModal)}
              >
                Adicionar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default CadastroTarefasModal;
