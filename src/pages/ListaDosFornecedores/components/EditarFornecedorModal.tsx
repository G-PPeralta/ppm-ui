//  CRIADO EM: 9/2022
//  AUTOR: Gabriel Peralta.
//  DESCRIÇÃO DO ARQUIVO: Editar fornecedores

import { useEffect, useState } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
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
} from "@chakra-ui/react";

type EditarFornecedorModalProps = {
  isOpen: boolean;
  fornecedor: any;
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
  const [nomefornecedor, setNome] = useState(fornecedor?.nomefornecedor);
  const [poloid, setPolo] = useState(fornecedor ? fornecedor.poloid : 0);
  const [representante, setRepresentante] = useState(
    fornecedor ? fornecedor.representante : ""
  );

  const [numerocontrato, setNumeroDoContrato] = useState(
    fornecedor.numerocontrato
  );
  const [email, setEmail] = useState(fornecedor.email);
  const [invoice, setInvoice] = useState(fornecedor.invoice);
  const [cnpj, setCnjpj] = useState(fornecedor.cnpj);
  const [telefone, setTelefone] = useState(fornecedor.telefone);
  const [outrasinformacoes, setOutras] = useState(fornecedor.outrasinformacoes);
  const [statusid, setStatus] = useState(fornecedor.statusid);

  const [usuario, setUsuario] = useState(fornecedor.nom_usu_create);
  const [servicoid, setServicoId] = useState(fornecedor.servicoid);
  const [servico_txt, setServicoTxt] = useState(fornecedor.servico_txt);

  const updatePayload = {
    id: fornecedor.id,
    poloid,
    servicoid,
    servico_txt,
    nomefornecedor,
    representante,
    numerocontrato,
    email,
    invoice,
    cnpj,
    statusid,
    telefone,
    outrasinformacoes,
    nom_usu_create: usuario,
  };

  useEffect(() => {
    setNome(fornecedor.nomefornecedor);
    setPolo(fornecedor.poloid);
    setRepresentante(fornecedor.representante);
    setNumeroDoContrato(fornecedor.numerocontrato);
    setEmail(fornecedor.email);
    setInvoice(fornecedor.invoice);
    setCnjpj(fornecedor.cnpj);
    setTelefone(fornecedor.telefone);
    setOutras(fornecedor.outrasinformacoes);
    setStatus(fornecedor.statusid);
    setUsuario(fornecedor.nom_usu_create);
    setServicoTxt(fornecedor.servico_txt);
    setServicoId(fornecedor.servicoid);
  }, [
    fornecedor.nomefornecedor,
    fornecedor.poloid,
    fornecedor.representante,
    fornecedor.numerocontrato,
    fornecedor.email,
    fornecedor.invoice,
    fornecedor.cnpj,
    fornecedor.telefone,
    fornecedor.outrasinformacoes,
    fornecedor.statusid,
    fornecedor.nom_usu_create,
    fornecedor.servico_txt,
    fornecedor.servicoid,
  ]);

  function closeModal() {
    setNome(fornecedor.nomefornecedor);
    setPolo(fornecedor.poloid);
    setRepresentante(fornecedor.representante);
    setNumeroDoContrato(fornecedor.numerocontrato);
    setEmail(fornecedor.email);
    setInvoice(fornecedor.invoice);
    setCnjpj(fornecedor.cnpj);
    setTelefone(fornecedor.telefone);
    setOutras(fornecedor.outrasinformacoes);
    setStatus(fornecedor.statusid);
    setUsuario(fornecedor.nom_usu_create);
    setServicoTxt(fornecedor.servico_txt);
    setServicoId(fornecedor.servicoid);
    onClose();
  }

  const {
    dat_usu_create,
    nom_usu_edit,
    dat_usu_edit,
    nom_usu_erase,
    dat_usu_erase,
    justificativa,
    ...newFor
  } = fornecedor;
  const newFornecedor = newFor;

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
                  value={poloid}
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
                  onChange={(event) => setServicoTxt(event.target.value)}
                  value={servico_txt}
                />
              </FormControl>

              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"6px"}>
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
                  value={statusid}
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
                  value={nomefornecedor}
                  maxLength={50}
                  onChange={(event) => setNome(event.target.value)}
                />
              </FormControl>

              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"10px"}>
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
                  value={numerocontrato}
                  maxLength={50}
                  onChange={(event) => setNumeroDoContrato(event.target.value)}
                />
              </FormControl>
            </Flex>

            <Flex flexDir={"row"} gap={4}>
              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"6px"}>
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
                  placeholder="Representante"
                  type="text"
                  id="representante"
                  name="representante"
                  value={representante}
                  maxLength={50}
                  onChange={(event) => setRepresentante(event.target.value)}
                />
              </FormControl>

              <FormControl>
                <Flex flexDirection={"row"} gap={1} mt={"10px"}>
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
                id="outras"
                name="outras"
                value={outrasinformacoes}
                onChange={(event) => setOutras(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"center"} gap={2}>
            <Button
              variant="primary"
              color="red.500"
              _hover={{
                background: "red.600",
                transition: "all 0.4s",
                color: "white",
              }}
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
              disabled={
                JSON.stringify(Object.values(updatePayload).sort()) ===
                JSON.stringify(Object.values(newFornecedor).sort())
              }
              onClick={() => onUpdate(updatePayload)}
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
