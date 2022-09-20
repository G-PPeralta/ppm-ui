import { FiChevronRight, FiPrinter } from "react-icons/fi";

import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export function ExpansiveTable() {
  const toggleTable = () => {};
  return (
    <Flex>
      <TableContainer mt={4} mb={3} ml={1}>
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
            <Tr backgroundColor={"blue"} color="white">
              <Th>Data</Th>
              <Th>BRT</Th>
              <Th>Serviço/Compra</Th>
              <Th>Fornecedor</Th>
              <Th>R$ Total</Th>
              <Th>R$ Previsto</Th>
              <Th>R$ Realizado</Th>
              <Th>% Gap</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr backgroundColor={"rgb(46, 105, 253)"} color="white">
              <Td>14/08/2022</Td>
              <Td>1</Td>
              <Td onClick={toggleTable}>
                <Flex alignItems={"center"} justifyContent="space-between">
                  Sonda Worker <FiChevronRight size={"18px"} />{" "}
                </Flex>
              </Td>
              <Td></Td>
              <Td>4</Td>
              <Td>4</Td>
              <Td>4</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td>1.1</Td>
              <Td>Mobilização/Desmobilização</Td>
              <Td></Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td>1.2</Td>
              <Td>DTM entre peças (até 10 KM)</Td>
              <Td></Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td>1.3</Td>
              <Td>Taxa Operando</Td>
              <Td></Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td>1.4</Td>
              <Td>Taxa aguardando com o pessoal</Td>
              <Td></Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td></Td>
            </Tr>
            <Tr backgroundColor={"rgb(46, 105, 253)"} color="white">
              <Td>14/08/2022</Td>
              <Td>1</Td>
              <Td>
                <Flex alignItems={"center"} justifyContent="space-between">
                  Sonda Worker <FiChevronRight size={"18px"} />
                </Flex>
              </Td>
              <Td></Td>
              <Td>4</Td>
              <Td>4</Td>
              <Td>4</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td>1.1</Td>
              <Td>Mobilização/Desmobilização</Td>
              <Td></Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td>1.2</Td>
              <Td>DTM entre peças (até 10 KM)</Td>
              <Td></Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td>1.3</Td>
              <Td>Taxa Operando</Td>
              <Td></Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Td></Td>
              <Td>1.4</Td>
              <Td>Taxa aguardando com o pessoal</Td>
              <Td></Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
