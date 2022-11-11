import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import {
  Button,
  Flex,
  FormControl,
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
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CreateServicoFerramenta } from "interfaces/lookahead";

import { RequiredField } from "components/RequiredField/RequiredField";

import "react-datepicker/dist/react-datepicker.css";

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
  const [startDate, setStartDate] = useState<Date>();
  const [nomeServico, setNomeServico] = useState("");
  const [nomeFerramenta, setNomeFerramenta] = useState("");
  const [anotacao, setAnotacao] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const save = async () => {
    if (!startDate) {
      return;
    }
    setLoadingBtn(true);

    const _data = startDate?.toISOString().split("T")[0];
    const _hora = startDate?.toLocaleTimeString();

    const ferramenta: CreateServicoFerramenta = {
      atividade_id: id,
      nome: nomeFerramenta,
      data: _data,
      hora: _hora,
      anotacoes: anotacao,
    };

    const servicos: CreateServicoFerramenta = {
      atividade_id: id,
      nome: nomeServico,
      data: _data,
      hora: _hora,
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
      // color={"#949494"}
      fontSize={"14px"}
      fontWeight={"400"}
      onClick={onClick}
      ref={ref}
      variant="outline"
      px={10}
      minW={"220px"}
      h={"56px"}
      _placeholder={{ color: "#949494" }}
    >
      {value === "" ? "Selecione a data" : value}
    </Button>
  ));

  return (
    <>
      <Button
        h={"58px"}
        w={"208px"}
        background={"origem.500"}
        border={"2.3px solid"}
        color={"white"}
        variant="primary"
        _hover={{
          // background: "white",
          background: "origem.600",
          // transition: "all 0.4s",
        }}
        // lineHeight="22.59px"
        fontSize={"18px"}
        fontWeight={"700"}
        borderRadius={"8px"}
        fontFamily={"Mulish"}
        width="208px"
        // letterSpacing="0.2px"
        onClick={onOpen}
      >
        Cadastrar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
            Cadastrar
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
                          <Text
                            fontSize={"12px"}
                            color={"#949494"}
                            fontWeight={"700"}
                          >
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
                    </Flex>

                    <Flex>
                      <FormControl marginRight="8px" mt={2}>
                        <Flex gap={1}>
                          <RequiredField />
                          <Text
                            fontSize={"12px"}
                            color={"#949494"}
                            fontWeight={"700"}
                          >
                            FERRAMENTA
                          </Text>
                        </Flex>
                        <Input
                          h={"56px"}
                          _placeholder={{ color: "#949494" }}
                          // w={"328px"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          isRequired
                          placeholder="Digite o nome da Ferramenta"
                          id="nom_atividade"
                          type="text"
                          name="nom_atividade"
                          // color={"#949494"}
                          maxLength={20}
                          onChange={(e) => setNomeFerramenta(e.target.value)}
                          w={useBreakpointValue({ base: "100%", md: "100%" })}
                        />
                      </FormControl>
                      <FormControl marginLeft="8px" mt={2}>
                        <Flex gap={1}>
                          <RequiredField />
                          <Text
                            fontSize={"12px"}
                            color={"#949494"}
                            fontWeight={"700"}
                          >
                            SERVIÇO
                          </Text>
                        </Flex>
                        <Input
                          h={"56px"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          isRequired
                          placeholder="Digite o nome do Serviço"
                          id="nom_atividade"
                          type="text"
                          name="nom_atividade"
                          _placeholder={{ color: "#949494" }}
                          // color={"#949494"}
                          maxLength={20}
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
                        <Text
                          fontSize={"12px"}
                          color={"#949494"}
                          fontWeight={"700"}
                        >
                          ANOTAÇÕES
                        </Text>
                        <Textarea
                          fontSize={"14px"}
                          fontWeight={"400"}
                          placeholder="Descreva as anotações"
                          id="dsc_comentario"
                          _placeholder={{ color: "#949494" }}
                          name="dsc_comentario"
                          // color={"#949494"}
                          // maxLength={5000}
                          rows={5}
                          onChange={(e) => setAnotacao(e.target.value)}
                        />
                      </FormControl>
                    </Flex>
                  </Stack>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalCloseButton color={"white"} onClick={() => onClose()} />

            <ModalFooter justifyContent={"center"}>
              <Flex gap={2}>
                <Button
                  variant="ghost"
                  color="red.500"
                  _hover={{
                    background: "red.600",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  onClick={onClose}
                  w={"208px"}
                  h={"56px"}
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Cancelar
                </Button>
                <Button
                  // disabled={!registerForm.isValid}
                  background="origem.500"
                  variant="primary"
                  color="white"
                  onClick={save}
                  disabled={
                    !startDate || !nomeFerramenta || !nomeServico || loadingBtn
                  }
                  _hover={{
                    background: "origem.600",
                    transition: "all 0.4s",
                  }}
                  borderRadius={"8px"}
                  w={"208px"}
                  h={"56px"}
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                >
                  Cadastrar
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
