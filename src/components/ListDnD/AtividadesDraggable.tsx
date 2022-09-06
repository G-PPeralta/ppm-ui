import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FiTrash } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';

import { Box, Flex, FormControl, Input, Select, Text } from '@chakra-ui/react';

interface Props {
  index: number;
  item: any;
  remove: any;
}

function AtividadesDraggable({ item, index, remove }: Props) {
  // const [render, setRender] = useState<any>([]);
  const [id, setId] = useState<any>('listID');

  console.log('Item', item);
  console.log('index', index);

  useEffect(() => {
    // setList([
    //   {
    //     id: 1,
    //   },
    //   {
    //     id: 2,
    //   },
    // ]);
    const now = Date.now();
    const newId = id + '-' + now.toLocaleString();
    // console.log('newId', newId);
    setId(newId);
  }, []);

  // const remove = (index: number) => {
  //   const newList = list;
  //   newList.splice(index, 1);
  //   setRender(!render);
  // };

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
                <Text sx={{ fontSize: 16, fontWeight: '600' }}>{item.id}</Text>
              </Flex>
              <FormControl>
                <Text sx={{ fontSize: 12, fontWeight: '600' }}>BASE</Text>
                <Select
                  id="atividades[0].base"
                  name="atividades[0].base"
                  placeholder="Selecione"
                  bg={'#fff'}
                  // value={registerForm.values.atividades[index].base}
                  // onChange={(event) => handleChange(event)}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl>
                <Text sx={{ fontSize: 12, fontWeight: '600' }}>ATIVIDADE</Text>
                <Select
                  id="atividade"
                  name="atividade"
                  placeholder="Selecione"
                  bg={'#fff'}
                  // value={registerForm.values.atividades[index].tarefa}
                  // onChange={registerForm.handleChange}
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
                  // value={registerForm.values.atividades[index].precedente}
                  // onChange={registerForm.handleChange}
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
