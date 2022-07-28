import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import PieChart from 'components/PieChart';
import StackedBarChart from 'components/StackedBarChart';

export default function PrevistoxRealizadoComponent() {
  const grafData = [
    {
      name: 'Previsto',
      value: 50,
      color: '#93E01B',
    },
    {
      name: 'Realizado',
      value: 50,
      color: '#2E69FD',
    },
  ];

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
          px={{ base: '0', sm: '4' }}
          w="fit-content"
          bg={useBreakpointValue({ base: 'transparent', sm: 'white' })}
          boxShadow={{
            base: 'none',
            sm: useColorModeValue('md', 'md-dark'),
          }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Box w={1200} h={230}>
            <Text
              mb={1}
              sx={{ fontSize: 18, fontWeight: '600' }}
              color="#000000"
            >
              Previsto x Realizado
            </Text>
            <Box display={'flex'} w={'100%'} justifyContent="space-between">
              <Box mt={2}>
                <StackedBarChart
                  showY={true}
                  sizeW={1000}
                  sizeH={200}
                  numberBars={12}
                  barW={25}
                />
              </Box>
              <Box ml={5}>
                <Box
                  pr={5}
                  display={'flex'}
                  alignItems="center"
                  w={195}
                  justifyContent="space-between"
                >
                  <Box bg={'#93E01B'} py={1} px={2}>
                    <Text
                      mb={1}
                      sx={{ fontSize: 14, fontWeight: '400' }}
                      color="#ffffff"
                    >
                      Previsto
                    </Text>
                  </Box>
                  <Box bg={'#2E69FD'} py={1} px={2}>
                    <Text
                      mb={1}
                      sx={{ fontSize: 14, fontWeight: '400' }}
                      color="#ffffff"
                    >
                      Realizado
                    </Text>
                  </Box>
                </Box>
                <Text
                  mt={2}
                  mb={2}
                  sx={{ fontSize: 16, fontWeight: '600' }}
                  color="#000000"
                >
                  Geral
                </Text>
                <Box
                  display={'flex'}
                  alignItems="center"
                  w={190}
                  justifyContent="space-evenly"
                >
                  <Box>
                    <Box mb={2} bg={'#93E01B'} py={1} px={2}>
                      <Text
                        mb={1}
                        sx={{ fontSize: 14, fontWeight: '400' }}
                        color="#ffffff"
                      >
                        50%
                      </Text>
                    </Box>
                    <Box bg={'#2E69FD'} py={1} px={2}>
                      <Text
                        mb={1}
                        sx={{ fontSize: 14, fontWeight: '400' }}
                        color="#ffffff"
                      >
                        50%
                      </Text>
                    </Box>
                  </Box>
                  <PieChart size={80} data={grafData} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
