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

import { getProjetos } from "services/get/GetProject";

import { ProjectSummary } from "../summary";

type CardProjeto = {
  name: string;
  responsible: string;
  startDate: string;
  endDate: string;
  budget: number;
  realized: number;
  cpi: string;
  spi: string;
};

export function Indicadores() {
  const [projectsGreen, setProjectsGreen] = useState<CardProjeto[]>([]);
  const [projectsRed, setProjectsRed] = useState<CardProjeto[]>([]);

  const handleProjetosDetalhados = async () => {
    const projetos = await getProjetos();
    const formatados: any[] = projetos.map((e) => ({
      name: e.nome_projeto,
      responsible: e.responsavel,
      startDate: new Date(e.data_inicio).toLocaleDateString(),
      endDate: new Date(e.data_fim).toLocaleDateString(),
      budget: e.vlr_orcado,
      realized: e.vlr_cr,
      cpi: e.vlr_cpi,
      spi: e.vlr_spi,
    }));
    setProjectsGreen(formatados.filter((e) => e.cpi === 1));
    setProjectsRed(formatados.filter((e) => e.cpi !== 1));
  };

  //   {
  //     "id": 24,
  //     "nome_projeto": "Financeiro",
  //     "responsavel": "Dani C/Roberto",
  //     "vlr_cr": "62913.36",
  //     "vlr_orcado": "5000",
  //     "prioridade": "Alto",
  //     "complexidade": "Acima de R$3.000.000,01 (Alto)",
  //     "polo_id": 2,
  //     "polo": "Tucano Sul",
  //     "coordenador": "Eduardo",
  //     "coordenador_id": 86,
  //     "data_inicio": "2022-11-11T00:00:00.000Z",
  //     "data_fim": "2022-11-15T00:00:00.000Z",
  //     "pct": 0,
  //     "descricao": "xxx",
  //     "justificativa": "xxx",
  //     "id_projeto_real": 24,
  //     "vlr_cpi": "0",
  //     "vlr_spi": "0",
  //     "vlr_ranking": "16"
  // }

  useEffect(() => {
    handleProjetosDetalhados();
  }, []);

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
