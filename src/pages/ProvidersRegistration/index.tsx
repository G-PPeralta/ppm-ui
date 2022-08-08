import { BsPlusLg } from 'react-icons/bs';

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

import Sidebar from 'components/SideBar';

import { useProjects } from 'hooks/useProjects';

import { postProject } from 'services/post/ProjectRegister';

import FormCNPJ from './Components/FormCNPJ';
import FormEmail from './Components/FormEmail';
import FormInvoice from './Components/FormInvoice';
import FormNomeFornecedor from './Components/FormNomeFornecedor';
import FormNumeroContrato from './Components/FormNumeroContrato';
import FormOutrasInformacoes from './Components/FormOutrasInformacoes';
import FormPolo from './Components/FormPolo';
import FormRepresentantePontoFocal from './Components/FormRepresentantePontoFocal';
import FormServicos from './Components/FormServicos';
import FormStatusFornecedor from './Components/FormStatusFornecedor';
import FormTelefone from './Components/FormTelefone';

export function ProvidersRegistration() {
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
                Cadastrar Fornecedor
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
                        <FormPolo projectsForm={projectsForm} />
                        <FormServicos projectsForm={projectsForm} />
                        <FormStatusFornecedor projectsForm={projectsForm} />
                      </Flex>
                    </Stack>
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormNomeFornecedor projectsForm={projectsForm} />
                        <FormNumeroContrato projectsForm={projectsForm} />
                      </Flex>
                    </Stack>
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormRepresentantePontoFocal
                          projectsForm={projectsForm}
                        />
                        <FormEmail projectsForm={projectsForm} />
                        <FormTelefone projectsForm={projectsForm} />
                      </Flex>
                    </Stack>
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormInvoice projectsForm={projectsForm} />
                        <FormCNPJ projectsForm={projectsForm} />
                      </Flex>
                    </Stack>

                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormOutrasInformacoes projectsForm={projectsForm} />
                      </Flex>
                    </Stack>

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
                        leftIcon={<BsPlusLg />}
                      >
                        {loading ? (
                          <Ring
                            speed={2}
                            lineWeight={5}
                            color="white"
                            size={24}
                          />
                        ) : (
                          'CADASTRAR FORNECEDOR'
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
