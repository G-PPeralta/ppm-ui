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

  // IconButton,
  // Box,
  // Text,
} from "@chakra-ui/react";

import { FornecedoreDto } from "..";

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
                      FORNECEDOR
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
                    onChange={(event) => setNome(event.target.value)}
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
                  POLO
                </FormLabel>
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
                  _placeholder={{ color: "#949494" }}
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
                  <FormLabel
                    htmlFor="servico"
                    color="#949494"
                    fontSize="12px"
                    fontWeight="700"
                    mt={"6px"}
                  >
                    SERVIÇO
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
                  onChange={(event) => setResponsavel(event.target.value)}
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
                onChange={(event) => setDescricao(event.target.value)}
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
              background="origem.500"
              variant="primary"
              color="white"
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
