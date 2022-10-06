import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
import SelectFiltragem from "components/SelectFiltragem";
import { TextError } from "components/TextError";

import { useCadastroCampanha } from "hooks/useCadastroCampanha";

// import SelectFiltragemSondas from "./SelectFiltragemSonda";

function ModalNovaCampanha({ setRefresh, refresh }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading, listaServicosSondas } = useCadastroCampanha();

  const optionsServicoSonda = listaServicosSondas.map((sonda: any) => ({
    value: sonda.id,
    label: sonda.nom_sonda,
  }));

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
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        {/* <SelectFiltragemSondas
                          form={registerForm}
                          nomeChave={"nom_campanha"}
                          nomeLabel={"NOME"}
                        /> */}
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"SONDA"}
                          propName={"id_projeto"}
                          options={optionsServicoSonda}
                          // idCampanha={idCampanha}
                        />
                      </FormControl>
                    </Flex>
                  </Stack>

                  <Stack>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="dsc_comentario">
                          COMENTÁRIOS
                        </FormLabel>
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
                      </FormControl>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              {/* <Flex gap={2}>
                <Button
                  variant="ghost"
                  color="red"
                  onClick={() => handleCancelar(registerForm, onClose)}
                  _hover={{
                    background: "red.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={
                    !registerForm.isValid || !registerForm.values.nom_campanha
                  }
                  background="origem.300"
                  variant="primary"
                  color="white"
                  onClick={() =>
                    handleCadastrarRefresh(
                      registerForm,
                      onClose,
                      setRefresh,
                      refresh
                    )
                  }
                  _hover={{
                    background: "origem.500",
                    transition: "all 0.4s",
                  }}
                >
                  {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Concluir Cadastro</Text>
                    </>
                  )}
                </Button>
              </Flex> */}
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
