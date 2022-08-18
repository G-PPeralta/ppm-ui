// import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

type Props = {
  onOpen: any;
  onClose: any;
  isOpen: boolean;
};

export function RegisterProjectType({ onOpen, isOpen, onClose }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
        <ModalOverlay />
        <ModalContent width={'xl'} height={500}>
          <ModalHeader
            backgroundColor={'#2E69FD'}
            borderTopRadius={3}
            display={'flex'}
            justifyContent={'center'}
            color={'white'}
            fontSize={'1em'}
          >
            Cadastrar projeto tipo
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Nome </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} color={'white'}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
