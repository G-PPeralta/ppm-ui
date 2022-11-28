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
                    <Th color={"white"} fontWeight={"bold"}>
                      {column}
                    </Th>
                  ))}
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data.map((row) => (
                  <Tr>
                    <Td>{row.id}</Td>
                    <Td>{row.nom_atividade}</Td>
                    <Td>{row.vlr_planejado}</Td>
                    <Td>{row.vlr_realizado}</Td>
                    <Td>{row.nome_responsavel}</Td>
                    <Td>{row.fase}</Td>
                    <Td>
                      {new Date(row.dat_fim_real) >
                      new Date(row.dat_fim_plan) ? (
                        <Td color="#F40606">Pendente</Td>
                      ) : (
                        <Td color="#059502">Concluído</Td>
                      )}
                    </Td>

                    {/* {row.map((cel) => (
                      <Td textColor={chengeColorCel(cel)}>{cel}</Td>
                    ))} */}
                  </Tr>
                ))}
            </Tbody>

            {total == true && (
              <>
                <Tfoot>
                  <Tr backgroundColor={"origem.500"} fontWeight={"bold"}>
                    <Th color={"white"}>Total</Th>
                    <Th color={"white"} w={"100%"}>
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
