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
  Select,
  Textarea,

  // IconButton,
  // Box,
  // Text,
} from "@chakra-ui/react";

import { FornecedoreDto } from "..";

import { RequiredField } from "components/RequiredField/RequiredField";

// import { Fornecedor } from "../index";

type EditarFornecedorModalProps = {
  isOpen: boolean;
  fornecedor: FornecedoreDto;
  onClose: () => void;
  onUpdate: (fornecedor: any) => void;
  polos: any[];
};

export function EditarFornecedorModal({
  isOpen,
  fornecedor,
  onClose,
  onUpdate,
  polos,
}: EditarFornecedorModalProps) {
  const [nome, setNome] = useState(fornecedor?.nomefornecedor);
  const [poloId, setPolo] = useState(fornecedor ? fornecedor.poloid : 0);
  const [servico, setServico] = useState(fornecedor ? fornecedor.servicoid : 0);
  const [responsavel, setResponsavel] = useState(
    fornecedor ? fornecedor.representante : ""
  );
  const [descricao, setDescricao] = useState(
    fornecedor ? fornecedor.justificativa : ""
  );

  useEffect(() => {
    setNome(fornecedor.nomefornecedor);
    setPolo(fornecedor.poloid);
    setServico(fornecedor.servicoid);
    setResponsavel(fornecedor.representante);
    setDescricao(fornecedor.justificativa);
  }, [
    fornecedor.nomefornecedor,
    fornecedor.poloid,
    fornecedor.servicoid,
    fornecedor.representante,
    fornecedor.justificativa,
  ]);

  function closeModal() {
    setNome(fornecedor.nomefornecedor);
    setPolo(fornecedor.poloid);
    setServico(fornecedor.servicoid);
    setResponsavel(fornecedor.representante);
    setDescricao(fornecedor.justificativa);
    onClose();
  }

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
      <Modal isOpen={isOpen} onClose={() => closeModal()} size="lg">
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
                    <Flex flexDirection={"row"} gap={1} mt={"6px"}>
                      <RequiredField />
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        FORNECEDOR
                      </Text>
                    </Flex>
                  </FormLabel>
                  <Input
                    borderRadius={"8px"}
                    border={"1px solid #A7A7A7"}
                    mt={"-9px"}
                    width={"290px"}
                    height={"56px"}
                    // color="#949494"
                    fontSize={"14px"}
                    fontWeight={"400"}
                    isRequired
                    placeholder="Nome do fornecedor"
                    type="text"
                    id="fornecedorNome"
                    name="fornecedorNome"
                    value={nome}
                    maxLength={50}
                    onChange={(event) => setNome(event.target.value)}
                  />
                </FormControl>
              </Flex>

              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"6px"}>
                  <RequiredField />
                  <FormLabel
                    htmlFor="orçamento"
                    color="#949494"
                    fontSize="12px"
                    fontWeight="700"
                  >
                    POLO
                  </FormLabel>
                </Flex>
                {/* <Input
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
                  value={poloId}
                  onChange={(event) => handleChangePolo(event)}
                /> */}
                <Select
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  color={"black"}
                  // _placeholder={{ color: "#949494" }}
                  fontSize={"14px"}
                  width={"158px"}
                  height={"56px"}
                  id="atividadeRel"
                  name="atividadeRel"
                  onChange={(event) => setPolo(Number(event.target.value))}
                  value={poloId}
                >
                  <option value="">Selecione</option>
                  {polos.map((pol, index) => (
                    <option value={pol.id} key={index}>
                      {pol.polo}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>

            <Flex flexDir={"row"} gap={4}>
              <Flex>
                <FormControl>
                  <Flex flexDirection={"row"} gap={1} mt={"10px"}>
                    <RequiredField />
                    <FormLabel
                      htmlFor="servico"
                      color="#949494"
                      fontSize="12px"
                      fontWeight="700"
                    >
                      SERVIÇO
                    </FormLabel>
                  </Flex>
                  <Input
                    borderRadius={"8px"}
                    border={"1px solid #A7A7A7"}
                    mt={"-9px"}
                    width={"224px"}
                    height={"56px"}
                    // color="#949494"
                    fontSize={"14px"}
                    fontWeight={"400"}
                    isRequired
                    placeholder="Servico"
                    type="text"
                    id="servico"
                    name="servico"
                    value={servico}
                    onChange={(event) => setServico(Number(event.target.value))}
                  />
                </FormControl>
              </Flex>
              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"10px"}>
                  <RequiredField />
                  <FormLabel color="#949494" fontSize="12px" fontWeight="700">
                    RESPONSÁVEL
                  </FormLabel>
                </Flex>

                <Input
                  borderRadius={"8px"}
                  // border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"224px"}
                  height={"56px"}
                  // color="#949494"
                  fontSize={"14px"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="Responsável"
                  type="text"
                  id="responsável"
                  name="responsável"
                  value={responsavel}
                  maxLength={50}
                  onChange={(event) => setResponsavel(event.target.value)}
                />
              </FormControl>
            </Flex>
            <FormControl>
              <Flex flexDirection={"row"} gap={1} mt={"10px"}>
                <RequiredField />
                <FormLabel
                  htmlFor="orçamento"
                  color="#949494"
                  fontSize="12px"
                  fontWeight="700"
                >
                  DESCRIÇÃO
                </FormLabel>
              </Flex>

              <Textarea
                // borderRadius={"8px"}
                // border={"1px solid #A7A7A7"}
                mt={"-9px"}
                width={"464px"}
                height={"106px"}
                // color="#949494"
                fontSize={"14px"}
                fontWeight={"400"}
                isRequired
                placeholder="Descrição"
                // type="text"
                id="descrição"
                name="descrição"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"} gap={2}>
            <Button
              // background="origem.300"
              variant="primary"
              color="red.500"
              _hover={{
                background: "red.600",
                transition: "all 0.4s",
                color: "white",
              }}
              // onClick={closeModal}
              width={"208px"}
              height={"56px"}
              onClick={() => closeModal()}
            >
              <Text fontSize={"18px"} fontWeight={"700"}>
                Cancelar{" "}
              </Text>
            </Button>
            <Button
              background="origem.500"
              variant="primary"
              color="white"
              disabled={poloId == 0}
              onClick={() => {
                onUpdate({
                  id: fornecedor.id,
                  nomeFornecedor: nome,
                  poloId,
                  servicoId: servico,
                  representante: responsavel,
                  justificativa: descricao,
                });
              }}
              _hover={{
                background: "origem.600",
                transition: "all 0.4s",
              }}
              width={"208px"}
              height={"56px"}
            >
              <Text fontFamily={"Mulish"} fontSize={"18px"} fontWeight={"700"}>
                Concluir{" "}
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
