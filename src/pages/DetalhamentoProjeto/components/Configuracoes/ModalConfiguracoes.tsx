import React, {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IConfigProjetoDto } from "interfaces/ConfiguracaoProjeto";
import { ProjetosConfig } from "interfaces/Services";
import moment from "moment";

import ModalCadastrarPriorizacao from "pages/Projects/Components/ModalCadastrarPriorizacao";

import { useProjetos } from "hooks/useCadastroProjeto";

import { patchProjeto } from "services/update/Projeto";

import DatePicker from "./DatePicker";

interface ConfigProjetoProps {
  projeto: ProjetosConfig;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalConfiguracoes({
  projeto,
  refresh,
  setRefresh,
}: ConfigProjetoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // MODAL PRIORIZAÇÃO
  const [isPriorizacaoModalOpen, setIsPriorizacaoModalOpen] = useState(false);

  // FORM LABELS
  const [responsavel, setReponsavel] = useState(projeto?.responsavel_id);
  const [coordenador, setCoordenador] = useState(projeto?.coordenador_id);
  const [status, setStatus] = useState(projeto?.status_id);
  const [polo, setPolo] = useState(projeto?.polo_id);
  const [local, setLocal] = useState(projeto?.local_id);
  const [solicitacao, setSolicitacao] = useState(projeto?.solicitante_id);
  const [nomeProjeto, setNomeProjeto] = useState(projeto?.nome_projeto);
  const [elementoPep, setElementoPep] = useState(projeto?.elemento_pep);
  const [inicio, setInicio] = useState(
    projeto?.data_inicio
      ? moment.utc(projeto?.data_inicio).add(3, "hours").toDate()
      : null
  );
  const [fim, setFim] = useState(
    projeto?.data_fim
      ? moment.utc(projeto?.data_fim).add(3, "hours").toDate()
      : null
  );
  const [inicioReal, setInicioReal] = useState(
    projeto?.dataInicio_real
      ? moment.utc(projeto?.dataInicio_real).add(3, "hours").toDate()
      : null
  );
  const [fimReal, setFimReal] = useState(
    projeto?.dataFim_real
      ? moment.utc(projeto?.dataFim_real).add(3, "hours").toDate()
      : null
  );
  const [divisao, setDivisao] = useState(projeto?.divisao_id);
  const [classificacao, setClassificacao] = useState(projeto?.classificacao_id);
  const [tipo, setTipo] = useState(projeto?.tipo_projeto_id);
  const [gate, setGate] = useState(projeto?.gate_id);

  const {
    optionsResponsaveis,
    optionsCoordenadores,
    optionsPolos,
    optionsLocais,
    optionsSolicitantes,
    optionsStatus,
    optionsDivisoes,
    optionsClassificacoes,
    optionsTipoProjetos,
    optionsGates,
  } = useProjetos();

  async function openModalAPI() {
    onOpen();
  }

  const handleCancelar = () => {
    onClose();
  };

  const handleSalvar = () => {
    const payload: IConfigProjetoDto = {
      nome_responsavel: responsavel,
      coordenador_nome: coordenador,
      status,
      polo,
      local,
      solicitacao,
      nome_projeto: nomeProjeto,
      elemento_pep: elementoPep,
      data_inicio: moment.utc(inicio).subtract(3, "hours").toDate(),
      data_fim: moment.utc(fim).subtract(3, "hours").toDate(),
      data_inicio_real: inicioReal
        ? moment.utc(inicioReal).subtract(3, "hours").toDate()
        : inicioReal,
      data_fim_real: fimReal
        ? moment.utc(fimReal).subtract(3, "hours").toDate()
        : fimReal,
      divisao,
      classificacao,
      tipo,
      gate,
    };
    patchProjeto(projeto.id, payload);
    onClose();
    setRefresh(!refresh);
  };

  function getOptions(options: any, selected: any) {
    const filtered = options.filter((option: any) => option.label !== selected);

    return filtered.map(
      (
        option: {
          value: string | number | readonly string[] | undefined;
          label:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
        },
        index: any
      ) => (
        <option value={option.value} key={index}>
          {option.label}
        </option>
      )
    );
  }

  return (
    <>
      <Button
        onClick={() => openModalAPI()}
        background={"white"}
        color={"#0047BB"}
        _hover={{
          background: "origem.500",
          color: "white",
          transition: "all 0.4s",
        }}
        p={4}
        borderTopRadius={"0px"}
        borderBottomRadius={"6px"}
        fontSize={"16px"}
        fontWeight={"700"}
        flex={1}
      >
        Configurações
      </Button>
      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderTopRadius={"10px"}>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={"8px"}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
            h={"48px"}
          >
            Configurações do Projeto
          </ModalHeader>
          <ModalCloseButton color={"white"} onClick={() => handleCancelar()} />
          <ModalBody p={"24px"}>
            <FormControl>
              <Flex
                flexDirection={"column"}
                alignItems={"start"}
                display={"flex"}
                gap={"16px"}
              >
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  w={"100%"}
                  gap={"16px"}
                >
                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="responsavel">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        RESPONSÁVEL
                      </Text>
                    </FormLabel>
                    <Select
                      required={true}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="responsavelId"
                      name="responsavel"
                      width={"100%"}
                      placeholder={projeto.nome_responsavel}
                      onChange={(e) => {
                        setReponsavel(+e.target.value);
                      }}
                    >
                      {getOptions(
                        optionsResponsaveis,
                        projeto.nome_responsavel
                      )}
                    </Select>
                  </FormControl>

                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="coordenador">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        COORDENADOR
                      </Text>
                    </FormLabel>
                    <Select
                      required={true}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="coordenadorId"
                      name="coordenador"
                      width={"100%"}
                      placeholder={projeto.coordenador_nome}
                      onChange={(e) => {
                        setCoordenador(+e.target.value);
                      }}
                    >
                      {getOptions(
                        optionsCoordenadores,
                        projeto.coordenador_nome
                      )}
                    </Select>
                  </FormControl>

                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="status">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        STATUS
                      </Text>
                    </FormLabel>
                    <Select
                      required={true}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="statusId"
                      name="status"
                      width={"100%"}
                      placeholder={projeto.status}
                      onChange={(e) => {
                        setStatus(+e.target.value);
                      }}
                    >
                      {getOptions(optionsStatus, projeto.status)}
                    </Select>
                  </FormControl>
                  <Flex w={"100%"} justifyContent={"center"}>
                    <FormControl
                      pt={"20px"}
                      w={"232px"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Button
                        w={"208px"}
                        h={"56px"}
                        color="#0047BB"
                        background="white"
                        borderColor="#0047BB"
                        border={"2px"}
                        _hover={{
                          background: "#0047BB",
                          transition: "all 0.4s",
                          color: "white",
                        }}
                        fontWeight={"700"}
                        fontSize="18px"
                        // rightIcon={<IoMdPodium />}
                        onClick={() => setIsPriorizacaoModalOpen(true)}
                      >
                        {
                          <ModalCadastrarPriorizacao
                            refresh={refresh}
                            setRefresh={setRefresh}
                            projeto={projeto.id}
                            isPriorizacaoModalOpen={isPriorizacaoModalOpen}
                            setIsPriorizacaoModalOpen={
                              setIsPriorizacaoModalOpen
                            }
                          />
                        }
                      </Button>
                    </FormControl>
                  </Flex>
                </Flex>

                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  w={"100%"}
                  gap={"16px"}
                >
                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="polo">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        POLO
                      </Text>
                    </FormLabel>
                    <Select
                      required={true}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="poloId"
                      name="polo"
                      width={"100%"}
                      placeholder={projeto.polo}
                      onChange={(e) => {
                        setPolo(+e.target.value);
                      }}
                    >
                      {getOptions(optionsPolos, projeto.polo)}
                    </Select>
                  </FormControl>
                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="local">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        LOCAL
                      </Text>
                    </FormLabel>
                    <Select
                      required={true}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="localId"
                      name="local"
                      width={"100%"}
                      placeholder={projeto.local}
                      onChange={(e) => {
                        setLocal(+e.target.value);
                      }}
                    >
                      {getOptions(optionsLocais, projeto.local)}
                    </Select>
                  </FormControl>
                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="solicitacao">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        SOLICITAÇÃO
                      </Text>
                    </FormLabel>
                    <Select
                      required={true}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="solicitacaoId"
                      name="solicitacao"
                      width={"100%"}
                      placeholder={projeto.solicitante}
                      onChange={(e) => {
                        setSolicitacao(+e.target.value);
                      }}
                    >
                      {getOptions(optionsSolicitantes, projeto.solicitante)}
                    </Select>
                  </FormControl>
                </Flex>
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  w={"100%"}
                  gap={"16px"}
                >
                  <FormControl w={{ sm: "100%", md: "480px" }}>
                    <FormLabel htmlFor="nomeProjeto">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        NOME DO PROJETO
                      </Text>
                    </FormLabel>
                    <Input
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      maxLength={50}
                      borderRadius={"8px"}
                      border={"1px solid #A7A7A7"}
                      mt={"-6px"}
                      width={"100%"}
                      height={"56px"}
                      id="nomeProjetoId"
                      name="nomeProjeto"
                      value={nomeProjeto}
                      onChange={(e) => setNomeProjeto(e.target.value)}
                    ></Input>
                  </FormControl>
                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="elementoPep">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        ELEMENTO PEP
                      </Text>
                    </FormLabel>
                    <Input
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      maxLength={50}
                      borderRadius={"8px"}
                      border={"1px solid #A7A7A7"}
                      mt={"-6px"}
                      width={"100%"}
                      height={"56px"}
                      id="elementoPepId"
                      name="elementoPep"
                      value={elementoPep}
                      onChange={(e) => setElementoPep(e.target.value)}
                    ></Input>
                  </FormControl>
                </Flex>
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  w={"100%"}
                  gap={"16px"}
                >
                  <Flex flexDirection={"row"} w={"100%"} gap={"16px"}>
                    <FormControl w={{ sm: "100%", md: "232px" }}>
                      {inicio ? (
                        <DatePicker
                          label={"INICIO"}
                          setDate={setInicio}
                          required={false}
                          data={inicio}
                          value={inicio.toString()}
                        />
                      ) : (
                        <DatePicker
                          label={"INICIO"}
                          setDate={setInicio}
                          required={false}
                          data={new Date()}
                          value={new Date().toString()}
                        />
                      )}
                    </FormControl>
                    <FormControl w={{ sm: "100%", md: "232px" }}>
                      {fim ? (
                        <DatePicker
                          label={"FIM"}
                          setDate={setFim}
                          required={false}
                          data={fim}
                          value={fim.toString()}
                        />
                      ) : (
                        <DatePicker
                          label={"FIM"}
                          setDate={setFim}
                          required={false}
                          data={new Date()}
                          value={new Date().toString()}
                        />
                      )}
                    </FormControl>
                  </Flex>
                  <Flex flexDirection={"row"} w={"100%"} gap={"16px"}>
                    <FormControl w={{ sm: "100%", md: "232px" }}>
                      {inicioReal ? (
                        <DatePicker
                          label={"INICIO REAL"}
                          setDate={setInicioReal}
                          required={false}
                          data={inicioReal}
                          value={inicioReal.toString()}
                        />
                      ) : (
                        <DatePicker
                          label={"INICIO REAL"}
                          setDate={setInicioReal}
                          required={false}
                          data={new Date()}
                          value={new Date().toString()}
                        />
                      )}
                    </FormControl>
                    <FormControl w={{ sm: "100%", md: "232px" }}>
                      {fimReal ? (
                        <DatePicker
                          label={"FIM REAL"}
                          setDate={setFimReal}
                          required={false}
                          data={fimReal}
                          value={fimReal.toString()}
                        />
                      ) : (
                        <DatePicker
                          label={"FIM REAL"}
                          setDate={setFimReal}
                          required={false}
                          data={new Date()}
                          value={new Date().toString()}
                        />
                      )}
                    </FormControl>
                  </Flex>
                </Flex>
                <Flex
                  flexDirection={{ base: "column", md: "row" }}
                  w={"100%"}
                  gap={"16px"}
                >
                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="divisao">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        DIVISÃO
                      </Text>
                    </FormLabel>
                    <Select
                      required={true}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="divisaoId"
                      name="divisao"
                      width={"100%"}
                      placeholder={projeto.divisao}
                      onChange={(e) => {
                        setDivisao(+e.target.value);
                      }}
                    >
                      {getOptions(optionsDivisoes, projeto.divisao)}
                    </Select>
                  </FormControl>
                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="classificacao">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        CLASSIFICAÇÃO
                      </Text>
                    </FormLabel>
                    <Select
                      required={true}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="classificacaoId"
                      name="classificacao"
                      width={"100%"}
                      placeholder={projeto.classificacao}
                      onChange={(e) => {
                        setClassificacao(+e.target.value);
                      }}
                    >
                      {getOptions(optionsClassificacoes, projeto.classificacao)}
                    </Select>
                  </FormControl>
                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="tipo">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        TIPO
                      </Text>
                    </FormLabel>
                    <Select
                      required={true}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="tipoId"
                      name="tipo"
                      width={"100%"}
                      placeholder={projeto.tipo}
                      onChange={(e) => {
                        setTipo(+e.target.value);
                      }}
                    >
                      {getOptions(optionsTipoProjetos, projeto.tipo)}
                    </Select>
                  </FormControl>
                  <FormControl w={{ sm: "100%", md: "232px" }}>
                    <FormLabel htmlFor="gate">
                      <Text color="#949494" fontSize="12px" fontWeight="700">
                        GATE
                      </Text>
                    </FormLabel>
                    <Select
                      required={true}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      _placeholder={{ color: "#2D2926" }}
                      mt={"-6px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      id="gateId"
                      name="gate"
                      width={"100%"}
                      placeholder={projeto.gate}
                      onChange={(e) => {
                        setGate(+e.target.value);
                      }}
                    >
                      {getOptions(optionsGates, projeto.gate)}
                    </Select>
                  </FormControl>
                </Flex>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
            px={"24px"}
            pb={"24px"}
            pt={"0px"}
          >
            <Flex
              gap={"16px"}
              align={"center"}
              direction={{ base: "column", md: "row" }}
            >
              <Button
                // background="origem.300"
                variant="primary"
                color="red.500"
                onClick={() => handleCancelar()}
                h={"56px"}
                w={"206px"}
                borderRadius={"10px"}
                background={"white"}
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                fontSize={"18px"}
                fontWeight={"700"}
              >
                Cancelar
              </Button>
              <Button
                h={"56px"}
                w={"206px"}
                borderRadius={"10px"}
                background={"origem.300"}
                variant="primary"
                color="white"
                onClick={() => handleSalvar()}
                _hover={{
                  background: "origem.500",
                  transition: "all 0.4s",
                }}
                fontSize={"18px"}
                fontWeight={"700"}
              >
                Salvar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalConfiguracoes;
