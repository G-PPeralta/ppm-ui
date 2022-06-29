import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

import Sidebar from 'components/SideBar';
import { TextError } from 'components/TextError';

import { useProjects } from 'hooks/useProjects';

export function ProjectsRegistration() {
  const { projectsForm, loading } = useProjects();
  const wd = window.innerWidth;

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
                          <FormLabel htmlFor="budget">
                            VALOR TOTAL PREVISTO
                          </FormLabel>
                          <Input
                            isRequired
                            placeholder="Ex.: R$ 10.000,00"
                            id="valorTotalPrevisto"
                            type="text"
                            name="budget"
                            value={projectsForm.values.budget}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '95%' })}
                          />
                          {projectsForm.errors.budget &&
                            projectsForm.touched.budget && (
                              <TextError>
                                {projectsForm.errors.budget}
                              </TextError>
                            )}
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="classification">
                            CLASSIFICAÇÃO
                          </FormLabel>
                          <Select
                            id="classification"
                            name="classification"
                            value={projectsForm.values.classification}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '95%' })}
                          >
                            <option value="geracaoDeROIC">
                              Geração de ROIC
                            </option>
                            <option value="regulatorio">Regulatório</option>
                            <option value="reservatorio">Reservatório</option>
                            <option value="segurançaOperacional">
                              Segurança Operacional
                            </option>
                            <option value="manutençãoEmergencial">
                              Manutenção Emergencial
                            </option>
                            <option value="contingencia">Contingência</option>
                            <option value="melhoria">Melhoria</option>
                          </Select>
                          {projectsForm.errors.classification &&
                            projectsForm.touched.classification && (
                              <TextError>
                                {projectsForm.errors.classification}
                              </TextError>
                            )}
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="requester">SOLICITANTE</FormLabel>
                          <Select
                            id="solicitanteId"
                            name="requester"
                            value={projectsForm.values.requester}
                            onChange={projectsForm.handleChange}
                          >
                            <option value="Operacao">Operação</option>
                            <option value="SMS">SMS</option>
                            <option value="Reservatorio">Reservatório</option>
                            <option value="UTE">UTE</option>
                            <option value="Controle_de_producao">
                              Controle de Produção
                            </option>
                          </Select>
                          {projectsForm.errors.requester &&
                            projectsForm.touched.requester && (
                              <TextError>
                                {projectsForm.errors.requester}
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
                          <FormLabel htmlFor="justification">
                            JUSTIFICATIVA
                          </FormLabel>
                          <Input
                            isRequired
                            placeholder="Ex.: Sistema necessário para medição e entrega de gás."
                            id="justification"
                            type="justification"
                            name="justification"
                            value={projectsForm.values.justification}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '95%' })}
                          />
                          {projectsForm.errors.justification &&
                            projectsForm.touched.justification && (
                              <TextError>
                                {projectsForm.errors.justification}
                              </TextError>
                            )}
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="pole">POLO</FormLabel>
                          <Select
                            id="poloId"
                            name="pole"
                            value={projectsForm.values.pole}
                            onChange={projectsForm.handleChange}
                          >
                            <option value="Tucano Sul">Tucano Sul</option>
                            <option value="Alagoas">Alagoas</option>
                          </Select>
                          {projectsForm.errors.pole &&
                            projectsForm.touched.pole && (
                              <TextError>{projectsForm.errors.pole}</TextError>
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
                          <FormLabel htmlFor="end">FIM</FormLabel>
                          <Input
                            isRequired
                            placeholder="dd/mm/aaaa"
                            id="end"
                            type="date"
                            name="end"
                            value={projectsForm.values.end}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '90%' })}
                          />
                          {projectsForm.errors.end &&
                            projectsForm.touched.end && (
                              <TextError>
                                {' '}
                                {projectsForm.errors.start}
                              </TextError>
                            )}
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="startReal">INÍCIO REAL</FormLabel>
                          <Input
                            isRequired
                            placeholder="dd/mm/aaaa"
                            id="dataInicioReal"
                            type="date"
                            name="startReal"
                            value={projectsForm.values.startReal}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '95%' })}
                          />
                          {projectsForm.errors.startReal &&
                            projectsForm.touched.startReal && (
                              <TextError>
                                {projectsForm.errors.startReal}
                              </TextError>
                            )}
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="endReal">FIM REAL</FormLabel>
                          <Input
                            isRequired
                            placeholder="dd/mm/aaaa"
                            id="dataFimReal"
                            type="date"
                            name="endReal"
                            value={projectsForm.values.endReal}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '100%' })}
                          />
                          {projectsForm.errors.endReal &&
                            projectsForm.touched.endReal && (
                              <TextError>
                                {' '}
                                {projectsForm.errors.endReal}
                              </TextError>
                            )}
                        </FormControl>
                      </Flex>
                    </Stack>
                    <Flex
                      flexDirection={useBreakpointValue({
                        base: 'column',
                        md: 'row',
                      })}
                    >
                      <FormControl>
                        <FormLabel htmlFor="priority">PRIORIDADE</FormLabel>
                        <Select
                          id="prioridadeId"
                          name="priority"
                          value={projectsForm.values.priority}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        >
                          <option value="Alta">Alta</option>
                          <option value="Média">Média</option>
                          <option value="Baixa">Baixa</option>
                        </Select>
                        {projectsForm.errors.priority &&
                          projectsForm.touched.priority && (
                            <TextError>
                              {projectsForm.errors.priority}
                            </TextError>
                          )}
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="complexity">COMPLEXIDADE</FormLabel>
                        <Select
                          id="complexidadeId"
                          name="complexity"
                          value={projectsForm.values.complexity}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        >
                          <option value="Alta">Alta</option>
                          <option value="Média">Média</option>
                          <option value="Baixa">Baixa</option>
                        </Select>
                        {projectsForm.errors.complexity &&
                          projectsForm.touched.complexity && (
                            <TextError>
                              {projectsForm.errors.complexity}
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
                        <FormLabel htmlFor="place">LOCAL</FormLabel>
                        <Select
                          id="localId"
                          name="place"
                          value={projectsForm.values.place}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        >
                          <option value="Alta">Panelas e ETC Catu</option>
                          <option value="Média">EGNA Conceição</option>
                          <option value="Baixa">Poços</option>
                          <option value="Baixa">Pilar</option>
                          <option value="Baixa">EPFU</option>
                          <option value="Baixa">Paru</option>
                          <option value="Baixa">EPPIR</option>
                          <option value="Baixa">P16</option>
                          <option value="Baixa">Estação Coletora Anambé</option>
                          <option value="Baixa">UPGN Pilar e ECPIR</option>
                        </Select>
                        {projectsForm.errors.place &&
                          projectsForm.touched.place && (
                            <TextError>{projectsForm.errors.place}</TextError>
                          )}
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="division">DIVISÃO</FormLabel>
                        <Select
                          id="divisaoId"
                          name="division"
                          value={projectsForm.values.division}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        >
                          <option value="Processamento_de_Gas">
                            Processamento de Gás
                          </option>
                          <option value="E&P">E&P</option>
                          <option value="Comercializacao_energia">
                            Comercialização & Energia
                          </option>
                        </Select>
                        {projectsForm.errors.division &&
                          projectsForm.touched.division && (
                            <TextError>
                              {projectsForm.errors.division}
                            </TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="status">STATUS</FormLabel>
                        <Select
                          id="statusId"
                          name="status"
                          value={projectsForm.values.status}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        >
                          <option value="Iniciado">Iniciado</option>
                          <option value="Não iniciado">Não iniciado</option>
                          <option value="Concluido">Concluído</option>
                        </Select>
                        {projectsForm.errors.status &&
                          projectsForm.touched.status && (
                            <TextError>{projectsForm.errors.status}</TextError>
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
                        <FormLabel htmlFor="gate">GATE</FormLabel>
                        <Select
                          id="gate"
                          name="gate"
                          value={projectsForm.values.gate}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        >
                          <option value={`C&M`}>{`C&M`}</option>
                          <option value="concluido">Concluído</option>
                          <option value="gate1">Gate 1</option>
                          <option value="gate2">Gate 2</option>
                        </Select>
                        {projectsForm.errors.gate &&
                          projectsForm.touched.gate && (
                            <TextError>{projectsForm.errors.gate}</TextError>
                          )}
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="typeProject">TIPO</FormLabel>
                        <Select
                          id="tipoProjetoId"
                          name="typeProject"
                          value={projectsForm.values.typeProject}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        >
                          <option value="projeto1">Projeto 1</option>
                          <option value="projeto2">Projeto 2</option>
                          <option value="projeto3">Projeto 3</option>
                        </Select>
                        {projectsForm.errors.typeProject &&
                          projectsForm.touched.typeProject && (
                            <TextError>
                              {projectsForm.errors.typeProject}
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
                        <FormLabel htmlFor="demand">DEMANDA</FormLabel>
                        <Select
                          id="demand"
                          name="demand"
                          value={projectsForm.values.demand}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        >
                          <option value="origem">Origem</option>
                          <option value="azulGoiaba">Azul-Goiaba</option>
                        </Select>
                        {projectsForm.errors.demand &&
                          projectsForm.touched.demand && (
                            <TextError>{projectsForm.errors.demand}</TextError>
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
                        <FormLabel htmlFor="comments">COMENTÁRIOS</FormLabel>
                        <Input
                          isRequired
                          placeholder=""
                          id="demandaId"
                          type="comments"
                          name="comments"
                          value={projectsForm.values.comments}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {projectsForm.errors.comments &&
                          projectsForm.touched.comments && (
                            <TextError>
                              {projectsForm.errors.comments}
                            </TextError>
                          )}
                      </FormControl>
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
