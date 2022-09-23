import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Tooltip,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface TableProps {
  data: any[];
}

export function TabelaLookahead(props: TableProps) {
  const { data } = props;
  const [pagAtual, setPagAtual] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  // const brl = Intl.NumberFormat("pt-BR", {
  //   style: "currency",
  //   currency: "BRL",
  // });

  // const total = data.reduce(
  //   (accumulator, object) => accumulator + +object.valorTotalPrevisto,
  //   0
  // );

  const rowsPerPage = 5;

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

  const tableData = data.slice(from, to).map((projeto, key) => (
    <Tr key={key}>
      <Td isNumeric>{projeto.id}</Td>
      <Td>
        <Link to={`/lookahead-detalhe/${projeto.id}`}>
          <Text>
            {projeto.projeto.length > 15 ? (
              <Tooltip label={projeto.projeto} aria-label="">
                {projeto.projeto.substring(0, 12).toUpperCase() + "..."}
              </Tooltip>
            ) : (
              projeto.projeto.toUpperCase()
            )}
          </Text>
        </Link>
      </Td>

      <Td>{projeto.descricao}</Td>
    </Tr>
  ));

  return (
    <div className="table-fix">
      <TableContainer mt={4} mb={3} ml={1}>
        <Table variant="unstyled">
          <Thead>
            <Tr background="origem.500" color="white">
              <Th>Item</Th>
              <Th>Projeto</Th>
              <Th>Descrição e Justificativas</Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
          <Tfoot>
            <Tr background="origem.200" color="white">
              <Th>Total</Th>
              <Th>{data.length} Projetos</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
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
    </div>
  );
}
