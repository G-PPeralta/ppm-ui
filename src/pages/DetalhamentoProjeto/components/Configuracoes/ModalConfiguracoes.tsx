import { IoMdPodium } from "react-icons/io";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function ModalConfiguracoes() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCancelar = () => {
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        background={"white"}
        color={"#0047BB"}
        _hover={{
          background: "origem.500",
          color: "white",
          transition: "all 0.4s",
        }}
        p={4}
        borderTopRadius={"0px"}
        borderBottomRadius={"6px"}
        fontSize={"16px"}
        fontWeight={"700"}
        flex={1}
      >
        Configurações
      </Button>
      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderTopRadius={"10px"}>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={"8px"}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
            h={"48px"}
          >
            Configurações do Projeto
          </ModalHeader>
          <ModalCloseButton color={"white"} onClick={() => handleCancelar()} />
          <ModalBody p={"24px"}>
            <FormControl>
              <Flex
                flexDirection={"column"}
                alignItems={"start"}
                display={"flex"}
                gap={"16px"}
              >
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  w={"100%"}
                  gap={"16px"}
                >
                  <FormControl w={"232px"}>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        RESPONSÁVEL
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      <option value="">Selecione</option>
                    </Select>
                  </FormControl>
                  <FormControl w={"232px"}>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        COORDENADOR
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      <option value="">Selecione</option>
                    </Select>
                  </FormControl>
                  <FormControl w={"232px"}>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        STATUS
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      <option value="">Selecione</option>
                    </Select>
                  </FormControl>
                  <Flex>
                    <FormControl pt={"20px"}>
                      <Button
                        w={"232px"}
                        h={"56px"}
                        color="#0047BB"
                        background="white"
                        borderColor="#0047BB"
                        border={"2px"}
                        _hover={{
                          background: "#0047BB",
                          transition: "all 0.4s",
                          color: "white",
                        }}
                        fontWeight={"700"}
                        fontSize="18px"
                        rightIcon={<IoMdPodium />}
                      >
                        Priorização
                      </Button>
                    </FormControl>
                  </Flex>
                </Flex>
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  w={"75%"}
                  gap={"16px"}
                >
                  <FormControl w={"232px"}>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        POLO
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      <option value="">Selecione</option>
                    </Select>
                  </FormControl>
                  <FormControl w={"232px"}>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        LOCAL
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      <option value="">Selecione</option>
                    </Select>
                  </FormControl>
                  <FormControl w={"232px"}>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        SOLICITAÇÃO
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      <option value="">Selecione</option>
                    </Select>
                  </FormControl>
                </Flex>
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  w={"100%"}
                  gap={"16px"}
                >
                  <FormControl w={"480px"}>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        NOME DO PROJETO
                      </Text>
                    </FormLabel>
                    <Input
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      maxLength={50}
                      borderRadius={"8px"}
                      border={"1px solid #A7A7A7"}
                      mt={"-6px"}
                      width={"100%"}
                      height={"56px"}
                      id="nomeProjetoId"
                      name="nomeProjeto"
                      placeholder={"Digite"}
                      // onChange={(e) => setNomeProjeto(e.target.value)}
                    />
                  </FormControl>
                  <FormControl w={"232px"}>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        ELEMENTO PEP
                      </Text>
                    </FormLabel>
                    <Input
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      maxLength={50}
                      borderRadius={"8px"}
                      border={"1px solid #A7A7A7"}
                      mt={"-6px"}
                      width={"100%"}
                      height={"56px"}
                      id="elementoPepId"
                      name="elementoPep"
                      placeholder={"Digite"}
                      // onChange={(e) => setElementoPep(e.target.value)}
                    />
                  </FormControl>
                </Flex>
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  w={"100%"}
                  gap={"16px"}
                >
                  <FormControl>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        INÍCIO
                      </Text>
                    </FormLabel>
                    <Input
                      placeholder="dd/mm/aaaa"
                      borderRadius={"8px"}
                      max="9999-12-31"
                      maxLength={1}
                      border={"1px solid #A7A7A7"}
                      mt={"-9px"}
                      height={"56px"}
                      _placeholder={{ color: "black" }}
                      id="data"
                      type="Date"
                      name="data"
                      // value={data}
                      // onChange={(event) => setData(event.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        FIM
                      </Text>
                    </FormLabel>
                    <Input
                      placeholder="dd/mm/aaaa"
                      borderRadius={"8px"}
                      max="9999-12-31"
                      maxLength={1}
                      border={"1px solid #A7A7A7"}
                      mt={"-9px"}
                      height={"56px"}
                      _placeholder={{ color: "black" }}
                      id="data"
                      type="Date"
                      name="data"
                      // value={data}
                      // onChange={(event) => setData(event.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        INÍCIO REAL
                      </Text>
                    </FormLabel>
                    <Input
                      placeholder="dd/mm/aaaa"
                      borderRadius={"8px"}
                      max="9999-12-31"
                      maxLength={1}
                      border={"1px solid #A7A7A7"}
                      mt={"-9px"}
                      height={"56px"}
                      _placeholder={{ color: "black" }}
                      id="data"
                      type="Date"
                      name="data"
                      // value={data}
                      // onChange={(event) => setData(event.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        FIM REAL
                      </Text>
                    </FormLabel>
                    <Input
                      placeholder="dd/mm/aaaa"
                      borderRadius={"8px"}
                      max="9999-12-31"
                      maxLength={1}
                      border={"1px solid #A7A7A7"}
                      mt={"-9px"}
                      height={"56px"}
                      _placeholder={{ color: "black" }}
                      id="data"
                      type="Date"
                      name="data"
                      // value={data}
                      // onChange={(event) => setData(event.target.value)}
                    />
                  </FormControl>
                </Flex>
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  w={"100%"}
                  gap={"16px"}
                >
                  <FormControl>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        DIVISÃO
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      <option value="">Selecione</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        CLASSIFICAÇÃO
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      <option value="">Selecione</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        TIPO
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      <option value="">Selecione</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="categoria">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        GATE
                      </Text>
                    </FormLabel>
                    <Select
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="pole"
                      width={"100%"}
                      placeholder="Selecione"
                    >
                      <option value="">Selecione</option>
                    </Select>
                  </FormControl>
                </Flex>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
            px={"24px"}
            pb={"24px"}
            pt={"0px"}
          >
            <Flex
              gap={"16px"}
              align={"center"}
              direction={{ base: "column", md: "row" }}
            >
              <Button
                // background="origem.300"
                variant="primary"
                color="red.500"
                onClick={handleCancelar}
                h={"56px"}
                w={"206px"}
                borderRadius={"10px"}
                background={"white"}
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                fontSize={"18px"}
                fontWeight={"700"}
              >
                Cancelar
              </Button>
              <Button
                h={"56px"}
                w={"206px"}
                borderRadius={"10px"}
                background={"origem.300"}
                variant="primary"
                color="white"
                // onClick={async () => {
                //   await patchProjeto(Number(id), { descricao, justificativa });
                //   setDescricao("");
                //   setJustificativa("");
                //   setRender();
                //   onClose();
                // }}
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                }}
                fontSize={"18px"}
                fontWeight={"700"}
              >
                Salvar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalConfiguracoes;
