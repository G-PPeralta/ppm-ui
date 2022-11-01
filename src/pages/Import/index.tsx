import { useState } from "react";

import {
  Flex,
  useBreakpointValue,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";

import { RegrasGeraisDeImportacao } from "./components/regrasGerais";
// import { TextError } from "components/TextError";

export function Import() {
  const [tableType, setTableType] = useState("");

  return (
    <Sidebar>
      <ContainerPagina>
        <Flex flexDir={"column"} gap={1}>
          <FormLabel
            fontSize={24}
            fontWeight={700}
            fontFamily={"Mulish"}
            ml={-1}
            mt={-2}
          >
            Carregar Planilha
          </FormLabel>

          <Flex
            flexDirection={useBreakpointValue({
              base: "column",
              md: "row",
            })}
          ></Flex>

          <Flex
            flexDirection={useBreakpointValue({
              base: "column",
              md: "row",
            })}
          ></Flex>

          <Flex
            justifyContent="flex-start"
            flexDirection={useBreakpointValue({
              base: "column",
              md: "column",
              lg: "row",
            })}
            mb={4}
          >
            <FormControl
              w={useBreakpointValue({
                base: "100%",
                md: "100%",
                lg: "auto",
              })}
            >
              <FormLabel
                htmlFor="planilhas"
                color="#949494"
                fontFamily={"Mulish"}
                fontWeight={700}
                // size="sm"
                fontSize={12}
              >
                TIPO DE PLANILHA
              </FormLabel>
              <Select
                /*  disabled={disabledButton} */
                mt={"-9px"}
                id="planilhas"
                name="planilhas"
                value={tableType}
                onChange={(e) => setTableType(e.target.value)}
                height="56px"
                w={"238px"}
                mr={"1.5rem"}
                mb={useBreakpointValue({
                  base: "1rem",
                  md: "1rem",
                  lg: "0",
                })}
              >
                <option value=""> Selecione </option>
                <option value="gerais">Dados gerais da Planilha X</option>
              </Select>
              {/* {planilhaForm.errors.planilha &&
                planilhaForm.touched.planilha && (
                  <TextError>{planilhaForm.errors.planilha}</TextError>
                )} */}
            </FormControl>
          </Flex>

          {tableType === "gerais" && <RegrasGeraisDeImportacao />}
          {/* {tableType === "producao" && <RegrasDeImportacaoProducao />} */}

          {/* <Stack spacing="6">
          {importIsVisible && (
            <ImportPlanilha
              onUploadFile={(file) => setSelectedFile(file)}
              onSubmit={handleSubmit}
              selectedFile={selectedFile}
              loading={loading}
            />
          )}
        </Stack> */}
        </Flex>
      </ContainerPagina>
    </Sidebar>
  );
}
