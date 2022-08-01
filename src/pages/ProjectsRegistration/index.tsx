import { useEffect, useState } from 'react';

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
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';
import { Classificacao, Polo } from 'interfaces/Services';

import Sidebar from 'components/SideBar';
import { TextError } from 'components/TextError';

import { useProjects } from 'hooks/useProjects';

import { getClassificacao, getPolo } from 'services/get/Projetos';
import { postProject } from 'services/post/ProjectRegister';

import { RegisterResponsibleModal } from './Components/RegisterResponsibleModal';

export function ProjectsRegistration() {
  const wd = window.innerWidth;
  const { projectsForm, loading } = useProjects();
  const [loadingProjetos, setLoadingProjetos] = useState(true);
  const [classificacaoState, setClassificacaoState] = useState<Classificacao[]>(
    [] as Classificacao[],
  );
  const [poloState, setPoloState] = useState<Polo[]>([] as Polo[]);

  async function handleGetProjetos() {
    const reqGetClassificacao = await getClassificacao();
    const reqGetPolo = await getPolo();
    const dataReqClassificacao: Classificacao[] = reqGetClassificacao.data;
    const dataReqPolo: Polo[] = reqGetPolo.data;
    if (!dataReqClassificacao) {
      return null;
    }
    setClassificacaoState(dataReqClassificacao);
    setPoloState(dataReqPolo);
    setLoadingProjetos(false);
  }

  useEffect(() => {
    handleGetProjetos();
  }, []);

  console.log(loadingProjetos);
  console.log(poloState);

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

                      <FormControl>
                        <FormLabel htmlFor="nomeProjeto">PROJETO</FormLabel>
                        <Input
                          isRequired
                          placeholder="Nome do projeto"
                          id="nomeProjeto"
                          type="text"
                          name="nomeProjeto"
                          value={projectsForm.values.nomeProjeto}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {projectsForm.errors.nomeProjeto &&
                          projectsForm.touched.nomeProjeto && (
                            <TextError>
                              {projectsForm.errors.nomeProjeto}
                            </TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="descricao">DESCRIÇÃO</FormLabel>
                        <Input
                          isRequired
                          placeholder="Aquisição e instalação"
                          id="descricao"
                          type="text"
                          name="descricao"
                          maxLength={15}
                          value={projectsForm.values.descricao}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {projectsForm.errors.descricao &&
                          projectsForm.touched.descricao && (
                            <TextError>
                              {projectsForm.errors.descricao}
                            </TextError>
                          )}
                      </FormControl>

                      {/* <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormControl>
                          <FormLabel htmlFor="responsible">
                            RESPONSÁVEL
                          </FormLabel>
                          <Select
                            id="responsibleId"
                            name="responsible"
                            value={projectsForm.values.responsible}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '95%' })}
                          >
                            <option value="1">Alan</option>
                            <option value="2">Gabriel</option>
                            <option value="3">Eduardo</option>
                          </Select>
                          {projectsForm.errors.responsible &&
                            projectsForm.touched.responsible && (
                              <TextError>
                                {projectsForm.errors.responsible}
                              </TextError>
                            )}
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="coordinator">
                            COORDENADOR
                          </FormLabel>
                          <Select
                            id="coordinatorId"
                            name="coordinator"
                            value={projectsForm.values.coordinator}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '100%' })}
                          >
                            <option value="1">Alan</option>
                            <option value="2">Gabriel</option>
                            <option value="3">Eduardo</option>
                          </Select>
                          {projectsForm.errors.coordinator &&
                            projectsForm.touched.coordinator && (
                              <TextError>
                                {projectsForm.errors.coordinator}
                              </TextError>
                            )}
                        </FormControl>
                      </Flex> */}
                    </Stack>
                    <Stack spacing="5">
                      <Flex
                        flexDirection={useBreakpointValue({
                          base: 'column',
                          md: 'row',
                        })}
                      >
                        <FormControl>
                          <FormLabel htmlFor="valorTotalPrevisto">
                            VALOR TOTAL PREVISTO
                          </FormLabel>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              color="gray.300"
                              fontSize="1.2em"
                            >
                              R$
                            </InputLeftElement>
                            <Input
                              isRequired
                              placeholder="10.000,00"
                              id="valorTotalPrevisto"
                              type="text"
                              name="valorTotalPrevisto"
                              value={projectsForm.values.valorTotalPrevisto}
                              onChange={projectsForm.handleChange}
                              w={useBreakpointValue({
                                base: '100%',
                                md: '95%',
                              })}
                            />
                          </InputGroup>
                          {projectsForm.errors.valorTotalPrevisto &&
                            projectsForm.touched.valorTotalPrevisto && (
                              <TextError>
                                {projectsForm.errors.valorTotalPrevisto}
                              </TextError>
                            )}
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="classificacaoId">
                            CLASSIFICAÇÃO
                          </FormLabel>
                          <Select
                            id="classificacaoId"
                            name="classificacaoId"
                            value={projectsForm.values.classificacaoId}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '95%' })}
                          >
                            {classificacaoState.map((classificacao) => (
                              <option
                                key={classificacao.id}
                                value={classificacao.classificacao}
                              >
                                {classificacao.classificacao}
                              </option>
                            ))}
                          </Select>
                          {projectsForm.errors.classificacaoId &&
                            projectsForm.touched.classificacaoId && (
                              <TextError>
                                {projectsForm.errors.classificacaoId}
                              </TextError>
                            )}
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="solicitanteId">
                            SOLICITANTE
                          </FormLabel>
                          <Select
                            id="solicitanteId"
                            name="solicitanteId"
                            value={projectsForm.values.solicitanteId}
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
                          {projectsForm.errors.solicitanteId &&
                            projectsForm.touched.solicitanteId && (
                              <TextError>
                                {projectsForm.errors.solicitanteId}
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
                          <FormLabel htmlFor="justificativa">
                            JUSTIFICATIVA
                          </FormLabel>
                          <Input
                            isRequired
                            placeholder="Ex.: Sistema necessário para medição e entrega de gás."
                            id="justificativa"
                            type="justificativa"
                            name="justificativa"
                            value={projectsForm.values.justificativa}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '95%' })}
                          />
                          {projectsForm.errors.justificativa &&
                            projectsForm.touched.justificativa && (
                              <TextError>
                                {projectsForm.errors.justificativa}
                              </TextError>
                            )}
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="poloId">POLO</FormLabel>
                          <Select
                            id="poloId"
                            name="poloId"
                            value={projectsForm.values.poloId}
                            onChange={projectsForm.handleChange}
                          >
                            {poloState.map((polo) => (
                              <option key={polo.id} value={polo.polo}>
                                {polo.polo}
                              </option>
                            ))}
                          </Select>
                          {projectsForm.errors.poloId &&
                            projectsForm.touched.poloId && (
                              <TextError>
                                {projectsForm.errors.poloId}
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
                          <FormLabel htmlFor="dataInicio">INÍCIO</FormLabel>
                          <Input
                            isRequired
                            placeholder="dd/mm/aaaa"
                            id="dataInicio"
                            type="date"
                            name="dataInicio"
                            value={projectsForm.values.dataInicio}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '95%' })}
                          />
                          {projectsForm.errors.dataInicio &&
                            projectsForm.touched.dataInicio && (
                              <TextError>
                                {projectsForm.errors.dataInicio}
                              </TextError>
                            )}
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="dataFim">FIM</FormLabel>
                          <Input
                            isRequired
                            placeholder="dd/mm/aaaa"
                            id="dataFim"
                            type="date"
                            name="dataFim"
                            value={projectsForm.values.dataFim}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '90%' })}
                          />
                          {projectsForm.errors.dataFim &&
                            projectsForm.touched.dataFim && (
                              <TextError>
                                {' '}
                                {projectsForm.errors.dataFim}
                              </TextError>
                            )}
                        </FormControl>

                        <FormControl>
                          <FormLabel htmlFor="dataInicioReal">
                            INÍCIO REAL
                          </FormLabel>
                          <Input
                            isRequired
                            placeholder="dd/mm/aaaa"
                            id="dataInicioReal"
                            type="date"
                            name="dataInicioReal"
                            value={projectsForm.values.dataInicioReal}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '95%' })}
                          />
                          {projectsForm.errors.dataInicioReal &&
                            projectsForm.touched.dataInicioReal && (
                              <TextError>
                                {projectsForm.errors.dataInicioReal}
                              </TextError>
                            )}
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor="dataFimReal">FIM REAL</FormLabel>
                          <Input
                            isRequired
                            placeholder="dd/mm/aaaa"
                            id="dataFimReal"
                            type="date"
                            name="dataFimReal"
                            value={projectsForm.values.dataFimReal}
                            onChange={projectsForm.handleChange}
                            w={useBreakpointValue({ base: '100%', md: '100%' })}
                          />
                          {projectsForm.errors.dataFimReal &&
                            projectsForm.touched.dataFimReal && (
                              <TextError>
                                {' '}
                                {projectsForm.errors.dataFimReal}
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
                        <FormLabel htmlFor="prioridadeId">PRIORIDADE</FormLabel>
                        <Select
                          id="prioridadeId"
                          name="prioridadeId"
                          value={projectsForm.values.prioridadeId}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        >
                          <option value="Alta">Alta</option>
                          <option value="Média">Média</option>
                          <option value="Baixa">Baixa</option>
                        </Select>
                        {projectsForm.errors.prioridadeId &&
                          projectsForm.touched.prioridadeId && (
                            <TextError>
                              {projectsForm.errors.prioridadeId}
                            </TextError>
                          )}
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="complexidadeId">
                          COMPLEXIDADE
                        </FormLabel>
                        <Select
                          id="complexidadeId"
                          name="complexidadeId"
                          value={projectsForm.values.complexidadeId}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        >
                          <option value="Alta">Alta</option>
                          <option value="Média">Média</option>
                          <option value="Baixa">Baixa</option>
                        </Select>
                        {projectsForm.errors.complexidadeId &&
                          projectsForm.touched.complexidadeId && (
                            <TextError>
                              {projectsForm.errors.complexidadeId}
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
                        <FormLabel htmlFor="localId">LOCAL</FormLabel>
                        <Select
                          id="localId"
                          name="localId"
                          value={projectsForm.values.localId}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        >
                          <option value="1">EGNA Conceição</option>
                          <option value="2">EPFU</option>
                          <option value="3">EPPIR</option>
                          <option value="4">Estação Coletora Anambé</option>
                          <option value="5">P16</option>
                          <option value="6">Panelas e ETC Catu</option>
                          <option value="7">Paru</option>
                          <option value="8">Pilar</option>
                          <option value="9">Poços</option>
                          <option value="10">UPGN Pilar e ECPIR</option>
                        </Select>
                        {projectsForm.errors.localId &&
                          projectsForm.touched.localId && (
                            <TextError>{projectsForm.errors.localId}</TextError>
                          )}
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="divisaoId">DIVISÃO</FormLabel>
                        <Select
                          id="divisaoId"
                          name="divisaoId"
                          value={projectsForm.values.divisaoId}
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
                        {projectsForm.errors.divisaoId &&
                          projectsForm.touched.divisaoId && (
                            <TextError>
                              {projectsForm.errors.divisaoId}
                            </TextError>
                          )}
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="statusId">STATUS</FormLabel>
                        <Select
                          id="statusId"
                          name="statusId"
                          value={projectsForm.values.statusId}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        >
                          <option value="Iniciado">Iniciado</option>
                          <option value="Não iniciado">Não iniciado</option>
                          <option value="Concluido">Concluído</option>
                        </Select>
                        {projectsForm.errors.statusId &&
                          projectsForm.touched.statusId && (
                            <TextError>
                              {projectsForm.errors.statusId}
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
                        <FormLabel htmlFor="gateId">GATE</FormLabel>
                        <Select
                          id="gateId"
                          name="gateId"
                          value={projectsForm.values.gateId}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '95%' })}
                        >
                          <option value={`C&M`}>{`C&M`}</option>
                          <option value="concluido">Concluído</option>
                          <option value="gate1">Gate 1</option>
                          <option value="gate2">Gate 2</option>
                        </Select>
                        {projectsForm.errors.gateId &&
                          projectsForm.touched.gateId && (
                            <TextError>{projectsForm.errors.gateId}</TextError>
                          )}
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor="tipoProjetoId">TIPO</FormLabel>
                        <Select
                          id="tipoProjetoId"
                          name="tipoProjetoId"
                          value={projectsForm.values.tipoProjetoId}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        >
                          <option value="projeto1">Projeto 1</option>
                          <option value="projeto2">Projeto 2</option>
                          <option value="projeto3">Projeto 3</option>
                        </Select>
                        {projectsForm.errors.tipoProjetoId &&
                          projectsForm.touched.tipoProjetoId && (
                            <TextError>
                              {projectsForm.errors.tipoProjetoId}
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
                        <FormLabel htmlFor="demandaId">DEMANDA</FormLabel>
                        <Select
                          id="demandaId"
                          name="demandaId"
                          value={projectsForm.values.demandaId}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        >
                          <option value="origem">Origem</option>
                          <option value="azulGoiaba">Azul-Goiaba</option>
                        </Select>
                        {projectsForm.errors.demandaId &&
                          projectsForm.touched.demandaId && (
                            <TextError>
                              {projectsForm.errors.demandaId}
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
                        <FormLabel htmlFor="comentarios">COMENTÁRIOS</FormLabel>
                        <Input
                          isRequired
                          placeholder=""
                          id="comentarios"
                          type="comentarios"
                          name="comentarios"
                          value={projectsForm.values.comentarios}
                          onChange={projectsForm.handleChange}
                          w={useBreakpointValue({ base: '100%', md: '100%' })}
                        />
                        {projectsForm.errors.comentarios &&
                          projectsForm.touched.comentarios && (
                            <TextError>
                              {projectsForm.errors.comentarios}
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
