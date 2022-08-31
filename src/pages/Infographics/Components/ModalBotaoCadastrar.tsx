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
  Button,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

import { useCadastroIntervencao } from 'hooks/useCadastroIntervencao';

import { postIntervencao } from 'services/post/CadastroIntervencao';

function ModalBotaoCadastrar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { intervencaoForm, loading } = useCadastroIntervencao();

  const handleCadastrar = () => {
    postIntervencao(intervencaoForm.values);
    onClose();
  };

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              intervencaoForm.handleSubmit(e);
            }}
          >
            <ModalBody></ModalBody>

            <ModalFooter>
              <Flex gap={2} align={'center'} justify={'center'}>
                <Button
                  variant="ghost"
                  color="red"
                  onClick={() => onClose()}
                  _hover={{
                    background: 'red.500',
                    transition: 'all 0.4s',
                    color: 'white',
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={!intervencaoForm.isValid}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  onClick={() => handleCadastrar()}
                  _hover={{
                    background: 'origem.500',
                    transition: 'all 0.4s',
                  }}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Concluir Cadastro</Text>
                    </>
                  )}
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalBotaoCadastrar;
