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
  const [numeroDoContrato, setNumeroDoContrato] = useState(
    fornecedor.numerocontrato
  );
  const [email, setEmail] = useState(fornecedor.email);
  const [invoice, setInvoice] = useState(fornecedor.invoice);
  const [cnpj, setCnjpj] = useState(fornecedor.cnpj);
  const [telefone, setTelefone] = useState(fornecedor.telefone);
  const [outras, setOutras] = useState(fornecedor.outrasinformacoes);
  const [status, setStatus] = useState(fornecedor.statusid);

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
    setNumeroDoContrato(fornecedor.numerocontrato);
    setEmail(fornecedor.email);
    setInvoice(fornecedor.invoice);
    setCnjpj(fornecedor.cnpj);
    setTelefone(fornecedor.telefone);
    setOutras(fornecedor.outrasinformacoes);
    setStatus(fornecedor.statusid);
    onClose();
  }

  return (
    <Flex>
      <Modal isOpen={isOpen} onClose={() => closeModal()} size="3xl">
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
                <Select
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  color={"black"}
                  fontSize={"14px"}
                  width={"100%"}
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

              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"6px"}>
                  <RequiredField />
                  <FormLabel
                    htmlFor="orçamento"
                    color="#949494"
                    fontSize="12px"
                    fontWeight="700"
                  >
                    SERVICO
                  </FormLabel>
                </Flex>
                <Input
                  type="text"
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  color={"black"}
                  fontSize={"14px"}
                  width={"100%"}
                  height={"56px"}
                  id="servico"
                  name="servico"
                  onChange={(event) => setServico(event.target.value)}
                  value={servico}
                />
              </FormControl>

              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"6px"}>
                  <RequiredField />
                  <FormLabel
                    htmlFor="orçamento"
                    color="#949494"
                    fontSize="12px"
                    fontWeight="700"
                  >
                    STATUS
                  </FormLabel>
                </Flex>
                <Select
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  color={"black"}
                  fontSize={"14px"}
                  width={"100%"}
                  height={"56px"}
                  id="atividadeRel"
                  name="atividadeRel"
                  onChange={(event) => setStatus(Number(event.target.value))}
                  value={status}
                >
                  <option value="">Selecione</option>
                  <option value={1}>Ativo</option>
                  <option value={2}>Inativo</option>
                </Select>
              </FormControl>
            </Flex>

            <Flex flexDir={"row"} gap={4}>
              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"6px"}>
                  <RequiredField />
                  <FormLabel color="#949494" fontSize="12px" fontWeight="700">
                    FORNECEDOR
                  </FormLabel>
                </Flex>
                <Input
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"100%"}
                  height={"56px"}
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

              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"10px"}>
                  <RequiredField />
                  <FormLabel color="#949494" fontSize="12px" fontWeight="700">
                    NUMERO DO CONTRATO
                  </FormLabel>
                </Flex>
                <Input
                  borderRadius={"8px"}
                  mt={"-9px"}
                  width={"100%"}
                  height={"56px"}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="Numero do Contrato"
                  type="text"
                  id="numero"
                  name="numero"
                  value={numeroDoContrato}
                  maxLength={50}
                  onChange={(event) => setNumeroDoContrato(event.target.value)}
                />
              </FormControl>
            </Flex>

            <Flex flexDir={"row"} gap={4}>
              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"6px"}>
                  <RequiredField />
                  <FormLabel color="#949494" fontSize="12px" fontWeight="700">
                    REPRESENTANTE/PONTO FOCAL
                  </FormLabel>
                </Flex>
                <Input
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"100%"}
                  height={"56px"}
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

              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"10px"}>
                  <RequiredField />
                  <FormLabel color="#949494" fontSize="12px" fontWeight="700">
                    E-MAIL
                  </FormLabel>
                </Flex>
                <Input
                  borderRadius={"8px"}
                  mt={"-9px"}
                  width={"100%"}
                  height={"56px"}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="E-mail"
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  maxLength={50}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
            </Flex>

            <Flex flexDir={"row"} gap={4}>
              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"6px"}>
                  <RequiredField />
                  <FormLabel color="#949494" fontSize="12px" fontWeight="700">
                    INVOICE
                  </FormLabel>
                </Flex>
                <Input
                  borderRadius={"8px"}
                  border={"1px solid #A7A7A7"}
                  mt={"-9px"}
                  width={"100%"}
                  height={"56px"}
                  // color="#949494"
                  fontSize={"14px"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="Invoice"
                  type="text"
                  id="invoice"
                  name="invoice"
                  value={invoice}
                  maxLength={50}
                  onChange={(event) => setInvoice(event.target.value)}
                />
              </FormControl>

              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"10px"}>
                  <RequiredField />
                  <FormLabel color="#949494" fontSize="12px" fontWeight="700">
                    CNPJ
                  </FormLabel>
                </Flex>
                <Input
                  borderRadius={"8px"}
                  mt={"-9px"}
                  width={"100%"}
                  height={"56px"}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="CNPJ"
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  value={cnpj}
                  maxLength={50}
                  onChange={(event) => setCnjpj(event.target.value)}
                />
              </FormControl>

              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"10px"}>
                  <RequiredField />
                  <FormLabel color="#949494" fontSize="12px" fontWeight="700">
                    TELEFONE
                  </FormLabel>
                </Flex>
                <Input
                  borderRadius={"8px"}
                  mt={"-9px"}
                  width={"100%"}
                  height={"56px"}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  isRequired
                  placeholder="Telefone"
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={telefone}
                  maxLength={50}
                  onChange={(event) => setTelefone(event.target.value)}
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
                  OUTRAS INFORMAÇÕES
                </FormLabel>
              </Flex>
              <Textarea
                mt={"-9px"}
                width={"100%"}
                height={"106px"}
                fontSize={"14px"}
                fontWeight={"400"}
                isRequired
                // placeholder="Outras"
                id="outras"
                name="outras"
                value={outras}
                onChange={(event) => setOutras(event.target.value)}
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
