import { AiFillCheckCircle } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";

import { Flex, Heading } from "@chakra-ui/react";

import { ProjectSummary } from "./summary";

const projectsRed = [
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
];
const projectsGreen = [
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
      <Flex direction={"column"} w={"100%"}>
        <Flex
          direction={"column"}
          w={"100%"}
          boxShadow={"md"}
          borderRadius={"2xl"}
          border={"1px"}
          borderColor={"gray.200"}
          padding={4}
          gap={"1.4em"}
          marginTop={"1.4em"}
        >
          <Flex direction={"row"} alignItems={"center"} gap={2}>
            <RiCloseCircleFill color={"#F40606"} size={25} />
            <Heading
              as="h3"
              size={{ base: "md", md: "lg" }}
              fontWeight={"semibold"}
              color={"gray.800"}
            >
              Com Problemas
            </Heading>
            <Heading
              as="h3"
              size={{ base: "md", md: "lg" }}
              fontWeight={"semibold"}
              color={"#F40606"}
            >
              {projectsRed.length} projetos
            </Heading>
          </Flex>
          {projectsRed &&
            projectsRed.map((project) => (
              <ProjectSummary data={project} table={true}></ProjectSummary>
            ))}
        </Flex>
        <Flex
          direction={"column"}
          w={"100%"}
          boxShadow={"md"}
          borderRadius={"2xl"}
          border={"1px"}
          borderColor={"gray.200"}
          padding={4}
          gap={"1.4em"}
          marginTop={"1.4em"}
        >
          <Flex direction={"row"} alignItems={"center"} gap={2}>
            <AiFillCheckCircle color={"#059502"} />
            <Heading
              as="h3"
              size={{ base: "md", md: "lg" }}
              fontWeight={"semibold"}
              color={"gray.800"}
            >
              Sem Problemas
            </Heading>
            <Heading
              as="h3"
              size={{ base: "md", md: "lg" }}
              fontWeight={"semibold"}
              color={"#059502"}
            >
              {projectsGreen.length} projetos
            </Heading>
          </Flex>
          {projectsGreen &&
            projectsGreen.map((project) => (
              <ProjectSummary data={project} table={true}></ProjectSummary>
            ))}
        </Flex>
      </Flex>
    </>
  );
}
