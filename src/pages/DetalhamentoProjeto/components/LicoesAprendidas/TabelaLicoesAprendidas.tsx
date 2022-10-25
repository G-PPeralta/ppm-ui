import { useState } from "react";
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
  Flex,
} from "@chakra-ui/react";
import { LicoesAprendidas } from "interfaces/Services";

import PaginacaoTabela from "components/PaginacaoTabela";

interface EditProps {
  onEdit: (licao: LicoesAprendidas) => void;
  licoes: LicoesAprendidas[];
}

function TabelaLicoesAprendidas({ onEdit, licoes }: EditProps) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  // console.log({ licoes });

  const tableData = licoes
    .sort((a, b) => a.id - b.id)
    .map((lessons, index) => (
      <Tr key={index}>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {lessons.id}
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {lessons.licao_aprendida}
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {new Date(lessons.data).toLocaleString("pt-BR").substring(0, 10)}
        </Td>
        <Td textAlign={"center"} fontWeight={"semibold"}>
          {lessons.acao_e_recomendacao}
        </Td>

        <Td>
          <IconButton
            aria-label="Plus sign"
            icon={<MdModeEdit />}
            backgroundColor={"transparent"}
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
    <Flex direction={"column"} w={"100%"}>
      <Flex direction={"column"} flex={1}>
        <TableContainer
          mt={4}
          mb={3}
          borderRadius={"10px"}
          overflowX={"scroll"}
        >
          <Table variant="striped" colorScheme={"strippedGray"}>
            <Thead>
              <Tr background="origem.500">
                <Th color="white" textAlign={"center"}>
                  ID
                </Th>
                <Th color="white" textAlign={"center"}>
                  Lições Aprendidas
                </Th>
                <Th color="white" textAlign={"center"}>
                  Data
                </Th>
                <Th color="white" textAlign={"center"}>
                  Ações e Recomendações
                </Th>
                <Th color="white" textAlign={"center"}>
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
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
      </Flex>
      <PaginacaoTabela data={licoes} fromTo={fromTo} />
    </Flex>
  );
}

export default TabelaLicoesAprendidas;
