// import { IoIosArrowBack } from "react-icons/io";
import {
  MdArrowForwardIos,
  MdOutlineArrowBackIosNew,
  MdModeEdit,
} from "react-icons/md";

import {
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  IconButton,
  ModalCloseButton,
  Icon,
} from "@chakra-ui/react";

import { handleCancelar } from "utils/handleCadastro";

import { useCadastroPriorizacao } from "hooks/useCadastroPriorizacao";

import EditarPriorizacao from "../Priorizacao/EditarPriorizacao";
import ModalCadastrarOpcaoPriorizacao from "./CadastrarOpcaoPriorizacao";
import { TabelaOpcoesPriorizacao } from "./TabelaOpcoesPriorizacao";

interface TableProps {
  nomeRanking: string;
  idRanking: any;
}

function ModalPriorizacao(infosRankings: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm } = useCadastroPriorizacao();

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        color={"origem.500"}
        backgroundColor={"transparent"}
        border={"none"}
        textAlign={"center"}
        _hover={{
          backgroundColor: "origem.500",
          color: "white",
        }}
        w={"14px"}
        h={"18px"}
        icon={<MdModeEdit />}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
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
            {`Priorização ${infosRankings.nomeRanking}`}
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <form
            onSubmit={(e) => {
              // e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex gap={4}>
                  <Stack gap={2}>
                    <Flex direction={"column"}>
                      <Flex align={"flex-end"} justify={"space-between"}>
                        <Flex alignSelf={"start"}>
                          <Text>
                            <Button
                              aria-label=""
                              backgroundColor={"white"}
                              color={"#2D2926"}
                              onClick={() =>
                                handleCancelar(registerForm, onClose)
                              }
                              _hover={{
                                background: "white",
                                transition: "all 0.4s",
                                color: "origem.500",
                              }}
                              fontSize={"24px"}
                              fontWeight={"700"}
                            >
                              <Icon
                                as={MdOutlineArrowBackIosNew}
                                h={"30px"}
                                w={"22px"}
                                fontSize="13px"
                                fontWeight={"none"}
                                mr={2}
                                color="#2D2926"
                              />{" "}
                              Priorização
                            </Button>
                          </Text>
                        </Flex>
                        <Flex gap="50px">
                          <Flex gap={4}>
                            <Flex>
                              <ModalCadastrarOpcaoPriorizacao
                                nomeRanking={infosRankings.nomeRanking}
                                idRanking={infosRankings.idRanking}
                              />
                            </Flex>
                            <Flex>
                              <EditarPriorizacao
                                nomeRanking={infosRankings.nomeRanking}
                                idRanking={infosRankings.idRanking}
                              />
                            </Flex>
                          </Flex>
                          <Button
                            background="transparent"
                            color="#0047BB"
                            float={"right"}
                            fontSize="18px"
                          >
                            Lixeira
                            <Icon
                              as={MdArrowForwardIos}
                              fontSize={"18px"}
                              fontWeight={"700"}
                              ml={1}
                              color="#0047BB"
                            />
                          </Button>
                        </Flex>
                      </Flex>
                      <TabelaOpcoesPriorizacao
                        idRanking={infosRankings.idRanking}
                        nomeRanking={infosRankings.nomeRanking}
                      />
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalPriorizacao;
