import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  IconButton,
  Text,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { StatisticsGanttProps } from "interfaces/Services";

import Sidebar from "components/SideBar";

import { useToast } from "contexts/Toast";

import { patchOperacoesEstatisticas } from "services/update/OperacoesEstatisticas";

import { Gantt } from "./components/Gantt";
import ModalEditarCronograma from "./components/ModalEditarCronograma";

function StatisticsGantt() {
  const { state }: any = useLocation();
  const navigate = useNavigate();
  const [ganttData, setGanttData] = useState<StatisticsGanttProps[]>();
  const toolbarOptions = ["ZoomIn", "ZoomOut"];
  const [refresh, setRefresh] = useState(false);
  const [projeto, setProjeto] = useState({ sonda: "", poco: "" });
  const { toast } = useToast();

  const formatToGanttData = (data: any) => {
    if (!data) return;
    const newGantt = data.atividades?.map((t: any) =>
      // TODO: setar qual valor (use) usado no duration
      // const duration = data[use];
      // const real = Number(t.hrs_reais);
      // const total = Number(t.hrs_totais);
      // const duration = real > total ? real : total;
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

      ({
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
        max: Number(t.vlr_max),
        min: Number(t.vlr_min),
        med: Number(t.vlr_media),
        dp: Number(t.vlr_dp),
      })
    );
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
              <Flex mb={5} justify={"space-between"} wrap={"wrap"}>
                <IconButton
                  aria-label="voltar"
                  color={"black"}
                  backgroundColor="transparent"
                  size="lg"
                  icon={<FiChevronLeft />}
                  onClick={() => navigate(`/estatisticas`)}
                />
                <Box>
                  <Heading as="h3" size="md">
                    {projeto.sonda}
                  </Heading>
                  <Text>{projeto.poco}</Text>
                </Box>

                <Flex gap={2} flex={2} justify={"end"} align={"end"}>
                  <ModalEditarCronograma
                    refresh={refresh}
                    setRefresh={setRefresh}
                    atual={state.data}
                  />
                </Flex>
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
