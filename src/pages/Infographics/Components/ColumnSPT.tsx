import { useEffect, useState } from "react";

import { Flex, Text } from "@chakra-ui/react";

import { getServicoPocoId } from "services/get/CadastroModaisInfograficos";

import CardPIR from "./CardPIR";
import ModalCadastroIntervencao from "./ModalCadastroIntervencao";
import ModalEditarSPT from "./ModalEditarSPT";

type Poco = {
  comp_pct: number;
  finalplanejado: any;
  id_campanha: number;
  id_poco: number;
  inicioplanejado: any;
  pct_plan: any;
  pct_real: any;
  poco: string;
  sonda: string;
};

type Column = {
  sonda: string;
  id_campanha: number;
  pocos: Poco[];
};

type Props = {
  column: Column;
  setRefresh: Function;
  refresh: boolean;
};

type ServicoPoco = {
  id: number;
  nom_poco: string;
  dat_ini_limite: string | null;
};

function ColumnSPT({ column, setRefresh, refresh }: Props) {
  const [listaServicosPocos, setListaServicosPocos] = useState<ServicoPoco[]>(
    []
  );

  const handleServicoPocos = async () => {
    const idNomeSonda = column.sonda.split(" - ")[0];
    const servicoPocos = await getServicoPocoId(idNomeSonda);

    const servicoPocosSorted = servicoPocos.data.sort(
      (a: ServicoPoco, b: ServicoPoco) => {
        const nomePocoA = a.nom_poco.split(" - ")[1];
        const nomePocoB = b.nom_poco.split(" - ")[1];
        return nomePocoA.localeCompare(nomePocoB);
      }
    );

    setListaServicosPocos(servicoPocosSorted);
  };

  useEffect(() => {
    handleServicoPocos();
  }, []);

  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"start"}
      flex={1}
      minW={"296px"}
    >
      <Flex mt={3} mb={6} alignItems={"center"} justify={"end"} w="265px">
        <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
          {column.sonda}
        </Text>
        <ModalEditarSPT
          column={column}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </Flex>
      <Flex
        direction={"column"}
        align={"end"}
        justify={"space-between"}
        flex={1}
      >
        <Flex
          direction={"column"}
          gap={10}
          align={"center"}
          justify={"center"}
          mb={4}
        >
          {column.pocos.map((poco, index) => {
            if (index < 9) {
              if (!poco.poco) {
                return (
                  <Flex
                    key={index}
                    justify={"center"}
                    align={"center"}
                    h={"179px"}
                  >
                    <Text
                      ml={20}
                      fontSize="lg"
                      fontWeight={"semibold"}
                      textAlign={"center"}
                      w={"220px"}
                    >
                      Não há intervenções cadastradas para essa campanha.
                    </Text>
                  </Flex>
                );
              } else {
                return (
                  <CardPIR
                    poco={poco}
                    index={index}
                    key={index}
                    refresh={() => setRefresh(!refresh)}
                  />
                );
              }
            } else {
              return undefined;
            }
          })}
        </Flex>
        <ModalCadastroIntervencao
          data={column.pocos[column.pocos.length - 1].finalplanejado}
          idCampanha={column.id_campanha}
          refresh={refresh}
          setRefresh={setRefresh}
          listaServicosPocos={listaServicosPocos}
        />
      </Flex>
    </Flex>
  );
}

export default ColumnSPT;
