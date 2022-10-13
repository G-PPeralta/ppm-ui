import { useEffect, useState } from "react";
import {
  // FiArrowDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

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
  Flex,
  IconButton,
  Select,
  // Icon,
} from "@chakra-ui/react";
import { AtividadesLookahead } from "interfaces/lookahead";

interface TableProps {
  data: AtividadesLookahead[];
}

export function TabelaLookahead(props: TableProps) {
  const { data } = props;
  const [pagAtual, setPagAtual] = useState(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [perPage, setPerPage] = useState<number>(5);

  const total = data.length;
  // const planejado = data.reduce((i, value) => i + value.planejado, 0);
  // const realizado = data.reduce((i, value) => i + value.realizado, 0);

  const totalRegs = data.length;
  const maxPage = Math.ceil(totalRegs / perPage);
  const paginate = (pag: number) => {
    setPagAtual(pag);

    const x = (pag - 1) * perPage;
    const y = (pag - 1) * perPage + perPage;
    setFrom(x);
    setTo(y);
  };

  const changePerPage = (value: number) => {
    setPerPage(value);
    const x = perPage;
    const y = perPage + perPage;
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

  useEffect(() => {
    paginate(pagAtual);
  }, [from, to]);

  const tableData = data.slice(from, to).map((act, key) => (
    <>
      <Tr key={key}>
        <Td>
          {/* {budget.filhos && (
            <Icon
              className="cursor"
              onClick={() => toggleAcordion(key)}
              as={FiArrowDown}
            ></Icon>
          )} */}
          {act.id}
        </Td>
        <Td>
          <Link to={`/lookahead-detalhe/${act.id}`}>
            <Text color="blue">{act.nom_atividade}</Text>
          </Link>
        </Td>
        <Td> - </Td>
      </Tr>

      {/* {budget.filhos &&
        budget.filhos.map((d) => (
          <Tr className={"hide item-" + key} key={d.id}>
            <Td>{d.item}</Td>
            <Td>
              <Link to={`/budget/detail/${d.id}`}>
                <Text color="blue">{d.projeto.nome}</Text>
              </Link>
            </Td>
            <Td>{d.descricao}</Td>
          </Tr>
        ))} */}
    </>
  ));

  return (
    <>
      <Flex direction="column" width="100%">
        <TableContainer mt={4} mb={3}>
          <Table variant="unstyled" width="100%">
            <Thead>
              <Tr background="origem.500" color="white">
                <Th>item</Th>
                <Th>Projeto</Th>
                <Th>Descrição e Justificativa</Th>
              </Tr>
            </Thead>
            <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
            <Tfoot>
              <Tr background="origem.200" color="white">
                <Th>Total</Th>
                <Th>{total} Projetos</Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <Flex justifyContent="end">
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text>Per page</Text>
            <Select
              width={100}
              marginLeft="10px"
              marginRight="15px"
              onChange={(e) => changePerPage(+e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Select>

            <Text>
              {pagAtual} - {perPage} of {data.length}{" "}
            </Text>

            <IconButton
              bgColor="#FFFF"
              marginLeft="10px"
              marginRight="5px"
              aria-label=""
              icon={<FiChevronsLeft />}
              onClick={() => paginate(1)}
            />

            <IconButton
              bgColor="#FFFF"
              marginLeft="5px"
              marginRight="5px"
              aria-label=""
              icon={<FiChevronLeft onClick={back} />}
            />

            {/* <Text>Página atual: {pagAtual}</Text> */}

            <IconButton
              bgColor="#FFFF"
              marginLeft="5px"
              marginRight="5px"
              aria-label=""
              icon={<FiChevronRight />}
              onClick={advance}
            />
            <IconButton
              bgColor="#FFFF"
              marginLeft="5px"
              marginRight="5px"
              aria-label=""
              icon={<FiChevronsRight />}
              onClick={() => paginate(maxPage)}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
