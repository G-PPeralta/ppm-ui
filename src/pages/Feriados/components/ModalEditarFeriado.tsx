import { MdModeEdit } from "react-icons/md";

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
  IconButton,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { useFormik } from "formik";
import { ProjetosFeriados } from "interfaces/Feriados";
import { editarFeriadoSchema } from "validations/Feriados";

import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import DatePickerGenerico from "components/DatePickerGenerico";
import InputGenerico from "components/InputGenerico";
import SelectFiltragem from "components/SelectFiltragem";

import { formatarDigitosData } from "utils/formatarDigitosData";
import { getSelectFiltragemValue } from "utils/GetSelectFiltragemValue";

import { useFeriadosContext } from "contexts/Feriados";

import { useAuth } from "hooks/useAuth";

interface Props {
  feriado: any;
}

function ModalEditarFeriado({ feriado }: Props) {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleClick, selectProjetos } = useFeriadosContext();
  const getAno = new Date().getFullYear();

  const initialValues: any = {
    data_completa: new Date(
      `${formatarDigitosData(feriado.mes_feriado)}/${formatarDigitosData(
        feriado.dia_feriado
      )}/${feriado.ano_feriado === null ? getAno : feriado.ano_feriado}`
    ),
    id: feriado.id,
    ind_global: feriado.ind_global,
    id_projeto: feriado.id_projeto,
    dia_feriado: feriado.dia_feriado,
    mes_feriado: feriado.mes_feriado,
    ano_feriado: feriado.ano_feriado === null ? "" : feriado.ano_feriado,
    nome_feriado: feriado.nome_feriado,
    nom_usu_create: user?.nome,
    aplicar_todos_os_anos: feriado.ano_feriado === null,
  };

  const updateForm = useFormik({
    initialValues,
    validationSchema: editarFeriadoSchema,
    onSubmit: () => {},
  });

  // console.log(updateForm.isValid);

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
      <IconButton
        aria-label="Botão de Editar"
        icon={<MdModeEdit />}
        background={"transparent"}
        color={"origem.500"}
        _hover={{
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
        onClick={onOpen}
      />

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
            Editar Feriado
          </ModalHeader>
          <ModalCloseButton color={"white"} />

          <ModalBody mt={3}>
            {selectProjetos.isLoading ? (
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
                    registerForm={updateForm}
                    nomeInput={"NOME DO FERIADO"}
                    propName={"nome_feriado"}
                    value={updateForm.values.nome_feriado}
                    required={false}
                    placeholder={"Nome do feriado"}
                    maxLength={50}
                  />
                </Stack>
                <Stack spacing={2} w={"75%"}>
                  <DatePickerGenerico
                    required={false}
                    nomeLabel={"DATA"}
                    registerForm={updateForm}
                    propName={"data_completa"}
                    data={updateForm.values.data_completa}
                    esconderHorario={true}
                  />
                  <Checkbox
                    colorScheme="blue"
                    onChange={(e) => {
                      updateForm.setFieldValue(
                        "aplicar_todos_os_anos",
                        e.target.checked
                      );
                    }}
                    defaultChecked={updateForm.values.aplicar_todos_os_anos}
                  >
                    Aplicar para todos os anos
                  </Checkbox>
                </Stack>
                <Stack>
                  <SelectFiltragem
                    registerForm={updateForm}
                    nomeSelect={"TIPO DO FERIADO"}
                    propName={"ind_global"}
                    options={optionsTipoFeriado}
                    required={false}
                    value={getSelectFiltragemValue(
                      optionsTipoFeriado,
                      "ind_global",
                      updateForm
                    )}
                  />
                </Stack>
                {updateForm.values.ind_global === 0 &&
                  !selectProjetos.isLoading && (
                    <Stack>
                      <SelectFiltragem
                        registerForm={updateForm}
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
                          updateForm
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
                formikForm={updateForm}
                onClose={onClose}
              />
              <Button
                w={"208px"}
                h={"56px"}
                borderRadius={"8px"}
                disabled={!updateForm.isValid}
                background={"origem.500"}
                fontSize={"18px"}
                fontWeight={"700"}
                fontFamily={"Mulish"}
                variant="primary"
                color="white"
                onClick={() => handleClick(updateForm, onClose, "patch")}
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

export default ModalEditarFeriado;
