import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { MdFilterAlt } from "react-icons/md";

import {
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  ModalFooter,
  FormControl,
  Text,
  NumberInputField,
  NumberInput,
  Button,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { ListaPoco } from "interfaces/CadastrosModaisInfograficos";

import BotaoAzulLargoPrimary from "components/BotaoAzulLargo/BotaoAzulLargoPrimary";
import BotaoVermelhoLargoGhost from "components/BotaoVermelhoLargo/BotaoVermelhoLargoGhost";
import SelectFiltragem from "components/SelectFiltragem";

import { useCadastroCronograma } from "hooks/useCadastroCronograma";
import { useFiltragemCronogramaAtividade } from "hooks/useFiltragemCronogramaAtividade";

export function ModalFiltrarAtividade({ refresh, setRefresh }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useFiltragemCronogramaAtividade();
  const { listaPocos, listaSondas } = useCadastroCronograma();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const optionsPocos = listaPocos.map((poco: ListaPoco) => ({
    value: poco.id,
    label: poco.poco,
  }));

  const optionsSondas = listaSondas.map((sonda: any) => ({
    value: sonda.id,
    label: sonda.nom_sonda,
  }));

  const metodoElevacao = [
    {
      value: 1,
      label: "Metodo 1",
    },
    {
      value: 2,
      label: "Metodo 2",
    },
    {
      value: 3,
      label: "Metodo 3",
    },
    {
      value: 4,
      label: "Metodo 4",
    },
  ];

  const handleStartDate = (date: any) => {
    setStartDate(date);
  };

  const handleEndDate = (date: any) => {
    setEndDate(date);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <Button
      color={"#949494"}
      onClick={onClick}
      ref={ref}
      variant="outline"
      px={10}
      width="174px"
      height="56px"
    >
      {value === "" ? "Selecione a data" : value}
    </Button>
  ));

  return (
    <>
      <MdFilterAlt onClick={onOpen} color="#0047BB" size="16px" />
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
            Filtrar
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerForm.handleSubmit(e);
            }}
          >
            <ModalBody mt={3}>
              {!loading ? (
                <Flex
                  direction={"column"}
                  width="580px"
                  height={"auto"}
                  gap={7}
                >
                  <Flex direction={"row"} height="56px">
                    <SelectFiltragem
                      width={true}
                      registerForm={registerForm}
                      nomeSelect={"POÇO"}
                      propName={"pocoId"}
                      options={optionsPocos}
                      required={true}
                    />
                  </Flex>
                  <Flex direction={"row"} height="56px" gap={3}>
                    <Flex>
                      <SelectFiltragem
                        width={true}
                        registerForm={registerForm}
                        nomeSelect={"SONDA"}
                        propName={"sondaId"}
                        options={optionsSondas}
                        required={true}
                      />
                    </Flex>
                    <Flex direction={"column"}>
                      <FormControl>
                        <Flex gap={1}>
                          {/* <RequiredField /> */}
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            DE
                          </Text>
                        </Flex>

                        <NumberInput
                          max={999999}
                          min={0}
                          id={`profundidadeIni`}
                          name={`profundidade`}
                          // value={registerForm.values.profundidade}
                          onChange={(value) => {
                            registerForm.setFieldValue(
                              `profundidadeIni`,
                              Number(value)
                            );
                          }}
                        >
                          <NumberInputField bg={"#fff"} h={"56px"} />
                        </NumberInput>
                      </FormControl>
                    </Flex>
                    <Flex direction={"column"}>
                      <FormControl>
                        <Flex gap={1}>
                          {/* <RequiredField /> */}
                          <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"#949494"}
                          >
                            ATE
                          </Text>
                        </Flex>

                        <NumberInput
                          max={999999}
                          min={0}
                          id={`profundidadeFim`}
                          name={`profundidade`}
                          // value={registerForm.values.profundidade}
                          onChange={(value) => {
                            registerForm.setFieldValue(
                              `profundidadeFim`,
                              Number(value)
                            );
                          }}
                        >
                          <NumberInputField bg={"#fff"} h={"56px"} />
                        </NumberInput>
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex direction={"row"}>
                    <Flex>
                      <SelectFiltragem
                        width={true}
                        registerForm={registerForm}
                        nomeSelect={"Metodo Elevação"}
                        propName={"metodoElevacaoId"}
                        options={metodoElevacao}
                        required={true}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1} marginLeft="16px">
                      <Flex gap={1}>
                        {/* <RequiredField /> */}
                        <Text fontSize={"12px"} color={"#949494"}>
                          DATA INÍCIO
                        </Text>
                      </Flex>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => handleStartDate(date)}
                        locale="pt-BR"
                        showTimeSelect
                        timeIntervals={60}
                        dateFormat="dd/MM/yyyy, hh:mm"
                        customInput={<ExampleCustomInput />}
                        isClearable={startDate !== null}
                      />
                    </Flex>
                    <Flex direction={"column"} grow={1} marginLeft="16px">
                      <Flex gap={1}>
                        {/* <RequiredField /> */}
                        <Text fontSize={"12px"} color={"#949494"}>
                          DATA FIM
                        </Text>
                      </Flex>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => handleEndDate(date)}
                        locale="pt-BR"
                        showTimeSelect
                        timeIntervals={60}
                        dateFormat="dd/MM/yyyy, hh:mm"
                        customInput={<ExampleCustomInput />}
                        isClearable={endDate !== null}
                      />
                    </Flex>
                  </Flex>
                </Flex>
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