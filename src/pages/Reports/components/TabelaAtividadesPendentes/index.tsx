//  CRIADO EM: 7/2022
//  AUTOR: Yolanda Ferreira.
//  DESCRIÇÃO DO ARQUIVO: Tabel atividades pendentes

import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IDadosAtividades } from "interfaces/TabelaAtividades";

type Props = {
  data: IDadosAtividades[];
  total?: boolean;
};

const columnNames = [
  "id",
  "Atividade",
  "Previsto",
  "Realizado",
  "Responsável",
  "Fase do projeto",
  "Status",
];

export function TabelaAtividadesPendentes({ data, total }: Props) {
  return (
    <>
      <Flex direction={"column"}>
        <TableContainer w={"100%"} borderTopRadius={"10px"}>
          <Table variant="striped" colorScheme={"strippedGray"}>
            <Thead background={"origem.500"}>
              <Tr>
                {columnNames &&
                  columnNames.map((column) => (
                    <Th textAlign={"center"} color={"white"}>
                      {column}
                    </Th>
                  ))}
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data.map((row) => (
                  <Tr>
                    <Td textAlign={"center"} fontWeight={"semibold"}>
                      {row.id}
                    </Td>
                    <Td textAlign={"center"} fontWeight={"semibold"}>
                      {row.nom_atividade}
                    </Td>
                    <Td textAlign={"center"} fontWeight={"semibold"}>
                      {row.vlr_planejado}
                    </Td>
                    <Td textAlign={"center"} fontWeight={"semibold"}>
                      {row.vlr_realizado}
                    </Td>
                    <Td textAlign={"center"} fontWeight={"semibold"}>
                      {row.nome_responsavel}
                    </Td>
                    <Td textAlign={"center"} fontWeight={"semibold"}>
                      {row.fase}
                    </Td>
                    <Td textAlign={"center"} fontWeight={"semibold"}>
                      {new Date(row.dat_fim_real) >
                      new Date(row.dat_fim_plan) ? (
                        <Td
                          textAlign={"center"}
                          fontWeight={"semibold"}
                          color="#F40606"
                        >
                          Pendente
                        </Td>
                      ) : (
                        <Td
                          textAlign={"center"}
                          fontWeight={"semibold"}
                          color="#059502"
                        >
                          Concluído
                        </Td>
                      )}
                    </Td>
                  </Tr>
                ))}
            </Tbody>

            {total == true && (
              <>
                <Tfoot>
                  <Tr backgroundColor={"origem.500"} fontWeight={"bold"}>
                    <Th color={"white"}>Total</Th>
                    <Th textAlign={"center"} color={"white"} w={"100%"}>
                      {data.length > 1
                        ? `${data.length} atividades`
                        : `${data.length} atividade`}
                    </Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Tfoot>
              </>
            )}
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
