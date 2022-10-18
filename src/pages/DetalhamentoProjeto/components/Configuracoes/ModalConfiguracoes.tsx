import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function ModalConfiguracoes() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <ModalContent>
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
          <Stack spacing={5}>
            <FormControl>
              <Flex
                flexDirection={"column"}
                alignItems={"start"}
                p={"24px"}
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
                      <Button w={"232px"} h={"56px"}>
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
                        ELEMENTO PEP
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
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalConfiguracoes;
