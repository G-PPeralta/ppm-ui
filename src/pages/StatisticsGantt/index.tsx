import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Box,
  Flex,
  Text,
  Heading,
  Spacer,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { StatisticsGanttProps } from "interfaces/Services";

import Sidebar from "components/SideBar";

import { useToast } from "contexts/Toast";

import { patchOperacoesEstatisticas } from "services/update/OperacoesEstatisticas";

import { Gantt } from "./components/Gantt";

function StatisticsGantt() {
  const { state }: any = useLocation();
  const [ganttData, setGanttData] = useState<StatisticsGanttProps[]>();
  const toolbarOptions = ["ZoomIn", "ZoomOut"];
  const [projeto, setProjeto] = useState({ sonda: "", poco: "" });
  const { toast } = useToast();

  const formatToGanttData = (data: any) => {
    if (!data) return;
    const newGantt = data.atividades?.map((t: any) => {
      const use = ["max", "min", "med", "dp"][Math.floor(Math.random() * 4)];

      // TODO: setar qual valor (use) usado no duration
      // const duration = data[use];
      const real = Number(t.hrs_reais);
      const total = Number(t.hrs_totais);
      const duration = real > total ? real : total;
      // console.log(">>>duration", duration);
      // if (
      //   Number(t.pct_plan) === 1 ||
      //   Number(t.hrs_reais) > Number(t.hrs_totais)
      // ) {
      //   duration = Number(t.hrs_reais);
      // } else {
      //   duration = Number(t.hrs_totais);
      // }
      // const tmp = real / total;
      // const progresso = tmp > 1 ? 100 : tmp * 100;

      const { max, min, med, dp } = data;
      let color;
      if (duration < med - dp) color = "green";
      else if (duration >= med - dp && duration < med + dp / 2)
        color = "yellow";
      else if (duration >= med + dp / 2 && duration < med + dp) color = "red";
      else if (duration >= med + dp) color = "black";
      return {
        sonda: data.sonda,
        id_sonda: data.id_sonda,
        poco: data.poco,
        id_poco: data.id_poco,
        TaskID: t.id_atividade,
        TaskName: t.nome_atividade,
        StartDate: t.inicio_real,
        EndDate: t.fim_real,
        BaselineStartDate: t.inicio_planejado,
        BaselineEndDate: t.fim_planejado,
        Duration: Number(t.hrs_reais),
        BaselineDuration: Number(t.hrs_totais),
        Progress: Number(t.pct_real),
        max,
        min,
        med,
        dp,
        use,
        color,
      };
    });
    setGanttData(newGantt);
    setProjeto({
      sonda: data.sonda,
      poco: data.poco,
    });
  };

  const handleEdit = async (task: any) => {
    try {
      // TODO format
      //     id
      // inicio_planejado
      // fim_planejado
      // inicio_realizado
      // fim_realizado
      // pct_real
      const payload = {
        // sonda: task.sonda,
        // id_sonda: task.id_sonda,
        // id_poco: task.id_poco,
        // poco: task.poco,
        // nome_atividade: task.TaskName,
        id: task.TaskID,
        // inicio_realizado: task.StartDate,
        // fim_realizado: task.EndDate,
        // inicio_planejado: task.BaselineStartDate,
        // fim_planejado: task.BaselineEndDate,
        // hrs_reais: task.Duration,
        // hrs_totais: task.BaselineDuration,
        pct_real: task.Progress,
        // nome_responsavel: "noe",
      };
      const { status } = await patchOperacoesEstatisticas(
        // payload.id_atividade,
        payload
      );
      // const status = 200;
      if (status === 200 || status === 201) {
        toast.success("Operação atualizada com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao editar operação!");
    }
  };

  useEffect(() => {
    formatToGanttData(state.data);

    // handleSetData();
    // setLoading(false);
  }, []);

  return (
    <>
      <Sidebar>
        <Stack spacing="8">
          <Box
            py={{ base: "0", sm: "10" }}
            px={{ base: "4", sm: "10" }}
            w={"100%"}
            bg={useBreakpointValue({ base: "transparent", sm: "white" })}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack>
              <Flex>
                <Box mb={5}>
                  <Heading as="h3" size="md">
                    {projeto.sonda}
                  </Heading>
                  <Text>{projeto.poco}</Text>
                </Box>

                <Spacer />
              </Flex>
            </Stack>
            <Stack spacing="8">
              <Gantt
                options={{
                  showGantt: true,
                  toolbarOptions,
                  handleEdit,
                }}
                data={ganttData}
              />
            </Stack>
          </Box>
        </Stack>
      </Sidebar>
    </>
  );
}

export { StatisticsGantt };
