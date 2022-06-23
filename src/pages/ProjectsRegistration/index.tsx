import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  HStack,
  Image,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';
import logo from 'assets/logo.png';

import Sidebar from 'components/SideBar';
import { TextError } from 'components/TextError';

import { usePermissions } from 'hooks/usePermissions';
import { useProjects } from 'hooks/useProjects';

export function ProjectsRegistration() {
  const { projectsForm, loading } = useProjects();
  const { roles } = usePermissions();
  const wd = window.innerWidth;
  return (
    <>
      <Sidebar>
        {/*  <Flex
          w={useBreakpointValue({ base: '100%', md: 'auto' })}
          h="100vh"
          align="center"
          justify="center"
          bg={useBreakpointValue({ base: 'white', sm: '#EDF2F7' })}
        > */}
        {loading && (
          <Flex display={'flex'} align={'center'} justify={'center'} h={'90vh'}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
        <Stack spacing="8">
          <Box
            py={{ base: '0', sm: '16' }}
            px={{ base: '4', sm: '10' }}
            w={useBreakpointValue({
              base: '20rem',
              sm: '35rem',
              md: '60rem',
            })}
            bg={useBreakpointValue({ base: 'transparent', sm: 'white' })}
            boxShadow={{
              base: 'none',
              sm: useColorModeValue('md', 'md-dark'),
            }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing="6">
              <Stack spacing={{ base: '2', md: '3' }} align="center">
                <Image
                  src={logo}
                  display="flex"
                  align="center"
                  w={56}
                  justifyContent="center"
                />
                <HStack spacing="1" justify="center" />
              </Stack>
            </Stack>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                projectsForm.handleSubmit(e);
              }}
            >
              <Box display={wd > 100 ? 'flex' : ''}>
                <Stack spacing="6" w="100%">
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="name">PROJETO</FormLabel>
                      <Input
                        isRequired
                        placeholder="Nome do projeto"
                        id="name"
                        type="text"
                        name="name"
                        value={projectsForm.values.name}
                        onChange={projectsForm.handleChange}
                        w={useBreakpointValue({ base: '100%', md: '100%' })}
                      />
                      {projectsForm.errors.name &&
                        projectsForm.touched.name && (
                          <TextError>{projectsForm.errors.name}</TextError>
                        )}
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="description">DESCRIÇÃO</FormLabel>
                      <Input
                        isRequired
                        placeholder="Aquisição e instalação"
                        id="description"
                        type="text"
                        name="description"
                        maxLength={15}
                        value={projectsForm.values.description}
                        onChange={projectsForm.handleChange}
                        w={useBreakpointValue({ base: '100%', md: '100%' })}
                      />
                      {projectsForm.errors.description &&
                        projectsForm.touched.description && (
                          <TextError>
                            {projectsForm.errors.description}
                          </TextError>
                        )}
                    </FormControl>
                  </Stack>
                  <Stack spacing="5">
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormControl>
                        <FormLabel htmlFor="budget">ORÇAMENTO</FormLabel>
                        <Input
                          isRequired
                          placeholder="Ex.: R$ 10.000,00"
                          id="budget"
                          type="text"
                          name="budget"
                          value={projectsForm.values.budget}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        />
                        {projectsForm.errors.budget &&
                          projectsForm.touched.budget && (
                            <TextError>{projectsForm.errors.budget}</TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="departament">
                          DEPARTAMENTO
                        </FormLabel>
                        <Select
                          id="departament"
                          placeholder="Ex.: Projetos"
                          name="departament"
                          value={projectsForm.values.departament}
                          onChange={projectsForm.handleChange}
                          disabled
                        >
                          {roles?.map((role) => (
                            <option key={role?.id} value={role?.id}>
                              {role?.nome_role}
                            </option>
                          ))}
                        </Select>
                        {projectsForm.errors.departament &&
                          projectsForm.touched.departament && (
                            <TextError>
                              {projectsForm.errors.departament}
                            </TextError>
                          )}
                      </FormControl>
                    </Flex>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormControl>
                        <FormLabel htmlFor="totalDays">DIAS (TOTAL)</FormLabel>
                        <Input
                          isRequired
                          placeholder="Ex.: 350"
                          id="totalDays"
                          type="totalDays"
                          name="totalDays"
                          value={projectsForm.values.totalDays}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        />
                        {projectsForm.errors.totalDays &&
                          projectsForm.touched.totalDays && (
                            <TextError>
                              {projectsForm.errors.totalDays}
                            </TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="realDays">DIAS (REAL)</FormLabel>
                        <Input
                          isRequired
                          placeholder="Ex.: 160"
                          id="realDays"
                          type="realDays"
                          name="realDays"
                          value={projectsForm.values.realDays}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {projectsForm.errors.realDays &&
                          projectsForm.touched.realDays && (
                            <TextError>
                              {projectsForm.errors.realDays}
                            </TextError>
                          )}
                      </FormControl>
                    </Flex>
                  </Stack>
                  <Stack spacing="5">
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormControl>
                        <FormLabel htmlFor="start">INÍCIO</FormLabel>
                        <Input
                          isRequired
                          placeholder="dd/mm/aaaa"
                          id="start"
                          type="text"
                          name="start"
                          value={projectsForm.values.start}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        />
                        {projectsForm.errors.start &&
                          projectsForm.touched.start && (
                            <TextError>{projectsForm.errors.start}</TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="realDays">FIM</FormLabel>
                        <Input
                          isRequired
                          placeholder="dd/mm/aaaa"
                          id="end"
                          type="end"
                          name="end"
                          value={projectsForm.values.end}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {projectsForm.errors.end &&
                          projectsForm.touched.end && (
                            <TextError> {projectsForm.errors.start}</TextError>
                          )}
                      </FormControl>
                    </Flex>
                  </Stack>
                  <FormControl>
                    <FormLabel htmlFor="priority">PRIORIDADE</FormLabel>
                    <Select
                      id="priority"
                      placeholder="Ex.: Alta"
                      name="priority"
                      value={projectsForm.values.priority}
                      onChange={projectsForm.handleChange}
                      disabled
                    >
                      {roles?.map((role) => (
                        <option key={role?.id} value={role?.id}>
                          {role?.nome_role}
                        </option>
                      ))}
                    </Select>
                    {projectsForm.errors.priority &&
                      projectsForm.touched.priority && (
                        <TextError>{projectsForm.errors.priority}</TextError>
                      )}
                  </FormControl>

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
        </Stack>
        {/* </Flex> */}
      </Sidebar>
    </>
  );
}
