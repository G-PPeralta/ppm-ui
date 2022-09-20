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

import { Licao } from "./LicoesAprendidasModal";

const mockLessons = [
  {
    id: 1,
    licoesAprendidas: "Lição 1",
    acoesRecomendacoes: "Ação de teste",
  },
  {
    id: 2,
    licoesAprendidas: "Lição 2",
    acoesRecomendacoes: "Ação de teste",
  },
  {
    id: 3,
    licoesAprendidas: "Lição 3",
    acoesRecomendacoes: "Ação de teste",
  },
  {
    id: 4,
    licoesAprendidas: "Lição 4",
    acoesRecomendacoes: "Ação de teste",
  },
];

interface EditProps {
  onEdit: (licao: Licao) => void;
}

function TabelaLicoesAprendidas({ onEdit }: EditProps) {
  const tableData = mockLessons.map((lessons) => (
    <Tr key={lessons.id}>
      <Td isNumeric>{lessons.id}</Td>
      <Td>{lessons.licoesAprendidas}</Td>
      <Td>{lessons.acoesRecomendacoes}</Td>
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
