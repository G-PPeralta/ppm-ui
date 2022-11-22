import { BsPlus } from "react-icons/bs";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Text,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { ProjetosFeriados } from "interfaces/Feriados";

import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import DatePickerGenerico from "components/DatePickerGenerico";
import InputGenerico from "components/InputGenerico";
import SelectFiltragem from "components/SelectFiltragem";

import { getSelectFiltragemValue } from "utils/GetSelectFiltragemValue";

import { useFeriadosContext } from "contexts/Feriados";

function ModalAdicionarFeriado() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, handleClick, selectProjetos, feriados } =
    useFeriadosContext();

  const optionsTipoFeriado = [
    {
      value: 1,
      label: "Nacional",
    },
    {
      value: 0,
      label: "Específico",
    },
  ];

  return (
    <>
      <Button
        h={"56px"}
        fontSize={"18px"}
        fontWeight={"700"}
        fontFamily={"Mulish"}
        borderRadius={"8px"}
        background={"origem.500"}
        variant="primary"
        color="white"
        _hover={{
          background: "origem.600",
          transition: "all 0.4s",
        }}
        rightIcon={<BsPlus size={24} />}
        onClick={onOpen}
      >
        Adicionar Feriado
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
            fontFamily={"Mulish"}
          >
            Adicionar Feriado
          </ModalHeader>
          <ModalCloseButton color={"white"} />

          <ModalBody mt={3}>
            {selectProjetos.isLoading && !feriados.isLoading ? (
              <Flex
                display={"flex"}
                align={"center"}
                justify={"center"}
                h={"90vh"}
              >
                <Ring speed={2} lineWeight={5} color="blue" size={64} />
              </Flex>
            ) : (
              <Flex direction={"column"} gap={4}>
                <Stack>
                  <InputGenerico
                    registerForm={registerForm}
                    nomeInput={"NOME DO FERIADO"}
                    propName={"nome_feriado"}
                    value={registerForm.values.nome_feriado}
                    required={true}
                    placeholder={"Nome do feriado"}
                    maxLength={50}
                  />
                </Stack>
                <Stack spacing={2} w={"75%"}>
                  <DatePickerGenerico
                    required={true}
                    nomeLabel={"DATA"}
                    registerForm={registerForm}
                    propName={"data_completa"}
                    data={registerForm.values.data_completa}
                    esconderHorario={true}
                  />
                  <Checkbox
                    colorScheme="blue"
                    onChange={(e) => {
                      registerForm.setFieldValue(
                        "aplicar_todos_os_anos",
                        e.target.checked
                      );
                    }}
                  >
                    Aplicar para todos os anos
                  </Checkbox>
                </Stack>
                <Stack>
                  <SelectFiltragem
                    registerForm={registerForm}
                    nomeSelect={"TIPO DO FERIADO"}
                    propName={"ind_global"}
                    options={optionsTipoFeriado}
                    required={true}
                    value={getSelectFiltragemValue(
                      optionsTipoFeriado,
                      "ind_global",
                      registerForm
                    )}
                  />
                </Stack>
                {registerForm.values.ind_global === 0 &&
                  !selectProjetos.isLoading && (
                    <Stack>
                      <SelectFiltragem
                        registerForm={registerForm}
                        nomeSelect={"PROJETO"}
                        propName={"id_projeto"}
                        options={selectProjetos?.data
                          .map((projeto: ProjetosFeriados) => ({
                            value: projeto.id,
                            label: projeto.nome_projeto,
                          }))
                          .sort(
                            (
                              a: { value: number; label: string },
                              b: { value: number; label: string }
                            ) => a.label.localeCompare(b.label)
                          )}
                        required={true}
                        value={getSelectFiltragemValue(
                          selectProjetos?.data
                            .map((projeto: ProjetosFeriados) => ({
                              value: projeto.id,
                              label: projeto.nome_projeto,
                            }))
                            .sort(
                              (
                                a: { value: number; label: string },
                                b: { value: number; label: string }
                              ) => a.label.localeCompare(b.label)
                            ),
                          "id_projeto",
                          registerForm
                        )}
                      />
                    </Stack>
                  )}
              </Flex>
            )}
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <BotaoVermelhoLargoGhost
                text={"Cancelar"}
                formikForm={registerForm}
                onClose={onClose}
              />
              <Button
                w={"208px"}
                h={"56px"}
                borderRadius={"8px"}
                disabled={!registerForm.isValid || !registerForm.dirty}
                background={"origem.500"}
                fontSize={"18px"}
                fontWeight={"700"}
                fontFamily={"Mulish"}
                variant="primary"
                color="white"
                onClick={() => handleClick(registerForm, onClose, "post")}
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
              >
                <Text
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  mx={12}
                >
                  Salvar
                </Text>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAdicionarFeriado;
