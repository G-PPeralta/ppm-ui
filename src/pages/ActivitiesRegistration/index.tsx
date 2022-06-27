import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  useBreakpointValue,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

import Sidebar from 'components/SideBar';
import { TextError } from 'components/TextError';

import { useActivities } from 'hooks/useActivities';

export function ActivitiesRegistration() {
  const { activitiesForm, loading } = useActivities();

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
              <Heading as="h3" size="md" mb="6">
                Cadastro de Ações
              </Heading>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  activitiesForm.handleSubmit(e);
                }}
              >
                <Stack spacing="6">
                  <Stack spacing="5">
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormControl>
                        <FormLabel htmlFor="area">ÁREA</FormLabel>
                        <Select
                          id="area"
                          name="area"
                          value={activitiesForm.values.area}
                          onChange={activitiesForm.handleChange}
                        >
                          <option value="Administrativo">Administrativo</option>
                          <option value="Projetos">Projetos</option>
                          <option value="Financeiro">Financeiro</option>
                          <option value="RH">RH</option>
                          <option value="TI">TI</option>
                          <option value="Outros">Outros</option>
                        </Select>
                        {activitiesForm.errors.area &&
                          activitiesForm.touched.area && (
                            <TextError>{activitiesForm.errors.area}</TextError>
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
                        <FormLabel htmlFor="responsible">RESPONSÁVEL</FormLabel>
                        <Input
                          isRequired
                          placeholder="Ada Lovelace"
                          id="responsible"
                          type="responsible"
                          name="responsible"
                          value={activitiesForm.values.responsible}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {activitiesForm.errors.responsible &&
                          activitiesForm.touched.responsible && (
                            <TextError>
                              {activitiesForm.errors.responsible}
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
                        <FormLabel htmlFor="c">C</FormLabel>
                        <Input
                          isRequired
                          placeholder="123"
                          id="c"
                          type="c"
                          name="c"
                          value={activitiesForm.values.c}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        />
                        {activitiesForm.errors.c &&
                          activitiesForm.touched.c && (
                            <TextError>{activitiesForm.errors.c}</TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="spt">SPT</FormLabel>
                        <Input
                          isRequired
                          placeholder="ABC"
                          id="spt"
                          type="spt"
                          name="spt"
                          value={activitiesForm.values.spt}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {activitiesForm.errors.spt &&
                          activitiesForm.touched.spt && (
                            <TextError>{activitiesForm.errors.spt}</TextError>
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
                        <FormLabel htmlFor="pit">POÇO</FormLabel>
                        <Select
                          id="pit"
                          name="pit"
                          value={activitiesForm.values.pit}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        >
                          <option value="pit1">Poço 1</option>
                          <option value="pit2">Poço 2</option>
                          <option value="pit3">Poço 3</option>
                          <option value="pit4">Poço 4</option>
                          <option value="pit5">Poço 5</option>
                          <option value="pit6">Poço 6</option>
                        </Select>
                        {activitiesForm.errors.pit &&
                          activitiesForm.touched.pit && (
                            <TextError>{activitiesForm.errors.pit}</TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="id">ID</FormLabel>
                        <Select
                          id="id"
                          name="id"
                          value={activitiesForm.values.id}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        >
                          <option value="id1">ACD123-C</option>
                          <option value="id2">GAS983-T</option>
                          <option value="id3">LKJ435-E</option>
                          <option value="id4">OIU987-U</option>
                          <option value="id5">QWC943-H</option>
                          <option value="id6">MNB573-K</option>
                        </Select>
                        {activitiesForm.errors.id &&
                          activitiesForm.touched.id && (
                            <TextError>{activitiesForm.errors.id}</TextError>
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
                        <FormLabel htmlFor="task">TAREFA</FormLabel>
                        <Select
                          id="task"
                          name="task"
                          value={activitiesForm.values.task}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        >
                          <option value="task1">Tarefa 1</option>
                          <option value="task2">Tarefa 2</option>
                          <option value="task3">Tarefa 3</option>
                          <option value="task4">Tarefa 4</option>
                          <option value="task5">Tarefa 5</option>
                          <option value="task6">Tarefa 6</option>
                        </Select>
                        {activitiesForm.errors.task &&
                          activitiesForm.touched.task && (
                            <TextError>{activitiesForm.errors.task}</TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="order">ORDEM</FormLabel>
                        <Input
                          isRequired
                          placeholder="Pré definido"
                          id="order"
                          type="order"
                          name="order"
                          value={activitiesForm.values.order}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {activitiesForm.errors.order &&
                          activitiesForm.touched.order && (
                            <TextError>{activitiesForm.errors.order}</TextError>
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
                        <FormLabel htmlFor="directSuccessors">
                          SUCESSORES DIRETOS
                        </FormLabel>
                        <Input
                          isRequired
                          placeholder="Pré definido"
                          id="directSuccessors"
                          type="directSuccessors"
                          name="directSuccessors"
                          value={activitiesForm.values.directSuccessors}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {activitiesForm.errors.directSuccessors &&
                          activitiesForm.touched.directSuccessors && (
                            <TextError>
                              {activitiesForm.errors.directSuccessors}
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
                        <FormLabel htmlFor="directPrecedents">
                          PRECEDENTES DIRETOS
                        </FormLabel>
                        <Input
                          isRequired
                          placeholder="Pré definido"
                          id="directPrecedents"
                          type="directPrecedents"
                          name="directPrecedents"
                          value={activitiesForm.values.directPrecedents}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {activitiesForm.errors.directPrecedents &&
                          activitiesForm.touched.directPrecedents && (
                            <TextError>
                              {activitiesForm.errors.directPrecedents}
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
                        <FormLabel htmlFor="phase">FASE</FormLabel>
                        <Input
                          isRequired
                          placeholder="Pré definido"
                          id="phase"
                          type="phase"
                          name="phase"
                          value={activitiesForm.values.phase}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {activitiesForm.errors.phase &&
                          activitiesForm.touched.phase && (
                            <TextError>{activitiesForm.errors.phase}</TextError>
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
                        <FormLabel htmlFor="plannedDuration">
                          DURAÇÃO PLANEJADA
                        </FormLabel>
                        <Input
                          isRequired
                          placeholder="Pré definido"
                          id="plannedDuration"
                          type="plannedDuration"
                          name="plannedDuration"
                          value={activitiesForm.values.plannedDuration}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {activitiesForm.errors.plannedDuration &&
                          activitiesForm.touched.plannedDuration && (
                            <TextError>
                              {activitiesForm.errors.plannedDuration}
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
                          type="date"
                          name="start"
                          value={activitiesForm.values.start}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        />
                        {activitiesForm.errors.start &&
                          activitiesForm.touched.start && (
                            <TextError>{activitiesForm.errors.start}</TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="realDays">FIM</FormLabel>
                        <Input
                          isRequired
                          placeholder="dd/mm/aaaa"
                          id="end"
                          type="date"
                          name="end"
                          value={activitiesForm.values.end}
                          onChange={activitiesForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {activitiesForm.errors.end &&
                          activitiesForm.touched.end && (
                            <TextError>{activitiesForm.errors.end}</TextError>
                          )}
                      </FormControl>
                    </Flex>
                  </Stack>
                  <Stack spacing="6">
                    <Button
                      disabled={!activitiesForm.isValid}
                      type="submit"
                      background="origem.300"
                      variant="primary"
                      color="white"
                      _hover={{
                        background: 'origem.500',
                        transition: 'all 0.4s',
                      }}
                      mt="6"
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
              </form>
            </Box>
          </Flex>
        </Stack>
      </Sidebar>
    </>
  );
}
