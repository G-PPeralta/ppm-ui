import { useEffect, useState } from "react";
// import { BsPlusLg } from "react-icons/bs";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  // useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,

  // IconButton,
  // Box,
  // Text,
} from "@chakra-ui/react";

import { Fornecedor } from "../index";

type EditarFornecedorModalProps = {
  isOpen: boolean;
  fornecedor: Fornecedor;
  onClose: () => void;
  onUpdate: (fornecedor: Fornecedor) => void;
};

export function EditarFornecedorModal({
  isOpen,
  fornecedor,
  onClose,
  onUpdate,
}: EditarFornecedorModalProps) {
  const [nome, setNome] = useState(fornecedor?.fornecedor);
  const [orcamento, setOrcamento] = useState(
    fornecedor ? fornecedor.orcamento : 0
  );
  const [realizado, setRealizado] = useState(
    fornecedor ? fornecedor.realizado : 0
  );
  const [responsavel, setResponsavel] = useState(
    fornecedor ? fornecedor.responsavel : ""
  );
  const [descricao, setDescricao] = useState(
    fornecedor ? fornecedor.descricao : ""
  );

  function handleChangeNome(event: any): void {
    setNome(event.target.value);
  }

  function handleChangeOrcamento(event: any): void {
    setOrcamento(event.target.value);
  }

  function handleChangeRealizado(event: any): void {
    setRealizado(event.target.value);
  }

  function handleChangeResponsavel(event: any): void {
    setResponsavel(event.target.value);
  }

  function handleChangeDescricao(event: any): void {
    setDescricao(event.target.value);
  }

  useEffect(() => {
    setNome(fornecedor.fornecedor);
    setOrcamento(fornecedor.orcamento);
    setRealizado(fornecedor.realizado);
    setResponsavel(fornecedor.responsavel);
    setDescricao(fornecedor.descricao);
  }, [
    fornecedor.fornecedor,
    fornecedor.orcamento,
    fornecedor.realizado,
    fornecedor.responsavel,
    fornecedor.descricao,
  ]);

  return (
    <Flex>
      {/* <Box
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
        <Text
          fontSize={useBreakpointValue({ base: "sm", md: "sm" })}
          fontWeight={"bold"}
          color={"origem.500"}
        >
          EDITAR FORNECEDOR
        </Text>
      </Box> */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
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
            Editar Fornecedor
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody alignItems={"center"}>
            <Flex flexDir={"row"} gap={4}>
              <Flex>
                <FormControl>
                  <FormLabel htmlFor="fornecedorNome">
                    <Text
                      color="#949494"
                      fontSize="12px"
                      fontWeight="700"
                      mt={"6px"}
                    >
                      NOME
                    </Text>
                  </FormLabel>
                  <Input
                    borderRadius={"8px"}
                    border={"1px solid #A7A7A7"}
                    mt={"-9px"}
                    width={"158px"}
                    height={"56px"}
                    color="#949494"
                    fontSize={"14px"}
                    fontWeight={"400"}
                    isRequired
                    placeholder="Nome do fornecedor"
                    type="text"
                    id="fornecedorNome"
                    name="fornecedorNome"
                    value={nome}
                    onChange={(event) => handleChangeNome(event)}
                  />
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel
                  htmlFor="orçamento"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                >
                  ORÇAMENTO
                </FormLabel>
                <Input
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"158px"}
                  height={"56px"}
                  color="#949494"
                  fontSize={"14px"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="Orçamento"
                  type="text"
                  id="orçamento"
                  name="orçamento"
                  value={orcamento}
                  onChange={(event) => handleChangeOrcamento(event)}
                />
              </FormControl>
            </Flex>

            <Flex flexDir={"row"} gap={4}>
              <Flex>
                <FormControl>
                  <FormLabel
                    htmlFor="orçamento"
                    color="#949494"
                    fontSize="12px"
                    fontWeight="700"
                    mt={"6px"}
                  >
                    REALIZADO
                  </FormLabel>
                  <Input
                    borderRadius={"8px"}
                    border={"1px solid #A7A7A7"}
                    mt={"-9px"}
                    width={"158px"}
                    height={"56px"}
                    color="#949494"
                    fontSize={"14px"}
                    fontWeight={"400"}
                    isRequired
                    placeholder="Realizado"
                    type="text"
                    id="realizado"
                    name="realizado"
                    value={realizado}
                    onChange={(event) => handleChangeRealizado(event)}
                  />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                  mt={"6px"}
                  htmlFor="orçamento"
                >
                  RESPONSÁVEL
                </FormLabel>
                <Input
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"158px"}
                  height={"56px"}
                  color="#949494"
                  fontSize={"14px"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="Responsável"
                  type="text"
                  id="responsável"
                  name="responsável"
                  value={responsavel}
                  onChange={(event) => handleChangeResponsavel(event)}
                />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel
                htmlFor="orçamento"
                color="#949494"
                fontSize="12px"
                fontWeight="700"
                mt={"6px"}
              >
                DESCRIÇÃO
              </FormLabel>
              <Input
                borderRadius={"8px"}
                border={"1px solid #A7A7A7"}
                mt={"-9px"}
                width={"158px"}
                height={"56px"}
                color="#949494"
                fontSize={"14px"}
                fontWeight={"400"}
                isRequired
                placeholder="Descrição"
                type="text"
                id="descrição"
                name="descrição"
                value={descricao}
                onChange={(event) => handleChangeDescricao(event)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              // background="origem.300"
              variant="primary"
              color="#F40606"
              _hover={{
                background: "#F40606",
                transition: "all 0.4s",
                color: "white",
              }}
              // onClick={closeModal}
              width={"128px"}
              height={"56px"}
              onClick={() => onClose()}
            >
              <Text fontSize={"18px"} fontWeight={"700"}>
                Cancelar{" "}
              </Text>
            </Button>
            <Button
              background="#0047BB"
              variant="primary"
              color="white"
              onClick={() => {
                onUpdate({
                  id: fornecedor.id,
                  nomefornecedor: nome,
                  fornecedor: nome,
                  orcamento,
                  realizado,
                  responsavel,
                  descricao,
                });
              }}
              _hover={{
                background: "origem.500",
                transition: "all 0.4s",
              }}
              width={"128px"}
              height={"56px"}
            >
              <Text fontSize={"18px"} fontWeight={"700"}>
                Salvar{" "}
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
