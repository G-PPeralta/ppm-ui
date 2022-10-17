import { AiFillCheckCircle } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
} from "@chakra-ui/react";

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
        <Accordion padding={0} margin={0} allowToggle w={"100%"}>
          <AccordionItem
            border={0}
            w={"100%"}
            boxShadow={"md"}
            borderRadius={"2xl"}
          >
            <Flex
              direction={"column"}
              w={"100%"}
              borderRadius={"2xl"}
              border={"1px"}
              borderColor={"gray.200"}
              padding={4}
              marginTop={"24px"}
            >
              <Flex direction={"row"} justify={"space-between"}>
                <Flex direction={"row"} alignItems={"center"} gap={2}>
                  <RiCloseCircleFill color={"#F40606"} size={20} />
                  <Heading
                    as="h3"
                    fontSize={"24px"}
                    fontWeight={"semibold"}
                    color={"gray.800"}
                  >
                    Com Problemas
                  </Heading>
                  <Heading
                    as="h3"
                    fontSize={"24px"}
                    fontWeight={"semibold"}
                    color={"#F40606"}
                  >
                    {projectsRed.length} projetos
                  </Heading>
                </Flex>
                <Flex>
                  <AccordionButton>
                    <AccordionIcon fontSize={"20px"} />
                  </AccordionButton>
                </Flex>
              </Flex>

              <AccordionPanel w={"100%"} padding={0}>
                {projectsRed &&
                  projectsRed.map((project) => (
                    <ProjectSummary
                      data={project}
                      table={true}
                    ></ProjectSummary>
                  ))}
              </AccordionPanel>
            </Flex>
          </AccordionItem>
        </Accordion>

        <Accordion padding={0} margin={0} allowToggle w={"100%"}>
          <AccordionItem
            border={0}
            w={"100%"}
            boxShadow={"md"}
            borderRadius={"2xl"}
          >
            <Flex
              direction={"column"}
              w={"100%"}
              borderRadius={"2xl"}
              border={"1px"}
              borderColor={"gray.200"}
              padding={4}
              marginTop={"24px"}
            >
              <Flex direction={"row"} justify={"space-between"}>
                <Flex direction={"row"} alignItems={"center"} gap={2}>
                  <AiFillCheckCircle color={"#059502"} size={20} />
                  <Heading
                    as="h3"
                    fontSize={"24px"}
                    fontWeight={"semibold"}
                    color={"gray.800"}
                  >
                    Sem Problemas
                  </Heading>
                  <Heading
                    as="h3"
                    fontSize={"24px"}
                    fontWeight={"semibold"}
                    color={"#059502"}
                  >
                    {projectsGreen.length} projetos
                  </Heading>
                </Flex>
                <Flex>
                  <AccordionButton>
                    <AccordionIcon fontSize={"20px"} />
                  </AccordionButton>
                </Flex>
              </Flex>

              <AccordionPanel w={"100%"} padding={0}>
                {projectsGreen &&
                  projectsGreen.map((project) => (
                    <ProjectSummary
                      data={project}
                      table={true}
                    ></ProjectSummary>
                  ))}
              </AccordionPanel>
            </Flex>
          </AccordionItem>
        </Accordion>
      </Flex>
    </>
  );
}
