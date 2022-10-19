import { useEffect } from "react";

import {
  Flex,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NumberInput,
  NumberInputField,
  useBreakpointValue,
} from "@chakra-ui/react";

// import Restricoes from "pages/Infographics/Components/Restricoes";

import BotaoAzulPrimary from "components/BotaoAzul/BotaoAzulPrimary";
import BotaoVermelhoGhost from "components/BotaoVermelho/BotaoVermelhoGhost";
// import SelectFiltragem from "components/SelectFiltragem";

// import PopOverRelacao from "./PopOverRelacao";

// import AtividadesDragAndDrop from "./AtividadesDragAndDrop";
import DateTimePicker from "./DateTimePicker";

// interface Responsavel {
//   id: number;
//   nome: string;
// }

function ModalEditarAtividade({
  setRefresh,
  refresh,
  editAtividade,
  // listaResponsaveis,
  // listaAreaAtuacao,
  isOpen,
  onClose,
  registerForm,
  loading,
}: any) {
  // const responsaveisOptions = listaResponsaveis.map(
  //   (responsavel: Responsavel) => ({
  //     value: responsavel.id,
  //     label: responsavel.nome,
  //   })
  // );

  // const areaAtuacaoOptions = listaAreaAtuacao.map((area: any) => ({
  //   value: area.id,
  //   label: area.tipo,
  // }));

  useEffect(() => {
    registerForm.setFieldValue("id_atividade", editAtividade.id_atividade);
    registerForm.setFieldValue("nome_atividade", editAtividade.nome_atividade);
    registerForm.setFieldValue(
      "inicio_realizado",
      editAtividade.inicio_realizado
    );
    registerForm.setFieldValue("fim_realizado", editAtividade.fim_realizado);

    // registerForm.setFieldValue(
    //   "inicio_planejado",
    //   editAtividade.inicio_planejado
    // );

    // registerForm.setFieldValue("fim_planejado", editAtividade.fim_planejado);
    // registerForm.setFieldValue("hrs_totais", editOp.hrs_totais);
    // registerForm.setFieldValue("hrs_reais", editOp.hrs_reais);
    registerForm.setFieldValue("pct_real", editAtividade.pct_real);
  }, [editAtividade]);

  return (
    <>
      {/* <Button
        h={"56px"}
        borderRadius={"10px"}
        background={"white"}
        color={"origem.500"}
        onClick={onOpen}
        _hover={{
          background: "origem.500",
          transition: "all 0.4s",
          color: "white",
        }}
      >
        Editar Operação
      </Button> */}
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
            Editar Atividade
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              <Flex
                flexDirection={useBreakpointValue({
                  base: "column",
                  md: "column",
                })}
                gap={5}
              >
                <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Nome</Text>
                  <Flex gap={5} flex={1}>
                    <Flex direction={"column"} flex={2}>
                      <Input
                        isDisabled
                        value={registerForm.values.nome_atividade || ""}
                        type="text"
                        name="nome_atividade"
                      />
                    </Flex>
                  </Flex>
                </Flex>

                {/* <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Responsável</Text>
                  <Flex gap={5} flex={1}>
                    <SelectFiltragem
                      registerForm={registerForm}
                      nomeSelect={"RESPONSÁVEL"}
                      propName={"id_responsavel"}
                      options={responsaveisOptions}
                      required={true}
                    />

                    <SelectFiltragem
                      registerForm={registerForm}
                      nomeSelect={"ÁREA"}
                      propName={"id_area"}
                      options={areaAtuacaoOptions}
                      required={true}
                    />
                  </Flex>
                </Flex> */}

                <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Datas</Text>
                  {/* <Flex>
                    <Flex flex={1}>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"inicio_planejado"}
                        label={"INÍCIO PLANEJADO"}
                        required={false}
                        data={registerForm.values.inicio_planejado}
                      />
                    </Flex>
                    <Flex flex={1}>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"fim_planejado"}
                        label={"FIM PLANEJADO"}
                        required={false}
                        data={registerForm.values.fim_planejado}
                      />
                    </Flex>
                  </Flex> */}
                </Flex>
                <Flex flex={1} direction={"column"}>
                  <Flex>
                    <Flex flex={1}>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"inicio_realizado"}
                        label={"INÍCIO REALIZADO"}
                        required={false}
                        data={registerForm.values.inicio_realizado}
                      />
                    </Flex>
                    <Flex flex={1}>
                      <DateTimePicker
                        registerForm={registerForm}
                        value={"fim_realizado"}
                        label={"FIM REALIZADO"}
                        required={false}
                        data={registerForm.values.fim_realizado}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex flex={1} direction={"column"}>
                  <Text fontWeight={"bold"}>Progresso</Text>
                  <Flex gap={5}>
                    <Flex>
                      <NumberInput
                        max={100}
                        min={0}
                        id={"pct_real"}
                        name={"pct_real"}
                        value={registerForm.values.pct_real}
                        onChange={(value) => {
                          registerForm.setFieldValue("pct_real", Number(value));
                        }}
                      >
                        <NumberInputField bg={"#fff"} h={"56px"} />
                      </NumberInput>
                    </Flex>
                  </Flex>
                </Flex>
                {/* <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "column",
                  })}
                  gap={2}
                >
                  <Text fontWeight={"bold"}>Restrições</Text>
                  <Restricoes registerForm={registerForm} />
                </Flex> */}

                {/* <AtividadesDragAndDrop
                  registerForm={registerForm}
                  atividades={relacoesOptions}
                /> */}
              </Flex>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <BotaoVermelhoGhost
                  text="Cancelar"
                  onClose={onClose}
                  formikForm={registerForm}
                />
                <BotaoAzulPrimary
                  text="Concluir Cadastro"
                  onClose={onClose}
                  formikForm={registerForm}
                  refresh={refresh}
                  setRefresh={setRefresh}
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

export default ModalEditarAtividade;
