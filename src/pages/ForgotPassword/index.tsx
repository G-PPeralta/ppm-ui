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
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import logo from "assets/logo.png";

import { Layout } from "components/Layout";

import { useForgotPassword } from "hooks/useForgotPassword";

export function ForgotPassword() {
  const { forgotForm, loading } = useForgotPassword();

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
                forgotForm.handleSubmit(e);
              }}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      isRequired
                      id="email"
                      type="email"
                      name="email"
                      value={forgotForm.values.email
                        .replace(
                          /[\u0021-\u002d\u002f\u003a-\u003f\u005b-\u0060\u007b-\u00b6\u00b8-\u00ff]/g,
                          ""
                        )
                        .toLowerCase()}
                      onChange={forgotForm.handleChange}
                      maxLength={150}
                    />
                    <FormErrorMessage>
                      {forgotForm.errors.email}
                    </FormErrorMessage>
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
                    {loading ? (
                      <Ring speed={2} lineWeight={5} color="white" size={24} />
                    ) : (
                      "Redefinir senha"
                    )}
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
