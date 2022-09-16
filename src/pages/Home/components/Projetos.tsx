import { useState, useEffect } from 'react';
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

import { getInfoProjetos } from 'services/get/Infograficos';

export default function NaoPrevistoComponent() {
  const [projetos, setProjetos] = useState<any[]>([]);
  // const [trut, setTrue] = useState(false);
  const handleGetProjetos = async () => {
    const response = await getInfoProjetos();
    console.log('reponse', response.data);
    setProjetos(response.data);
  };

  useEffect(() => {
    handleGetProjetos();
  }, []);

  // console.log(projetos);

  const data = {
    id: 1,
    name: 'Nome do Projeto',
    orcament: '1.000.000',
    cpi: 'yellow',
    spi: 'red',
  };
  //   {
  //     id: 2,
  //     name: 'Nome do Projeto',
  //     orcament: '1.000.000',
  //     cpi: 'green',
  //     spi: 'red',
  //   },
  //   {
  //     id: 3,
  //     name: 'Nome do Projeto',
  //     orcament: '1.000.000',
  //     cpi: 'yellow',
  //     spi: 'blue',
  //   },
  //   {
  //     id: 4,
  //     name: 'Nome do Projeto',
  //     orcament: '1.000.000',
  //     cpi: 'yellow',
  //     spi: 'red',
  //   },
  //   {
  //     id: 5,
  //     name: 'Nome do Projeto',
  //     orcament: '1.000.000',
  //     cpi: 'yellow',
  //     spi: 'red',
  //   },
  //   {
  //     id: 6,
  //     name: 'Nome do Projeto',
  //     orcament: '1.000.000',
  //     cpi: 'yellow',
  //     spi: 'red',
  //   },
  // ];

  return (
    <Stack spacing="8">
      <Flex
        w={'100%'}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: '#EDF2F7', sm: '#EDF2F7' })}
      >
        <Box
          py={{ base: '0', sm: '4' }}
          px={{ base: '0', sm: '4' }}
          w={'100%'}
          bg={useBreakpointValue({ base: 'white', sm: 'white' })}
          boxShadow={{
            base: 'none',
            sm: useColorModeValue('md', 'md-dark'),
          }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Box w={'100%'} minWidth={480}>
            <Text
              mb={1}
              sx={{ fontSize: 18, fontWeight: '600', alignSelf: 'center' }}
              color="#000000"
            >
              Projetos
            </Text>
            <TableContainer overflowY={'scroll'} height={260}>
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
                <Tbody
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {projetos.map((projeto, index) => (
                    <Tr mt={1} key={index}>
                      <Th color="gray.400" sx={{ fontSize: 11 }}>
                        {projeto.id}
                      </Th>
                      <Th
                        color={'#628EFD'}
                        sx={{ fontSize: 11 }}
                        // onMouseOver={(event) => {
                        //   // console.log(projeto.nomeProjeto);

                        //   setTrue(true);
                        //   return projeto.nome;
                        // }}
                        // onMouseOut={() => {
                        //   setTrue(false);
                        // }}
                      >
                        <Text>{projeto.nome?.substr(0, 18) + '...'}</Text>
                      </Th>
                      {/* {trut ? <Text> {projeto.nomeProjeto}</Text> : ''} */}
                      <Th color="gray.400" sx={{ fontSize: 11 }}>
                        {projeto.valorTotalPrevisto}
                      </Th>
                      <Th>
                        {data.cpi == 'yellow' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#9FA2B4'}
                            display={'flex'}
                            flexDirection="column"
                            alignItems={'center'}
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined}
                      </Th>
                      <Th>
                        {data.spi == 'red' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#9FA2B4'}
                            display={'flex'}
                            flexDirection="column"
                            alignItems={'center'}
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined}
                      </Th>
                      {/* {d.cpi == 'green' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#93E01B'}
                            display={'flex'}
                            flexDirection="column"
                            alignItems={'center'}
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined} */}
                      {/* <Th> */}
                      {/* {d.spi == 'red' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#F94144'}
                            display={'flex'}
                            flexDirection="column"
                            alignItems={'center'}
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined} */}
                      {/* {d.spi == 'blue' ? (
                          <Box
                            w={5}
                            h={5}
                            bg={'#2E69FD'}
                            display={'flex'}
                            flexDirection="column"
                            alignItems={'center'}
                            pt={'2px'}
                            sx={{ borderRadius: '100%' }}
                          >
                            <AiOutlineCaretUp color="#ffffff" size={14} />
                          </Box>
                        ) : undefined} */}
                      {/* </Th> */}
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
