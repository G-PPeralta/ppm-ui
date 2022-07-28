import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import StackedBarChart from 'components/StackedBarChart';

export default function TotalProjetosComponent() {
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
                312 Projetos
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
                72 Projetos Iniciandos
              </Text>
              <Text
                p={1.5}
                mt={3}
                bg={'#2E69FD'}
                sx={{ fontSize: 16, width: '200px', borderRadius: '2px' }}
                color="#ffffff"
              >
                120 Projetos Finalizados
              </Text>
              <Text
                p={1.5}
                mt={3}
                bg={'#F94144'}
                sx={{ fontSize: 16, width: '200px', borderRadius: '2px' }}
                color="#ffffff"
              >
                60 Projetos Cancelados
              </Text>
              <Text
                p={1.5}
                mt={3}
                bg={'#F4DD06'}
                sx={{ fontSize: 16, width: '200px', borderRadius: '2px' }}
                color="#ffffff"
              >
                60 Projetos Holds
              </Text>
            </Box>
            <Box>
              <Text
                p={1.5}
                mt={3}
                sx={{ fontSize: 16, fontWeight: '600' }}
                color="#93E01B"
              >
                18%
              </Text>
              <Text
                p={1.5}
                mt={3}
                sx={{ fontSize: 16, fontWeight: '600' }}
                color="#0239C3"
              >
                32%
              </Text>
              <Text
                p={1.5}
                mt={3}
                sx={{ fontSize: 16, fontWeight: '600' }}
                color="#F94144"
              >
                60%
              </Text>
              <Text
                p={1.5}
                mt={3}
                sx={{ fontSize: 16, fontWeight: '600' }}
                color="#F4DD06"
              >
                60%
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
                  7
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
                  7
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
                  7
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
                  7
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
                  7
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
                  7
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
