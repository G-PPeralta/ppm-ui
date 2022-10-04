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
import { AtividadesLookahead } from "interfaces/lookahead";

interface TableProps {
  semana?: string;
  data: AtividadesLookahead[];
}

class DiasSemana {
  diaLabel: string = "";
  data?: string = "";
  hora?: number = undefined;
}

class AtividadeDiaHora {
  nome: string = "";
  horaIni: string = "";
  horaFim: string = "";
  dataIni: string = "";
  dataFim: string = "";
}

export function TabelaAtividades(props: TableProps) {
  const { semana, data } = props;
  const [, setSem] = useState<string>();
  const [dias, setDias] = useState<DiasSemana[]>();
  const [horas, setHoras] = useState<string[]>();
  const [atividades, setAtividades] = useState<AtividadeDiaHora[]>();
  // const horarios = Array(24)
  //   .fill(0)
  //   .map((_, i) => {
  //     return ("0" + i + ": 0" + 60 * 0).replace(/\d(\d\d)/g, "$1");
  //   });

  function getWeekDays() {
    const weekDays: DiasSemana[] = [];
    const dataBr = Intl.DateTimeFormat("pt-BR");
    const dia: number = semana ? +semana.split("/")[0] : 0;
    const dias = Array.from({ length: 7 }, (val, ind) =>
      (dia + ind).toString()
    );
    const horas = Array.from({ length: 24 }, (val, ind) =>
      `${ind}:00`.toString()
    );
    setHoras(horas);
    for (let i = 0; i < dias.length; i++) {
      const dia = dias[i];

      const realDay = dataBr.format(new Date().setDate(+dia));
      const diaSemana: DiasSemana = new DiasSemana();
      const _dia = realDay.split("/")[0];
      diaSemana.diaLabel = _dia + "/" + realDay.split("/")[1];
      diaSemana.data = realDay;
      weekDays.push(diaSemana);
    }

    const atividadesGrid: AtividadeDiaHora[] = [];
    data.forEach((atividade) => {
      const atividadeGrid: AtividadeDiaHora = new AtividadeDiaHora();
      let horaIni;
      let horaFim;
      if (atividade.dat_ini_plan && atividade.dat_fim_plan) {
        const auxIni = atividade.dat_ini_plan.substring(
          0,
          atividade.dat_ini_plan.length - 5
        );

        const auxFim = atividade.dat_fim_plan.substring(
          0,
          atividade.dat_fim_plan.length - 5
        );

        // diaIni = new Date(auxIni).getDate().toString();
        horaIni = new Date(auxIni).getHours().toString();

        // diaFim = new Date(auxFim).getDate().toString();
        horaFim = new Date(auxFim).getHours().toString();
        atividadeGrid.horaIni = horaIni;
        atividadeGrid.dataIni = dataBr.format(new Date(auxIni));

        atividadeGrid.horaFim = horaFim;
        atividadeGrid.dataFim = dataBr.format(new Date(auxFim));

        atividadeGrid.nome = atividade.nom_atividade;

        atividadesGrid.push(atividadeGrid);
      }
    });
    setAtividades(atividadesGrid);
    setDias(weekDays);
  }

  // function atividadesData() {
  //   data &&
  //     data.map(function (x) {
  //       const dataIni = x.dat_ini_plan;
  //       const dataFim = x.dat_fim_plan;
  //     });

  //   return "";
  // }

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
              <Th colSpan={6} borderTopLeftRadius="10px">
                Atividade
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
              <Th>BRT</Th>
              {dias &&
                dias.map(function (x) {
                  return <Th>{`${x.diaLabel}`}</Th>;
                })}
            </Tr>
          </Thead>
          <Tbody>
            {atividades &&
              dias &&
              horas &&
              horas.map(function (hora, indice) {
                return (
                  <Tr
                    backgroundColor={indice % 2 == 1 ? "#F9F9F9" : "#FFF"}
                    key={indice}
                  >
                    <Td>{hora}</Td>
                    {dias.map(function (dia) {
                      const activity = atividades.find(
                        (x) =>
                          x.dataIni === dia.data &&
                          x.horaIni === hora.split(":")[0]
                      )?.nome;
                      return <Td>{activity || `-`}</Td>;
                    })}

                    {/* <Td>{hora}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td> */}
                  </Tr>
                );
              })}
          </Tbody>
          <Tfoot>
            <Tr backgroundColor={"blue"} color="white">
              <Td>Total</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
