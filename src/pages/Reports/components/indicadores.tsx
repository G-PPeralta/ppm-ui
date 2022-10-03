import { Flex } from "@chakra-ui/react";

import { ProjectSummary } from "./summary";

const projects = [
  {
    name: "Projeto 1",
    responsible: "Yolanda Ferreira",
    startDate: "25/07/2022",
    endDate: "25/07/2022",
    budget: 100000,
    realized: 20000,
  },

  {
    name: "Projeto 2",
    responsible: "Yolanda Ferreira",
    startDate: "25/07/2022",
    endDate: "25/07/2022",
    budget: 100000,
    realized: 50000,
  },

  {
    name: "Projeto 3",
    responsible: "Yolanda Ferreira",
    startDate: "25/07/2022",
    endDate: "25/07/2022",
    budget: 6576585,
    realized: 4932438.75,
  },
];

export function Indicadores() {
  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"1.4em"} marginTop={"1.4em"}>
        {projects &&
          projects.map((project) => (
            <ProjectSummary data={project} table={true}></ProjectSummary>
          ))}
      </Flex>
    </>
  );
}
