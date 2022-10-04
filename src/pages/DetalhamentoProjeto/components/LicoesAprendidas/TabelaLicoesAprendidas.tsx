import { MdModeEdit } from "react-icons/md";

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
    .map((lessons, index) => (
      <Tr key={index}>
        <Td
          isNumeric
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="48px"
          height={"56px"}
          textAlign={"center"}
        >
          {lessons.id}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="166px"
          height={"56px"}
        >
          {lessons.txt_licao_aprendida}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="112px"
          height={"56px"}
        >
          {new Date(lessons.dat_usu_create)
            .toLocaleString("pt-BR")
            .substring(0, 10)}
        </Td>
        <Td
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width="248px"
          height={"56px"}
        >
          {lessons.txt_acao}
        </Td>

        <Td style={{ borderBottom: "0.5px solid #A7A7A7" }}>
          <IconButton
            aria-label="Plus sign"
            icon={<MdModeEdit />}
            background="white"
            variant="secondary"
            color="#0047BB"
            mr={2}
            isRound={true}
            onClick={() => onEdit(lessons)}
            width={"18px"}
            height={"18px"}
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
      <Table variant="unstyled" style={{ border: "0.5px solid #A7A7A7" }}>
        <Thead>
          <Tr background="origem.500" color="white">
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
              width="36px"
              height={"56px"}
            >
              ID
            </Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            >
              Lições Aprendidas
            </Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
              textAlign={"center"}
            >
              Data
            </Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            >
              Ações e Recomendações
            </Th>
            <Th
              style={{
                borderBottom: "0.5px solid #A7A7A7",
                borderRight: "0.5px solid #A7A7A7",
              }}
            >
              Ações
            </Th>
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
