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

import { getOpcoesRankings } from "services/get/Priorizacoes";

import ModalDeletarBeneficio from "./DeletarBeneficio";
import ModalEditarBeneficio from "./EditarBeneficio";

export function TabelaBeneficio() {
  const [pagAtual, setPagAtual] = useState(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const rowsPerPage = 5;
  const [data, setData] = useState<any[]>([]);
  // const [loading, setLoading] = useState(false);

  const getData = async () => {
    const priorizacao = await getOpcoesRankings(1);
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

  const sortData = data.sort((a: any, b: any) => a.id - b.id);
  console.log("sortData", sortData);

  const tableData = sortData.slice(from, to).map((bene) => (
    <Tr key={bene.id}>
      <Td>{bene.id}</Td>
      <Td width={"600px"}>{bene.nom_opcao}</Td>
      <Td textAlign={"center"}>3</Td>
      <Td textAlign={"center"}>
        <ModalEditarBeneficio />
        <ModalDeletarBeneficio />
      </Td>
    </Tr>
  ));

  return (
    <div>
      <Flex direction={"column"}>
        <TableContainer mt={6} mb={1}>
          <Table variant="unstyled">
            <Thead>
              <Tr background="origem.500" color="white">
                <Th>ID</Th>
                <Th>Benefícios</Th>
                <Th textAlign={"center"}>Notas</Th>
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
