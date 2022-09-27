import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Box,
  Button,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { StatisticsGanttProps, StatisticsTableData } from "interfaces/Services";

import Sidebar from "components/SideBar";

import { Gantt } from "./components/Gantt";

function StatisticsGantt() {
  const { state }: any = useLocation();
  const [ganttData, setGanttData] = useState<StatisticsGanttProps[]>();
  const toolbarOptions = ["ZoomIn", "ZoomOut"];

  const formatToGanttData = (data: StatisticsTableData[]) => {
    if (!data) return;
    const newGantt = data.map((p: StatisticsTableData) => ({
      TaskID: p.id_poco,
      TaskName: p.poco,
      // StartDate: "2022-12-11T03:00:00.000Z",
      // EndDate: "2022-12-14T03:00:00.000Z",
      // BaselineStartDate: "2022-12-11T03:00:00.000Z",
      // BaselineEndDate: "2022-12-12T03:00:00.000Z",
      // Duration: 0, // Number(p.hrs_reais),
      // BaselineDuration: 8, // Number(p.hrs_totais),
      // Progress: Math.random() * 100, // TODO: Math.floor(atividade.hrs_reais / atividade.hrs_totais)
      subtasks: p.atividades?.map((t) => ({
        // Item: item || "",
        TaskID: t.id_atividade,
        TaskName: t.nome_atividade,
        StartDate: t.inicio_real, // t.inicio_real,
        EndDate: t.fim_real, // t.,
        BaselineStartDate: t.inicio_planejado
          ? new Date(t.inicio_planejado)
          : null,
        BaselineEndDate: t.fim_planejado,
        Duration: Number(t.hrs_reais),
        BaselineDuration: Number(t.hrs_totais),
        Progress: Number(t.pct_plan) * 100,
      })),
    }));
    setGanttData(newGantt);
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
              Projetos
            </Heading>
            <Button
              variant="outline"
              border={"2px solid"}
              borderColor={"origem.500"}
              textColor={"origem.500"}
              _hover={{
                borderColor: "origem.600",
                backgroundColor: "origem.500",
                textColor: "white",
                transition: "all 0.4s",
              }}
            >
              Gerar Cronograma
            </Button>

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
