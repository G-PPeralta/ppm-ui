// CRIADO EM: 21/10/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: TABELA GENÉRICA PARA SER UTILIZADA EM TODOS AS PÁGINAS DO SISTEMA ALTERANDO APENAS O CONTEÚDO (BODY) E SETANDO OS NOMES DAS COLUNAS (HEADER)

import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import PaginacaoTabela from "components/PaginacaoTabela";

interface Props {
  data: any; // Dados completos da tabela
  children: any; // Dados do corpo da tabela
  header?: any; // Dados do cabeçalho da tabela
  footer?: any; // Dados do rodapé da tabela
  fromTo: any; // Dados de paginação
  maxHeight?: string; // Altura da tabela
  minHeight?: string; // Altura da tabela
}

function TabelaGenerica({
  data,
  children,
  header,
  footer,
  fromTo,
  maxHeight,
  minHeight,
}: Props) {
  if (footer && footer.length < header.length) {
    const diferenca = header.length - footer.length;
    for (let index = 0; index < diferenca; index += 1) {
      footer.push("");
    }
  }

  return (
    <Flex direction={"column"} w={"100%"}>
      <Flex direction={"column"} flex={1}>
        <TableContainer
          mt={4}
          mb={3}
          borderRadius={"10px"}
          overflowX={"auto"}
          minH={minHeight}
          maxH={maxHeight}
          overflowY={maxHeight ? "scroll" : "hidden"}
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
            <Tbody scrollBehavior={"smooth"}>{children}</Tbody>
            {footer && (
              <Tfoot>
                <Tr background={"origem.500"}>
                  {footer.map((item: string, index: number) => (
                    <Th color="white" key={index}>
                      {item}
                    </Th>
                  ))}
                </Tr>
              </Tfoot>
            )}
          </Table>
        </TableContainer>
      </Flex>
      <PaginacaoTabela data={data} fromTo={fromTo} />
    </Flex>
  );
}

export default TabelaGenerica;
