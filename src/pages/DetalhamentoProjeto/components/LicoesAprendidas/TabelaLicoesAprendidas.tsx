import { AiFillEdit } from "react-icons/ai";

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  // Tfoot,
  IconButton,
  Td,
} from "@chakra-ui/react";
import { LicoesAprendidas } from "interfaces/Services";

interface EditProps {
  onEdit: (licao: LicoesAprendidas) => void;
  licoes: LicoesAprendidas[];
}

function TabelaLicoesAprendidas({ onEdit, licoes }: EditProps) {
  const tableData = licoes
    .sort((a, b) => a.id - b.id)
    .map((lessons) => (
      <Tr key={lessons.id_projeto}>
        <Td
          isNumeric
          style={{
            borderBottom: "1px solid #A7A7A7",
            borderRight: "1px solid #A7A7A7",
          }}
        >
          {lessons.id}
        </Td>
        <Td
          style={{
            borderBottom: "1px solid #A7A7A7",
            borderRight: "1px solid #A7A7A7",
          }}
        >
          {lessons.txt_licao_aprendida}
        </Td>
        <Td
          style={{
            borderBottom: "1px solid #A7A7A7",
            borderRight: "1px solid #A7A7A7",
          }}
        >
          {lessons.txt_acao}
        </Td>
        <Td
          style={{
            borderBottom: "1px solid #A7A7A7",
            borderRight: "1px solid #A7A7A7",
          }}
        >
          {new Date(lessons.dat_usu_create)
            .toLocaleString("pt-BR")
            .substring(0, 10)}
        </Td>
        <Td style={{ borderBottom: "1px solid #A7A7A7" }}>
          <IconButton
            aria-label="Plus sign"
            icon={<AiFillEdit />}
            background="white"
            variant="secondary"
            color="#2D2926"
            mr={2}
            isRound={true}
            size="sm"
            onClick={() => onEdit(lessons)}
          />
          {/* <IconButton
          aria-label="Plus sign"
          icon={<FaTrash />}
          background="white"
          variant="secondary"
          color="#F94144"
          mr={2}
          isRound={true}
          size="sm"
        /> */}

          {/* <EditaValorModal /> */}
        </Td>
      </Tr>
    ));

  return (
    <TableContainer mt={4} mb={3} ml={1}>
      <Table variant="unstyled" style={{ border: "1px solid #A7A7A7" }}>
        <Thead>
          <Tr background="origem.500" color="white">
            <Th>ID</Th>
            <Th>Lições Aprendidas</Th>
            <Th>Ações e Recomendações</Th>
            <Th>Data</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>{tableData}</Tbody>
        {/* <Tfoot>
          <Tr background="origem.200" color="white">
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Tfoot> */}
      </Table>
    </TableContainer>
  );
}

export default TabelaLicoesAprendidas;
