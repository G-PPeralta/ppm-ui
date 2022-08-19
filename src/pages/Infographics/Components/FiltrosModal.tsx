import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

function FiltrosModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
        <ModalOverlay />
        <ModalContent
        // width="70%" height={580} borderRadius={8} marginTop={3}
        >
          <ModalHeader
            backgroundColor={'#2E69FD'}
            borderTopRadius={7}
            display={'flex'}
            justifyContent={'center'}
            color={'white'}
            fontSize={'1em'}
          >
            Filtros
          </ModalHeader>
          <ModalCloseButton color={'white'} />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="area">Área</FormLabel>
              <Select variant="unstyled">
                <option value="1">Valor 1</option>
                <option value="2">Valor 2</option>
                <option value="3">Valor 3</option>
              </Select>

              <FormLabel htmlFor="poco">Poço</FormLabel>
              <Select variant="unstyled">
                <option value="1">Valor 1</option>
                <option value="2">Valor 2</option>
                <option value="3">Valor 3</option>
              </Select>

              <FormLabel htmlFor="atividade">Atividade</FormLabel>
              <Select variant="unstyled">
                <option value="1">Valor 1</option>
                <option value="2">Valor 2</option>
                <option value="3">Valor 3</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter display={'flex'} justifyContent={'center'}>
            <Flex gap={2}>
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
                Remover Filtros
              </Button>
              <Button
                background="origem.300"
                variant="primary"
                color="white"
                onClick={() => onClose()}
                _hover={{
                  background: 'origem.500',
                  transition: 'all 0.4s',
                }}
              >
                Filtrar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FiltrosModal;
