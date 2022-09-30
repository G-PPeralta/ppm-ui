import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export interface TableData {
  columnNames: string[];
  rows: Array<string>[];
}

type Props = {
  data: TableData;
  total?: boolean;
};

export function GenericTable({ data, total }: Props) {
  return (
    <>
      <Flex direction={"column"}>
        <TableContainer w={"100%}"}>
          <Table>
            <Thead backgroundColor={"origem.300"}>
              <Tr>
                {data.columnNames &&
                  data.columnNames.map((column) => (
                    <Th color={"white"} fontWeight={"bold"}>
                      {column}
                    </Th>
                  ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.rows &&
                data.rows.map((row) => (
                  <Tr>
                    {row.map((cel) => (
                      <Td>{cel}</Td>
                    ))}
                  </Tr>
                ))}
            </Tbody>
          </Table>
          {total == true && (
            <Table>
              <Thead>
                <Tr backgroundColor={"origem.200"} fontWeight={"bold"}>
                  <Th color={"white"}>Total</Th>
                  <Th color={"white"} w={"100%"}>
                    {data.rows.length}
                  </Th>
                </Tr>
              </Thead>
            </Table>
          )}
        </TableContainer>
      </Flex>
    </>
  );
}
