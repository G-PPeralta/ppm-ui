import { useState } from "react";
import { FiTrash } from "react-icons/fi";

import { Flex, IconButton, Td, Text, Tr } from "@chakra-ui/react";

import TabelaGenerica from "components/TabelaGenerica";
interface Props {
  registerForm: any;
}

const data = [
  {
    id: 1,
    tarefa: "Tarefa 1",
    atividadeRelacionada: "Atividade 1",
    dataInicio: "01/01/2021",
    descricao: "Descrição 1",
    responsavel: "Responsável 1",
    status: "Status 1",
  },
  {
    id: 2,
    tarefa: "Tarefa 2",
    atividadeRelacionada: "Atividade 2",
    dataInicio: "01/01/2021",
    descricao: "Descrição 2",
    responsavel: "Responsável 2",
    status: "Status 2",
  },
  {
    id: 3,
    tarefa: "Tarefa 3",
    atividadeRelacionada: "Atividade 3",
    dataInicio: "01/01/2021",
    descricao: "Descrição 3",
    responsavel: "Responsável 3",
    status: "Status 3",
  },
  {
    id: 4,
    tarefa: "Tarefa 4",
    atividadeRelacionada: "Atividade 4",
    dataInicio: "01/01/2021",
    descricao: "Descrição 4",
    responsavel: "Responsável 4",
    status: "Status 4",
  },
  {
    id: 5,
    tarefa: "Tarefa 5",
    atividadeRelacionada: "Atividade 5",
    dataInicio: "01/01/2021",
    descricao: "Descrição 5",
    responsavel: "Responsável 5",
    status: "Status 5",
  },
  {
    id: 6,
    tarefa: "Tarefa 6",
    atividadeRelacionada: "Atividade 6",
    dataInicio: "01/01/2021",
    descricao: "Descrição 6",
    responsavel: "Responsável 6",
    status: "Status 6",
  },
  {
    id: 7,
    tarefa: "Tarefa 7",
    atividadeRelacionada: "Atividade 7",
    dataInicio: "01/01/2021",
    descricao: "Descrição 7",
    responsavel: "Responsável 7",
    status: "Status 7",
  },
  {
    id: 8,
    tarefa: "Tarefa 8",
    atividadeRelacionada: "Atividade 8",
    dataInicio: "01/01/2021",
    descricao: "Descrição 8",
    responsavel: "Responsável 8",
    status: "Status 8",
  },
  {
    id: 9,
    tarefa: "Tarefa 9",
    atividadeRelacionada: "Atividade 9",
    dataInicio: "01/01/2021",
    descricao: "Descrição 9",
    responsavel: "Responsável 9",
    status: "Status 9",
  },
  {
    id: 10,
    tarefa: "Tarefa 10",
    atividadeRelacionada: "Atividade 10",
    dataInicio: "01/01/2021",
    descricao: "Descrição 10",
    responsavel: "Responsável 10",
    status: "Status 10",
  },
  {
    id: 11,
    tarefa: "Tarefa 11",
    atividadeRelacionada: "Atividade 11",
    dataInicio: "01/01/2021",
    descricao: "Descrição 11",
    responsavel: "Responsável 11",
    status: "Status 11",
  },
];

function EditarAtividadeTabLicoesAprendidas({ registerForm }: Props) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const header = [
    "ID",
    "TAREFA",
    "ATIVIDADE RELACIONADA",
    "DATA",
    "DESCRIÇÃO",
    "RESPONSÁVEL",
    "STATUS",
    "AÇÕES",
  ];

  const handleDeletar = (id: number) => {
    // console.log("deletar", id);
  };

  function Body() {
    return (
      <>
        {data.length ? (
          data.slice(from, to).map((linhaTabela: any, index: number) => (
            <Tr key={index}>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{linhaTabela.id}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{linhaTabela.tarefa}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{linhaTabela.atividadeRelacionada}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{linhaTabela.dataInicio}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{linhaTabela.descricao}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{linhaTabela.responsavel}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{linhaTabela.status}</Text>
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
                    onClick={() => handleDeletar(linhaTabela.id)}
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
    <Flex w={"100%"} direction={"column"} gap={5}>
      <TabelaGenerica
        height={"352px"}
        data={data}
        header={header}
        fromTo={fromTo}
      >
        <Body />
      </TabelaGenerica>
    </Flex>
  );
}

export default EditarAtividadeTabLicoesAprendidas;
