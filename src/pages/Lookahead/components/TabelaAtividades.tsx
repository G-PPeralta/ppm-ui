import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FiPrinter } from "react-icons/fi";

// const objAtividades = [
//   {
//     horario: "01:00",
//     data: "22/08/2022",
//     atividade: "Queima de Gás",
//     ferramentas: "Chave de Fenda",
//     servico: "Chave de Fenda",
//   },
//   {
//     horario: "05:00",
//     data: "23/08/2022",
//     atividade: "Queima de Gás",
//     ferramentas: "Chave de Fenda",
//     servico: "Chave de Fenda",
//   },
// ];

export function TabelaAtividades() {
  // const horarios = Array(24)
  //   .fill(0)
  //   .map((_, i) => {
  //     return ("0" + i + ": 0" + 60 * 0).replace(/\d(\d\d)/g, "$1");
  //   });
  return (
    <Flex>
      <TableContainer mt={4} mb={3} ml={1} width="100%">
        <Table variant="unstyled" size={"sm"}>
          <Thead>
            <Tr backgroundColor={"blue"} color="white">
              <Th colSpan={6} borderTopLeftRadius="10px">
                Atividade
              </Th>
              <Th borderTopRightRadius={"10px"} colSpan={2}>
                Imprimir
                <IconButton
                  color={"white"}
                  backgroundColor="transparent"
                  aria-label="imprimir"
                  icon={<FiPrinter />}
                />
              </Th>
            </Tr>
            <Tr backgroundColor={"rgb(46, 105, 253)"} color="white">
              <Th>BRT</Th>
              <Th>22/08</Th>
              <Th>23/08</Th>
              <Th>24/08</Th>
              <Th>25/08</Th>
              <Th>26/08</Th>
              <Th>27/08</Th>
              <Th>28/08</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1:00</Td>
              <Td>
                Queima de gás <br />
                Chave de fenda
              </Td>
              <Td>Queima de gás</Td>
              <Td>Queima de gás</Td>
              <Td>Queima de gás</Td>
              <Td>Queima de gás</Td>
              <Td>Queima de gás</Td>
              <Td>Queima de gás</Td>
            </Tr>
            <Tr backgroundColor="#F9F9F9">
              <Td>2:00</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td>3:00</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr backgroundColor="#F9F9F9">
              <Td>4:00</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td>5:00</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr backgroundColor="#F9F9F9">
              <Td>6:00</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td>7:00</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr backgroundColor="#F9F9F9">
              <Td>8:00</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td>9:00</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr backgroundColor="#F9F9F9">
              <Td>10:00</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr backgroundColor={"blue"} color="white">
              <Td>Total</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
