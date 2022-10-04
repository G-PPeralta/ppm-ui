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

interface TableProps {
  semana?: string;
  // data: FerramentasAtividade[];
}

class DiasSemana {
  diaLabel: string = "";
  data?: string = "";
  hora?: number = undefined;
}

// class AtividadeDiaHora {
//   nome: string = "";
//   horaIni: string = "";
//   horaFim: string = "";
//   dataIni: string = "";
//   dataFim: string = "";
// }

export function TabelaServicos(props: TableProps) {
  const { semana } = props;
  const [dias, setDias] = useState<DiasSemana[]>();
  const [, setSem] = useState<string>();

  function getWeekDays() {
    const weekDays: DiasSemana[] = [];
    const dataBr = Intl.DateTimeFormat("pt-BR");
    const dia: number = semana ? +semana.split("/")[0] : 0;
    const dias = Array.from({ length: 7 }, (val, ind) =>
      (dia + ind).toString()
    );
    // const horas = Array.from({ length: 24 }, (val, ind) =>
    //   `${ind}:00`.toString()
    // );
    // setHoras(horas);
    for (let i = 0; i < dias.length; i++) {
      const dia = dias[i];

      const realDay = dataBr.format(new Date().setDate(+dia));
      const diaSemana: DiasSemana = new DiasSemana();
      const _dia = realDay.split("/")[0];
      diaSemana.diaLabel = _dia + "/" + realDay.split("/")[1];
      diaSemana.data = realDay;

      weekDays.push(diaSemana);
    }
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
                dias.map(function (x) {
                  return <Td>{`${x.diaLabel}`}</Td>;
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
              <Td>Total 1</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
