//  CRIADO EM: 7/2022
//  AUTOR: Yolanda Ferreira.
//  DESCRIÇÃO DO ARQUIVO: Indicadores da situação do relatório

import { useEffect, useState } from "react";
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
import { Ring } from "@uiball/loaders";

import { getProjetos } from "services/get/GetProject";

import { ProjectSummary } from "./summary";

type CardProjeto = {
  name: string;
  responsible: string;
  startDate: string;
  endDate: string;
  budget: string;
  realized: string;
  cpi: string;
  spi: string;
  percent?: string;
};

export function Indicadores() {
  const [projectsGreen, setProjectsGreen] = useState<CardProjeto[]>([]);
  const [projectsRed, setProjectsRed] = useState<CardProjeto[]>([]);

  const handleProjetosDetalhados = async () => {
    const projetos = await getProjetos();

    const _formatados: any[] = projetos.map(async (e) => ({
      name: e.nome_projeto,
      responsible: e.responsavel,
      startDate:
        e.data_inicio === null
          ? "NA"
          : new Date(e.data_inicio).toLocaleDateString(),
      endDate:
        e.data_fim === null ? "NA" : new Date(e.data_fim).toLocaleDateString(),
      budget: e.vlr_orcado,
      realized: e.vlr_cr,
      cpi: e.vlr_cpi,
      spi: e.vlr_spi,
      percent: e.pct || "0",
    }));

    const formatados = await Promise.all(_formatados);
    setProjectsGreen(formatados.filter((e) => e.cpi === "1"));
    setProjectsRed(formatados.filter((e) => e.cpi !== "1"));
  };

  useEffect(() => {
    handleProjetosDetalhados();
  }, []);

  return (
    <>
      {projectsRed.length > 0 ? (
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
                    <Flex direction={{ base: "column", md: "row" }}>
                      <Heading
                        as="h3"
                        fontSize={"24px"}
                        fontWeight={"semibold"}
                        color={"gray.800"}
                        mr={4}
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
                        table={false}
                        tableData={{ columnNames: [], rows: [] }}
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
                    <Flex direction={{ base: "column", md: "row" }}>
                      <Heading
                        as="h3"
                        fontSize={"24px"}
                        fontWeight={"semibold"}
                        color={"gray.800"}
                        mr={4}
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
                        table={false}
                        tableData={{ columnNames: [], rows: [] }}
                      ></ProjectSummary>
                    ))}
                </AccordionPanel>
              </Flex>
            </AccordionItem>
          </Accordion>
        </Flex>
      ) : (
        <Flex justify={"center"} gap={4} w={"100%"}>
          <Ring speed={2} lineWeight={5} color="blue" size={64} />
        </Flex>
      )}
    </>
  );
}
