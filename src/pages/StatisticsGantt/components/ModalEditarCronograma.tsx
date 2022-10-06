import { useEffect } from "react";

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
  Input,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { ListaPoco } from "interfaces/CadastrosModaisInfograficos";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
// import { RequiredField } from "components/RequiredField/RequiredField";

import { useEditarCronograma } from "hooks/useEditarCronograma";

import SelectFiltragem from "../../../components/SelectFiltragem";
// import AtividadesCadastroCronograma from "./AtividadesCadastroCronograma";
// import { TextError } from "components/TextError";

function ModalEditarCronograma({ refresh, setRefresh, atual }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    registerForm,
    loading,
    listaPocos,
    listaSondas,
    // listaAtividadesPrecedentes,
  } = useEditarCronograma(atual);

  const innerWidth = window.innerWidth;

  const optionsPocos = listaPocos.map((poco: ListaPoco) => ({
    value: poco.id,
    label: poco.poco,
  }));

  const optionsSondas = listaSondas.map((sonda: any) => ({
    value: sonda.id,
    label: sonda.nom_sonda,
  }));

  // const handleGet = async () => {
  //   const projetos = await getProjetosTipo();
  //   const projetosTipoSorted = projetos.data.sort(
  //     (a: ProjetoTipo, b: ProjetoTipo) =>
  //       a.nom_projeto_tipo.localeCompare(b.nom_projeto_tipo)
  //   );
  //   setListaProjetos(projetosTipoSorted);
  // };

  // const handleClick = async () => {
  //   const projetos = await getProjetosTipo();
  //   const projetosTipoSorted = projetos.data.sort(
  //     (a: ProjetoTipo, b: ProjetoTipo) =>
  //       a.nom_projeto_tipo.localeCompare(b.nom_projeto_tipo)
  //   );
  //   setListaProjetos(projetosTipoSorted);
  //   onOpen();
  // };

  useEffect(() => {
    // handleGet();
    // registerForm.setFieldValue("id_campanha", idCampanha);
    // const newDate = new Date(data);
    // newDate.setDate(newDate.getDate() + 15);
    // registerForm.setFieldValue("dat_ini_prev", newDate);
    // setRefresh(!refresh);
  }, []);

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"10px"}
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
      <Modal isOpen={isOpen} onClose={onClose} size="7xl">
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
            Novo Cronograma
          </ModalHeader>
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
                      <Text fontWeight={"bold"}>Nome</Text>
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
                          value={{ value: atual.id_sonda, label: atual.sonda }}
                        />
                        <SelectFiltragem
                          registerForm={registerForm}
                          nomeSelect={"POÇO"}
                          propName={"poco_id"}
                          options={optionsPocos}
                          required={true}
                          value={{ value: atual.id_poco, label: atual.poco }}
                        />
                        <FormControl>
                          <Flex gap={1}>
                            {/* <RequiredField /> */}
                            <Text
                              fontWeight={"bold"}
                              fontSize={"12px"}
                              color={"#949494"}
                            >
                              PROFUNDIDADE DA ZONA INTERVIDA MAIS
                            </Text>
                          </Flex>
                          <Input
                            // isRequired
                            placeholder="Profundidade"
                            id="profundidade"
                            type="text"
                            name="profundidade"
                            // value={regexCaracteresEspeciais(
                            //   registerForm.values.poco
                            // )}
                            onChange={registerForm.handleChange}
                            maxLength={10}
                          />
                          {/* {registerForm.errors.poco && (
                            <TextError>{registerForm.errors.poco}</TextError>
                          )} */}
                        </FormControl>
                      </Flex>
                    </Stack>

                    {/* <AtividadesCadastroCronograma
                      registerForm={registerForm}
                      listaAtividadesPrecedentes={listaAtividadesPrecedentes}
                    /> */}

                    <Stack>
                      <Text fontWeight={"bold"}>Comentários</Text>
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

export default ModalEditarCronograma;
