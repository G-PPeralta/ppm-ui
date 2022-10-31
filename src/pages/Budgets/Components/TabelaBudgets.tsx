import React, { useState } from "react";
import { FiArrowDown } from "react-icons/fi";
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
  Icon,
} from "@chakra-ui/react";
import { Budget } from "interfaces/Budgets";

import "../budgets.css";
import PaginacaoTabela from "components/PaginacaoTabela";
import Empty from "components/TableEmpty/empty";

interface TableProps {
  data: Budget[] | undefined;
}

export function TabelaBudgets(props: TableProps) {
  const { data } = props;
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const total = data?.length;
  const planejado = data?.reduce((i, value) => i + value.planejado, 0) || 0;
  const realizado = data?.reduce((i, value) => i + value.realizado, 0) || 0;

  const brl = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const toggleAcordion = (id: number) => {
    const elements = document.getElementsByClassName("item-" + id);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("hide");
    }
  };

  const tableData = data?.slice(from, to).map((budget, key) => (
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
        <Td textAlign={"center"}>
          <Text>{budget.projeto.nome}</Text>
        </Td>
        <Td textAlign={"center"}>{brl.format(budget.planejado)}</Td>
        <Td textAlign={"center"}>{brl.format(budget.realizado)}</Td>
        <Td textAlign={"center"}>{budget.gap}%</Td>
        {/* <Td>{budget.descricao}</Td> */}
      </Tr>

      {budget.filhos &&
        budget.filhos.map((d) => (
          <Tr className={"hide item-" + key} key={d.id}>
            <Td textAlign={"start"}>{d.item}</Td>
            <Td textAlign={"center"}>
              <Link to={`/budget/detail/${d.id}`}>
                <Text color="blue">{d.projeto.nome}</Text>
              </Link>
            </Td>
            <Td textAlign={"center"}>{brl.format(d.planejado)}</Td>
            <Td textAlign={"center"}>{brl.format(d.realizado)}</Td>
            <Td textAlign={"center"}>{d.gap}%</Td>
            {/* <Td>{d.descricao}</Td> */}
          </Tr>
        ))}
    </>
  ));

  return (
    <>
      <TableContainer mt={4} mb={3} ml={1} borderRadius={"10px"}>
        <Table variant="striped" colorScheme={"strippedGray"}>
          <Thead>
            <Tr background="origem.500" color="white">
              <Th
                textAlign={"start"}
                style={{
                  color: "white",
                }}
                width="50"
              >
                item
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Projeto
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Planejado
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Realizado
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Gap%
              </Th>
              {/* <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Descrição e Justificativa
              </Th> */}
            </Tr>
          </Thead>
          {data?.length ? (
            <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
          ) : (
            <Empty />
          )}
          <Tfoot>
            <Tr background="origem.500" color="white">
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Total
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                {total} Projetos
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                {brl.format(planejado)}
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                {brl.format(realizado)}
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              {/* <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th> */}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <PaginacaoTabela data={data} fromTo={fromTo} />
    </>
  );
}
