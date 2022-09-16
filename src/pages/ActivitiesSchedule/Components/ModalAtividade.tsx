// import { useEffect } from 'react';
import { FaChevronRight } from 'react-icons/fa';

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
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  useBreakpointValue,
  Textarea,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

// import ListDnD from 'components/ListDnD';
import { TextError } from 'components/TextError';

import { handleCadastrar, handleCancelar } from 'utils/handleCadastro';

import { useCadastroAtividade } from 'hooks/useCadastroAtividade';

function ModalAtividade({ onClose, atividade, id }: any) {
  const { registerForm, loading } = useCadastroAtividade();

  // useEffect(() => {
  //   console.log('ModalAtividade', atividade);
  // }, []);

  return (
    <>
      <Modal isOpen={true} onClose={onClose} size="3xl">
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
            Entrega programa conceitual - P3
          </ModalHeader>
          <ModalCloseButton color={'white'} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <Text sx={{ fontSize: 20, fontWeight: '500' }}>
                {id.slice(0, 3) + ' ' + id.slice(3)}
              </Text>
              <FormControl>
                <Flex
                  display={'flex'}
                  flexDirection={useBreakpointValue({
                    base: 'column',
                    md: 'row',
                  })}
                  gap={4}
                >
                  <Stack>
                    <Flex flexDirection={'row'} gap={5}>
                      <Text
                        w={'150px'}
                        sx={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#777777',
                        }}
                      >
                        Resposável
                      </Text>
                      <Text sx={{ fontSize: 16, fontWeight: '700' }}>
                        João Costa
                      </Text>
                    </Flex>
                    <Flex flexDirection={'row'} gap={5}>
                      <Text
                        w={'150px'}
                        sx={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#777777',
                        }}
                      >
                        Precedentes
                      </Text>
                      <Text sx={{ fontSize: 16, fontWeight: '700' }}>
                        x-y-z
                      </Text>
                    </Flex>
                    <Flex flexDirection={'row'} gap={5}>
                      <Text
                        w={'150px'}
                        sx={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#777777',
                        }}
                      >
                        Início planejado
                      </Text>
                      <Text sx={{ fontSize: 16, fontWeight: '700' }}>
                        10/03/2022
                      </Text>
                    </Flex>
                    <Flex flexDirection={'row'} gap={5}>
                      <Text
                        w={'150px'}
                        sx={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#777777',
                        }}
                      >
                        Duração planejada
                      </Text>
                      <Text sx={{ fontSize: 16, fontWeight: '700' }}>
                        10 dias
                      </Text>
                    </Flex>
                    <Flex flexDirection={'row'} gap={5}>
                      <Text
                        w={'150px'}
                        sx={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#777777',
                        }}
                      >
                        Duração prevista
                      </Text>
                      <Text sx={{ fontSize: 16, fontWeight: '700' }}>
                        10 dias
                      </Text>
                    </Flex>
                    <Flex flexDirection={'row'} gap={5}>
                      <Text
                        w={'150px'}
                        sx={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#777777',
                        }}
                      >
                        Latência
                      </Text>
                      <Text sx={{ fontSize: 16, fontWeight: '700' }}>
                        10 dias antes de CIP02
                      </Text>
                    </Flex>
                  </Stack>
                  <Stack>
                    <Flex flexDirection={'row'} gap={5}>
                      <Button
                        disabled={!registerForm.isValid}
                        variant="outline"
                        colorScheme="messenger"
                        onClick={() => handleCadastrar(registerForm, onClose)}
                      >
                        <Text
                          sx={{
                            marginRight: 2,
                            fontSize: 18,
                            fontWeight: '600',
                          }}
                        >
                          Gráficos de precedentes
                        </Text>
                        <FaChevronRight color="inherit" size={20} />
                      </Button>
                    </Flex>
                    <Flex flexDirection={'row'} gap={5}>
                      <Text
                        w={'100px'}
                        sx={{
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#777777',
                        }}
                      >
                        Status
                      </Text>
                      <Select
                        id="atividade"
                        name="atividade"
                        placeholder="Selecione"
                        bg={'#fff'}
                        value={'item.atividade'}
                        // onChange={(event) => handleChange(event, 'atividade')}
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                    </Flex>
                  </Stack>
                </Flex>
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
                      placeholder="Adicione comentários sobre a atividade"
                      id="comentarios"
                      name="comentarios"
                      value={registerForm.values.comentarios}
                      onChange={registerForm.handleChange}
                    />
                    {registerForm.errors.comentarios &&
                      registerForm.touched.comentarios && (
                        <TextError>{registerForm.errors.comentarios}</TextError>
                      )}
                  </FormControl>
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

export default ModalAtividade;
