import React, { useState } from "react";
import {
  FiArrowDown,
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
  Icon,
} from "@chakra-ui/react";
import { Budget } from "interfaces/Budgets";
import "../budgets.css";

interface TableProps {
  data: Budget[];
}

export function TabelaBudgets(props: TableProps) {
  const { data } = props;
  const [pagAtual, setPagAtual] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const total = data.length;
  const planejado = data.reduce((i, value) => i + value.planejado, 0);
  const realizado = data.reduce((i, value) => i + value.realizado, 0);

  const rowsPerPage = 5;
  const totalRegs = data.length;
  const maxPage = Math.ceil(totalRegs / rowsPerPage);

  const brl = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

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

  const toggleAcordion = (id: number) => {
    const elements = document.getElementsByClassName("item-" + id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("hide");
    }
  };

  const tableData = data.slice(from, to).map((budget, key) => (
    <>
      <Tr key={budget.id}>
        <Td>
          {budget.filhos?.length && (
            <Icon
              className="cursor"
              onClick={() => toggleAcordion(key)}
              as={FiArrowDown}
            ></Icon>
          )}
          {budget.item}
        </Td>
        <Td>
          <Text>{budget.projeto.nome}</Text>
        </Td>
        <Td>{brl.format(budget.planejado)}</Td>
        <Td>{brl.format(budget.realizado)}</Td>
        <Td align="center">{budget.gap}%</Td>
        <Td>{budget.descricao}</Td>
      </Tr>

      {budget.filhos &&
        budget.filhos.map((d) => (
          <Tr className={"hide item-" + key} key={d.id}>
            <Td>{d.item}</Td>
            <Td>
              <Link to={`/budget/detail/${d.id}`}>
                <Text color="blue">{d.projeto.nome}</Text>
              </Link>
            </Td>
            <Td>{brl.format(d.planejado)}</Td>
            <Td>{brl.format(d.realizado)}</Td>
            <Td align="center">{d.gap}%</Td>
            <Td>{d.descricao}</Td>
          </Tr>
        ))}
    </>
  ));

  return (
    <>
      <TableContainer mt={4} mb={3} ml={1}>
        <Table variant="unstyled">
          <Thead>
            <Tr background="origem.500" color="white">
              <Th width="50">item</Th>
              <Th>Projeto</Th>
              <Th>Planejado</Th>
              <Th>Realizado</Th>
              <Th>Gap%</Th>
              <Th>Descrição e Justificativa</Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
          <Tfoot>
            <Tr background="origem.200" color="white">
              <Th>Total</Th>
              <Th>{total} Projetos</Th>
              <Th>{brl.format(planejado)}</Th>
              <Th>{brl.format(realizado)}</Th>
              <Th></Th>
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
    </>
  );
}
