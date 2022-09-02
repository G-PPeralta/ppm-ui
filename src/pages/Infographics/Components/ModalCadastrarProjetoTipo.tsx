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
  Select,
  Textarea,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

import { TextError } from 'components/TextError';

import { handleCadastrar, handleCancelar } from 'utils/handleCadastro';

import { useCadastroProjetoTipo } from 'hooks/useCadastroProjetoTipo';

function ModalCadastrarProjetoTipo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroProjetoTipo();

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
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
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
                    <FormLabel>NOME</FormLabel>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="nomeId">ID</FormLabel>
                        <Input
                          isRequired
                          placeholder="Digite um id"
                          id="nomeId"
                          type="text"
                          name="nomeId"
                          value={registerForm.values.nomeId}
                          onChange={registerForm.handleChange}
                        />
                        {registerForm.errors.nomeId &&
                          registerForm.touched.nomeId && (
                            <TextError>{registerForm.errors.nomeId}</TextError>
                          )}
                      </FormControl>

                      <FormControl>
                        <FormLabel>NOME</FormLabel>
                        <Input
                          isRequired
                          placeholder="Nome da Campanha"
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
                  <Stack>
                    <FormLabel>ATIVIDADE</FormLabel>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="atividadeId">ID</FormLabel>
                        <Input
                          isRequired
                          placeholder="Digite um id"
                          id="atividadeId"
                          type="text"
                          name="atividadeId"
                          value={registerForm.values.atividadeId}
                          onChange={registerForm.handleChange}
                        />
                        {registerForm.errors.atividadeId &&
                          registerForm.touched.atividadeId && (
                            <TextError>
                              {registerForm.errors.atividadeId}
                            </TextError>
                          )}
                      </FormControl>

                      <FormControl>
                        <FormLabel>BASE</FormLabel>
                        <Select
                          id="atividadeBase"
                          name="atividadeBase"
                          placeholder="Selecione"
                          value={registerForm.values.atividadeBase}
                          onChange={registerForm.handleChange}
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>TAREFA</FormLabel>
                        <Select
                          id="atividadeTarefa"
                          name="atividadeTarefa"
                          placeholder="Selecione"
                          value={registerForm.values.atividadeTarefa}
                          onChange={registerForm.handleChange}
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>PRECEDENTES</FormLabel>
                        <Select
                          id="atividadePrecedente"
                          name="atividadePrecedente"
                          placeholder="Selecione"
                          value={registerForm.values.atividadePrecedente}
                          onChange={registerForm.handleChange}
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>DIAS</FormLabel>
                        <Select
                          id="atividadeDias"
                          name="atividadeDias"
                          placeholder="Selecione"
                          value={registerForm.values.atividadeDias}
                          onChange={registerForm.handleChange}
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </FormControl>
                    </Flex>
                  </Stack>
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
                  onClick={() => handleCadastrar(registerForm, onClose)}
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
