import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";

import { Flex, IconButton, Td, Text, Tr } from "@chakra-ui/react";

import FiltragemTabela from "components/FiltragemTabela";
import TabelaGenerica from "components/TabelaGenerica";

import ModalAdicionarLicaoAprendida from "./ModalAdicionarLicaoAprendida";
interface Props {
  registerForm: any;
}

function EditarAtividadeTabLicoesAprendidas({ registerForm }: Props) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [tabelaFiltrada, setTabelaFiltrada] = useState<any[]>(
    registerForm.values.licoes_aprendidas
  );

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

  const handleDeletar = (id: number, licao: string) => {
    toast.success(`${licao} deletada com sucesso!`, {
      id: "toast-principal",
    });
  };

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
                  <Text>{linhaTabela.data}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.acao_e_recomendacao}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Flex gap={2} align={"center"} justify={"center"}>
                    {/* <ModalEditar
                      refreshState={refreshState}
                      linhaTabela={linhaTabela}
                      optionsSelects={optionsSelects}
                    /> */}
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
                          linhaTabela.licao_aprendida
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

  console.log("registerForm", registerForm.values);

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
        <ModalAdicionarLicaoAprendida id={registerForm.values.id_atividade} />
      </Flex>
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

export default EditarAtividadeTabLicoesAprendidas;
