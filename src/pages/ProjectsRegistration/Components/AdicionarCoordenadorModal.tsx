import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  Box,
  Text,
} from '@chakra-ui/react';

// import { TextError } from 'components/TextError';

import { postCoordenador } from 'services/post/ProjectRegister';

export function AdicionarCoordenadorModal(projectsForm: any) {
  const [coordenador, setCoordenador] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleChange(event: any): void {
    setCoordenador(event.target.value);
  }

  function saveResponsible() {
    projectsForm.projectsForm.setFieldValue('coordenador', coordenador);
    postCoordenador({ coordenadorNome: coordenador });
    onClose();
  }

  return (
    <Flex>
      <Box
        display={'flex'}
        alignItems={'center'}
        border="2px"
        padding={2}
        borderRadius={6}
        borderColor={'origem.300'}
        onClick={onOpen}
        _hover={{
          background: '#f5f5f5',
          transition: 'all 0.4s',
          color: 'origem.300',
          cursor: 'pointer',
          borderColor: 'origem.500',
        }}
      >
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          mr={2}
          isRound={true}
          size="sm"
        />
        <Text
          fontSize={useBreakpointValue({ base: 'sm', md: 'sm' })}
          fontWeight={'bold'}
          color={'origem.500'}
        >
          ADICIONAR COORDENADOR
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADICIONAR COORDENADOR</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="end" mb={3}>
              <FormControl>
                <FormLabel htmlFor="coordenadorNome">NOME</FormLabel>
                <Input
                  isRequired
                  placeholder="Nome do coordenador"
                  type="text"
                  id="coordenadorNome"
                  name="coordenadorNome"
                  value={coordenador}
                  onChange={(event) => handleChange(event)}
                  width="100%"
                />
                {/* {projectsForm.projectsForm.errors.coordenadores &&
                    projectsForm.projectsForm.touched.coordenadores && (
                      <TextError>
                        {projectsForm.projectsForm.errors.coordenadores}
                      </TextError>
                    )} */}
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              background="origem.300"
              variant="primary"
              color="white"
              onClick={() => saveResponsible()}
              _hover={{
                background: 'origem.500',
                transition: 'all 0.4s',
              }}
            >
              SALVAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
