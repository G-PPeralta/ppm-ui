import { Box, Flex, Heading } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import InputGenerico from "components/InputGenerico";
import Sidebar from "components/SideBar";

import { useProjects } from "hooks/useProjects";

export function CadastrarFornecedor() {
  const { projectsForm, loading } = useProjects();
  return (
    <>
      <Sidebar>
        {!loading ? (
          <Flex w={"auto"} align="center" justify="center" bg={"#EDF2F7"}>
            <Box
              py={{ base: "6", sm: "6" }}
              px={{ base: "6", sm: "8" }}
              w={"100%"}
              bg={"white"}
              borderRadius={{ base: "xl", sm: "xl" }}
            >
              <Flex
                justify={"space-between"}
                mb={4}
                wrap={"wrap"}
                align={"center"}
              >
                <Heading as="h3" size="md" textAlign={"center"}>
                  Cadastrar Fornecedor
                </Heading>
              </Flex>
              <Flex gap={2} align={"end"}>
                <InputGenerico
                  registerForm={projectsForm}
                  nomeInput={"Nome"}
                  propName={"nome"}
                  value={projectsForm.values.poloId}
                  required={true}
                  placeholder={"Nome do fornecedor"}
                />
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}
