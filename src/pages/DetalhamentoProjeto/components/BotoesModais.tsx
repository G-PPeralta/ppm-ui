import { Flex } from '@chakra-ui/react';

import BotaoDescricaoEJustificativa from './BotaoDescricaoEJustificativa';
import BotaoLicoesAprendidas from './BotaoLicoesAprendidas';
import BotaoListadeTarefas from './BotaoListaDeTarefas';

function BotoesModais() {
  return (
    <>
      <Flex backgroundColor={'white'} borderRadius={6} direction={'column'}>
        <BotaoDescricaoEJustificativa />
        <BotaoListadeTarefas />
        <BotaoLicoesAprendidas />
      </Flex>
    </>
  );
}

export default BotoesModais;
