//  CRIADO EM: 7/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Cadastrar novo cronograma

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  Stack,
  Textarea,
  Button,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { ListaPoco } from "interfaces/CadastrosModaisInfograficos";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";

import { handleCancelar } from "utils/handleCadastro";

import { useCadastroCronograma } from "hooks/useCadastroCronograma";

import SelectFiltragem from "../../../components/SelectFiltragem";
import AtividadesCadastroCronograma from "./AtividadesCadastroCronograma";

function ModalCadastroCronograma({ refresh, setRefresh }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    registerForm,
    loading,
    listaPocos,
    listaSondas,
    listaAtividadesPrecedentes,
  } = useCadastroCronograma(refresh);

  const innerWidth = window.innerWidth;

  const optionsPocos = listaPocos.map((poco: ListaPoco) => ({
    value: poco.id,
    label: poco.nom_poco,
  }));

  const optionsSondas = listaSondas.map((sonda: any) => ({
    value: sonda.id,
    label: sonda.nom_sonda,
  }));

  return (
    <>
      <Button
        h={"46px"}
        borderRadius={"8px"}
        fontSize={"14px"}
        fontWeight={"700"}
        variant="outline"
        border={"2px solid"}
        borderColor={"origem.500"}
        textColor={"origem.500"}
        _hover={{
          borderColor: "origem.600",
          backgroundColor: "origem.500",
          textColor: "white",
          transition: "all 0.4s",
        }}
        onClick={onOpen}
      >
        Adicionar Cronograma
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
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
            Novo Cronograma
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
              {!loading ? (
                <FormControl>
                  <Flex direction={"column"} gap={4}>
                    <Stack>
                      <Flex
                        direction={innerWidth >= 460 ? "row" : "column"}
                        gap={5}
                        w={"100%"}
                      >
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"SONDA"}
                          propName={"sonda_id"}
                          options={optionsSondas}
                          required={true}
                        />
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"POÇO"}
                          propName={"poco_id"}
                          options={optionsPocos}
                          required={true}
                        />
                        <FormControl></FormControl>
                      </Flex>
                    </Stack>

                    <AtividadesCadastroCronograma
                      registerForm={registerForm}
                      listaAtividadesPrecedentes={listaAtividadesPrecedentes}
                    />

                    <Stack>
                      <FormControl>
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
                          _placeholder={{ color: "#949494" }}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          color={"black"}
                          isRequired
                          placeholder="Adicione comentários sobre a intervenção"
                          id="comentarios"
                          name="comentarios"
                          value={registerForm.values.comentarios}
                          onChange={registerForm.handleChange}
                          maxLength={255}
                        />
                      </FormControl>
                    </Stack>
                  </Flex>
                </FormControl>
              ) : (
                <Ring speed={2} lineWeight={5} color="white" size={72} />
              )}
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoLargoGhost
                  text={"Cancelar"}
                  formikForm={registerForm}
                  onClose={onClose}
                />
                <BotaoAzulLargoPrimary
                  text={"Cadastrar"}
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

export default ModalCadastroCronograma;
