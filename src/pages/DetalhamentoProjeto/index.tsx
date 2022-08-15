import { Flex } from '@chakra-ui/react';

import { Gantt } from 'components/Gantt';
import Sidebar from 'components/SideBar';

import BotoesModais from './components/BotoesModais';
import CardInfoProjeto from './components/CardInfoProjeto';
import CardOrcamento from './components/CardOrcamento';
import GraficoCurvaS from './components/GraficoCurvaS';

function DetalhamentoProjeto() {
  return (
    <>
      <Sidebar>
        <Flex
          w={'100%'}
          justifyContent={'space-between'}
          direction={'row'}
          wrap={'wrap'}
          mb={4}
        >
          <CardInfoProjeto />
          <CardOrcamento />
          <BotoesModais />
        </Flex>
        <Gantt />
        <GraficoCurvaS />
      </Sidebar>
    </>
  );
}

export default DetalhamentoProjeto;
