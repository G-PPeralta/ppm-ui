//  CRIADO EM: 6/2022
//  AUTOR: Alexander Brito.
//  DESCRIÇÃO DO ARQUIVO: Tela resetar senha

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
} from "@chakra-ui/react";
import logo from "assets/logo.png";

import { Layout } from "components/Layout";
import { TextError } from "components/TextError";

import { usePassword } from "hooks/usePassword";

export function ResetPassword() {
  const { newPasswordForm } = usePassword();

  return (
    <Flex
      w={useBreakpointValue({ base: "100%", md: "auto" })}
      h="100vh"
      align="center"
      justify="center"
      bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
    >
      <Layout>
        <Stack spacing="8">
          <Box
            py={{ base: "0", sm: "16" }}
            px={{ base: "4", sm: "10" }}
            bg={useBreakpointValue({ base: "transparent", sm: "white" })}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} align="center">
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
                newPasswordForm.handleSubmit(e);
              }}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="password">Senha atual</FormLabel>
                    <Input
                      isInvalid={!!newPasswordForm.errors.password}
                      id="password"
                      type="password"
                      name="password"
                      value={newPasswordForm.values.password}
                      onChange={newPasswordForm.handleChange}
                    />
                    <TextError>{newPasswordForm.errors.password}</TextError>
                  </FormControl>
                </Stack>
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="newPassword">Nova senha</FormLabel>
                    <Input
                      isInvalid={!!newPasswordForm.errors.newPassword}
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      value={newPasswordForm.values.newPassword}
                      onChange={newPasswordForm.handleChange}
                    />
                    <TextError>{newPasswordForm.errors.newPassword}</TextError>
                  </FormControl>
                </Stack>
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="confirmNewPassword">Senha</FormLabel>
                    <Input
                      isInvalid={!!newPasswordForm.errors.confirmNewPassword}
                      id="confirmNewPassword"
                      type="password"
                      name="confirmNewPassword"
                      value={newPasswordForm.values.confirmNewPassword}
                      onChange={newPasswordForm.handleChange}
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
                      background: "origem.500",
                      transition: "all 0.4s",
                    }}
                  >
                    Alterar senha
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Layout>
    </Flex>
  );
}
