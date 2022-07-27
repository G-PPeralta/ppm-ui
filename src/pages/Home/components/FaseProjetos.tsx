import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

// import PieChart from 'components/PieChart';

export default function NaoPrevistoComponent() {
  // const grafData = [
  //   {
  //     name: 'Engenharia',
  //     value: 30,
  //     color: '#93E01B',
  //   },
  //   {
  //     name: 'C&M',
  //     value: 30,
  //     color: '#F4DD06',
  //   },
  //   {
  //     name: 'Suprimentos',
  //     value: 20,
  //     color: '#F94144',
  //   },
  //   {
  //     name: 'Pré-projeto',
  //     value: 20,
  //     color: '#2E69FD',
  //   },
  // ];

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
          <Box
          // align={'center'}
          >
            <Text
              mb={1}
              sx={{ fontSize: 18, fontWeight: '600', alignSelf: 'center' }}
              color="#000000"
            >
              Fase dos Projetos
            </Text>
            <Box mt={2}>
              <Box display={'flex'} w={315} justifyContent="space-between">
                <Box
                  w={120}
                  bg={'#F4DD06'}
                  py={1}
                  // align={'center'}
                  justifyContent={'center'}
                >
                  <Text
                    mb={1}
                    sx={{ fontSize: 16, fontWeight: '600' }}
                    color="#ffffff"
                  >
                    {'C&M'}
                  </Text>
                </Box>
                <Box
                  w={120}
                  bg={'#93E01B'}
                  py={1}
                  // align={'center'}
                  justifyContent={'center'}
                >
                  <Text
                    mb={1}
                    sx={{ fontSize: 16, fontWeight: '600' }}
                    color="#ffffff"
                  >
                    Engenharia
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              mt={5}
              mb={5}
              w={315}
              alignItems={'center'}
              justifyContent={'center'}
              display={'flex'}
            >
              <Box
                h={20}
                justifyContent={'space-between'}
                display={'flex'}
                flexDirection={'column'}
              >
                <Text sx={{ fontSize: 16, fontWeight: '600' }} color="#F4DD06">
                  32%
                </Text>
                <Text sx={{ fontSize: 16, fontWeight: '600' }} color="#F94144">
                  18%
                </Text>
              </Box>
              {/* <PieChart size={80} data={grafData} /> */}
              <Box
                h={20}
                justifyContent={'space-between'}
                display={'flex'}
                flexDirection={'column'}
              >
                <Text sx={{ fontSize: 16, fontWeight: '600' }} color="#93E01B">
                  32%
                </Text>
                <Text sx={{ fontSize: 16, fontWeight: '600' }} color="#2E69FD">
                  18%
                </Text>
              </Box>
            </Box>
            <Box mb={1}>
              <Box display={'flex'} w={315} justifyContent="space-between">
                <Box
                  w={120}
                  bg={'#F94144'}
                  py={1}
                  // align={'center'}
                  justifyContent={'center'}
                >
                  <Text
                    mb={1}
                    sx={{ fontSize: 16, fontWeight: '600' }}
                    color="#ffffff"
                  >
                    Suprimentos
                  </Text>
                </Box>
                <Box
                  w={120}
                  bg={'#2E69FD'}
                  py={1}
                  // align={'center'}
                  justifyContent={'center'}
                >
                  <Text
                    mb={1}
                    sx={{ fontSize: 16, fontWeight: '600' }}
                    color="#ffffff"
                  >
                    Pré-projeto
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
