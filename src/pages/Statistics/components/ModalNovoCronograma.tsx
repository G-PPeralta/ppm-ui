import { useState, useEffect } from "react";

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
  Select,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { useFormik } from "formik";
import * as yup from "yup";

import { TextError } from "components/TextError";

import { handleCadastrarRefresh, handleCancelar } from "utils/handleCadastro";

import { useToast } from "contexts/Toast";

import { useAuth } from "hooks/useAuth";
// import { useCadastroCampanha } from "hooks/useCadastroCampanha";

// import SelectFiltragemSondas from "./SelectFiltragemSonda";
interface NovoCronograma {
  nom_campanha: string;
  dsc_comentario: string;
  nom_usu_create: string | undefined;
}

function ModalNovoCronograma({ setRefresh, refresh }: any) {
  const { toast } = useToast();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [sondas, setSondas] = useState<any[]>([]);

  const initialValues: NovoCronograma = {
    nom_campanha: "",
    dsc_comentario: "",
    nom_usu_create: user?.nome,
  };

  const novoCronogramaSchema = yup.object({
    nom_campanha: yup
      .string()
      .min(3)
      .required("O nome da atividade é obrigatório!"),
    dsc_comentario: yup.string(),
  });

  const reqGet = async () => {
    const sondas = {
      data: [{ nom_sonda: "PIR-999" }, { nom_sonda: "SONDA-001" }],
    }; // await getSonda();

    const sondasSorted = sondas.data.sort((a: any, b: any) =>
      a.nom_sonda.localeCompare(b.nom_sonda)
    );

    setSondas(sondasSorted);
  };

  async function postNovaCampanha(
    payload: NovoCronograma
  ): Promise<{ status: number }> {
    const status = 200;
    return { status };
  }

  const registerForm = useFormik({
    initialValues,
    validationSchema: novoCronogramaSchema,
    onSubmit: async (values) => {
      const newValues: NovoCronograma = {
        nom_campanha: values.nom_campanha,
        dsc_comentario: values.dsc_comentario,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await postNovaCampanha(newValues);

        if (status === 200 || status === 201) {
          toast.success(
            `Campanha ${values.nom_campanha} cadastrada com sucesso!`,
            {
              id: "toast-principal",
            }
          );
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar campanha ${values.nom_campanha}!`, {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    setLoading(true);
    reqGet();
  }, []);

  useEffect(() => {
    if (sondas.length > 0) {
      setLoading(false);
    }
  }, [sondas]);
  return (
    <>
      <Button
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
        Novo Cronograma
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
            Cronograma
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
                        <Select variant="unstyled">
                          <option value="1">Valor 1</option>
                          <option value="2">Valor 2</option>
                          <option value="3">Valor 3</option>
                        </Select>
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
                          placeholder="Adicionar descrição"
                          id="dsc_comentario"
                          name="dsc_comentario"
                          value={registerForm.values.dsc_comentario}
                          onChange={registerForm.handleChange}
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
              <Flex gap={2}>
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
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalNovoCronograma;
