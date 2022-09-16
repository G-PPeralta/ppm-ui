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
  const { registerForm, listaAtividades } = useCadastroProjetoTipo();

  const handleChange = (event: any, chave: any) => {
    item[chave] = Number(event.target.value);
    handleChangeProp(index, chave, Number(event.target.value));
    registerForm.setFieldValue('atividades', list);
  };

  const [render, setRender] = useState(false);

  const handlePopover = (indexIn: number, value: boolean) => {
    const newList = item.precedentes;
    newList[indexIn].checked = value;
    handleChangeProp(index, 'precedentes', newList);
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
                  id="atividadeId"
                  name="atividadeId"
                  placeholder="Selecione"
                  bg={'#fff'}
                  value={item.atividade}
                  onChange={(event) => handleChange(event, 'atividadeId')}
                >
                  {listaAtividades.map((data, index) => (
                    <option value={data.id} key={index}>
                      {data.tarefa}
                    </option>
                  ))}
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
                  value={
                    listaAtividades.filter(
                      (atividade) => atividade.id === item.atividadeId,
                    )[0]?.dias
                  }
                  isDisabled
                />
              </FormControl>

              <Flex direction={'column'}>
                <Text sx={{ fontSize: 12, fontWeight: '600' }}>
                  PRECEDENTES
                </Text>
                <PopOverPrecedentes
                  handlePopover={handlePopover}
                  atividades={item.precedentes}
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
