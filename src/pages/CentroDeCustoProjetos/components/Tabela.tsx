import { useState } from "react";
// import { FiTrash } from "react-icons/fi";

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

import PaginacaoTabela from "components/PaginacaoTabela";

import { formatDate } from "utils/formatDate";

// import { useAuth } from "hooks/useAuth";

// import { deleteDespesa } from "services/delete/Financeiro";

import ModalDeletarCentroDeCusto from "./ModalDeletarCentroDeCusto";
import ModalEditar from "./ModalEditar";

interface RefreshState {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Props {
  data: any; // Dados completos da tabela
  refreshState: RefreshState;
  idProjeto: number;
  optionsSelects: any;
  mes: number;
}

function Tabela({ data, refreshState, optionsSelects, mes }: Props) {
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
    "Pedido",
    "Prestador de Serviço",
    "Classe de Serviço",
    "Data de Pgto",
    "Valor",
    "Descrição do Serviço",
    "Ações",
  ];

  const valorTotalRealizado = data
    ? data.reduce((acc: number, curr: any) => acc + curr.valor, 0)
    : 0;

  const footer = [
    "Total",
    "",
    "",
    "",
    "",
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
          data.slice(from, to).map((linhaTabela: any, index: number) => {
            if (linhaTabela.idCusto === 0) {
              return (
                <Tr key={index}>
                  <Td colSpan={header.length} textAlign={"start"}>
                    <Text textAlign={"start"} fontWeight={"semibold"}>
                      Não há dados
                    </Text>
                  </Td>
                </Tr>
              );
            }
            return (
              <Tr key={index}>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.idCusto}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.pedido}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.prestadorDeServico}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.classeDoServico}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>
                    {linhaTabela.dataPagamento === null
                      ? "01/01/2022"
                      : formatDate(linhaTabela.dataPagamento)}
                  </Text>
                </Td>
                <Td textAlign={"start"} fontWeight={"semibold"}>
                  <Text>{formatarParaReal(linhaTabela.valor)}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.descricaoDoServico}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {/* <Flex gap={2} align={"center"} justify={"center"}> */}
                  <ModalEditar
                    refreshState={refreshState}
                    linhaTabela={linhaTabela}
                    optionsSelects={optionsSelects}
                    mes={mes}
                  />
                  {/* <IconButton
                      aria-label="Botão de Editar"
                      icon={<FiTrash />}
                      borderRadius={"10px"}
                      background={"transparent"}
                      color={"red.500"}
                      _hover={{
                        background: "red.500",
                        transition: "all 0.4s",
                        color: "white",
                      }}
                      onClick={() => handleDeletar(linhaTabela.idCusto)}
                    /> */}
                  <ModalDeletarCentroDeCusto
                    idCusto={linhaTabela.idCusto}
                    refreshState={refreshState}
                  />
                  {/* </Flex> */}
                </Td>
              </Tr>
            );
          })
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
      {data ? <PaginacaoTabela data={data} fromTo={fromTo} /> : <></>}
    </Flex>
  );
}

export default Tabela;
