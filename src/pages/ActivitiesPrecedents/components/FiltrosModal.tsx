import { IoMdArrowDropdown } from "react-icons/io";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";

function FiltrosModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<IoMdArrowDropdown />}
        colorScheme="blue"
        variant="ghost"
      >
        Filtrar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
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
            Filtros
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody mt={4}>
            <FormControl>
              <Flex direction={"column"} gap={5}>
                <Box>
                  <FormLabel htmlFor="area">Área</FormLabel>
                  <Select variant="unstyled">
                    <option value="1">Valor 1</option>
                    <option value="2">Valor 2</option>
                    <option value="3">Valor 3</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor="poco">Poço</FormLabel>
                  <Select variant="unstyled">
                    <option value="1">Valor 1</option>
                    <option value="2">Valor 2</option>
                    <option value="3">Valor 3</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor="atividade">Atividade</FormLabel>
                  <Select variant="unstyled">
                    <option value="1">Valor 1</option>
                    <option value="2">Valor 2</option>
                    <option value="3">Valor 3</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor="responsavel">Responsável</FormLabel>
                  <Select variant="unstyled">
                    <option value="1">Valor 1</option>
                    <option value="2">Valor 2</option>
                    <option value="3">Valor 3</option>
                  </Select>
                </Box>

                <Flex justify={"space-between"} gap={5}>
                  <Flex direction={"column"} grow={1}>
                    <FormLabel htmlFor="dataInicio">Data Inicio</FormLabel>
                    <Input
                      isRequired
                      placeholder="dd/mm/aaaa"
                      id="dataInicio"
                      type="date"
                      name="dataInicio"
                      w={useBreakpointValue({ base: "100%", md: "100%" })}
                    />
                  </Flex>

                  <Flex direction={"column"} grow={1}>
                    <FormLabel htmlFor="dataFim">Data Fim</FormLabel>
                    <Input
                      isRequired
                      placeholder="dd/mm/aaaa"
                      id="dataFim"
                      type="date"
                      name="dataFim"
                      w={useBreakpointValue({ base: "100%", md: "100%" })}
                    />
                  </Flex>
                </Flex>

                <Box>
                  <FormLabel htmlFor="sonda">Sonda</FormLabel>
                  <Select variant="unstyled">
                    <option value="1">Valor 1</option>
                    <option value="2">Valor 2</option>
                    <option value="3">Valor 3</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select variant="unstyled">
                    <option value="1">Valor 1</option>
                    <option value="2">Valor 2</option>
                    <option value="3">Valor 3</option>
                  </Select>
                </Box>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                variant="ghost"
                color="red"
                onClick={() => onClose()}
                _hover={{
                  background: "red.500",
                  transition: "all 0.4s",
                  color: "white",
                }}
              >
                Remover Filtros
              </Button>
              <Button
                background="origem.300"
                variant="primary"
                color="white"
                onClick={() => onClose()}
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                }}
              >
                Filtrar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FiltrosModal;
