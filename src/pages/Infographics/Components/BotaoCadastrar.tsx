import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import {
  Box,
  Flex,
  // Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  // PopoverFooter,
  // PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  IconButton,
  // useDisclosure,
} from '@chakra-ui/react';

import { RegisterProjectType } from './RegisterProjectType';

function BotaoCadastrar() {
  // const { atividadeIsOpen, atividadeOnOpen, atividadeOnClose } =
  //   useDisclosure();
  // const { intervencaoIsOpen, intervencaoOnOpen, intervencaoOnClose } =
  //   useDisclosure();
  const [projetoModalIsVisible, setProjetoModalIsVisible] = useState(false);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Flex
            mt={2}
            py={3}
            w="75%"
            border={'2px'}
            borderStyle={'dashed'}
            borderColor={'origem.500'}
            borderRadius={'3xl'}
            direction={'column'}
            gap={4}
            align={'center'}
            justify={'center'}
            _hover={{
              cursor: 'pointer',
            }}
          >
            <IconButton
              aria-label="Plus sign"
              icon={<BsPlusLg />}
              background="origem.300"
              variant="secondary"
              color="white"
              isRound={true}
              size="lg"
            />

            <Text color={'origem.500'} fontWeight={600}>
              Cadastrar
            </Text>
          </Flex>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            backgroundColor="origem.400"
            color={'white'}
            border={'none'}
          >
            <PopoverArrow backgroundColor="origem.400" />
            {/* <PopoverHeader>Header</PopoverHeader> */}
            <PopoverCloseButton />
            <PopoverBody>
              <>
                <Text fontSize={'xl'} fontWeight={'600'}>
                  Atividade
                </Text>
                <Text
                  fontSize={'xl'}
                  fontWeight={'600'}
                  _hover={{
                    cursor: 'pointer',
                    transition: 'all 0.4s',
                  }}
                  // onClick={intervencaoOnOpen}
                >
                  Intervenção
                </Text>
                <Box>
                  <Text
                    fontSize={'xl'}
                    fontWeight={'600'}
                    _hover={{
                      cursor: 'pointer',
                      transition: 'all 0.4s',
                    }}
                    onClick={() => setProjetoModalIsVisible(true)}
                  >
                    Projeto
                  </Text>
                  <RegisterProjectType
                    isOpen={projetoModalIsVisible}
                    onClose={() => setProjetoModalIsVisible(false)}
                  />
                </Box>
              </>
              {/* <Button colorScheme="blue">Button</Button> */}
            </PopoverBody>
            {/* <PopoverFooter>This is the footer</PopoverFooter> */}
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}

export default BotaoCadastrar;
