import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";

import { Flex, IconButton, Td, Text, Tr } from "@chakra-ui/react";

import FiltragemTabela from "components/FiltragemTabela";
import TabelaGenerica from "components/TabelaGenerica";
interface Props {
  registerForm: any;
}

const data = [
  {
    id: 1,
    licaoAprendida: "Lição 1",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 1 e Recomendação 1",
  },
  {
    id: 2,
    licaoAprendida: "Lição 2",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 2 e Recomendação 2",
  },
  {
    id: 3,
    licaoAprendida: "Lição 3",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 3 e Recomendação 3",
  },
  {
    id: 4,
    licaoAprendida: "Lição 4",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 4 e Recomendação 4",
  },
  {
    id: 5,
    licaoAprendida: "Lição 5",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 5 e Recomendação 5",
  },
  {
    id: 6,
    licaoAprendida: "Lição 6",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 6 e Recomendação 6",
  },
  {
    id: 7,
    licaoAprendida: "Lição 7",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 7 e Recomendação 7",
  },
  {
    id: 8,
    licaoAprendida: "Lição 8",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 8 e Recomendação 8",
  },
  {
    id: 9,
    licaoAprendida: "Lição 9",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 9 e Recomendação 9",
  },
  {
    id: 10,
    licaoAprendida: "Lição 10",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 10 e Recomendação 10",
  },
  {
    id: 11,
    licaoAprendida: "Lição 11",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 11 e Recomendação 11",
  },
  {
    id: 12,
    licaoAprendida: "Lição 12",
    data: "01/01/2021",
    acaoERecomendacao: "Ação 12 e Recomendação 12",
  },
];

function EditarAtividadeTabLicoesAprendidas({ registerForm }: Props) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [tabelaFiltrada, setTabelaFiltrada] = useState<any[]>(data);

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

  const handleDeletar = (id: number, licao: string) => {
    toast.success(`${licao} deletada com sucesso!`, {
      id: "toast-principal",
    });
  };

  // console.log("tabelaFiltrada", tabelaFiltrada);

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
                  <Text>{linhaTabela.licaoAprendida}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.data}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.acaoERecomendacao}</Text>
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
                          linhaTabela.licaoAprendida
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
      <FiltragemTabela
        dadosTabela={data}
        nomeLabel={"Lição Aprendida"}
        placeholder={"Digite a lição aprendida"}
        setTabelaFiltrada={setTabelaFiltrada}
        propName={"licaoAprendida"}
      />
      <TabelaGenerica
        maxHeight={"352px"}
        data={tabelaFiltrada}
        header={header}
        fromTo={fromTo}
      >
        <Body />
      </TabelaGenerica>
    </Flex>
  );
}

export default EditarAtividadeTabLicoesAprendidas;
