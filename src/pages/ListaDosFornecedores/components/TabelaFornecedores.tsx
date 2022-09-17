import { AiFillEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  IconButton,
} from '@chakra-ui/react';

// import { EditaValorModal } from '.components/TabelaFornecedores';

export function TabelaFornecedores() {
  // const test = ['Nome 1', 'Nome 2', 'Nome 3']

  return (
    <TableContainer mt={4} mb={3} ml={1}>
      <Table variant="unstyled">
        <Thead>
          <Tr background="origem.500" color="white">
            <Th>ID</Th>
            <Th>Fornecedor</Th>
            <Th>Orçamento</Th>
            <Th>Realizado</Th>
            <Th>Responsável</Th>
            <Th>Descrição e justificativa</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td isNumeric>1</Td>
            <Td>Nome 1</Td>
            <Td>{(1000000.02).toLocaleString('pt-br')}</Td>
            <Td>{(1000000.02).toLocaleString('pt-br')}</Td>
            <Td>Nome 1</Td>
            <Td>
              {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.substr(
                0,
                18,
              ) + '>'}
            </Td>
            <Td>
              <IconButton
                aria-label="Plus sign"
                icon={<AiFillEdit />}
                background="white"
                variant="secondary"
                color="#2D2926"
                mr={2}
                isRound={true}
                size="sm"
              />
              <IconButton
                aria-label="Plus sign"
                icon={<FaTrash />}
                background="white"
                variant="secondary"
                color="#F94144"
                mr={2}
                isRound={true}
                size="sm"
              />

              {/* <EditaValorModal /> */}
            </Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>Nome 2</Td>
            <Td>{(1000000.02).toLocaleString('pt-br')}</Td>
            <Td>{(1000000.02).toLocaleString('pt-br')}</Td>
            <Td>Nome 2</Td>
            <Td>
              {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.substr(
                0,
                18,
              ) + '>'}
            </Td>
            <Td>
              <IconButton
                aria-label="Plus sign"
                icon={<AiFillEdit />}
                background="white"
                variant="secondary"
                color="#2D2926"
                mr={2}
                isRound={true}
                size="sm"
              />
              <IconButton
                aria-label="Plus sign"
                icon={<FaTrash />}
                background="white"
                variant="secondary"
                color="#F94144"
                mr={2}
                isRound={true}
                size="sm"
              />

              {/* <EditaValorModal /> */}
            </Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>Nome 3</Td>
            <Td>{(1000000.02).toLocaleString('pt-br')}</Td>
            <Td>{(1000000.02).toLocaleString('pt-br')}</Td>
            <Td>Nome 3</Td>
            <Td>
              {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.substr(
                0,
                18,
              ) + '>'}
            </Td>
            <Td>
              <IconButton
                aria-label="Plus sign"
                icon={<AiFillEdit />}
                background="white"
                variant="secondary"
                color="#2D2926"
                mr={2}
                isRound={true}
                size="sm"
              />
              <IconButton
                aria-label="Plus sign"
                icon={<FaTrash />}
                background="white"
                variant="secondary"
                color="#F94144"
                mr={2}
                isRound={true}
                size="sm"
              />

              {/* <EditaValorModal /> */}
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr background="origem.200" color="white">
            <Th>Total</Th>
            <Th></Th>
            <Th>{(1000000.02).toLocaleString('pt-br')}</Th>
            <Th>{(1000000.02).toLocaleString('pt-br')}</Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
