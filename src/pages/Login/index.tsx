import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import logo from 'assets/logo.png';

import { Layout } from 'components/Layout';

import { useLogin } from 'hooks/useLogin';

export function Login() {
  const navigate = useNavigate();
  const { loginForm } = useLogin();

  return (
    <Flex
      w={useBreakpointValue({ base: '100%', md: 'auto' })}
      h="100vh"
      align="center"
      justify="center"
      bg={useBreakpointValue({ base: 'white', sm: '#EDF2F7' })}
    >
      <Layout>
        <Stack spacing="8">
          <Box
            py={{ base: '0', sm: '16' }}
            px={{ base: '4', sm: '10' }}
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
                <HStack spacing="1" justify="center">
                  <Text color="gray.400">
                    Entre com seu e-mail e senha abaixo
                  </Text>
                </HStack>
              </Stack>
            </Stack>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loginForm.handleSubmit(e);
              }}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={loginForm.values.email}
                      onChange={loginForm.handleChange}
                    />
                    <FormErrorMessage>
                      {loginForm.errors.email}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel
                      htmlFor="password"
                      justifyContent="space-between"
                      display="flex"
                    >
                      Senha
                      <Button variant="link" color="gray.400" size="sm">
                        Esqueceu sua senha?
                      </Button>
                    </FormLabel>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={loginForm.values.password}
                      onChange={loginForm.handleChange}
                    />
                  </FormControl>
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
                    Entrar
                  </Button>
                </Stack>
              </Stack>
            </form>
            <Stack spacing="10" marginTop={70} align="center">
              <Text color="gray.400">
                Não tem conta?{' '}
                <Button
                  variant="link"
                  color="origem.400"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Cadastre-se
                </Button>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Layout>
    </Flex>
  );
}
