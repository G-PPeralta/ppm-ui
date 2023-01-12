import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";

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
import { AtividadesFilho, FerramentaServico } from "interfaces/lookahead";
import moment from "moment";

import { Loading } from "components/Loading";

interface TableProps {
  semana?: string;
  data: FerramentaServico[];
  dataAtividades: AtividadesFilho[];
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
  tipo?: string;
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
  const [isLoading, setIsLoading] = useState(true);
  const { semana, dataAtividades } = props;
  const [, setSem] = useState<string>();
  const [dias, setDias] = useState<DiasSemana[]>();
  const [horas, setHoras] = useState<string[]>();
  const [atividades, setAtividades] = useState<AtividadeDiaHora[]>();
  const [total, setTotal] = useState<Totais[]>();

  function getWeekDays() {
    const dataInicial = semana && semana.split("-")[0].trim();
    const weekDays: DiasSemana[] = [];
    const dataBr = Intl.DateTimeFormat("pt-BR");
    const dia: number = dataInicial ? +dataInicial.split("/")[0] : 0;
    const mes: number = dataInicial ? +dataInicial.split("/")[1] : 0;
    const ano: number = dataInicial ? +dataInicial.split("/")[2] : 0;
    const dias = Array.from({ length: 7 }, (val, ind) =>
      (dia + ind).toString()
    );
    const horas = Array.from({ length: 24 }, (val, ind) =>
      `${ind}:00`.toString()
    );
    setHoras(horas);
    for (let i = 0; i < dias.length; i++) {
      const dia = dias[i];

      const realDay = dataBr.format(new Date(`${mes}/${dia}/${ano}`));
      const diaSemana: DiasSemana = new DiasSemana();
      const _dia = realDay.split("/")[0];
      diaSemana.label = _dia + "/" + realDay.split("/")[1];
      diaSemana.data = realDay;
      weekDays.push(diaSemana);
    }

    const atividadesGrid: AtividadeDiaHora[] = [];
    dataAtividades &&
      dataAtividades.forEach((atividade) => {
        let horaIni;
        if (atividade.data_atividade && atividade.data_atividade) {
          const auxIni = atividade.data_atividade.substring(
            0,
            atividade.data_atividade.length - 5
          );
          horaIni = new Date(auxIni).getHours().toString();
          const atividadeGrid: AtividadeDiaHora = {
            horaIni,
            dataIni: dataBr.format(new Date(auxIni)),
            nome: atividade.nom_atividade,
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

  useEffect(() => {
    setSem(semana);
    getWeekDays();
  }, [semana]);

  useEffect(() => {
    if (dias && atividades && total) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  if (isLoading) {
    <Loading />;
  }

  return (
    <Flex>
      <TableContainer mt={4} mb={3} ml={1} width="100%" borderRadius={"10px"}>
        <Table colorScheme={"strippedGray"}>
          <Thead>
            <Tr backgroundColor={"#0047BB"} color="white">
              <Th colSpan={8}>
                <Flex
                  color="white"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>Atividades</Text>
                  {atividades && (
                    <CSVLink
                      data={atividades}
                      headers={headers}
                      filename={`atividades_lookahead${moment().format(
                        "DDMMYYYY_hhmmss"
                      )}`}
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
            <Tr backgroundColor={"#0047BB"} color="white">
              <Th color="white" textAlign={"center"}>
                BRT
              </Th>
              {dias &&
                dias.map(function (x, index) {
                  return (
                    <Th
                      key={index}
                      color="white"
                      textAlign={"center"}
                      width="146px"
                    >{`${x.label}`}</Th>
                  );
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
                    <Td textAlign={"center"} width="146px" height="56px">
                      {hora}
                    </Td>
                    {dias.map(function (dia, index) {
                      const activityS = atividades.filter(
                        (x) =>
                          x.dataIni == dia.data &&
                          x.horaIni == hora.split(":")[0]
                      );
                      const arrayS = activityS
                        ? activityS.map((x) => x.nome)
                        : undefined;
                      const nomeServ = arrayS ? arrayS.join(" ") : "";

                      return (
                        <Td
                          textAlign={"center"}
                          width="146px"
                          height="56px"
                          key={index}
                        >
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
              <Td textAlign={"center"}>Total</Td>
              {dias &&
                total &&
                dias.map(function (dia, index) {
                  // return <Td>{`${x.diaLabel}`}</Td>;
                  const _total = total.filter(
                    (tot) => tot.data == dia.data
                  ).length;
                  if (dias[dias.length - 1] == dia) {
                    return (
                      <Td textAlign={"center"} key={index}>
                        {_total}
                      </Td>
                    );
                  } else
                    return (
                      <Td textAlign={"center"} key={index}>
                        {_total}
                      </Td>
                    );
                })}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
