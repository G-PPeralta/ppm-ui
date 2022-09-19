// import { useState } from 'react';
import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Box,
  Text,
} from '@chakra-ui/react';

// import { TextError } from 'components/TextError';

// import { putFornecedor } from 'services/update/Fornecedor';

export function EditarFornecedorModal({
  isOpen,
  onClose,
  onUpdate,
  fornecedor,
}: any) {
  const [nome, setNome] = useState(fornecedor?.fornecedor);
  const [orcamento, setOrcamento] = useState(
    fornecedor ? fornecedor.orcamento : 0,
  );
  const [realizado, setRealizado] = useState(
    fornecedor ? fornecedor.realizado : 0,
  );
  const [responsavel, setResponsavel] = useState(
    fornecedor ? fornecedor.responsavel : '',
  );
  const [descricao, setDescricao] = useState(
    fornecedor ? fornecedor.descricao : '',
  );

  function handleChangeNome(event: any): void {
    setNome(event.target.value);
  }

  function handleChangeOrcamento(event: any): void {
    setOrcamento(event.target.value);
  }

  function handleChangeRealizado(event: any): void {
    setRealizado(event.target.value);
  }

  function handleChangeResponsavel(event: any): void {
    setResponsavel(event.target.value);
  }

  function handleChangeDescricao(event: any): void {
    setDescricao(event.target.value);
  }

  return (
    <Flex>
      <Box
        display={'flex'}
        alignItems={'center'}
        border="2px"
        padding={2}
        borderRadius={6}
        borderColor={'origem.300'}
        _hover={{
          background: '#f5f5f5',
          transition: 'all 0.4s',
          color: 'origem.300',
          cursor: 'pointer',
          borderColor: 'origem.500',
        }}
      >
        <IconButton
          aria-label="Plus sign"
          icon={<BsPlusLg />}
          background="origem.300"
          variant="secondary"
          color="white"
          mr={2}
          isRound={true}
          size="sm"
        />
        <Text
          fontSize={useBreakpointValue({ base: 'sm', md: 'sm' })}
          fontWeight={'bold'}
          color={'origem.500'}
        >
          EDITAR FORNECEDOR
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EDITAR FORNECEDOR</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="fornecedorNome">NOME</FormLabel>
              <Input
                isRequired
                placeholder="Nome do fornecedor"
                type="text"
                id="fornecedorNome"
                name="fornecedorNome"
                defaultValue={fornecedor.fornecedor}
                value={nome}
                onChange={(event) => handleChangeNome(event)}
                width="100%"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="orçamento">ORÇAMENTO</FormLabel>
              <Input
                isRequired
                placeholder="Orçamento"
                type="text"
                id="orçamento"
                name="orçamento"
                defaultValue={fornecedor.orcamento}
                value={orcamento}
                onChange={(event) => handleChangeOrcamento(event)}
                width="100%"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="orçamento">REALIZADO</FormLabel>
              <Input
                isRequired
                placeholder="Realizado"
                type="text"
                id="realizado"
                name="realizado"
                defaultValue={fornecedor.realizado}
                value={realizado}
                onChange={(event) => handleChangeRealizado(event)}
                width="100%"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="orçamento">RESPONSÁVEL</FormLabel>
              <Input
                isRequired
                placeholder="Responsável"
                type="text"
                id="responsável"
                name="responsável"
                defaultValue={fornecedor.responsavel}
                value={responsavel}
                onChange={(event) => handleChangeResponsavel(event)}
                width="100%"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="orçamento">DESCRIÇÃO</FormLabel>
              <Input
                isRequired
                placeholder="Descrição"
                type="text"
                id="descrição"
                name="descrição"
                defaultValue={fornecedor.descricao}
                value={descricao}
                onChange={(event) => handleChangeDescricao(event)}
                width="100%"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              background="origem.300"
              variant="primary"
              color="white"
              onClick={() => onUpdate(fornecedor)}
              _hover={{
                background: 'origem.500',
                transition: 'all 0.4s',
              }}
            >
              SALVAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
