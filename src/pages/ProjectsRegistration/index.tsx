import { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

import Sidebar from 'components/SideBar';

import { useProjects } from 'hooks/useProjects';

import { postProject } from 'services/post/ProjectRegister';

import { AdicionarCoordenadorModal } from './Components/AdicionarCoordenadorModal';
import { AdicionarResponsavelModal } from './Components/AdicionarResponsavelModal';
import FormClassificacao from './Components/FormClassificacao';
import FormComentarios from './Components/FormComentarios';
import FormComplexidade from './Components/FormComplexidade';
import FormDataFim from './Components/FormDataFim';
import FormDataFimReal from './Components/FormDataFimReal';
import FormDataInicio from './Components/FormDataInicio';
// import FormDemanda from './Components/FormDemanda';
import FormDescricao from './Components/FormDescricao';
import FormDisabledCoordenador from './Components/FormDisabledCoordenador';
import FormDisabledResponsavel from './Components/FormDisabledResponsavel';
import FormDivisao from './Components/FormDivisao';
import FormElementoPep from './Components/FormElementoPep';
import FormGate from './Components/FormGate';
import FormDataInicioReal from './Components/FormInicioReal';
import FormJustificativa from './Components/FormJustificativa';
import FormLocal from './Components/FormLocal';
import FormNomeProjeto from './Components/FormNomeProjeto';
import FormPolo from './Components/FormPolo';
import FormPrioridade from './Components/FormPrioridade';
import FormSolicitante from './Components/FormSolicitante';
import FormStatusProjeto from './Components/FormStatusProjeto';
import FormTipoProjeto from './Components/FormTipoProjeto';
import FormValorTotalPrevisto from './Components/FormValorTotalPrevisto';

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
          <Flex display={'flex'} align={'center'} justify={'center'} h={'90vh'}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
        <Stack spacing="8">
          <Flex
            w={useBreakpointValue({ base: '100%', md: 'auto' })}
            align="center"
            justify="center"
            bg={useBreakpointValue({ base: 'white', sm: '#EDF2F7' })}
          >
            <Box
              py={{ base: '0', sm: '10' }}
              px={{ base: '4', sm: '10' }}
              w={useBreakpointValue({
                base: '20rem',
                sm: '35rem',
                md: '60rem',
                lg: '80rem',
              })}
              bg={useBreakpointValue({ base: 'transparent', sm: 'white' })}
              boxShadow={{
                base: 'none',
                sm: useColorModeValue('md', 'md-dark'),
              }}
              borderRadius={{ base: 'none', sm: 'xl' }}
            >
              <Heading as="h3" size="md" mb={5}>
                Cadastrar Projeto
              </Heading>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  projectsForm.handleSubmit(e);
                }}
              >
                <Box display={wd > 100 ? 'flex' : ''}>
                  <Stack spacing="6" w="100%">
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <AdicionarResponsavelModal
                          projectsForm={projectsForm}
                        />
                        <AdicionarCoordenadorModal
                          projectsForm={projectsForm}
                        />
                      </Flex>
                    </Stack>
                    <Stack spacing="5">
                      <FormDisabledResponsavel projectsForm={projectsForm} />
                      <FormDisabledCoordenador projectsForm={projectsForm} />
                    </Stack>
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormPolo projectsForm={projectsForm} />
                        <FormLocal projectsForm={projectsForm} />
                        <FormSolicitante projectsForm={projectsForm} />
                        <FormPrioridade projectsForm={projectsForm} />
                        <FormStatusProjeto projectsForm={projectsForm} />
                      </Flex>
                    </Stack>
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormNomeProjeto projectsForm={projectsForm} />
                        <FormElementoPep projectsForm={projectsForm} />
                      </Flex>
                    </Stack>
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormDataInicio projectsForm={projectsForm} />
                        <FormDataFim projectsForm={projectsForm} />
                        <FormDataInicioReal projectsForm={projectsForm} />
                        <FormDataFimReal projectsForm={projectsForm} />
                      </Flex>
                    </Stack>

                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormValorTotalPrevisto projectsForm={projectsForm} />
                        <FormValorTotalPrevisto projectsForm={projectsForm} />
                        <FormComplexidade projectsForm={projectsForm} />
                      </Flex>
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormDivisao projectsForm={projectsForm} />
                        <FormClassificacao projectsForm={projectsForm} />
                        <FormTipoProjeto projectsForm={projectsForm} />
                        <FormGate projectsForm={projectsForm} />
                      </Flex>
                    </Stack>
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormDescricao projectsForm={projectsForm} />
                        <FormJustificativa projectsForm={projectsForm} />
                      </Flex>
                    </Stack>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
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
                    <Stack>
                      <Button
                        mt={4}
                        disabled={!projectsForm.isValid}
                        type="submit"
                        background="origem.300"
                        variant="primary"
                        color="white"
                        _hover={{
                          background: 'origem.500',
                          transition: 'all 0.4s',
                        }}
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
                            <BsPlusLg />
                            <Text ml={2}>CADASTRAR PROJETO</Text>
                          </>
                        )}
                      </Button>
                    </Stack>
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
