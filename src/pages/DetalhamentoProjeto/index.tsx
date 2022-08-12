import { Flex } from '@chakra-ui/react';

import Sidebar from 'components/SideBar';

import CardInfoProjeto from './components/CardInfoProjeto';
import CardOrcamento from './components/CardOrcamento';

function DetalhamentoProjeto() {
  return (
    <>
      <Sidebar>
        <Flex
          w={'100%'}
          justifyContent={'space-between'}
          direction={'row'}
          wrap={'wrap'}
        >
          <CardInfoProjeto />
          <CardOrcamento />
        </Flex>
      </Sidebar>
    </>
  );
}

export default DetalhamentoProjeto;
