import { Flex } from '@chakra-ui/react';

import BotaoDescricaoEJustificativa from './BotaoDescricaoEJustificativa';
import BotaoLicoesAprendidas from './BotaoLicoesAprendidas';
import BotaoListadeTarefas from './BotaoListaDeTarefas';

function BotoesModais() {
  return (
    <>
      <Flex
        backgroundColor={'white'}
        borderRadius={6}
        direction={'column'}
        grow={1}
        shrink={1}
        basis={'180px'}
      >
        <BotaoDescricaoEJustificativa />
        <BotaoListadeTarefas />
        <BotaoLicoesAprendidas />
      </Flex>
    </>
  );
}

export default BotoesModais;
