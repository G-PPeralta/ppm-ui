import { useState } from "react";

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
    (acc: number, curr: any) => acc + curr.previsto,
    0
  );

  const valorTotalRealizado = data.reduce(
    (acc: number, curr: any) => acc + curr.realizado,
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
          data.slice(from, to).map((objeto: any, index: number) => (
            <Tr key={index}>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{objeto.id}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{objeto.projeto}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{objeto.elementoPep}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{formatarParaReal(objeto.previsto)}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{formatarParaReal(objeto.realizado)}</Text>
              </Td>
              <Td textAlign={"start"} fontWeight={"semibold"}>
                <Text>{objeto.denominacaoDeObjeto}</Text>
              </Td>
              <Td textAlign={"center"} fontWeight={"semibold"}>
                <Text>{objeto.mes}</Text>
              </Td>
              <Td textAlign={"start"} fontWeight={"semibold"}>
                <Text>{objeto.textoDoPedido}</Text>
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
                {header
                  // .sort((a: any, b: any) => a.id - b.id)
                  // .slice(from, to)
                  // Normalmente o map é precedido pela ordenação e respectivo slice que nutre a paginação
                  .map((item: string, index: number) => (
                    <Th color="white" textAlign={"center"} key={index}>
                      {/* O desafio aqui é que na renderização a gente usa chaves específicas, além de termos modais de edição/exclusão não dinâmicos */}
                      {item}
                    </Th>
                  ))}
              </Tr>
            </Thead>
            <Tbody scrollBehavior={"smooth"}>{<Body />}</Tbody>
            <Tfoot>
              {/* No caso do footer, nem todas as tabelas o possui, teria que ser opcional. Ainda assim, quando existe, o dado costuma ser previamente tratado de maneira simples (como o total de algum dado, ou somatório de valores), independendo de algum map porque não vem pronto do back */}
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
