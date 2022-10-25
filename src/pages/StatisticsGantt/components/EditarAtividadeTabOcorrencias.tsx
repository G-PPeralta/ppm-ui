import { useState } from "react";

import { Flex, Td, Text, Tr } from "@chakra-ui/react";

import FiltragemTabela from "components/FiltragemTabela";
import TabelaGenerica from "components/TabelaGenerica";

import ModalEditarOcorrencia from "./ModalEditarOcorrencia";

interface RefreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Props {
  registerForm: any;
  refreshState: RefreshState;
}

function EditarAtividadeTabOcorrencias({ registerForm, refreshState }: Props) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [tabelaFiltrada, setTabelaFiltrada] = useState<any[]>(
    registerForm.values.ocorrencias
  );

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const header = ["NOME DO CAMPO PERSONALIZADO", "HORAS", "AÇÕES"];
  const footer = [""];

  // const handleDeletar = (id: number, licao: string) => {
  //   toast.success(`${licao} abrir modal!`, {
  //     id: "toast-principal",
  //   });
  // };

  function Body() {
    return (
      <>
        {tabelaFiltrada.length ? (
          tabelaFiltrada
            .slice(from, to)
            .map((linhaTabela: any, index: number) => (
              <Tr key={index}>
                <Td textAlign={"start"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.nome_ocorrencia}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.horas}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Flex gap={2} align={"center"} justify={"center"}>
                    <ModalEditarOcorrencia
                      refreshState={refreshState}
                      idOcorrencia={linhaTabela.id}
                      linhaTabela={linhaTabela}
                      idAtividade={registerForm.values.id_atividade}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))
        ) : (
          <Tr>
            <Td colSpan={header.length} textAlign={"start"}>
              <Text fontSize="lg" fontWeight={500}>
                Não há dados
              </Text>
            </Td>
          </Tr>
        )}
      </>
    );
  }

  return (
    <Flex w={"100%"} direction={"column"} gap={2}>
      <FiltragemTabela
        dadosTabela={registerForm.values.ocorrencias}
        nomeLabel={"PESQUISAR"}
        placeholder={"Pesquisar"}
        setTabelaFiltrada={setTabelaFiltrada}
        propName={"nome_ocorrencia"}
        registerForm={registerForm}
      />
      <TabelaGenerica
        maxHeight={"352px"}
        data={tabelaFiltrada}
        header={header}
        fromTo={fromTo}
        footer={footer}
      >
        <Body />
      </TabelaGenerica>
    </Flex>
  );
}

export default EditarAtividadeTabOcorrencias;
