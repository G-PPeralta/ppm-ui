import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";
import { TbTool } from "react-icons/tb";

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
import { FerramentaServico } from "interfaces/lookahead";

interface TableProps {
  semana?: string;
  data: FerramentaServico[];
}

class DiasSemana {
  label: string = "";
  data: string = "";
  key: string = "nome";
}

interface AtividadeDiaHora {
  nome: string;
  horaIni: string;
  dataIni: string;
  tipo: string;
}

class Totais {
  data: string = "";
  hora: string = "";
}

const headers = [
  { label: "nome", key: "nome" },
  { label: "dataIni", key: "dataIni" },
  { label: "horaIni", key: "horaIni" },
  { label: "tipo", key: "tipo" },
];
export function TabelaAtividades(props: TableProps) {
  const { semana, data } = props;
  const [, setSem] = useState<string>();
  const [dias, setDias] = useState<DiasSemana[]>();
  const [horas, setHoras] = useState<string[]>();
  const [atividades, setAtividades] = useState<AtividadeDiaHora[]>();
  const [total, setTotal] = useState<Totais[]>();
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
      diaSemana.label = _dia + "/" + realDay.split("/")[1];
      diaSemana.data = realDay;
      weekDays.push(diaSemana);
    }

    const atividadesGrid: AtividadeDiaHora[] = [];
    data &&
      data.forEach((atividade) => {
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
          const atividadeGrid: AtividadeDiaHora = {
            horaIni,
            dataIni: dataBr.format(new Date(auxIni)),
            tipo: atividade.tipo,
            nome: atividade.nome,
          };

          atividadesGrid.push(atividadeGrid);
        }
      });
    setAtividades(atividadesGrid);
    setDias(weekDays);
    const arrTotais: Totais[] = [];

    atividadesGrid.forEach((x) => {
      const jaTem = arrTotais.find(
        (a) => x.dataIni == a.data && x.horaIni == a.hora
      )?.data;
      if (!jaTem) {
        arrTotais.push({
          data: x.dataIni,
          hora: x.horaIni,
        });
      }
    });

    setTotal(arrTotais);
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
            <Tr
              backgroundColor={"#0047BB"}
              color="white"
              border="none 0px !important"
            >
              <Th
                colSpan={8}
                border="none 0px !important"
                borderTopLeftRadius="10px"
                borderTopRightRadius="10px"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Atividade</Text>
                  {atividades && (
                    <CSVLink data={atividades} headers={headers}>
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
            <Tr backgroundColor={"#0047BB"} color="white">
              <Th>BRT</Th>
              {dias &&
                dias.map(function (x) {
                  return <Th>{`${x.label}`}</Th>;
                })}
            </Tr>
          </Thead>
          <Tbody>
            {dias &&
              horas &&
              atividades &&
              horas.map(function (hora, indice) {
                return (
                  <Tr
                    backgroundColor={indice % 2 == 1 ? "#F9F9F9" : "#FFF"}
                    key={indice}
                  >
                    <Td width="146px" height="56px">
                      {hora}
                    </Td>
                    {dias.map(function (dia) {
                      const activityS = atividades.filter(
                        (x) =>
                          x.dataIni == dia.data &&
                          x.horaIni == hora.split(":")[0] &&
                          x.tipo == "s"
                      );

                      const arrayS = activityS
                        ? activityS.map((x) => x.nome)
                        : undefined;
                      const activityF = atividades.filter(
                        (x) =>
                          x.dataIni == dia.data &&
                          x.horaIni.split(":")[0] == hora.split(":")[0] &&
                          x.tipo == "f"
                      );

                      const arrayF = activityF
                        ? activityF.map((x) => x.nome)
                        : undefined;
                      //

                      const nomeServ = arrayS ? arrayS.join(" ") : "";
                      const nomeFerr = arrayF ? arrayF.join(" ") : "";
                      return (
                        <Td width="146px" height="56px">
                          <>
                            {nomeServ && (
                              <>
                                <Text
                                  fontFamily={"Mulish"}
                                  fontStyle="normal"
                                  display="inline-flex"
                                  color="#585858"
                                  fontWeight="600"
                                  fontSize="13px"
                                  lineHeight="150%"
                                >
                                  {nomeServ}
                                </Text>
                                <br />
                              </>
                            )}

                            {nomeFerr && (
                              <Text
                                display="inline-flex"
                                color="#585858"
                                fontWeight="400"
                                fontSize="12px"
                                lineHeight="14px"
                                gap={1}
                              >
                                <TbTool /> {nomeFerr.toLocaleLowerCase()}
                              </Text>
                            )}
                          </>
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
          <Tfoot>
            <Tr
              backgroundColor={"#0047BB"}
              color="white"
              border="none 0px !important"
            >
              <Td borderBottomLeftRadius="10px">Total</Td>
              {dias &&
                total &&
                dias.map(function (dia) {
                  // return <Td>{`${x.diaLabel}`}</Td>;
                  const _total = total.filter(
                    (tot) => tot.data == dia.data
                  ).length;
                  if (dias[dias.length - 1] == dia) {
                    return <Td borderBottomRightRadius="10px">{_total}</Td>;
                  } else return <Td>{_total}</Td>;
                })}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
