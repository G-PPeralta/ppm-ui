import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";

import { Flex, IconButton, Td, Text, Tr } from "@chakra-ui/react";

import FiltragemTabela from "components/FiltragemTabela";
import TabelaGenerica from "components/TabelaGenerica";

import { formatDate } from "utils/formatDate";

import { deleteLicaoAprendida } from "services/delete/Estatisticas";

import ModalAdicionarLicaoAprendida from "./ModalAdicionarLicaoAprendida";
import ModalEditarLicaoAprendida from "./ModalEditarLicaoAprendida";

interface RefreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Props {
  registerForm: any;
  refreshState: RefreshState;
}

function EditarAtividadeTabLicoesAprendidas({
  registerForm,
  refreshState,
}: Props) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [tabelaFiltrada, setTabelaFiltrada] = useState<any[]>(
    registerForm.values.licoes_aprendidas
  );

  const { refresh, setRefresh } = refreshState;

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const header = [
    "ID",
    "LIÇÃO APRENDIDA",
    "DATA",
    "AÇÕES E RECOMENDAÇÕES",
    "AÇÕES",
  ];

  const footer = ["TOTAL", `${tabelaFiltrada.length} lições aprendidas`];

  const handleDeletar = (idLicao: number, idAtividade: number) => {
    deleteLicaoAprendida(idAtividade, idLicao);
    setRefresh(!refresh);
  };

  useEffect(() => {
    setTabelaFiltrada(registerForm.values.licoes_aprendidas);
  }, [registerForm.values.licoes_aprendidas]);

  // console.log("registerForm", registerForm.values);

  function Body() {
    return (
      <>
        {tabelaFiltrada.length ? (
          tabelaFiltrada
            .slice(from, to)
            .map((linhaTabela: any, index: number) => (
              <Tr key={index}>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.id}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.licao_aprendida}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{formatDate(linhaTabela.data)}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.acao_e_recomendacao}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Flex gap={2} align={"center"} justify={"center"}>
                    <ModalEditarLicaoAprendida
                      refreshState={refreshState}
                      idLicao={linhaTabela.id}
                      linhaTabela={linhaTabela}
                      idAtividade={registerForm.values.id_atividade}
                    />
                    <IconButton
                      aria-label="Botão de Editar"
                      icon={<FiTrash />}
                      borderRadius={"10px"}
                      background={"transparent"}
                      color={"red.500"}
                      _hover={{
                        background: "red.500",
                        transition: "all 0.4s",
                        color: "white",
                      }}
                      onClick={() =>
                        handleDeletar(
                          linhaTabela.id,
                          registerForm.values.id_atividade
                        )
                      }
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
      <Flex justify={"space-between"} align={"end"}>
        <FiltragemTabela
          dadosTabela={registerForm.values.licoes_aprendidas}
          nomeLabel={"Lição Aprendida"}
          nomeLabelData={"Data"}
          placeholder={"Digite a lição aprendida"}
          setTabelaFiltrada={setTabelaFiltrada}
          propName={"licao_aprendida"}
          registerForm={registerForm}
          filtrarData={true}
        />
        <ModalAdicionarLicaoAprendida
          id={registerForm.values.id_atividade}
          refreshState={refreshState}
        />
      </Flex>
      <Flex flex={1} w={"100%"}>
        <TabelaGenerica
          // maxHeight={"352px"}
          data={tabelaFiltrada}
          header={header}
          fromTo={fromTo}
          footer={footer}
        >
          <Body />
        </TabelaGenerica>
      </Flex>
    </Flex>
  );
}

export default EditarAtividadeTabLicoesAprendidas;
