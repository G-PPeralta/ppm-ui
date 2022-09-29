import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Box,
  Text,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { StatisticsGanttProps } from "interfaces/Services";

import Sidebar from "components/SideBar";

import { Gantt } from "./components/Gantt";

function StatisticsGantt() {
  const { state }: any = useLocation();
  const [ganttData, setGanttData] = useState<StatisticsGanttProps[]>();
  const toolbarOptions = ["ZoomIn", "ZoomOut"];
  const [projeto, setProjeto] = useState({ sonda: "", poco: "" });

  const formatToGanttData = (data: any) => {
    if (!data) return;
    const newGantt = data.atividades?.map((t: any) => {
      // TODO: setar qual valor (use) usado no duration
      let duration;
      if (
        Number(t.pct_plan) === 1 ||
        Number(t.hrs_reais) > Number(t.hrs_totais)
      ) {
        duration = Number(t.hrs_reais);
      } else {
        duration = Number(t.hrs_totais);
      }
      const { max, min, med, dp } = data;
      let color;
      if (duration < med - dp) color = "green";
      else if (duration >= med - dp && duration < med + dp / 2)
        color = "yellow";
      else if (duration >= med + dp / 2 && duration < med + dp) color = "red";
      else if (duration >= med + dp) color = "black";
      return {
        TaskID: t.id_atividade,
        TaskName: t.nome_atividade,
        StartDate: t.inicio_real, // t.inicio_real,
        EndDate: t.fim_real, // t.,
        BaselineStartDate: t.inicio_planejado,
        BaselineEndDate: t.fim_planejado,
        Duration: duration,
        BaselineDuration: Number(t.hrs_totais),
        Progress: Number(t.pct_plan) * 100,
        max,
        min,
        med,
        dp,
        color,
      };
    });
    setGanttData(newGantt);
    setProjeto({
      sonda: data.sonda,
      poco: data.poco,
    });
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
            <Heading as="h3" size="md" mb={5}>
              {projeto.sonda}
            </Heading>
            <Text>{projeto.poco}</Text>
            <Stack spacing="8">
              <Gantt toolbarOptions={toolbarOptions} data={ganttData} />
            </Stack>
          </Box>
        </Stack>
      </Sidebar>
    </>
  );
}

export { StatisticsGantt };
