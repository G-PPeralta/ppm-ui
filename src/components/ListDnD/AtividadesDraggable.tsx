import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FiTrash } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';

import { Box, Flex, FormControl, Input, Select, Text } from '@chakra-ui/react';

import { useCadastroProjetoTipo } from 'hooks/useCadastroProjetoTipo';

import PopOverPrecedentes from './PopOverPrecedentes';

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

  const [mockAtividades, setMockAtividades] = useState([
    { id: 1, nome: 'Atividade 1', checked: false },
    { id: 2, nome: 'Atividade 2', checked: false },
    { id: 3, nome: 'Atividade 3', checked: false },
    { id: 4, nome: 'Atividade 4', checked: false },
    { id: 5, nome: 'Atividade 5', checked: false },
    { id: 6, nome: 'Atividade 6', checked: false },
    { id: 7, nome: 'Atividade 7', checked: false },
    { id: 8, nome: 'Atividade 8', checked: false },
    { id: 9, nome: 'Atividade 9', checked: false },
    { id: 10, nome: 'Atividade 10', checked: false },
  ]);
  const [render, setRender] = useState(false);

  const handlePopover = (index: number, value: boolean) => {
    const newList = mockAtividades;
    newList[index].checked = value;
    setMockAtividades(newList);
    setRender(!render);
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
                <Text sx={{ fontSize: 12, fontWeight: '600' }}>DIAS</Text>
                <Input
                  placeholder="0"
                  type={'number'}
                  bg={'#fff'}
                  id="dias"
                  name="dias"
                  value={item.dias}
                  onChange={(event) => handleChange(event, 'dias')}
                  isDisabled
                />
              </FormControl>

              <Flex direction={'column'}>
                <Text sx={{ fontSize: 12, fontWeight: '600' }}>
                  PRECEDENTES
                </Text>
                <PopOverPrecedentes
                  handlePopover={handlePopover}
                  atividades={mockAtividades}
                />
              </Flex>

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
