import { useState } from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';

export default function BotoesSelecionarPolo() {
  const [selecionadoAlagoas, setSelecionadoAlagoas] = useState(true);
  const [selecionadoTucanoSul, setSelecionadoTucanoSul] = useState(false);

  const handleClick = () => {
    if (selecionadoAlagoas) {
      setSelecionadoAlagoas(false);
      setSelecionadoTucanoSul(true);
    } else {
      setSelecionadoAlagoas(true);
      setSelecionadoTucanoSul(false);
    }
  };

  return (
    <Flex mb={3}>
      <Box>
        <Button
          background={selecionadoAlagoas ? 'origem.300' : 'white'}
          color={selecionadoAlagoas ? 'white' : 'origem.300'}
          _hover={{
            background: 'origem.500',
            color: 'white',
            transition: 'all 0.4s',
          }}
          onClick={handleClick}
          borderLeftRadius={'6px'}
          borderRightRadius={0}
        >
          Alagoas
        </Button>
        <Button
          background={selecionadoTucanoSul ? 'origem.300' : 'white'}
          color={selecionadoTucanoSul ? 'white' : 'origem.300'}
          _hover={{
            background: 'origem.500',
            color: 'white',
            transition: 'all 0.4s',
          }}
          onClick={handleClick}
          borderLeftRadius={0}
          borderRightRadius={'6px'}
        >
          Tucano Sul
        </Button>
      </Box>
    </Flex>
  );
}
