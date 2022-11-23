import { useEffect, useState } from "react";

import {
  Button,
  Flex,
  Text,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import { RequiredField } from "components/RequiredField/RequiredField";
import SelectFiltragem from "components/SelectFiltragem";

import { handleCancelar } from "utils/handleCadastro";

import { useReorder } from "hooks/useReorder";

function ModalReorderSimples({ setRefresh, refresh }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, listaSondas, listaPocos } = useReorder();
  const [render, setRender] = useState(false);
  const [pocoOrigem, setPocoOrigem] = useState("");

  const optionsPocos = listaPocos.map((poco: any) => ({
    value: poco.id,
    label: poco.name,
  }));

  const optionsSonda = listaSondas.map((sonda: any) => ({
    value: sonda.id,
    label: sonda.name,
  }));

  useEffect(() => {
    if (registerForm.values.id_cronograma_original) {
      const sonda = listaPocos.filter(
        (val) => val.id === registerForm.values.id_cronograma_original
      );
      registerForm.setFieldValue("id_campanha_original", sonda[0].sonda);
      const pocoName = listaSondas.map((val) => {
        if (val.id == sonda[0].sonda) {
          return val.name;
        } else {
          return undefined;
        }
      });
      setPocoOrigem(pocoName[0]);
      setRender(!render);
    } else {
      setPocoOrigem("");
    }
  }, [registerForm.values.id_cronograma_original]);

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"10px"}
        background={"white"}
        border={"2px solid"}
        color={"origem.500"}
        _hover={{
          border: "2px solid",
          borderColor: "origem.500",
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
        textColor={"origem.500"}
        onClick={onOpen}
      >
        Reordenar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Reordenar Poços em sondas
          </ModalHeader>
          <ModalCloseButton
            color={"white"}
            onClick={() => handleCancelar(registerForm, onClose)}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <FormControl>
                <Flex direction={"column"} gap={4}>
                  <Stack>
                    {/* <Text fontWeight={"bold"}>Nome</Text> */}
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"POÇO"}
                          propName={"id_cronograma_original"}
                          options={optionsPocos}
                          required={true}
                        />
                      </FormControl>
                    </Flex>
                  </Stack>
                  <Stack>
                    {/* <Text fontWeight={"bold"}>Nome</Text> */}
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <Text
                            fontWeight={"700"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            SONDA DE ORIGEM
                          </Text>
                        </Flex>
                        <Flex
                          background={"#f0f0f0"}
                          height={"56px"}
                          border={"0.5px solid #E2E8F0"}
                          borderRadius={"8px"}
                          alignItems="center"
                          pl={"10px"}
                        >
                          <Text
                            fontWeight={"400"}
                            fontSize={"14px"}
                            color={"#2D2926"}
                          >
                            {pocoOrigem || "Selecione o poço"}
                          </Text>
                        </Flex>
                      </FormControl>
                    </Flex>
                  </Stack>
                  <Stack>
                    {/* <Text fontWeight={"bold"}>Nome</Text> */}
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"SONDA DE DESTINO"}
                          propName={"id_campanha_destino"}
                          options={optionsSonda}
                          required={true}
                        />
                      </FormControl>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoLargoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <BotaoAzulLargoPrimary
                  text={"Alterar"}
                  formikForm={registerForm}
                  onClose={onClose}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  loading={loading}
                />
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalReorderSimples;
