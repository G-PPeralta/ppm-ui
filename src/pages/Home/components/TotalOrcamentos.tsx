import { useEffect, useState } from 'react';
import { AiOutlineRise } from 'react-icons/ai';

import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { TotalOrcamento } from 'interfaces/Services';

import { getOrcamentoTotal } from 'services/get/Dashboard';

export default function TotalOrcamentosComponent() {
  const [totalOrcamento, setTotalOrcamento] = useState<TotalOrcamento[]>(
    [] as TotalOrcamento[],
  );
  const [loading, setLoading] = useState(true);

  async function handleGetTotalOrcamento() {
    const reqGet = await getOrcamentoTotal();

    setTotalOrcamento(reqGet.data[1].total);
  }

  useEffect(() => {
    handleGetTotalOrcamento();
    setLoading(false);
  }, []);

  const valorFormatado = totalOrcamento.toLocaleString();

  return (
    <Stack spacing="8">
      <Flex w={'100%'} align="center" justify="center" bg={'#EDF2F7'}>
        <Box
          py={'4'}
          px={'4'}
          w={'100%'}
          bg={'white'}
          boxShadow={useColorModeValue('md', 'md-dark')}
          borderRadius={'xl'}
        >
          <Box
            w={'100%'}
            sx={{ display: 'flex' }}
            justifyContent="space-between"
          >
            <Box>
              <Text
                w={'200px'}
                mb={1}
                sx={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}
                color="#000000"
              >
                Total do Orçamento
              </Text>
              <Box sx={{ display: 'flex' }}>
                <Text
                  sx={{ fontSize: 12, fontWeight: '600', alignSelf: 'center' }}
                  color="#000000"
                >
                  R$
                </Text>
                <Text
                  ml={2}
                  sx={{ fontSize: 18, fontWeight: '600', alignSelf: 'center' }}
                  color="#000000"
                >
                  {!loading && valorFormatado}
                </Text>
              </Box>
            </Box>
            <Box sx={{ height: '100%', alignItems: 'center' }}>
              <AiOutlineRise color="#93E01B" size={50} />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
