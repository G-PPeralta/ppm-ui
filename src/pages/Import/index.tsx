//  CRIADO EM: 8/2022
//  AUTOR: Geovana Augusta.
//  DESCRIÇÃO DO ARQUIVO: Tela upload de planilhas.

import { useMemo, useRef, useState } from "react";
import { RiFolderUploadFill } from "react-icons/ri";

import {
  Flex,
  useBreakpointValue,
  FormControl,
  FormLabel,
  Select,
  Button,
  InputGroup,
  Input,
} from "@chakra-ui/react";

import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";

import { RegrasGeraisDeImportacao } from "./components/regrasGerais";

export function Import() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [tableType, setTableType] = useState("");
  const [importIsVisible, setImportIsVisible] = useState(false);

  useMemo(() => {
    if (tableType.includes("gerais")) {
      return setImportIsVisible(true);
    }

    setImportIsVisible(false);
  }, [tableType]);

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
                fontSize={12}
              >
                TIPO DE PLANILHA
              </FormLabel>
              <Select
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
            </FormControl>
          </Flex>

          {tableType === "gerais" && <RegrasGeraisDeImportacao />}
          <Flex mt={4}>
            {importIsVisible && (
              <Flex flexDir={"row"}>
                <InputGroup gap={5}>
                  <Flex>
                    <Input
                      w={"0px"}
                      type="file"
                      ref={(e) => {
                        inputRef.current = e;
                      }}
                      hidden
                    />
                    <Button
                      onClick={() => inputRef.current?.click()}
                      borderRadius={"8px"}
                      background="white"
                      variant="outline"
                      color="#0047BB"
                      borderColor="#0047BB"
                      border={"2px"}
                      _hover={{
                        background: "origem.500",
                        transition: "all 0.4s",
                        color: "white",
                      }}
                      width={"208px"}
                      height={"56px"}
                      fontWeight={"700"}
                      fontSize={"18px"}
                      fontFamily={"Mulish"}
                      rightIcon={<RiFolderUploadFill size={22} />}
                    >
                      Importar Planilha
                    </Button>
                  </Flex>
                  <Flex>
                    <Button
                      borderRadius={"8px"}
                      background="origem.500"
                      variant="outline"
                      color="white"
                      _hover={{
                        background: "origem.600",
                        transition: "all 0.4s",
                      }}
                      width={"206px"}
                      height={"56px"}
                      fontWeight={"700"}
                      fontSize={"18px"}
                      fontFamily={"Mulish"}
                    >
                      Enviar
                    </Button>
                  </Flex>
                </InputGroup>
              </Flex>
            )}
          </Flex>
        </Flex>
      </ContainerPagina>
    </Sidebar>
  );
}
