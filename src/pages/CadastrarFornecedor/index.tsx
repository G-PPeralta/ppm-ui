import { Box, Flex, Heading } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import InputGenerico from "components/InputGenerico";
import SelectFiltragem from "components/SelectFiltragem";
import Sidebar from "components/SideBar";

import { useCadastroFornecedor } from "hooks/useCadastroFornecedor";

export function CadastrarFornecedor() {
  const { registerForm, loading } = useCadastroFornecedor();

  const optionsMock = [
    { value: 1, label: "Mock 1" },
    { value: 2, label: "Mock 2" },
    { value: 3, label: "Mock 3" },
  ];

  // console.log("registerForm", registerForm.values);
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
                  registerForm={registerForm}
                  nomeInput={"NOME"}
                  propName={"nomeFornecedor"}
                  value={registerForm.values.nomeFornecedor}
                  required={true}
                  placeholder={"Nome do fornecedor"}
                />
                <SelectFiltragem
                  registerForm={registerForm}
                  nomeSelect={"POLO"}
                  propName={"poloId"}
                  options={optionsMock}
                  value={registerForm.values.poloId}
                  required={true}
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
