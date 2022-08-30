import { BsPlusLg } from 'react-icons/bs';

import {
  Flex,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';

function ModalBotaoCadastrar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        mt={2}
        py={3}
        w="75%"
        border={'2px'}
        borderStyle={'dashed'}
        borderColor={'origem.500'}
        borderRadius={'3xl'}
        direction={'column'}
        gap={4}
        align={'center'}
        justify={'center'}
        _hover={{
          cursor: 'pointer',
          backgroundColor: 'grey.100',
          transition: 'all 0.4s',
        }}
        onClick={onOpen}
      >
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          isRound={true}
          size="lg"
        />

        <Text color={'origem.500'} fontWeight={600}>
          Cadastrar
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
    </>
  );
}

export default ModalBotaoCadastrar;
