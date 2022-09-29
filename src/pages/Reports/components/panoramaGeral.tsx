import { Flex } from "@chakra-ui/react";

import CurvaS from "./curvaS";
import GenericGantt from "./geericGantt";

export function PanoramaGeral() {
  const curveSData = [
    {
      mes: "Nov/2022",
      cronogramaPrevisto: 6,
      cronogramaRealizado: 30,
      capexPrevisto: 40,
      capexRealizado: 50,
    },
    {
      mes: "Dez/2021",
      cronogramaPrevisto: 60,
      cronogramaRealizado: 20,
      capexPrevisto: 35,
      capexRealizado: 50,
    },
    {
      mes: "Nov/2022",
      cronogramaPrevisto: 6,
      cronogramaRealizado: 30,
      capexPrevisto: 40,
      capexRealizado: 50,
    },
  ];

  const ganttData = [
    {
      taskID: 1,
      taskName: "Project Initiation",
      startDate: new Date("04/02/2020"),
      endDate: new Date("04/21/2020"),
      subtasks: [
        {
          taskID: 2,
          taskName: "Identify Site location",
          startDate: new Date("04/06/2020"),
          duration: 4,
          progress: 50,
        },
        {
          taskID: 3,
          taskName: "Perform Soil test",
          startDate: new Date("04/10/2020"),
          duration: 4,
          progress: 50,
          predeceesor: "2FS",
        },
        {
          taskID: 4,
          taskName: "Soil test approval",
          startDate: new Date("04/12/2020"),
          duration: 4,
          progress: 50,
        },
      ],
    },
    {
      taskID: 5,
      taskName: "Project Estimation",
      startDate: new Date("04/02/2020"),
      endDate: new Date("04/21/2020"),
      subtasks: [
        {
          taskID: 6,
          taskName: "Develop floor plan for estimation",
          startDate: new Date("04/03/2020"),
          duration: 3,
          progress: 50,
        },
        {
          taskID: 7,
          taskName: "List materials",
          startDate: new Date("04/04/2020"),
          duration: 3,
          progress: 50,
        },
        {
          taskID: 8,
          taskName: "Estimation approval",
          startDate: new Date("04/08/2020"),
          duration: 3,
          progress: 50,
        },
      ],
    },
  ];

  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"2em"}>
        <CurvaS data={curveSData} />
        <GenericGantt data={ganttData} />
      </Flex>
    </>
  );
}
