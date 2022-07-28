import { AiOutlineCaretUp } from 'react-icons/ai';

import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from '@chakra-ui/react';

export default function NaoPrevistoComponent() {
  const data = [
    {
      id: 1,
      name: 'Nome do Projeto',
      orcament: '1.000.000',
      cpi: 'yellow',
      spi: 'red',
    },
    {
      id: 2,
      name: 'Nome do Projeto',
      orcament: '1.000.000',
      cpi: 'green',
      spi: 'red',
    },
    {
      id: 3,
      name: 'Nome do Projeto',
      orcament: '1.000.000',
      cpi: 'yellow',
      spi: 'blue',
    },
    {
      id: 4,
      name: 'Nome do Projeto',
      orcament: '1.000.000',
      cpi: 'yellow',
      spi: 'red',
    },
    {
      id: 5,
      name: 'Nome do Projeto',
      orcament: '1.000.000',
      cpi: 'yellow',
      spi: 'red',
    },
    {
      id: 6,
      name: 'Nome do Projeto',
      orcament: '1.000.000',
      cpi: 'yellow',
      spi: 'red',
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
          <Box w={480}>
            <Text
              mb={1}
              sx={{ fontSize: 18, fontWeight: '600', alignSelf: 'center' }}
              color="#000000"
            >
              Projetos
            </Text>
            <TableContainer overflowY={'scroll'} height={200}>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Nome do Projeto</Th>
                    <Th>Orçamento</Th>
                    <Th>CPI</Th>
                    <Th>SPI</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((d) => (
                    <Tr mt={1}>
                      <Th color="gray.400" sx={{ fontSize: 11 }}>
                        ID
                      </Th>
                      <Th color={'#628EFD'} sx={{ fontSize: 11 }}>
                        {d.name}
                      </Th>
                      <Th color="gray.400" sx={{ fontSize: 11 }}>
                        {d.orcament}
                      </Th>
                      <Th>
                        {d.cpi == 'yellow' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#F4DD06'}
                            // align="center"
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined}
                        {d.cpi == 'green' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#93E01B'}
                            // align="center"
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined}
                      </Th>
                      <Th>
                        {d.spi == 'red' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#F94144'}
                            // align="center"
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined}
                        {d.spi == 'blue' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#2E69FD'}
                            // align="center"
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined}
                      </Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}