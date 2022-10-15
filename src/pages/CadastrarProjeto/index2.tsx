import { useEffect, useState } from "react";
// import { BsPlusLg } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { useProjects } from "hooks/useProjects";

import { postProject } from "services/post/ProjectRegister";

import { AdicionarCoordenadorModal } from "./Components/AdicionarCoordenadorModal";
import { AdicionarResponsavelModal } from "./Components/AdicionarResponsavelModal";
import FormClassificacao from "./Components/FormClassificacao";
import FormComentarios from "./Components/FormComentarios";
import FormComplexidade from "./Components/FormComplexidade";
import FormDataFim from "./Components/FormDataFim";
// import FormDataFimReal from "./Components/FormDataFimReal";
import FormDataInicio from "./Components/FormDataInicio";
// import FormDemanda from './Components/FormDemanda';
import FormDescricao from "./Components/FormDescricao";
import FormDisabledCoordenador from "./Components/FormDisabledCoordenador";
import FormDisabledResponsavel from "./Components/FormDisabledResponsavel";
import FormDivisao from "./Components/FormDivisao";
import FormElementoPep from "./Components/FormElementoPep";
import FormGate from "./Components/FormGate";
// import FormDataInicioReal from "./Components/FormInicioReal";
import FormJustificativa from "./Components/FormJustificativa";
import FormLocal from "./Components/FormLocal";
import FormNomeProjeto from "./Components/FormNomeProjeto";
import FormPolo from "./Components/FormPolo";
import FormPrioridade from "./Components/FormPrioridade";
import FormSolicitante from "./Components/FormSolicitante";
import FormStatusProjeto from "./Components/FormStatusProjeto";
import FormTipoProjeto from "./Components/FormTipoProjeto";
import FormValorTotalPrevisto from "./Components/FormValorTotalPrevisto";

export function ProjectsRegistration() {
  const wd = window.innerWidth;
  const { projectsForm } = useProjects();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Sidebar>
        {loading && (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
        <Stack spacing="8">
          <Flex
            w={useBreakpointValue({ base: "100%", md: "auto" })}
            align="center"
            justify="center"
            bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
          >
            <Box
              py={{ base: "0", sm: "10" }}
              px={{ base: "4", sm: "10" }}
              w={useBreakpointValue({
                base: "20rem",
                sm: "35rem",
                md: "60rem",
                lg: "80rem",
              })}
              bg={useBreakpointValue({ base: "transparent", sm: "white" })}
              boxShadow={{
                base: "none",
                sm: useColorModeValue("md", "md-dark"),
              }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Heading fontWeight={700} fontSize={24} fontFamily={"Mulish"}>
                Cadastrar Projetos
              </Heading>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  projectsForm.handleSubmit(e);
                }}
              >
                <Box display={wd > 100 ? "flex" : ""}>
                  <Stack spacing="6" w="100%">
                    <Flex flexDirection="row" gap={2}>
                      <AdicionarResponsavelModal projectsForm={projectsForm} />
                      <AdicionarCoordenadorModal projectsForm={projectsForm} />
                    </Flex>

                    <Flex flexDirection="row" gap={2}>
                      <FormDisabledResponsavel projectsForm={projectsForm} />
                      <FormDisabledCoordenador projectsForm={projectsForm} />
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={2}
                    >
                      <FormPolo projectsForm={projectsForm} />
                      <FormLocal projectsForm={projectsForm} />
                      <FormSolicitante projectsForm={projectsForm} />
                      <FormPrioridade projectsForm={projectsForm} />
                      <FormStatusProjeto projectsForm={projectsForm} />
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={2}
                    >
                      <FormNomeProjeto projectsForm={projectsForm} />
                      <FormElementoPep projectsForm={projectsForm} />
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={2}
                    >
                      <FormDataInicio projectsForm={projectsForm} />
                      <FormDataFim projectsForm={projectsForm} />
                      {/* <FormDataInicioReal projectsForm={projectsForm} />
                      <FormDataFimReal projectsForm={projectsForm} /> */}
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={2}
                    >
                      <FormValorTotalPrevisto projectsForm={projectsForm} />
                      {/* <FormValorTotalPrevisto projectsForm={projectsForm} /> */}
                      <FormComplexidade projectsForm={projectsForm} />
                    </Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={2}
                    >
                      <FormDivisao projectsForm={projectsForm} />
                      <FormClassificacao projectsForm={projectsForm} />
                      <FormTipoProjeto projectsForm={projectsForm} />
                      <FormGate projectsForm={projectsForm} />
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: "column",
                        md: "row",
                      })}
                      gap={2}
                    >
                      <FormDescricao projectsForm={projectsForm} />
                      <FormJustificativa projectsForm={projectsForm} />
                    </Flex>

                    <Flex flexDir={"column"} gap={10}>
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: "column",
                          md: "row",
                        })}
                      >
                        <FormComentarios projectsForm={projectsForm} />
                      </Flex>

                      {/* <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormDemanda projectsForm={projectsForm} />
                    </Flex> */}

                      <Button
                        h={"56px"}
                        // w={"98px"}
                        background={"#0047BB"}
                        border={"2.3px solid"}
                        color={"white"}
                        variant="primary"
                        _hover={{
                          background: "white",
                          color: "#0047BB",
                          transition: "all 0.4s",
                        }}
                        rightIcon={<FiPlus />}
                        fontSize={"18px"}
                        fontWeight={"700"}
                        onClick={() => postProject}
                      >
                        {loading ? (
                          <Ring
                            speed={2}
                            lineWeight={5}
                            color="white"
                            size={24}
                          />
                        ) : (
                          <>
                            <Text ml={2}>Cadastrar projeto</Text>
                          </>
                        )}
                      </Button>
                    </Flex>
                  </Stack>
                </Box>
              </form>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
