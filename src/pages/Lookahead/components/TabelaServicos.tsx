import { useEffect, useState } from "react";
import { FiPrinter } from "react-icons/fi";

import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FerramentasAtividade } from "interfaces/lookahead";

interface TableProps {
  semana?: string;
  data?: FerramentasAtividade[];
}

class DiasSemana {
  diaLabel: string = "";
  data?: string = "";
  hora?: number = undefined;
}

interface ServicoDiaHora {
  nome: string;
  dia: string;
  hora: string;
  tipo: string;
}

export function TabelaServicos(props: TableProps) {
  const { semana, data } = props;
  const [dias, setDias] = useState<DiasSemana[]>();
  const [, setSem] = useState<string>();
  const [servicosData, setServicosData] = useState<ServicoDiaHora[]>();

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
    const servicosDiaHora: ServicoDiaHora[] = [];
    data &&
      data.forEach(function (fer) {
        const diaFerramenta = dataBr.format(new Date(fer.data_hora));
        const hora = fer.data_hora.split("T")[1].substring(0, 5);

        const ferramenta: ServicoDiaHora = {
          dia: diaFerramenta,
          hora,
          nome: fer.nome,
          tipo: fer.tipo ? fer.tipo : "",
        };
        servicosDiaHora.push(ferramenta);
      });

    setServicosData(servicosDiaHora);
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
              <Th colSpan={5} borderTopLeftRadius="10px">
                Serviços
              </Th>
              <Th borderTopRightRadius={"10px"} colSpan={2}>
                Imprimir
                <IconButton
                  color={"white"}
                  backgroundColor="transparent"
                  aria-label="imprimir"
                  icon={<FiPrinter />}
                />
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
                servicosData &&
                dias.map(function (x) {
                  return (
                    <Td>
                      {" "}
                      {
                        servicosData.find(
                          (f) => f.dia == x.data && f.tipo == "s"
                        )?.nome
                      }
                    </Td>
                  );
                })}

              {/* <Td>
                Chave de fenda <br /> 01:00 - 22/08
              </Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td> */}
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr backgroundColor={"blue"} color="white">
              {dias &&
                servicosData &&
                dias.map(function (dia) {
                  return (
                    <Td>
                      {
                        servicosData.filter(
                          (x) => x.dia == dia.data && x.tipo == "s"
                        ).length
                      }
                    </Td>
                  );
                })}
              {/* <Td>Total 1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td> */}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
