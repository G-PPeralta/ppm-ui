import { useEffect } from "react";

import {
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import SelectFiltragem from "components/SelectFiltragem";
import { TextError } from "components/TextError";

import { useCadastroCampanha } from "hooks/useCadastroCampanha";

function ModalNovaCampanha({ setRefresh, refresh }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, listaServicosSondas } = useCadastroCampanha();

  const optionsServicoSonda = listaServicosSondas.map((sonda: any) => ({
    value: sonda.nom_sonda,
    label: sonda.nom_sonda,
  }));

  useEffect(() => {
    if (registerForm.values.id_projeto.split("-")[0] === "0 ") {
      registerForm.setFieldValue("nova_campanha", true);
    } else {
      registerForm.setFieldValue("nova_campanha", false);
    }
  }, [registerForm.values.id_projeto]);

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
        Nova Campanha
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
            fontSize={"1em"}
          >
            Cadastrar Nova Campanha
          </ModalHeader>
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
                    <Text fontWeight={"bold"}>Nome</Text>
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
                          nomeSelect={"SONDA"}
                          propName={"id_projeto"}
                          options={optionsServicoSonda}
                          required={true}
                        />
                      </FormControl>
                    </Flex>
                  </Stack>

                  <Stack>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "column",
                      })}
                      gap={2}
                    >
                      <Text fontWeight={"bold"}>Comentários</Text>
                      <Flex direction={"column"}>
                        <Flex gap={1}>
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            COMENTÁRIOS
                          </Text>
                        </Flex>
                        <Textarea
                          isRequired
                          placeholder="Adicione comentários sobre a campanha"
                          id="dsc_comentario"
                          name="dsc_comentario"
                          value={registerForm.values.dsc_comentario}
                          onChange={registerForm.handleChange}
                          maxLength={255}
                        />
                        {registerForm.errors.dsc_comentario &&
                          registerForm.touched.dsc_comentario && (
                            <TextError>
                              {registerForm.errors.dsc_comentario}
                            </TextError>
                          )}
                      </Flex>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <BotaoAzulPrimary
                  text={"Concluir Cadastro"}
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

export default ModalNovaCampanha;
