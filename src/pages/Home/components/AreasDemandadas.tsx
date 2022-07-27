import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

import PercentPieChart from 'components/PercentPieChart';
// import StackedBarChart from 'components/StackedBarChart';

export default function NaoPrevistoComponent() {
  const grafData1 = [
    {
      name: 'Undone',
      value: 70,
      color: '#A8C1FF',
    },
    {
      name: 'Done',
      value: 30,
      color: '#2E69FD',
    },
  ];

  const grafData2 = [
    {
      name: 'Undone',
      value: 70,
      color: '#9fed9f',
    },
    {
      name: 'Done',
      value: 30,
      color: '#428542',
    },
  ];

  const grafData3 = [
    {
      name: 'Undone',
      value: 70,
      color: '#FFB1B1',
    },
    {
      name: 'Done',
      value: 30,
      color: '#F94144',
    },
  ];

  const grafData4 = [
    {
      name: 'Undone',
      value: 70,
      color: '#FFF8BC',
    },
    {
      name: 'Done',
      value: 30,
      color: '#F8E854',
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
          <Box w={300} h={230}>
            <Text
              mb={1}
              sx={{ fontSize: 18, fontWeight: '600', alignSelf: 'center' }}
              color="#000000"
            >
              Áreas Demandadas
            </Text>
            <Box display={'flex'} w={'100%'} justifyContent="space-between">
              <Box>
                {/* <StackedBarChart /> */}
                <Text
                  mb={1}
                  sx={{ fontSize: 14, fontWeight: '600', alignSelf: 'center' }}
                  color="#0f0"
                >
                  StackedBarChart
                </Text>
              </Box>
              <Box w={150}>
                <Box
                  mb={1}
                  display="flex"
                  w={'100%'}
                  justifyContent="space-between"
                  align="center"
                >
                  <Box>
                    <Text
                      mb={2}
                      w={'75px'}
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}
                      color="#2E69FD"
                    >
                      SMS
                    </Text>
                    <PercentPieChart
                      size={60}
                      upDown={false}
                      data={grafData1}
                    />
                  </Box>
                  <Box>
                    <Text
                      mb={2}
                      w={'75px'}
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}
                      color="#93E01B"
                    >
                      Regulatório
                    </Text>
                    <PercentPieChart size={60} upDown={true} data={grafData2} />
                  </Box>
                </Box>
                <Box
                  mb={1}
                  display="flex"
                  w={'100%'}
                  justifyContent="space-between"
                  align="center"
                >
                  <Box mt={8}>
                    <PercentPieChart size={60} upDown={true} data={grafData3} />
                    <Text
                      mt={2}
                      w={'75px'}
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}
                      color="#F94144"
                    >
                      Operação
                    </Text>
                  </Box>
                  <Box mt={8}>
                    <PercentPieChart size={60} upDown={true} data={grafData4} />
                    <Text
                      mt={2}
                      w={'75px'}
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}
                      color="#F4DD06"
                    >
                      Outros
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
