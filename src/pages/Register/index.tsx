import PasswordChecklist from 'react-password-checklist';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';
import logo from 'assets/logo.png';

import { TextError } from 'components/TextError';

import formatCellphone from 'utils/formatCellphone';

import { useRegister } from 'hooks/useRegister';

export function Register() {
  const { registerForm, loading } = useRegister();

  return (
    <Flex
      w={useBreakpointValue({ base: '100%', md: 'auto' })}
      h="100vh"
      align="center"
      justify="center"
      bg={useBreakpointValue({ base: 'white', sm: '#EDF2F7' })}
    >
      <Stack spacing="8">
        <Box
          py={{ base: '0', sm: '16' }}
          px={{ base: '4', sm: '10' }}
          w={useBreakpointValue({ base: '20rem', sm: '35rem', md: '60rem' })}
          bg={useBreakpointValue({ base: 'transparent', sm: 'white' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} align="center">
              <Image
                src={logo}
                display="flex"
                align="center"
                w={56}
                justifyContent="center"
              />
              <HStack spacing="1" justify="center" />
            </Stack>
          </Stack>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <Flex
                  flexDirection={useBreakpointValue({
                    base: 'column',
                    md: 'row',
                  })}
                >
                  <FormControl>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <Input
                      isRequired
                      placeholder="Nome completo"
                      id="name"
                      type="name"
                      name="name"
                      value={registerForm.values.name.replace(
                        /[\u0021-\u0040\u005b-\u005d\u005f\u007b-\u007d\u007f-\u00bf]/g,
                        '',
                      )}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '95%', md: '95%' })}
                      maxLength={100}
                    />
                    {registerForm.errors.name && registerForm.touched.name && (
                      <TextError>{registerForm.errors.name}</TextError>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="telephone">Telefone</FormLabel>
                    <Input
                      isRequired
                      placeholder="(00)00000-0000"
                      id="telephone"
                      type="text"
                      name="telephone"
                      maxLength={14}
                      value={formatCellphone(registerForm.values.telephone)}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '100%', md: '95%' })}
                    />
                    {registerForm.errors.telephone &&
                      registerForm.touched.telephone && (
                        <TextError>{registerForm.errors.telephone}</TextError>
                      )}
                  </FormControl>
                </Flex>
              </Stack>
              <Stack spacing="5">
                <Flex
                  flexDirection={useBreakpointValue({
                    base: 'column',
                    md: 'row',
                  })}
                >
                  <FormControl>
                    <FormLabel htmlFor="name">Email</FormLabel>
                    <Input
                      isRequired
                      placeholder="email@email.com"
                      id="email"
                      type="email"
                      name="email"
                      value={registerForm.values.email
                        .replace(
                          /[\u0021-\u002d\u002f\u003a-\u003f\u005b-\u0060\u007b-\u00b6\u00b8-\u00ff]/g,
                          '',
                        )
                        .toLowerCase()}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '95%', md: '95%' })}
                      maxLength={150}
                    />
                    {registerForm.errors.email &&
                      registerForm.touched.email && (
                        <TextError>{registerForm.errors.email}</TextError>
                      )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="area">Área</FormLabel>
                    <Input
                      isRequired
                      placeholder="Área de atuação"
                      id="area"
                      type="area"
                      name="area"
                      value={registerForm.values.area.replace(
                        /[\u0021-\u0040\u005b-\u005d\u005f\u007b-\u007d\u007f-\u00bf]/g,
                        '',
                      )}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '100%', md: '95%' })}
                      maxLength={150}
                    />
                    {registerForm.errors.area && registerForm.touched.area && (
                      <TextError>{registerForm.errors.area}</TextError>
                    )}
                  </FormControl>
                </Flex>
              </Stack>
              <Stack spacing="5">
                <Flex
                  flexDirection={useBreakpointValue({
                    base: 'column',
                    md: 'row',
                  })}
                >
                  <FormControl>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <Input
                      isRequired
                      placeholder="********"
                      id="password"
                      type="password"
                      name="password"
                      value={registerForm.values.password}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '95%', md: '95%' })}
                      maxLength={150}
                    />
                    {registerForm.errors.password &&
                      registerForm.touched.password && (
                        <TextError>{registerForm.errors.password}</TextError>
                      )}
                    {registerForm.values.password && (
                      <PasswordChecklist
                        rules={[
                          'minLength',
                          'specialChar',
                          'number',
                          'capital',
                          'match',
                        ]}
                        minLength={5}
                        value={registerForm.values.password}
                        valueAgain={registerForm.values.confirmPassword}
                        messages={{
                          minLength: 'A senha deve ter no mínimo 8 caracteres',
                          specialChar:
                            'A senha deve ter pelo menos um caracter especial',
                          number: 'A senha deve ter pelo menos um número',
                          capital:
                            'A senha deve ter pelo menos uma letra maiúscula',
                          match: 'As senhas não conferem',
                        }}
                        iconSize={12}
                      />
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="confirmPassword">
                      Confirme sua senha
                    </FormLabel>
                    <Input
                      isRequired
                      placeholder="********"
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={registerForm.values.confirmPassword}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '100%', md: '95%' })}
                      maxLength={150}
                    />
                    {registerForm.errors.confirmPassword &&
                      registerForm.touched.confirmPassword && (
                        <TextError>
                          {registerForm.errors.confirmPassword}
                        </TextError>
                      )}
                  </FormControl>
                </Flex>
              </Stack>

              <Stack spacing="6">
                <Button
                  disabled={!registerForm.isValid}
                  type="submit"
                  background="origem.300"
                  variant="primary"
                  color="white"
                  _hover={{
                    background: 'origem.500',
                    transition: 'all 0.4s',
                  }}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    'Cadastrar'
                  )}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
