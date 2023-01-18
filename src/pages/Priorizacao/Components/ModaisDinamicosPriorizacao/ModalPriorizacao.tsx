//  CRIADO EM: 10/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Modal com opções sobre a priorização

import { useState } from "react";
import { MdArrowForwardIos, MdModeEdit } from "react-icons/md";

import {
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  IconButton,
  ModalCloseButton,
  Icon,
} from "@chakra-ui/react";

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
  const [refresh, setRefresh] = useState(false);

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
                            refresh={refresh}
                            setRefresh={setRefresh}
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
                  refresh={refresh}
                  setRefresh={setRefresh}
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
