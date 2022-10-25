// import { IoIosArrowBack } from "react-icons/io";
import {
  MdArrowForwardIos,
  // MdOutlineArrowBackIosNew,
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
  // Stack,
  Text,
  useDisclosure,
  IconButton,
  ModalCloseButton,
  Icon,
} from "@chakra-ui/react";

// import { handleCancelar } from "utils/handleCadastro";

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
            // ml={-2}
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
            <>
              <FormControl>
                <Flex>
                  <Flex
                    mt={"20px"}
                    justify={"space-between"}
                    align={"center"}
                    flex={1}
                  >
                    <Flex align={"flex-end"} alignSelf={"start"}>
                      <Text>
                        <Text
                          // aria-label=""
                          // backgroundColor={"white"}
                          // color={"#2D2926"}
                          // onClick={() => handleCancelar(registerForm, onClose)}
                          // _hover={{
                          //   background: "white",
                          //   transition: "all 0.4s",
                          //   color: "origem.500",
                          // }}
                          fontSize={"24px"}
                          fontWeight={"700"}
                          fontFamily={"Mulish"}
                          textAlign={"start"}
                          mt={-1}
                          ml={"19px"}
                        >
                          Priorização
                        </Text>
                      </Text>
                    </Flex>

                    <Flex gap={20}>
                      <Flex gap={4}>
                        <Flex align={"flex-start"} alignSelf={"start"}>
                          <ModalCadastrarOpcaoPriorizacao
                            nomeRanking={infosRankings.nomeRanking}
                            idRanking={infosRankings.idRanking}
                          />
                        </Flex>
                        <Flex align={"flex-start"}>
                          <EditarPriorizacao
                            nomeRanking={infosRankings.nomeRanking}
                            idRanking={infosRankings.idRanking}
                          />
                        </Flex>
                      </Flex>
                      <Flex alignItems={"flex-start"} alignSelf={"center"}>
                        <Button
                          background="transparent"
                          color="#0047BB"
                          fontSize="18px"
                          fontWeight={"700"}
                          alignSelf={"end"}
                          mr={9}
                          ml={-4}
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
                  </Flex>
                </Flex>
              </FormControl>
            </>
            <ModalBody mt={1}>
              <Flex ml={"-3px"} mr={"-3px"}>
                <TabelaOpcoesPriorizacao
                  idRanking={infosRankings.idRanking}
                  nomeRanking={infosRankings.nomeRanking}
                />
              </Flex>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalPriorizacao;
