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
                      isInvalid={!!registerForm.errors.name}
                      id="name"
                      type="name"
                      name="name"
                      value={registerForm.values.name}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '95%', md: '95%' })}
                    />
                    {registerForm.errors.name && registerForm.touched.name && (
                      <TextError>{registerForm.errors.name}</TextError>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="telefone">Telefone</FormLabel>
                    <Input
                      isInvalid={!!registerForm.errors.telefone}
                      id="telefone"
                      type="text"
                      name="telefone"
                      maxLength={15}
                      value={formatCellphone(registerForm.values.telefone)}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '100%', md: '95%' })}
                    />
                    {registerForm.errors.telefone &&
                      registerForm.touched.telefone && (
                        <TextError>{registerForm.errors.telefone}</TextError>
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
                      isInvalid={!!registerForm.errors.email}
                      id="email"
                      type="email"
                      name="email"
                      value={registerForm.values.email}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '95%', md: '95%' })}
                    />
                    {registerForm.errors.email &&
                      registerForm.touched.email && (
                        <TextError>{registerForm.errors.email}</TextError>
                      )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="area">Área</FormLabel>
                    <Input
                      isInvalid={!!registerForm.errors.area}
                      id="area"
                      type="area"
                      name="area"
                      value={registerForm.values.area}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '100%', md: '95%' })}
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
                      isInvalid={!!registerForm.errors.password}
                      id="password"
                      type="password"
                      name="password"
                      value={registerForm.values.password}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '95%', md: '95%' })}
                    />
                    {registerForm.errors.password &&
                      registerForm.touched.password && (
                        <TextError>{registerForm.errors.password}</TextError>
                      )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="confirmPassword">
                      Confirme sua senha
                    </FormLabel>
                    <Input
                      isInvalid={!!registerForm.errors.confirmPassword}
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={registerForm.values.confirmPassword}
                      onChange={registerForm.handleChange}
                      w={useBreakpointValue({ base: '100%', md: '95%' })}
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
