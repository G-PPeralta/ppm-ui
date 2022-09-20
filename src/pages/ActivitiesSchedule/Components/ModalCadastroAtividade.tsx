import { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Stack,
  useBreakpointValue,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import { handleCadastrarRefresh, handleCancelar } from "utils/handleCadastro";

import { useCadastroAtividade } from "hooks/useCadastroAtividade";

import InputPorcentagem from "./InputPorcentagem";

function ModalCadastroAtividade({ id, setRefresh }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerForm, loading } = useCadastroAtividade();
  const { state }: any = useLocation();
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());

  const handleStartDate = (date: any) => {
    setStartDate(date);
    registerForm.setFieldValue("dat_ini_plan", date);
  };

  const handleEndDate = (date: any) => {
    setEndDate(date);
    registerForm.setFieldValue("dat_fim_plan", date);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <Button
      onClick={onClick}
      ref={ref}
      variant="outline"
      px={10}
      minW={"220px"}
    >
      {value === "" ? "Selecione a data" : value}
    </Button>
  ));

  useEffect(() => {
    registerForm.setFieldValue("id_pai", Number(id));
    registerForm.setFieldValue("id_campanha", Number(state.poco.id_campanha));
  }, []);

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
        Atividade
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
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
            Cadastrar Atividade
          </ModalHeader>
          <ModalCloseButton color={"white"} />
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
                        <FormLabel htmlFor="nom_atividade">NOME</FormLabel>
                        <Input
                          isRequired
                          placeholder="Digite o nome da atividade"
                          id="nom_atividade"
                          type="text"
                          name="nom_atividade"
                          w={useBreakpointValue({ base: "100%", md: "100%" })}
                          value={registerForm.values.nom_atividade}
                          onChange={registerForm.handleChange}
                        />
                      </FormControl>
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    ></Flex>

                    <Flex justify={"space-between"} gap={5}>
                      <Flex direction={"column"} grow={1}>
                        <FormLabel htmlFor="dat_ini_plan">
                          DATA INÍCIO
                        </FormLabel>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => handleStartDate(date)}
                          locale="pt-BR"
                          showTimeSelect
                          dateFormat="dd/MM/yyyy, hh:mm"
                          customInput={<ExampleCustomInput />}
                          isClearable
                        />
                      </Flex>
                      <Flex direction={"column"} grow={1}>
                        <FormLabel htmlFor="dat_fim_plan">DATA FIM</FormLabel>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => handleEndDate(date)}
                          dateFormat="dd/MM/yyyy, hh:mm"
                          showTimeSelect
                          customInput={<ExampleCustomInput />}
                          isClearable
                          locale="pt-BR"
                        />
                      </Flex>
                      <FormControl>
                        <InputPorcentagem registerForm={registerForm} />
                      </FormControl>
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    ></Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="dsc_comentario">
                          OBSERVAÇÕES
                        </FormLabel>
                        <Textarea
                          placeholder="Adicione comentários sobre a atividade"
                          id="dsc_comentario"
                          name="dsc_comentario"
                          value={registerForm.values.dsc_comentario}
                          onChange={registerForm.handleChange}
                        />
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
                  disabled={!registerForm.isValid}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  onClick={() =>
                    handleCadastrarRefresh(registerForm, onClose, setRefresh)
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
                      <Text>Gravar</Text>
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

export default ModalCadastroAtividade;
