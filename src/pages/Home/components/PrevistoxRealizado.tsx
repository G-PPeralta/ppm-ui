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

import styles from './Styles/PrevistoxRealizado.module.scss';

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
    <Stack spacing="8" className={styles.previstoxrealizado}>
      <Flex
        mr={{ base: 500, sm: 0 }}
        w={useBreakpointValue({ base: '100%', md: 'fit-content' })}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: '#EDF2F7', sm: '#EDF2F7' })}
      >
        <Box
          py={{ base: '0', sm: '4' }}
          px={{ base: '0', sm: '4' }}
          w="fit-content"
          bg={useBreakpointValue({ base: 'white', sm: 'white' })}
          boxShadow={{
            base: 'none',
            sm: useColorModeValue('md', 'md-dark'),
          }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Box
            overflowX={{ base: 'scroll', lg: 'hidden' }}
            w={{ base: 700, lg: 1200 }}
            h={260}
          >
            <Text
              mb={1}
              sx={{ fontSize: 18, fontWeight: '600' }}
              color="#000000"
            >
              Previsto x Realizado
            </Text>
            <Box display={'flex'} justifyContent="space-between" mt={2}>
              <Box display={{ base: 'none', lg: 'flex' }}>
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
              <Box display={{ base: 'flex', lg: 'none' }}>
                <StackedBarChart
                  showY={true}
                  sizeW={1000}
                  sizeH={200}
                  numberBars={12}
                  barW={25}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
