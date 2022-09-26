import { FaGreaterThan } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

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
  Icon,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

// import { TextError } from "components/TextError";

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
  // console.log(nomeRanking.nomeRanking);
  // console.log(nomeRanking.idRanking);

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        color={"origem.500"}
        backgroundColor={"white"}
        border={"none"}
        textAlign={"center"}
        icon={<MdModeEdit />}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
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
            {`Priorização ${infosRankings.nomeRanking}`}
          </ModalHeader>
          {/* <ModalCloseButton color={"white"} /> */}
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
                        <Flex>
                          <Text>
                            <Button
                              aria-label=""
                              backgroundColor={"white"}
                              color={"black"}
                              onClick={() =>
                                handleCancelar(registerForm, onClose)
                              }
                              _hover={{
                                background: "white",
                                transition: "all 0.4s",
                                color: "origem.500",
                              }}
                              fontSize={"20px"}
                            >
                              <IoIosArrowBack /> Priorização
                            </Button>
                          </Text>
                        </Flex>
                        <Flex gap="18px">
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
                          <Button
                            background="transparent"
                            color="#0047BB"
                            float={"right"}
                            fontSize="18px"
                          >
                            Lixeira
                            <Icon
                              as={FaGreaterThan}
                              fontSize="13px"
                              fontWeight={"none"}
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
