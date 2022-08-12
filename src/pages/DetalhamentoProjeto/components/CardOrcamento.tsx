import * as React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoIosWallet } from 'react-icons/io';

import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';

function CardOrcamento() {
  return (
    <>
      <Box
        backgroundColor={'white'}
        p={5}
        borderRadius={5}
        w={useBreakpointValue({
          base: '100%',
          sm: 'sm',
          md: 'md',
          lg: 'lg',
        })}
      >
        <Box mb={5}>
          <Box display={'flex'} alignItems={'center'}>
            <Heading as="h4" size="lg" color={'origem.300'}>
              <IoIosWallet />
            </Heading>
            <Heading as="h4" size="md" ml={2}>
              Orçamento
            </Heading>
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            <Text fontSize={14} fontWeight={600}>
              R$
            </Text>
            <Text fontSize={18} ml={2} fontWeight={600}>
              100.000.000,00
            </Text>
          </Box>
        </Box>

        <Flex grow={1} direction={'column'}>
          <Flex justify={'space-between'}>
            <Flex alignItems={'center'} mb={3}>
              <Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Text fontSize={16} fontWeight={600}>
                    Remanescente
                  </Text>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Text fontSize={14} fontWeight={600}>
                    R$
                  </Text>
                  <Text fontSize={16} ml={2} fontWeight={600}>
                    50.000.000,00
                  </Text>
                </Box>
              </Box>
              <Box
                display={'flex'}
                justifyItems={'center'}
                justifyContent={'center'}
                alignItems="center"
                bg={'#059502'}
                ml={4}
                height={'100%'}
                borderRadius={2}
              >
                <Text p={1} color="#ffffff" fontSize={20} fontWeight={'600'}>
                  50%
                </Text>
              </Box>
            </Flex>

            <Flex alignItems={'center'} mb={3}>
              <Box display={'flex'} alignItems={'center'}>
                <Text color={'#00B53D'} fontSize={20}>
                  <BsCheckCircleFill />
                </Text>
                <Text ml={2} fontSize={16} fontWeight={600}>
                  CPI = 1
                </Text>
              </Box>
              <Box display={'flex'} alignItems={'center'} ml={4}>
                <Text color={'#00B53D'} fontSize={20}>
                  <BsCheckCircleFill />
                </Text>
                <Text ml={2} fontSize={16} fontWeight={600}>
                  SPI = 1
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Flex justify={'space-between'}>
            <Flex alignItems={'center'}>
              <Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Text fontSize={16} fontWeight={600}>
                    Realizado
                  </Text>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Text fontSize={14} fontWeight={600}>
                    R$
                  </Text>
                  <Text fontSize={16} ml={2} fontWeight={600}>
                    50.000.000,00
                  </Text>
                </Box>
              </Box>
              <Box
                display={'flex'}
                justifyItems={'center'}
                justifyContent={'center'}
                alignItems="center"
                bg={'#2E69FD'}
                ml={4}
                height={'100%'}
                borderRadius={2}
              >
                <Text p={1} color="#ffffff" fontSize={20} fontWeight={'600'}>
                  50%
                </Text>
              </Box>
            </Flex>
            <Flex alignItems={'center'}>
              <Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Text fontSize={16} fontWeight={600}>
                    Não Previsto
                  </Text>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Text fontSize={14} fontWeight={600}>
                    R$
                  </Text>
                  <Text fontSize={16} ml={2} fontWeight={600}>
                    5.000.000,00
                  </Text>
                </Box>
              </Box>
              <Box
                display={'flex'}
                justifyItems={'center'}
                justifyContent={'center'}
                alignItems="center"
                bg={'#CC0000'}
                ml={4}
                height={'100%'}
                borderRadius={2}
              >
                <Text p={1} color="#ffffff" fontSize={20} fontWeight={'600'}>
                  5%
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default CardOrcamento;
