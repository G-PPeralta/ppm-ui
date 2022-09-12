import { AiFillPlusCircle } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Button,
  Input,
  Text,
  Flex,
  Box,
  Select,
  Textarea,
  Center,
} from '@chakra-ui/react';

import styles from './RegisterProjectType.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function RegisterNewTask({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
      <ModalOverlay className={styles.overlay} />
      <ModalContent width="80%" borderRadius={8} marginTop={3}>
        <ModalHeader
          backgroundColor={'#2E69FD'}
          borderTopRadius={7}
          display={'flex'}
          justifyContent={'center'}
          color={'white'}
          fontSize={'1em'}
        >
          Cadastrar nova atividade
        </ModalHeader>
        <ModalCloseButton color={'white'} />
        <ModalBody>
          <Text
            fontWeight="500"
            fontSize="16px"
            lineHeight="20px"
            marginBottom="10px"
          >
            Nome
          </Text>
          <Flex gap={2} marginBottom={5}>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                ID
              </Text>
              <Input size="md" type="date" width="90%" color="#D6D4D4" />
            </Box>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                Nome
              </Text>
              <Input
                size="md"
                width="150%"
                placeholder="Campanha"
                _placeholder={{ color: '#D6D4D4' }}
              />
            </Box>
          </Flex>
          <Text
            fontWeight="500"
            fontSize="16px"
            lineHeight="20px"
            marginBottom="10px"
          >
            Responsável
          </Text>
          <Flex gap={2} marginBottom={5}>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                RESPONSÁVEL
              </Text>
              <Select
                size="md"
                placeholder="Selecione"
                color="#D6D4D4"
                fontSize="12px"
                width={60}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                ÁREA
              </Text>
              <Select
                size="md"
                placeholder="Selecione"
                color="#D6D4D4"
                fontSize="12px"
                width={60}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
          </Flex>
          <Flex gap={3}>
            <Box width="25%">
              <Text
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                marginBottom="10px"
              >
                Restrição
              </Text>
              <Checkbox marginBottom={4} fontWeight="500">
                Não iniciar antes de
              </Checkbox>
              <Checkbox marginBottom={4} fontWeight="500">
                Não terminar depois de
              </Checkbox>
              <Checkbox marginBottom={4} fontWeight="500">
                O mais breve possível
              </Checkbox>
            </Box>
            <Box width="25%">
              <Text
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                marginBottom="10px"
              >
                Data Restrição
              </Text>
              <Box>
                <Input
                  size="sm"
                  type="date"
                  width="50%"
                  color="#D6D4D4"
                  marginBottom={2}
                />
              </Box>

              <Input
                size="sm"
                type="date"
                width="50%"
                color="#D6D4D4"
                marginBottom={2}
              />
            </Box>
          </Flex>
          <Text
            fontWeight="500"
            fontSize="16px"
            lineHeight="20px"
            marginBottom="10px"
          >
            Precedentes
          </Text>
          <Flex gap={2} marginBottom={4} justifyContent="space-between">
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                ID
              </Text>
              <Input
                size="md"
                width={'5em'}
                color="#D6D4D4"
                placeholder="CIP02"
                _placeholder={{ color: '#D6D4D4', fontSize: '12px' }}
              />
            </Box>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                TAREFA
              </Text>
              <Select
                size="md"
                placeholder="Selecione"
                color="#D6D4D4"
                fontSize="12px"
                width={60}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                TIPO
              </Text>
              <Select
                size="md"
                placeholder="Selecione"
                color="#D6D4D4"
                fontSize="12px"
                width={60}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                DIAS
              </Text>
              <Select
                size="md"
                placeholder="Selecione"
                color="#D6D4D4"
                fontSize="12px"
                width={'6.4em'}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                RESTRIÇÃO
              </Text>
              <Select
                size="md"
                placeholder="Selecione"
                color="#D6D4D4"
                fontSize="12px"
                width={60}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
          </Flex>
          <Flex gap={2} marginBottom={2} justifyContent="space-between">
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                ID
              </Text>
              <Input
                size="md"
                width={'5em'}
                color="#D6D4D4"
                placeholder="CIP02"
                _placeholder={{ color: '#D6D4D4', fontSize: '12px' }}
              />
            </Box>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                BASE
              </Text>
              <Select
                size="md"
                placeholder="Selecione"
                color="#D6D4D4"
                fontSize="12px"
                width={'6.4em'}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                TAREFA
              </Text>
              <Select
                size="md"
                placeholder="Selecione"
                color="#D6D4D4"
                fontSize="12px"
                width={60}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                PRECEDENTES
              </Text>
              <Select
                size="md"
                placeholder="Selecione"
                color="#D6D4D4"
                fontSize="12px"
                width={60}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
            <Box>
              <Text color="#D6D4D4" fontSize="12px">
                DIAS
              </Text>
              <Select
                size="md"
                placeholder="Selecione"
                color="#D6D4D4"
                fontSize="12px"
                width={'6.4em'}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
            <Box alignSelf="center" justifySelf="center" marginTop={4}>
              <button className={styles.editButton}>
                <MdEdit fontSize="12px" />
              </button>
            </Box>
          </Flex>
          <div className={styles.dropzone}>
            <p>
              <AiFillPlusCircle />
            </p>
          </div>
          <Text
            fontWeight="500"
            fontSize="16px"
            lineHeight="20px"
            marginBottom="10px"
          >
            Observações
          </Text>
          <Textarea placeholder="Descreva suas observações" />
        </ModalBody>

        <ModalFooter>
          <Center justifySelf="center" width="100%">
            <Button variant="ghost" color="red">
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              backgroundColor="#0047BB"
              mr={3}
              onClick={() => console.log('submeteu')}
              color="white"
            >
              Concluir cadastro
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
