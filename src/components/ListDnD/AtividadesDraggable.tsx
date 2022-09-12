import { Draggable } from 'react-beautiful-dnd';
import { FiTrash } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';

import { Box, Flex, FormControl, Input, Select, Text } from '@chakra-ui/react';

import { useCadastroProjetoTipo } from 'hooks/useCadastroProjetoTipo';

interface Props {
  index: number;
  item: any;
  remove: any;
  handleChangeProp: any;
  list: any;
}

function AtividadesDraggable({
  item,
  index,
  remove,
  handleChangeProp,
  list,
}: Props) {
  const { registerForm } = useCadastroProjetoTipo();

  const handleChange = (event: any, chave: any) => {
    item[chave] = event.target.value;
    handleChangeProp(index, chave, event.target.value);
    registerForm.setFieldValue('atividades', list);
  };

  return (
    <Draggable draggableId={`list${index}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            display="flex"
            flexWrap="wrap"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            w="100%"
            bg={'#f5f5f5'}
            px={5}
            py={2}
            borderRadius={'60px'}
            mb={2}
          >
            <Flex flexDirection={'row'} gap={4}>
              <Flex align={'center'} justify={'center'} gap={3}>
                <GiHamburgerMenu color="#2E69FD" size={16} />
                <Text sx={{ fontSize: 16, fontWeight: '600' }}>
                  {index + 1}
                </Text>
              </Flex>
              <FormControl>
                <Text sx={{ fontSize: 12, fontWeight: '600' }}>BASE</Text>
                <Select
                  id={'base'}
                  name={'base'}
                  placeholder="Selecione"
                  bg={'#fff'}
                  value={item.base}
                  onChange={(event) => handleChange(event, 'base')}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl>
                <Text sx={{ fontSize: 12, fontWeight: '600' }}>ATIVIDADE</Text>
                <Select
                  id="tarefa"
                  name="tarefa"
                  placeholder="Selecione"
                  bg={'#fff'}
                  value={item.tarefa}
                  onChange={(event) => handleChange(event, 'tarefa')}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl>
                <Text sx={{ fontSize: 12, fontWeight: '600' }}>
                  PRECEDENTES
                </Text>
                <Select
                  id="precedente"
                  name="precedente"
                  placeholder="Selecione"
                  bg={'#fff'}
                  value={item.precedente}
                  onChange={(event) => handleChange(event, 'precedente')}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>

              <FormControl>
                <Text sx={{ fontSize: 12, fontWeight: '600' }}>DIAS</Text>
                <Input
                  placeholder="Digite o número de dias"
                  type={'number'}
                  bg={'#fff'}
                  id="dias"
                  name="dias"
                  value={item.dias}
                  onChange={(event) => handleChange(event, 'dias')}
                />
              </FormControl>
              {/* <Flex
                p={1}
                align={'center'}
                justify={'center'}
                _hover={{ cursor: 'pointer' }}
              >
                <FiEdit
                  onClick={() => enableEdit(index)}
                  color="#2E69FD"
                  size={16}
                />
              </Flex> */}
              <Flex
                p={1}
                align={'center'}
                justify={'center'}
                _hover={{ cursor: 'pointer' }}
              >
                <FiTrash
                  onClick={() => remove(index)}
                  color="#F94144"
                  size={16}
                />
              </Flex>
            </Flex>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default AtividadesDraggable;
