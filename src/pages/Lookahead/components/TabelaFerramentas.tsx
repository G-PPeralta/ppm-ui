import { useEffect, useState } from "react";

import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { FerramentasAtividade } from "interfaces/lookahead";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";

interface TableProps {
  semana?: string;
  data: FerramentasAtividade[];
}

class DiasSemana {
  diaLabel: string = "";
  data: string = "";
  hora?: number = undefined;
}

interface FerramentaDiaHora {
  nome: string;
  dia: string;
  hora: string;
  tipo?: string;
}

const headers = [
  { label: "nome", key: "nome" },
  { label: "dia", key: "dia" },
  { label: "hora", key: "hora" },
  { label: "tipo", key: "tipo" },
];

export function TabelaFerramentas(props: TableProps) {
  const { semana, data } = props;
  const [dias, setDias] = useState<DiasSemana[]>();
  const [, setSem] = useState<string>();
  const [ferramentasData, setFerramentasData] = useState<FerramentaDiaHora[]>();

  function getWeekDays() {
    const weekDays: DiasSemana[] = [];
    const dataBr = Intl.DateTimeFormat("pt-BR");
    const dia: number = semana ? +semana.split("/")[0] : 0;
    const _dias = Array.from({ length: 7 }, (val, ind) =>
      (dia + ind).toString()
    );

    for (let i = 0; i < _dias.length; i++) {
      const dia = _dias[i];

      const realDay = dataBr.format(new Date().setDate(+dia));
      const diaSemana: DiasSemana = new DiasSemana();
      const _dia = realDay.split("/")[0];
      diaSemana.diaLabel = _dia + "/" + realDay.split("/")[1];
      diaSemana.data = realDay;

      weekDays.push(diaSemana);
    }
    const ferramentasDiaHora: FerramentaDiaHora[] = [];
    data.forEach(function (fer) {
      const diaFerramenta = dataBr.format(new Date(fer.data_hora));
      const hora = fer.data_hora.split("T")[1].substring(0, 5);

      const ferramenta: FerramentaDiaHora = {
        dia: diaFerramenta,
        hora,
        nome: fer.nome,
        tipo: fer.tipo,
      };
      ferramentasDiaHora.push(ferramenta);
    });

    setFerramentasData(ferramentasDiaHora);
    setDias(weekDays);
  }

  useEffect(() => {
    setSem(semana);
    getWeekDays();
  }, [semana]);

  return (
    <Flex>
      <TableContainer mt={4} mb={3} ml={1} width="100%">
        <Table variant="unstyled" size={"sm"}>
          <Thead>
            <Tr backgroundColor={"blue"} color="white">
              <Th
                colSpan={7}
                borderTopRightRadius={"10px"}
                borderTopLeftRadius="10px"
                border="none 0px !important"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Ferramentas</Text>
                  {ferramentasData && (
                    <CSVLink
                      data={ferramentasData.filter((x) => x.tipo == "f")}
                      headers={headers}
                    >
                      <Button
                        variant="ghost"
                        colorScheme="messenger"
                        color="white"
                        rightIcon={<FaFileCsv />}
                        _hover={{
                          background: "white",
                          transition: "all 0.4s",
                          color: "rgb(46, 105, 253)",
                        }}
                      >
                        Exportar
                      </Button>
                    </CSVLink>
                  )}
                </Flex>
              </Th>
            </Tr>
            <Tr backgroundColor={"rgb(46, 105, 253)"} color="white">
              {dias &&
                dias.map(function (x) {
                  return <Th>{`${x.diaLabel}`}</Th>;
                })}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {dias &&
                ferramentasData &&
                dias.map(function (x) {
                  const ferr = ferramentasData.filter(
                    (f) => f.dia == x.data && f.tipo == "f"
                  );
                  const fNames =
                    ferr.length > 0 ? ferr.map((x) => x.nome).join(" - ") : "";
                  return <Td>{fNames}</Td>;
                })}
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr backgroundColor={"blue"} color="white">
              {dias &&
                ferramentasData &&
                dias.map(function (dia, key) {
                  const qtd = ferramentasData.filter(
                    (x) => x.dia == dia.data && x.tipo == "f"
                  ).length;
                  if (key === 0) {
                    return <Td borderBottomLeftRadius="10px">{qtd}</Td>;
                  } else if (key === dias.length - 1) {
                    return <Td borderBottomRightRadius="10px">{qtd}</Td>;
                  } else return <Td>{qtd}</Td>;
                })}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
