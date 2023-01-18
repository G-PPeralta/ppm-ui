//  CRIADO EM: 6/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Alterar permissão do usuário

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import Avvvatars from "avvvatars-react";

import Sidebar from "components/SideBar";
import { TextError } from "components/TextError";

import formatCellphone from "utils/formatCellphone";

import { usePermissions } from "hooks/usePermissions";

export function Permissions() {
  const { permissionsForm, roles, loading } = usePermissions();

  return (
    <>
      <Sidebar>
        {loading && (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}

        <Stack spacing="8">
          <Flex
            w={useBreakpointValue({ base: "100%", md: "auto" })}
            align="center"
            justify="center"
            bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
          >
            <Box
              py={{ base: "0", sm: "16" }}
              px={{ base: "4", sm: "10" }}
              w={useBreakpointValue({
                base: "20rem",
                sm: "35rem",
                md: "60rem",
                lg: "80rem",
              })}
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  permissionsForm.handleSubmit(e);
                }}
              >
                <Box
                  display={useBreakpointValue({
                    base: "flex",
                  })}
                  flexDirection={useBreakpointValue({
                    base: "initial",
                    sm: "column-reverse",
                    md: "column-reverse",
                    lg: "initial",
                  })}
                >
                  <Stack spacing="5" w="100%">
                    <Stack spacing="5">
                      <FormControl>
                        <FormLabel
                          htmlFor="name"
                          justifyContent="space-between"
                          display="flex"
                        >
                          Nome
                        </FormLabel>
                        <Input
                          isRequired
                          id="name"
                          type="name"
                          name="name"
                          onChange={permissionsForm.handleChange}
                          value={permissionsForm.values.name}
                        />
                      </FormControl>
                    </Stack>
                    <Stack spacing="5">
                      <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          isRequired
                          id="email"
                          type="email"
                          name="email"
                          value={permissionsForm.values.email}
                          onChange={permissionsForm.handleChange}
                        />
                        <FormErrorMessage>
                          {permissionsForm.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                    </Stack>
                    <FormControl>
                      <FormLabel htmlFor="access">Nivel de Acesso</FormLabel>
                      <Select
                        id="access"
                        placeholder="Selecione o nível de acesso"
                        name="accessLevel"
                        value={permissionsForm.values.accessLevel}
                        onChange={permissionsForm.handleChange}
                      >
                        {roles?.map((role) => (
                          <option key={role?.id} value={role?.id}>
                            {role?.nome_role}
                          </option>
                        ))}
                      </Select>
                      {permissionsForm.errors.accessLevel &&
                        permissionsForm.touched.accessLevel && (
                          <TextError>
                            {permissionsForm.errors.accessLevel}
                          </TextError>
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
                        maxLength={15}
                        value={formatCellphone(
                          permissionsForm.values.telephone
                        )}
                        onChange={permissionsForm.handleChange}
                        w={useBreakpointValue({ base: "100%", md: "100%" })}
                      />
                      {permissionsForm.errors.telephone &&
                        permissionsForm.touched.telephone && (
                          <TextError>
                            {permissionsForm.errors.telephone}
                          </TextError>
                        )}
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        htmlFor="name"
                        justifyContent="space-between"
                        display="flex"
                      >
                        Area
                      </FormLabel>
                      <Input
                        isRequired
                        id="name"
                        type="name"
                        name="name"
                        onChange={permissionsForm.handleChange}
                        value={permissionsForm.values.area}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    w="100%"
                    display={"flex"}
                    align="center"
                    justify="center"
                  >
                    <Avvvatars
                      value={permissionsForm.values.name || ""}
                      size={160}
                    />
                  </Stack>
                </Box>
                <Stack spacing="6" mt="6">
                  <Button
                    disabled={!permissionsForm.values.email}
                    type="submit"
                    background="origem.300"
                    variant="primary"
                    color="white"
                    _hover={{
                      background: "origem.500",
                      transition: "all 0.4s",
                    }}
                  >
                    Salvar
                  </Button>
                </Stack>
              </form>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
