import DatePicker from "react-datepicker";

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
  Input,
} from "@chakra-ui/react";

import { RequiredField } from "components/RequiredField/RequiredField";

import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useState } from "react";

import { CreateServicoFerramenta } from "interfaces/lookahead";

import {
  createAtividadeFerramenta,
  createAtividadeServico,
} from "services/post/Lookahead";

type PropsType = {
  id: number;
};

export function ModalAddAtividade(props: PropsType) {
  const { id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { registerForm, loading } = useCadastroAtividade();
  const [startDate, setStartDate] = useState<any>("");
  const [nomeServico, setNomeServico] = useState("");
  const [nomeFerramenta, setNomeFerramenta] = useState("");
  const [anotacao, setAnotacao] = useState("");

  const save = async () => {
    const ferramenta: CreateServicoFerramenta = {
      atividade_id: id,
      nome: nomeFerramenta,
      data_hora: startDate,
      anotacoes: anotacao,
    };

    const servicos: CreateServicoFerramenta = {
      atividade_id: id,
      nome: nomeServico,
      data_hora: startDate,
      anotacoes: anotacao,
    };

    await createAtividadeFerramenta(ferramenta);
    await createAtividadeServico(servicos);

    window.location.reload();
  };

  const handleStartDate = (date: any) => {
    setStartDate(date);
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
        Cadastrar
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
          {/* <ModalCloseButton color={"white"} /> */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // registerForm.handleSubmit(e);
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
                    ></Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    ></Flex>

                    <Flex justify={"space-between"} gap={5} width={211}>
                      <Flex direction={"column"} grow={1} width={211}>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="dat_ini_plan">
                            DATA INÍCIO
                          </FormLabel>
                        </Flex>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => handleStartDate(date)}
                          locale="pt-BR"
                          showTimeSelect
                          dateFormat="dd/MM/yyyy, hh:mm"
                          customInput={<ExampleCustomInput />}
                          isClearable={startDate !== ""}
                        />
                      </Flex>
                    </Flex>

                    <Flex>
                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="nom_atividade">
                            FERRAMENTA
                          </FormLabel>
                        </Flex>
                        <Input
                          isRequired
                          placeholder="Digite o nome da Ferramenta"
                          id="nom_atividade"
                          type="text"
                          name="nom_atividade"
                          onChange={(e) => setNomeFerramenta(e.target.value)}
                          w={useBreakpointValue({ base: "100%", md: "100%" })}
                        />
                      </FormControl>
                      <FormControl>
                        <Flex gap={1}>
                          <RequiredField />
                          <FormLabel htmlFor="nom_atividade">SERVIÇO</FormLabel>
                        </Flex>
                        <Input
                          isRequired
                          placeholder="Digite o nome do serviço"
                          id="nom_atividade"
                          type="text"
                          name="nom_atividade"
                          w={useBreakpointValue({ base: "100%", md: "100%" })}
                          onChange={(e) => setNomeServico(e.target.value)}
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
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={5}
                    >
                      <FormControl>
                        <FormLabel htmlFor="dsc_comentario">
                          ANOTAÇÕES
                        </FormLabel>
                        <Textarea
                          placeholder="Adicione comentários sobre a atividade"
                          id="dsc_comentario"
                          name="dsc_comentario"
                          onChange={(e) => setAnotacao(e.target.value)}
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
                  _hover={{
                    background: "red.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  // disabled={!registerForm.isValid}
                  background="origem.300"
                  variant="primary"
                  color="white"
                  onClick={save}
                  // onClick={() =>
                  //   handleCadastrarRefresh(
                  //     registerForm,
                  //     onClose,
                  //     setRefresh,
                  //     refresh
                  //   )
                  // }
                  // _hover={{
                  //   background: "origem.500",
                  //   transition: "all 0.4s",
                  // }}
                >
                  Gravar
                  {/* {loading ? (
                    <Ring speed={2} lineWeight={5} color="white" size={24} />
                  ) : (
                    <>
                      <Text>Gravar</Text>
                    </>
                  )} */}
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
