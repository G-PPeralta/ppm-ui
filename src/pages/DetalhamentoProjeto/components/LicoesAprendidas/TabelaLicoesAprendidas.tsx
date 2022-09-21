import { AiFillEdit } from "react-icons/ai";

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  IconButton,
  Td,
} from "@chakra-ui/react";
import { LicoesAprendidas } from "interfaces/Services";

interface EditProps {
  onEdit: (licao: LicoesAprendidas) => void;
  licoes: LicoesAprendidas[];
}

function TabelaLicoesAprendidas({ onEdit, licoes }: EditProps) {
  const tableData = licoes.map((lessons) => (
    <Tr key={lessons.id_projeto}>
      <Td isNumeric>{lessons.id}</Td>
      <Td>{lessons.txt_licao_aprendida}</Td>
      <Td>{lessons.txt_acao}</Td>
      <Td>{new Date(lessons.dat_usu_create).toLocaleString("pt-BR")}</Td>
      <Td>
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
      <Table variant="unstyled">
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
        <Tfoot>
          <Tr background="origem.200" color="white">
            <Th>Total</Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

export default TabelaLicoesAprendidas;
