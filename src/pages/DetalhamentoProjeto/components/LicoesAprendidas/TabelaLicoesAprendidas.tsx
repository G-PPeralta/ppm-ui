//  CRIADO EM: 09/2022
//  AUTOR: Gabriel Peralta.
//  DESCRIÇÃO DO ARQUIVO: Tabela todas as lições aprendidas.

import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  IconButton,
  Td,
  Flex,
} from "@chakra-ui/react";
import { LicoesAprendidasNew } from "interfaces/Services";

import PaginacaoTabela from "components/PaginacaoTabela";

import ModalDeletarLicao from "./BotaoDeletarLicao";

interface EditProps {
  onEdit: (licao: LicoesAprendidasNew) => void;
  licoes: LicoesAprendidasNew[];
  setRender: Function;
  render: boolean;
}

function TabelaLicoesAprendidas({
  onEdit,
  licoes,
  setRender,
  render,
}: EditProps) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  function Body() {
    return (
      <>
        {licoes.length > 0 ? (
          licoes
            .sort((a, b) => a.id - b.id)
            .slice(from, to)
            .map((lessons: LicoesAprendidasNew, index: number) => (
              <Tr key={index}>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {lessons.id}
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {lessons.licao_aprendida}
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {new Date(lessons.data)
                    .toLocaleString("pt-BR")
                    .substring(0, 10)}
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {lessons.acao_e_recomendacao}
                </Td>

                <Td textAlign={"center"}>
                  <IconButton
                    aria-label="Plus sign"
                    icon={<MdModeEdit />}
                    backgroundColor={"transparent"}
                    variant="secondary"
                    color="origem.500"
                    _hover={{
                      background: "origem.500",
                      color: "white",
                      transition: "all 0.4s",
                    }}
                    onClick={() => onEdit(lessons)}
                  />
                  <ModalDeletarLicao
                    id={lessons.id}
                    newRender={() => setRender(!render)}
                  />
                </Td>
              </Tr>
            ))
        ) : (
          <Tr>
            <Td textAlign={"start"} fontWeight={"semibold"}>
              Não há dados
            </Td>
          </Tr>
        )}
      </>
    );
  }

  return (
    <Flex direction={"column"} w={"100%"}>
      <Flex direction={"column"} flex={1}>
        <TableContainer
          mt={4}
          mb={3}
          borderRadius={"10px"}
          overflowX={"scroll"}
        >
          <Table variant="striped" colorScheme={"strippedGray"}>
            <Thead>
              <Tr background="origem.500">
                <Th color="white" textAlign={"center"}>
                  ID
                </Th>
                <Th color="white" textAlign={"center"}>
                  Lições Aprendidas
                </Th>
                <Th color="white" textAlign={"center"}>
                  Data
                </Th>
                <Th color="white" textAlign={"center"}>
                  Ações e Recomendações
                </Th>
                <Th color="white" textAlign={"center"}>
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody scrollBehavior={"smooth"}>{<Body />}</Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <PaginacaoTabela data={licoes} fromTo={fromTo} />
    </Flex>
  );
}

export default TabelaLicoesAprendidas;
