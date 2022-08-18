import { BsFillQuestionCircleFill } from 'react-icons/bs';

import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';

export function InterrogacaoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      <IconButton
        aria-label="Question sign"
        icon={<BsFillQuestionCircleFill />}
        variant="secondary"
        color="black"
        isRound={true}
        size="md"
        onClick={onOpen}
        _hover={{
          transition: 'all 0.4s',
          color: 'origem.500',
          cursor: 'pointer',
          borderColor: 'origem.500',
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>???????????</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button
              background="origem.300"
              variant="primary"
              color="white"
              onClick={onClose}
              _hover={{
                background: 'origem.500',
                transition: 'all 0.4s',
              }}
            >
              FECHAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
