import { useState } from 'react';

import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Stack,
  useBreakpointValue,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

import ListDnD from 'components/ListDnD';
import { TextError } from 'components/TextError';

import { handleCancelar } from 'utils/handleCadastro';

import { useCadastroProjetoTipo } from 'hooks/useCadastroProjetoTipo';

function ModalCadastrarProjetoTipo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroProjetoTipo();
  const [atividadesList, setAtividadesList] = useState([]);

  const handleParent = (newList: any) => {
    setAtividadesList(newList);
  };

  const handleSubmit = () => {
    const payload = atividadesList;

    const payloadFiltrado: any[] = [];

    payload.forEach((pay: any) => {
      const precedentesArray: any[] = [];
      for (let i = 0; i < pay.precedentes.length; i += 1) {
        if (pay.precedentes[i].checked) {
          precedentesArray.push(pay.precedentes[i].id);
        }
      }
      const newPay = pay;
      newPay.precedentes = precedentesArray;
      payloadFiltrado.push(newPay);
    });

    registerForm.setFieldValue('atividades', payloadFiltrado);

    registerForm.handleSubmit();
    onClose();
  };

  return (
    <>
      <Button
        variant="outline"
        border={'2px solid'}
        borderColor={'origem.500'}
        textColor={'origem.500'}
        _hover={{
          borderColor: 'origem.600',
          backgroundColor: 'origem.500',
          textColor: 'white',
          transition: 'all 0.4s',
        }}
        onClick={onOpen}
      >
        Projeto
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
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
            Cadastrar Projeto Tipo
          </ModalHeader>
          <ModalCloseButton color={'white'} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex direction={'column'} gap={4}>
                  <Stack>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel>NOME</FormLabel>
                        <Input
                          isRequired
                          placeholder="Nome do Tipo de Intervenção"
                          id="nomeProjeto"
                          type="text"
                          name="nomeProjeto"
                          value={registerForm.values.nomeProjeto}
                          onChange={registerForm.handleChange}
                        />
                        {registerForm.errors.nomeProjeto &&
                          registerForm.touched.nomeProjeto && (
                            <TextError>
                              {registerForm.errors.nomeProjeto}
                            </TextError>
                          )}
                      </FormControl>
                    </Flex>
                  </Stack>

                  <ListDnD
                    atividades={registerForm.values.atividades}
                    handleParent={handleParent}
                  />

                  <Stack>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="comentarios">COMENTÁRIOS</FormLabel>
                        <Textarea
                          isRequired
                          placeholder="Adicione comentários sobre o projeto"
                          id="comentarios"
                          name="comentarios"
                          value={registerForm.values.comentarios}
                          onChange={registerForm.handleChange}
                        />
                        {registerForm.errors.comentarios &&
                          registerForm.touched.comentarios && (
                            <TextError>
                              {registerForm.errors.comentarios}
                            </TextError>
                          )}
                      </FormControl>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'}>
              <Flex gap={2}>
                <Button
                  variant="ghost"
                  color="red"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: 'red.500',
                    transition: 'all 0.4s',
                    color: 'white',
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={!registerForm.isValid}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  onClick={handleSubmit}
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

export default ModalCadastrarProjetoTipo;
