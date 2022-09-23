import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Text,
} from "@chakra-ui/react";

import { getPriorizacoes } from "services/get/Priorizacoes";

import ModalDeletarPriorizacao from "./ModalDeletarPriorizacao";
import ModalEditarBeneficio from "./ModalEditarBeneficio";

export function TabelaPriorizacao() {
  const [pagAtual, setPagAtual] = useState(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const rowsPerPage = 5;
  const [data, setData] = useState<any[]>([]);
  // const [loading, setLoading] = useState(false);

  const getData = async () => {
    const priorizacao = await getPriorizacoes();
    setData(priorizacao.data);
  };

  console.log("data", data);

  useEffect(() => {
    getData();
  }, []);

  const totalRegs = data.length;
  const maxPage = Math.ceil(totalRegs / rowsPerPage);

  const paginate = (pag: number) => {
    setPagAtual(pag);

    const x = (pag - 1) * rowsPerPage;
    const y = (pag - 1) * rowsPerPage + rowsPerPage;
    setFrom(x);
    setTo(y);
  };

  const advance = () => {
    if (pagAtual == maxPage) {
      return;
    }

    const _pag = pagAtual + 1;

    paginate(_pag);
  };

  const back = () => {
    if (pagAtual == 1) {
      return;
    }
    const _pag = pagAtual - 1;
    paginate(_pag);
  };

  const tableData = data.slice(from, to).map((prio) => (
    <Tr key={prio.id}>
      <Td>{prio.id}</Td>
      <Td width={"600px"}>{prio.nom_ranking}</Td>
      <Td textAlign={"center"}>3</Td>
      <Td textAlign={"center"}>
        <ModalEditarBeneficio />
        <ModalDeletarPriorizacao />
      </Td>
    </Tr>
  ));

  return (
    <div>
      <Flex direction={"column"}>
        <TableContainer mt={4} mb={3} ml={1}>
          <Table variant="unstyled">
            <Thead>
              <Tr background="origem.500" color="white">
                <Th>ID</Th>
                <Th>Priorizações</Th>
                <Th textAlign={"center"}>Atividades</Th>
                <Th textAlign={"center"}>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>{tableData}</Tbody>
          </Table>
        </TableContainer>

        <Flex justifyContent={"center"}>
          <Flex
            width={"300px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <IconButton
              aria-label=""
              icon={<FiChevronsLeft />}
              onClick={() => paginate(1)}
            />
            <IconButton aria-label="" icon={<FiChevronLeft onClick={back} />} />

            <Text>Página atual: {pagAtual}</Text>

            <IconButton
              aria-label=""
              icon={<FiChevronRight />}
              onClick={advance}
            />
            <IconButton
              aria-label=""
              icon={<FiChevronsRight />}
              onClick={() => paginate(maxPage)}
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
