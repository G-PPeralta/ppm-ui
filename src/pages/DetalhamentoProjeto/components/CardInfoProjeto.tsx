import { FaWarehouse } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';

function CardInfoProjeto() {
  return (
    <>
      <Box
        backgroundColor={'white'}
        p={5}
        borderRadius={5}
        w={useBreakpointValue({
          base: 'xlg',
          sm: 'sm',
          md: 'md',
          lg: 'lg',
        })}
      >
        <Box mb={4}>
          <Heading as="h4" size="md">
            Adequação Panelas e ETC Catu
          </Heading>
        </Box>

        <Flex justifyContent={'space-between'}>
          <Box>
            <Flex>
              <Box display={'flex'}>
                <Text fontWeight={'600'}>Nº:</Text>
                <Text ml={2} color={'origem.500'} fontWeight={'600'}>
                  0001
                </Text>
              </Box>
            </Flex>
            <Flex alignItems={'center'}>
              <Text fontWeight={'600'} color={'origem.500'}>
                <FiMapPin />
              </Text>
              <Text ml={1} fontWeight={'600'}>
                Polo:
              </Text>
              <Text ml={2} color={'origem.500'} fontWeight={'600'}>
                Tucano Sul
              </Text>
            </Flex>

            <Flex alignItems={'center'}>
              <Text fontWeight={'600'} color={'origem.500'}>
                <FaWarehouse />
              </Text>
              <Text ml={1} fontWeight={'600'}>
                Local:
              </Text>
              <Text ml={2} color={'origem.500'} fontWeight={'600'}>
                EDGA Conceição
              </Text>
            </Flex>

            <Flex alignItems={'center'}>
              <Text fontWeight={'600'} fontSize={14}>
                Coordenador:
              </Text>
              <Text
                ml={2}
                color={'origem.500'}
                fontWeight={'600'}
                fontSize={14}
              >
                Eduardo
              </Text>
            </Flex>

            <Flex alignItems={'center'}>
              <Text fontWeight={'600'} fontSize={14}>
                Responsável:
              </Text>
              <Text
                ml={2}
                color={'origem.500'}
                fontWeight={'600'}
                fontSize={14}
              >
                Eduardo
              </Text>
            </Flex>

            <Flex alignItems={'center'}>
              <Text fontWeight={'600'} fontSize={14}>
                Área Demandada:
              </Text>
              <Text
                ml={2}
                color={'origem.500'}
                fontWeight={'600'}
                fontSize={14}
              >
                Processos
              </Text>
            </Flex>
          </Box>

          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-end'}
            justifyContent={'end'}
          >
            <Flex alignItems={'center'}>
              <Text fontWeight={'600'} fontSize={14}>
                Início:
              </Text>
              <Text
                ml={2}
                color={'origem.500'}
                fontWeight={'600'}
                fontSize={14}
              >
                01/01/2022
              </Text>
            </Flex>

            <Flex alignItems={'center'}>
              <Text fontWeight={'600'} fontSize={14}>
                Término:
              </Text>
              <Text
                ml={2}
                color={'origem.500'}
                fontWeight={'600'}
                fontSize={14}
              >
                31/12/2022
              </Text>
            </Flex>

            <Flex alignItems={'center'}>
              <Text fontWeight={'600'} fontSize={14}>
                Atraso:
              </Text>
              <Text
                ml={2}
                color={'origem.500'}
                fontWeight={'600'}
                fontSize={14}
              >
                5 dias
              </Text>
            </Flex>

            <Flex alignItems={'center'}>
              <Text fontWeight={'600'} fontSize={14}>
                Atualização:
              </Text>
              <Text
                ml={2}
                color={'origem.500'}
                fontWeight={'600'}
                fontSize={14}
              >
                12/08/2022
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default CardInfoProjeto;
