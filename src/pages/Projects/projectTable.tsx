import { Column } from "react-table";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import "./projects.css";

interface Projeto {
  id: number;
  nome: string;
  valorTotalPrevisto: string;
  prioridade: string;
  complexidade: string;
  responsavel: string;
  coordenador: string;
}

interface TableProps {
  data: Projeto[];
  columns: Column<Projeto>[];
}

const ProjectTable = (props: TableProps) => {
  const { data, columns } = props;
  const brl = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <>
      <TableContainer className="fullWidth">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              {columns.map(function (t) {
                return <Th>{t.accessor?.toString()}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map(function (dados, index) {
              return (
                <Tr mt={1} key={index}>
                  <Td color={"#628EFD"} sx={{ fontSize: 12 }}>
                    <Text>
                      {dados.nome.length > 28 ? (
                        <Tooltip label={dados.nome} aria-label="">
                          {dados.nome.substring(0, 25).toUpperCase() + "..."}
                        </Tooltip>
                      ) : (
                        dados.nome.toUpperCase()
                      )}
                    </Text>
                  </Td>
                  <Td color="gray.700" sx={{ fontSize: 12 }}>
                    <Text>
                      {dados.valorTotalPrevisto &&
                        brl.format(+dados.valorTotalPrevisto)}
                    </Text>
                  </Td>
                  <Td color={"#628EFD"} sx={{ fontSize: 12 }}>
                    <Text>{dados.prioridade} </Text>
                  </Td>
                  <Td color={"#628EFD"} sx={{ fontSize: 12 }}>
                    <Text>{dados.complexidade} </Text>
                  </Td>
                  <Td color={"#628EFD"} sx={{ fontSize: 12 }}>
                    <Text>
                      {dados.responsavel && dados.responsavel.length > 15 ? (
                        <Tooltip label={dados.responsavel} aria-label="">
                          {dados.responsavel.substring(0, 12) + "..."}
                        </Tooltip>
                      ) : (
                        dados.responsavel
                      )}
                    </Text>
                  </Td>
                  <Td color={"#628EFD"} sx={{ fontSize: 12 }}>
                    <Text>
                      {dados.coordenador && dados.coordenador.length > 15 ? (
                        <Tooltip label={dados.coordenador} aria-label="">
                          {dados.coordenador.substring(0, 12) + "..."}
                        </Tooltip>
                      ) : (
                        dados.coordenador
                      )}
                    </Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectTable;
