import {
  Box,
  Button,
  Flex,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

import Sidebar from 'components/SideBar';

import { useProjects } from 'hooks/useProjects';

import { postProject } from 'services/post/ProjectRegister';

import FormClassificacao from './Components/FormClassificacao';
import FormComentarios from './Components/FormComentarios';
import FormComplexidade from './Components/FormComplexidade';
import FormDataFim from './Components/FormDataFim';
import FormDataFimReal from './Components/FormDataFimReal';
import FormDataInicio from './Components/FormDataInicio';
import FormDemanda from './Components/FormDemanda';
import FormDescricao from './Components/FormDescricao';
import FormDivisao from './Components/FormDivisao';
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
import { RegisterResponsibleModal } from './Components/RegisterResponsibleModal';

export function ProjectsRegistration() {
  const wd = window.innerWidth;
  const { projectsForm, loading } = useProjects();

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
              py={{ base: '0', sm: '16' }}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  projectsForm.handleSubmit(e);
                }}
              >
                <Box display={wd > 100 ? 'flex' : ''}>
                  <Stack spacing="6" w="100%">
                    <Stack spacing="5">
                      <RegisterResponsibleModal />
                      <FormNomeProjeto projectsForm={projectsForm} />
                      <FormDescricao projectsForm={projectsForm} />
                    </Stack>
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormValorTotalPrevisto projectsForm={projectsForm} />
                        <FormClassificacao projectsForm={projectsForm} />
                        <FormSolicitante projectsForm={projectsForm} />
                      </Flex>
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormJustificativa projectsForm={projectsForm} />
                        <FormPolo projectsForm={projectsForm} />
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
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormPrioridade projectsForm={projectsForm} />
                      <FormComplexidade projectsForm={projectsForm} />
                    </Flex>

                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormLocal projectsForm={projectsForm} />
                      <FormDivisao projectsForm={projectsForm} />
                      <FormStatusProjeto projectsForm={projectsForm} />
                    </Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormGate projectsForm={projectsForm} />
                      <FormTipoProjeto projectsForm={projectsForm} />
                    </Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormDemanda projectsForm={projectsForm} />
                    </Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormComentarios projectsForm={projectsForm} />
                    </Flex>

                    <Stack spacing="6">
                      <Button
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
                          'Cadastrar'
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
