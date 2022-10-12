import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import PaginacaoTabela from "components/PaginacaoTabela";

interface Props {
  data: any; // Dados completos da tabela
}

function Tabela({ data }: Props) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const formatarParaReal = (valor: number) => {
    const valorFormatado = valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return valorFormatado;
  };

  const header = [
    "ID",
    "Projeto",
    "Elemento PEP",
    "Previsto",
    "Realizado",
    "Denominação de Objeto",
    "Mês",
    "Texto do Pedido",
  ];

  const valorTotalPrevisto = data.reduce(
    (acc: number, curr: any) => acc + curr.totalPrevisto,
    0
  );

  const valorTotalRealizado = data.reduce(
    (acc: number, curr: any) => acc + curr.totalRealizado,
    0
  );

  const totalDeProjetos = data.length;

  const footer = [
    "Total",
    totalDeProjetos === 1
      ? `${totalDeProjetos} Projeto`
      : `${totalDeProjetos} Projetos`,
    "",
    formatarParaReal(valorTotalPrevisto),
    formatarParaReal(valorTotalRealizado),
  ];

  if (footer && footer.length < header.length) {
    const diferenca = header.length - footer.length;
    for (let index = 0; index < diferenca; index += 1) {
      footer.push("");
    }
  }

  function Body() {
    return (
      <>
        {data ? (
          data.slice(from, to).map((linhaTabela: any, index: number) => (
            <Tr key={index}>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{linhaTabela.idProjeto}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Link
                  to={`/financeiro-projetos/centro-custo/${linhaTabela.idProjeto}`}
                  state={linhaTabela}
                >
                  <Text>{linhaTabela.projeto}</Text>
                </Link>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{linhaTabela.elementoPep}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{formatarParaReal(linhaTabela.totalPrevisto)}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{formatarParaReal(linhaTabela.totalRealizado)}</Text>
              </Td>
              <Td textAlign={"start"} fontWeight={"semibold"}>
                <Text>{linhaTabela.denominacaoDeObjeto}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{linhaTabela.mes}</Text>
              </Td>
              <Td textAlign={"start"} fontWeight={"semibold"}>
                <Text>{linhaTabela.textoDoPedido}</Text>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td textAlign={"center"} fontWeight={"semibold"}>
              <Text>Não há dados</Text>
            </Td>
          </Tr>
        )}
      </>
    );
  }

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
              <Tr background={"origem.500"}>
                {header.map((item: string, index: number) => (
                  <Th color="white" textAlign={"center"} key={index}>
                    {item}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody scrollBehavior={"smooth"}>{<Body />}</Tbody>
            <Tfoot>
              <Tr background={"origem.500"}>
                {footer.map((item: string, index: number) => (
                  <Th color="white" key={index}>
                    {item}
                  </Th>
                ))}
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
      <PaginacaoTabela data={data} fromTo={fromTo} />
    </Flex>
  );
}

export default Tabela;
