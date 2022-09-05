import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';

import { Box, Text, Select } from '@chakra-ui/react';

interface Props {
  index: number;
  item: any;
}

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function ListDnD() {
  const [list, setList] = React.useState<any>([]);
  const [render, setRender] = React.useState<any>([]);
  const [id, setId] = React.useState<any>('listID');

  React.useEffect(() => {
    setList([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    const now = Date.now();
    const newId = id + '-' + now.toLocaleString();
    // console.log('newId', newId);
    setId(newId);
  }, []);

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newList = reorder(
      list,
      result.source.index,
      result.destination.index,
    );
    // console.log('newList', newList);
    setList(newList);
  }

  const remove = (index: number) => {
    const newList = list;
    newList.splice(index, 1);
    setList(newList);
    setRender(!render);
  };

  const enableEdit = (index: number) => {
    setRender(!render);
  };

  const ListItem = ({ item, index }: Props) => (
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
            justifyContent="space-between"
            w="100%"
            bg={'#f5f5f5'}
            p={3}
            borderRadius="50px"
            mb={2}
          >
            <GiHamburgerMenu color="#2E69FD" size={16} />
            <Text sx={{ fontSize: 16, fontWeight: '600' }}>{item.id}</Text>
            <Box w={'112px'}>
              <Text sx={{ fontSize: 12, fontWeight: '600', color: '#d6d4d4' }}>
                BASE
              </Text>
              <Select
                bg={'#fff'}
                id="base"
                name="base"
                // value={projectsForm.projectsForm.values.complexidadeId}
                // onChange={projectsForm.projectsForm.handleChange}
                w={'112px'}
              >
                {/* {complexidadeState.map((complexidade) => (
            <option key={complexidade.id} value={complexidade.id}>
              {complexidade.complexidade}
            </option>
          ))} */}
              </Select>
            </Box>
            <Box w={'204px'}>
              <Text sx={{ fontSize: 12, fontWeight: '600', color: '#d6d4d4' }}>
                TAREFA
              </Text>
              <Select
                bg={'#fff'}
                id="tarefa"
                name="tarefa"
                // value={projectsForm.projectsForm.values.complexidadeId}
                // onChange={projectsForm.projectsForm.handleChange}
                w={'204px'}
              >
                {/* {complexidadeState.map((complexidade) => (
            <option key={complexidade.id} value={complexidade.id}>
              {complexidade.complexidade}
            </option>
          ))} */}
              </Select>
            </Box>
            <Box w={'204px'}>
              <Text sx={{ fontSize: 12, fontWeight: '600', color: '#d6d4d4' }}>
                PRECEDENTES
              </Text>
              <Select
                bg={'#fff'}
                id="precedentes"
                name="precedentes"
                // value={projectsForm.projectsForm.values.complexidadeId}
                // onChange={projectsForm.projectsForm.handleChange}
                w={'204px'}
              >
                {/* {complexidadeState.map((complexidade) => (
            <option key={complexidade.id} value={complexidade.id}>
              {complexidade.complexidade}
            </option>
          ))} */}
              </Select>
            </Box>
            <Box w={'112px'}>
              <Text sx={{ fontSize: 12, fontWeight: '600', color: '#d6d4d4' }}>
                Dias
              </Text>
              <Select
                bg={'#fff'}
                id="dias"
                name="dias"
                // value={projectsForm.projectsForm.values.complexidadeId}
                // onChange={projectsForm.projectsForm.handleChange}
                w={'112px'}
              >
                {/* {complexidadeState.map((complexidade) => (
            <option key={complexidade.id} value={complexidade.id}>
              {complexidade.complexidade}
            </option>
          ))} */}
              </Select>
            </Box>
            <Box p={1} _hover={{ cursor: 'pointer' }}>
              <FiEdit
                onClick={() => enableEdit(index)}
                color="#2E69FD"
                size={16}
              />
            </Box>
            <Box p={1} _hover={{ cursor: 'pointer' }}>
              <FiTrash
                onClick={() => remove(index)}
                color="#F94144"
                size={16}
              />
            </Box>
          </Box>
        </div>
      )}
    </Draggable>
  );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id}>
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item: any, index: any) => (
                <ListItem item={item} index={index} key={`list${index}`} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
