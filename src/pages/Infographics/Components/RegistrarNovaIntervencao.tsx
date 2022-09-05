import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import styles from './RegisterProjectType.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function RegistrarNovaIntervencao({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
      <ModalOverlay className={styles.overlay} />
      <ModalContent width="80%" borderRadius={8} marginTop={3}>
        <ModalHeader
          backgroundColor={'#2E69FD'}
          borderTopRadius={7}
          display={'flex'}
          justifyContent={'center'}
          color={'white'}
          fontSize={'1em'}
        >
          Cadastrar Nova Intervenção/Perfuração
        </ModalHeader>
        <ModalCloseButton color={'white'} />
        <ModalBody></ModalBody>

        <ModalFooter>
          {/* <Center justifySelf="center" width="100%">
            <Button variant="ghost" color="red">
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              backgroundColor="#0047BB"
              mr={3}
              onClick={() => console.log('submeteu')}
              color="white"
            >
              Concluir cadastro
            </Button>
          </Center> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RegistrarNovaIntervencao;
