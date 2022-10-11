import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
// import { useParams } from "react-router-dom";

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
  // useDisclosure,
} from "@chakra-ui/react";
import { AtividadesProjeto } from "interfaces/Services";

import { useAuth } from "hooks/useAuth";

import { postTarefa } from "services/post/AdicionarTarefa";

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
  // const { onClose } = useDisclosure();
  const { user } = useAuth();
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [atividadeId, setAtividadeId] = useState(0);
  const [descricao, setDescricao] = useState("");

  const regex = /[^a-z ]/gi;

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
            fontSize={"1em"}
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
                <FormLabel
                  htmlFor="nomeTarefa"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  TAREFA
                </FormLabel>
                <Input
                  maxLength={50}
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  fontSize={"14px"}
                  width={"300px"}
                  height={"56px"}
                  _placeholder={{ color: "black" }}
                  isRequired
                  placeholder="Nome tarefa"
                  type="text"
                  id="nomeTarefa"
                  name="nomeTarefa"
                  value={nome.replace(regex, "")}
                  onChange={(event) => setNome(event.target.value)}
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
                  DATA
                </FormLabel>
                <Input
                  // placeholder="dd/mm/aaaa"
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
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                />
              </Flex>
            </FormControl>
            <FormControl padding={1} marginBottom={1} width={"204px"}>
              <FormLabel
                htmlFor="atividadeRel"
                color="#949494"
                fontSize="12px"
                fontWeight="700"
                mt={"6px"}
              >
                ATIVIDADE RELACIONADA
              </FormLabel>
              <Select
                borderRadius={"8px"}
                _placeholder={{ color: "black" }}
                border={"1px solid #A7A7A7"}
                mt={"-9px"}
                fontSize={"14px"}
                width={"208px"}
                height={"56px"}
                id="atividadeRel"
                name="atividadeRel"
                onChange={(event) => setAtividadeId(Number(event.target.value))}
              >
                <option value="">Selecione</option>
                {atividadesProjeto.map((atividade, index) => (
                  <option value={atividade.id} key={index}>
                    {atividade.nomeAtividade}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl padding={1}>
              <FormLabel
                htmlFor="acao"
                color="#949494"
                fontSize="12px"
                fontWeight="700"
                mt={"6px"}
              >
                DESCRIÇÃO DA TAREFA
              </FormLabel>
              <Textarea
                fontSize={"14px"}
                maxLength={255}
                borderRadius={"8px"}
                border={"1px solid #A7A7A7"}
                mt={"-9px"}
                width={"456px"}
                height={"121px"}
                _placeholder={{ color: "black" }}
                isRequired
                placeholder="Descrição da tarefa"
                id="descrição"
                name="descrição"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
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
                onClick={closeModal}
                width={"208px"}
                height={"56px"}
              >
                Cancelar
              </Button>
              <Button
                width={"208px"}
                height={"56px"}
                fontSize="18px"
                fontWeight="700"
                background="#0047BB"
                variant="primary"
                color="white"
                _hover={{
                  background: "#0047BB",
                  transition: "all 0.4s",
                }}
                onClick={async () => {
                  await postTarefa({
                    nome_tarefa: nome,
                    data_tarefa: new Date(data),
                    atividade_relacionada: atividadeId,
                    descricao_tarefa: descricao,
                    nom_usu_create: user?.nome,
                  });
                  newRender();
                  closeModal();
                }}
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
