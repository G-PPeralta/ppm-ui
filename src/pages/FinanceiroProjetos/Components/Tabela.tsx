import { useState } from "react";
// import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  Flex,
  // IconButton,
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
import { FinanceiroPorProjetos } from "interfaces/FinanceiroProjetos";

import PaginacaoTabela from "components/PaginacaoTabela";

// import { deleteDespesaTabela } from "services/delete/Financeiro";

import ModalDeleteFinanceiro from "./ModalDelete";

interface Props {
  data: FinanceiroPorProjetos[]; // Dados completos da tabela
  refresh: () => void;
}

function Tabela({ data, refresh }: Props) {
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
    "Gap %",
    "Ação",
  ];

  const valorTotalPrevisto = data.reduce(
    (acc: number, curr: FinanceiroPorProjetos) => acc + curr.totalprevisto,
    0
  );

  const valorTotalRealizado = data.reduce(
    (acc: number, curr: FinanceiroPorProjetos) => acc + curr.totalrealizado,
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
        {data.length > 0 ? (
          data
            .slice(from, to)
            .map((linhaTabela: FinanceiroPorProjetos, index: number) => (
              <Tr key={index}>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.idprojeto}</Text>
                </Td>
                {linhaTabela.mes ? (
                  <Td textAlign={"start"} fontWeight={"semibold"}>
                    <Link
                      to={`/financeiro-projetos/centro-custo/${
                        linhaTabela.idprojeto
                      }/${linhaTabela.mes.split("/")[0]}`}
                      state={linhaTabela}
                    >
                      <Text color={"origem.500"}>
                        {linhaTabela.nomeprojeto}
                      </Text>
                    </Link>
                  </Td>
                ) : (
                  <Td textAlign={"start"} fontWeight={"semibold"}>
                    <Link
                      to={`/financeiro-projetos/centro-custo/${linhaTabela.idprojeto}`}
                      state={linhaTabela}
                    >
                      <Text color={"origem.500"}>
                        {linhaTabela.nomeprojeto}
                      </Text>
                    </Link>
                  </Td>
                )}
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.elementopep}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{formatarParaReal(linhaTabela.totalprevisto)}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{formatarParaReal(linhaTabela.totalrealizado)}</Text>
                </Td>
                <Td textAlign={"start"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.gap < 1 ? 0 : linhaTabela.gap}%</Text>
                </Td>
                <Td>
                  {/* <IconButton
                    aria-label="Plus sign"
                    icon={<FiTrash />}
                    background="transparent"
                    variant="secondary"
                    color="#F40606"
                    _hover={{
                      backgroundColor: "#F40606",
                      color: "white",
                    }}
                    // isRound={true}
                    onClick={() => {
                      deleteDespesaTabela(linhaTabela.idprojeto);
                      refresh();
                    }}
                    // width={"18px"}
                    // height={"18px"}
                  /> */}

                  <ModalDeleteFinanceiro
                    id={linhaTabela.idprojeto}
                    refresh={refresh}
                  />
                </Td>
                {/* <Td textAlign={"start"} fontWeight={"semibold"}>
                <Text>{linhaTabela.denominacaodeobjeto}</Text>
              </Td> */}
                {/* <Td textAlign={"start"} fontWeight={"semibold"}>
                <Text>{linhaTabela.textodopedido}</Text>
              </Td> */}
              </Tr>
            ))
        ) : (
          <Tr>
            <Td colSpan={header.length} textAlign={"start"}>
              <Text textAlign={"start"} fontWeight={"semibold"}>
                Não há dados
              </Text>
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
