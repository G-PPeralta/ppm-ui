import * as React from 'react';

import { Flex } from '@chakra-ui/react';

import Sidebar from 'components/SideBar';

import CardOrcamento from './components/CardOrcamento';

function DetalhamentoProjeto() {
  return (
    <>
      <Sidebar>
        <Flex>
          <CardOrcamento />
        </Flex>
      </Sidebar>
    </>
  );
}

export default DetalhamentoProjeto;
