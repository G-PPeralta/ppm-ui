//  CRIADO EM: 8/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Tab Ocorrencias em modal

import { useEffect, useState } from "react";

import { Flex, Td, Text, Tr } from "@chakra-ui/react";

import FiltragemTabela from "components/FiltragemTabela";
import TabelaGenerica from "components/TabelaGenerica";

import { formatMinutesToHHmm } from "utils/formatDate";

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

  useEffect(() => {
    setTabelaFiltrada(registerForm.values.ocorrencias);
  }, [registerForm.values.ocorrencias]);

  function Body() {
    return (
      <>
        {tabelaFiltrada.length ? (
          tabelaFiltrada
            .slice(from, to)
            .map((linhaTabela: any, index: number) => (
              <Tr key={index}>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.dsc_ocorrencia}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{formatMinutesToHHmm(linhaTabela.impacto)}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Flex gap={2} align={"center"} justify={"center"}>
                    <ModalEditarOcorrencia
                      refreshState={refreshState}
                      linhaTabela={linhaTabela}
                      idAtividade={registerForm.values.id_atividade}
                      index={index}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))
        ) : (
          <Tr>
            <Td colSpan={header.length} textAlign={"start"}>
              <Text textAlign={"start"} fontWeight={"semibold"}>
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
        nomeLabelData={"Data"}
        placeholder={"Pesquisar"}
        setTabelaFiltrada={setTabelaFiltrada}
        propName={"dsc_ocorrencia"}
        registerForm={registerForm}
        filtrarData={true}
      />
      <TabelaGenerica
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
