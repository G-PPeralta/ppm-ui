import { useState, useEffect } from 'react';

import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import StackedBarChart from 'components/StackedBarChart';

import { getTotalProjetos } from 'services/get/Dashboard';

export default function TotalProjetosComponent() {
  const [total, setTotal] = useState(1);
  const [iniciados, setIniciados] = useState(0);
  const [finalizados, setFinalizados] = useState(0);
  const [cancelados, setCancelados] = useState(0);
  const [holds, setHolds] = useState(0);
  const [prioridadeAlta, setPrioridadeAlta] = useState(0);
  const [prioridadeMedia, setPrioridadeMedia] = useState(0);
  const [prioridadeBaixa, setPrioridadeBaixa] = useState(0);
  const [complexidadeAlta, setComplexidadeAlta] = useState(0);
  const [complexidadeMedia, setComplexidadeMedia] = useState(0);
  const [complexidadeBaixa, setComplexidadeBaixa] = useState(0);

  async function handleGetTipoResponsavel() {
    const { data } = await getTotalProjetos();
    console.log('data', data);
    setTotal(data.totalProjetos);
    // setIniciados(data.projetosPorStatus[1].qtd);
    setIniciados(
      data.projetosPorStatus[1].qtd +
        data.projetosPorStatus[2].qtd +
        data.projetosPorStatus[3].qtd,
    );
    setFinalizados(data.projetosPorStatus[5].qtd);
    setCancelados(data.projetosPorStatus[4].qtd);
    // setHolds(data.projetosPorStatus[6].qtd);
    setHolds(data.projetosPorStatus[6].qtd + data.projetosPorStatus[0].qtd);
    setPrioridadeAlta(data.prioridades.alta);
    setPrioridadeMedia(data.prioridades.media);
    setPrioridadeBaixa(data.prioridades.baixa);
    setComplexidadeAlta(data.complexidades.alta);
    setComplexidadeMedia(data.complexidades.media);
    setComplexidadeBaixa(data.complexidades.baixa);
  }

  useEffect(() => {
    handleGetTipoResponsavel();
  }, []);

  return (
    <Stack spacing="8">
      <Flex
        w={useBreakpointValue({ base: '100%', md: 'fit-content' })}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: 'white', sm: '#EDF2F7' })}
      >
        <Box
          py={{ base: '0', sm: '4' }}
          px={{ base: '2', sm: '10' }}
          w="fit-content"
          bg={useBreakpointValue({ base: 'transparent', sm: 'white' })}
          boxShadow={{
            base: 'none',
            sm: useColorModeValue('md', 'md-dark'),
          }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Text
            sx={{ fontSize: 24, fontWeight: '600', alignSelf: 'center' }}
            color="#000000"
          >
            Total de Projetos
          </Text>
          <Box mt={2} sx={{ display: 'flex' }}>
            <Box
              pl={1}
              pt={5}
              mt={3}
              mr={2}
              bg={'#0047BB'}
              sx={{ width: '36px', height: '180px', borderRadius: '2px' }}
            >
              <Text
                sx={{
                  fontSize: 16,
                  writingMode: 'vertical-rl',
                  transform: 'scale(-1)',
                }}
                color="#ffffff"
              >
                {total} Projetos
              </Text>
            </Box>
            <Box>
              <Text
                p={1.5}
                mt={3}
                bg={'#93E01B'}
                sx={{ fontSize: 16, width: '200px', borderRadius: '2px' }}
                color="#ffffff"
              >
                {iniciados} Projetos Iniciados
              </Text>
              <Text
                p={1.5}
                mt={3}
                bg={'#2E69FD'}
                sx={{ fontSize: 16, width: '200px', borderRadius: '2px' }}
                color="#ffffff"
              >
                {finalizados} Projetos Finalizados
              </Text>
              <Text
                p={1.5}
                mt={3}
                bg={'#F94144'}
                sx={{ fontSize: 16, width: '200px', borderRadius: '2px' }}
                color="#ffffff"
              >
                {cancelados} Projetos Cancelados
              </Text>
              <Text
                p={1.5}
                mt={3}
                bg={'#F4DD06'}
                sx={{ fontSize: 16, width: '200px', borderRadius: '2px' }}
                color="#ffffff"
              >
                {holds} Projetos Holds
              </Text>
            </Box>
            <Box>
              <Text
                p={1.5}
                mt={3}
                sx={{ fontSize: 16, fontWeight: '600' }}
                color="#93E01B"
              >
                {Math.round((iniciados / total) * 100)}%
              </Text>
              <Text
                p={1.5}
                mt={3}
                sx={{ fontSize: 16, fontWeight: '600' }}
                color="#0239C3"
              >
                {Math.round((finalizados / total) * 100)}%
              </Text>
              <Text
                p={1.5}
                mt={3}
                sx={{ fontSize: 16, fontWeight: '600' }}
                color="#F94144"
              >
                {Math.round((cancelados / total) * 100)}%
              </Text>
              <Text
                p={1.5}
                mt={3}
                sx={{ fontSize: 16, fontWeight: '600' }}
                color="#F4DD06"
              >
                {Math.round((holds / total) * 100)}%
              </Text>
            </Box>
            <Box ml={5}>
              <StackedBarChart
                showY={false}
                sizeW={280}
                sizeH={240}
                numberBars={4}
                barW={25}
              />
            </Box>
            <Box ml={5} sx={{ width: 190 }}>
              <Text
                ml={5}
                mb={4}
                sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                color="#000000"
              >
                Projetos Prioridade
              </Text>
              <Box
                mt={2}
                sx={{
                  display: 'flex',
                  alignItens: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#9FA2B4"
                >
                  Prioridade alta
                </Text>
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#1FBE55"
                >
                  {prioridadeAlta}
                </Text>
              </Box>
              <Box
                mt={2}
                sx={{
                  display: 'flex',
                  alignItens: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#9FA2B4"
                >
                  Prioridade média
                </Text>
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#F4DD06"
                >
                  {prioridadeMedia}
                </Text>
              </Box>
              <Box
                mt={2}
                sx={{
                  display: 'flex',
                  alignItens: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#9FA2B4"
                >
                  Prioridade baixa
                </Text>
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#F94144"
                >
                  {prioridadeBaixa}
                </Text>
              </Box>
              <Text
                ml={5}
                mt={4}
                mb={2}
                sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                color="#000000"
              >
                Projetos Complexidade
              </Text>
              <Box
                mt={2}
                sx={{
                  display: 'flex',
                  alignItens: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#9FA2B4"
                >
                  Prioridade alta
                </Text>
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#1FBE55"
                >
                  {complexidadeAlta}
                </Text>
              </Box>
              <Box
                mt={2}
                sx={{
                  display: 'flex',
                  alignItens: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#9FA2B4"
                >
                  Prioridade média
                </Text>
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#F4DD06"
                >
                  {complexidadeMedia}
                </Text>
              </Box>
              <Box
                mt={2}
                sx={{
                  display: 'flex',
                  alignItens: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#9FA2B4"
                >
                  Prioridade baixa
                </Text>
                <Text
                  sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                  color="#F94144"
                >
                  {complexidadeBaixa}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
