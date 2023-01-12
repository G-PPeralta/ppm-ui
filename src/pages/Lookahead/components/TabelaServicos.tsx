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
import { FerramentasAtividade } from "interfaces/lookahead";
import moment from "moment";

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
const headers = [
  { label: "nome", key: "nome" },
  { label: "dia", key: "dia" },
  { label: "hora", key: "hora" },
  { label: "tipo", key: "tipo" },
];

export function TabelaServicos(props: TableProps) {
  const { semana, data } = props;
  const [dias, setDias] = useState<DiasSemana[]>();
  const [, setSem] = useState<string>();
  const [servicosData, setServicosData] = useState<ServicoDiaHora[]>();

  function getWeekDays() {
    const weekDays: DiasSemana[] = [];
    const dataInicial = semana && semana.split("-")[0].trim();
    const dataBr = Intl.DateTimeFormat("pt-BR");
    const dia: number = dataInicial ? +dataInicial.split("/")[0] : 0;
    const mes: number = dataInicial ? +dataInicial.split("/")[1] : 0;
    const ano: number = dataInicial ? +dataInicial.split("/")[2] : 0;
    const _dias = Array.from({ length: 7 }, (val, ind) =>
      (dia + ind).toString()
    );

    for (let i = 0; i < _dias.length; i++) {
      const dia = _dias[i];

      // const realDay = dataBr.format(new Date(`${mes}/${dia}/${ano}`));
      const realDay = `${dia}/${mes}/${ano}`;
      const diaSemana: DiasSemana = new DiasSemana();
      const _dia = realDay.split("/")[0];
      diaSemana.diaLabel = _dia + "/" + realDay.split("/")[1];
      diaSemana.data = realDay;

      weekDays.push(diaSemana);
    }
    const servicosDiaHora: ServicoDiaHora[] = [];
    data &&
      data.forEach(function (ser) {
        const strDt = ser.data_hora.split("T")[0] + "T12:00:00.000Z";
        const diaServico = dataBr.format(new Date(strDt));
        const hora = ser.data_hora.split("T")[1].substring(0, 5);

        const servico: ServicoDiaHora = {
          dia: diaServico,
          hora,
          nome: ser.nome,
          tipo: ser.tipo ? ser.tipo : "",
        };
        servicosDiaHora.push(servico);
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
      <TableContainer mt={4} mb={3} ml={1} borderRadius={"10px"} width="100%">
        <Table colorScheme={"strippedGray"}>
          <Thead>
            <Tr backgroundColor={"#0047BB"} color="white">
              <Th
                colSpan={7}
                // borderTopRightRadius={"10px"}
                // borderTopLeftRadius="10px"
                // border="none 0px !important"
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  color="white"
                >
                  <Text>Serviços</Text>
                  {servicosData && (
                    <CSVLink
                      data={servicosData.filter((x) => x.tipo == "s")}
                      headers={headers}
                      filename={`servicos_lookahead${moment().format(
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
              {dias
                ? dias.map((dia: any, index: number) => (
                    <Th
                      key={index}
                      color="white"
                      textAlign={"center"}
                    >{`${dia.diaLabel}`}</Th>
                  ))
                : null}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {dias &&
                servicosData &&
                dias.map((x: any, index: number) => {
                  const serr = servicosData.filter(
                    (f) => f.dia == x.data && f.tipo == "s"
                  );
                  const sNames =
                    serr.length > 0 ? serr.map((x) => x.nome).join(" - ") : "";

                  return (
                    <Td
                      textAlign={"center"}
                      fontWeight={"semibold"}
                      key={index}
                    >
                      {sNames}
                    </Td>
                  );
                })}
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr backgroundColor={"#0047BB"} color="white">
              {dias &&
                servicosData &&
                dias.map(function (dia, key) {
                  const qtd = servicosData.filter(
                    (x) => x.dia == dia.data && x.tipo == "s"
                  ).length;
                  if (key === 0) {
                    return (
                      <Td textAlign={"center"} key={key}>
                        {qtd}
                      </Td>
                    );
                  } else if (key === dias.length - 1) {
                    return (
                      <Td textAlign={"center"} key={key}>
                        {qtd}
                      </Td>
                    );
                  } else
                    return (
                      <Td textAlign={"center"} key={key}>
                        {qtd}
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
