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
import { FerramentaServico } from "interfaces/lookahead";

interface TableProps {
  semana?: string;
  data: FerramentaServico[];
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
  tipo: string = "";
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
    data &&
      data.forEach((atividade) => {
        const atividadeGrid: AtividadeDiaHora = new AtividadeDiaHora();
        let horaIni;
        if (atividade.data_hora && atividade.data_hora) {
          const auxIni = atividade.data_hora.substring(
            0,
            atividade.data_hora.length - 5
          );

          // const auxFim = atividade.dat_fim_plan.substring(
          //   0,
          //   atividade.dat_fim_plan.length - 5
          // );

          // diaIni = new Date(auxIni).getDate().toString();
          horaIni = new Date(auxIni).getHours().toString();

          // diaFim = new Date(auxFim).getDate().toString();
          // horaFim = new Date(auxFim).getHours().toString();
          atividadeGrid.horaIni = horaIni;
          atividadeGrid.dataIni = dataBr.format(new Date(auxIni));
          atividadeGrid.tipo = atividade.tipo;

          // atividadeGrid.horaFim = horaFim;
          // atividadeGrid.dataFim = dataBr.format(new Date(auxFim));

          atividadeGrid.nome = atividade.nome;

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
                      const activityS = atividades.find(
                        (x) =>
                          x.dataIni == dia.data &&
                          x.horaIni == hora.split(":")[0] &&
                          x.tipo == "s"
                      )?.nome;
                      const activityF = atividades.find(
                        (x) =>
                          x.dataIni == dia.data &&
                          x.horaIni == hora.split(":")[0] &&
                          x.tipo == "f"
                      )?.nome;

                      return (
                        <Td>
                          {(activityS && activityF
                            ? activityS + " - " + activityF
                            : activityS || activityF) || `-`}
                        </Td>
                      );
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
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
