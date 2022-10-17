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
  function chengeColorCel(value: string) {
    switch (value) {
      case "Concluído":
        return "#059502";
        break;
      case "Pendente":
        return "#F40606";
        break;
      default:
        return "gray.800";
    }
  }

  return (
    <>
      <Flex direction={"column"}>
        <TableContainer w={"100%"} borderTopRadius={"10px"}>
          <Table variant="striped" colorScheme={"strippedGray"}>
            <Thead background={"origem.500"}>
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
                      <Td textColor={chengeColorCel(cel)}>{cel}</Td>
                    ))}
                  </Tr>
                ))}
            </Tbody>
          </Table>
          {total == true && (
            <Table>
              <Thead>
                <Tr backgroundColor={"origem.500"} fontWeight={"bold"}>
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
