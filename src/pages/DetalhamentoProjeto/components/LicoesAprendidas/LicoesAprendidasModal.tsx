import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { LicoesAprendidas } from "interfaces/Services";

import { patchLicaoAprendida } from "services/update/LicoesAprendidas";

import CadastrarLicoesAprendidasModal from "./CadastrarLicoesAprendidasModal";
import EditarLicoesAprendidasModal from "./EditarLicoesAprendidasModal";
import TabelaLicoesAprendidas from "./TabelaLicoesAprendidas";

function LicoesAprendidasModal({ licoes, setLicoes }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editLicao, setEditLicao] = useState({} as LicoesAprendidas);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);

  function handleEditLicao(licao: LicoesAprendidas): void {
    setEditLicao(licao);
    setOpenModalEdit(true);
  }

  function handleUpdateLicoes(licao: any, campo: any, payload: any, user: any) {
    setLicoes(licoes.map((l: any) => (l.id == licao.id ? licao : l)));
    patchLicaoAprendida(licao, campo, payload, user);
  }

  return (
    <>
      <Button
        onClick={onOpen}
        background={"white"}
        color={"origem.300"}
        _hover={{
          background: "origem.500",
          color: "white",
          transition: "all 0.4s",
        }}
        px={6}
        py={9}
        borderTopRadius={"0px"}
        borderBottomRadius={"6px"}
      >
        Lições Aprendidas
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lições Aprendidas</ModalHeader>
          <Flex>
            <Button
              ml={useBreakpointValue({ base: 0 })}
              mt={useBreakpointValue({ base: 2, md: 0 })}
              type="button"
              background="white"
              variant="primary"
              color="origem.500"
              border={"2px"}
              w={useBreakpointValue({ base: "100%", md: "21%" })}
              // onClick={() => {
              //   navigate("/providers-registration");
              // }}
              onClick={() => setOpenModalRegister(true)}
              mb={"15px"}
            >
              Adicionar
              <Icon as={AiFillPlusCircle} fontSize="20px" ml={1} />
            </Button>
          </Flex>
          <ModalCloseButton />
          <ModalBody>
            <TabelaLicoesAprendidas onEdit={handleEditLicao} licoes={licoes} />
            {openModalEdit && (
              <EditarLicoesAprendidasModal
                closeModal={() => setOpenModalEdit(false)}
                licao={editLicao}
                handleUpdateLicoes={handleUpdateLicoes}
              />
            )}

            {openModalRegister && (
              <CadastrarLicoesAprendidasModal
                closeModal={() => setOpenModalRegister(false)}
                onCloseModal={() => setOpenModalRegister(false)}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LicoesAprendidasModal;
