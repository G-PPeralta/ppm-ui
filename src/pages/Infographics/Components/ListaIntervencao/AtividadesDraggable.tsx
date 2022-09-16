import { Draggable } from 'react-beautiful-dnd';
// import { FiTrash } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';

import { Box, Flex, FormControl, Select, Text } from '@chakra-ui/react';

import { useCadastroIntervencao } from 'hooks/useCadastroIntervencao';

interface Props {
  index: number;
  item: any;
  // remove: any;
  handleChangeProp: any;
  list: any;
  intervencaoForm: any;
}

function AtividadesDraggable({
  item,
  index,
  // remove,
  handleChangeProp,
  list,
  intervencaoForm,
}: Props) {
  const { listaResponsaveis } = useCadastroIntervencao();

  const handleChange = (event: any, chave: any) => {
    item[chave] = event.target.value;
    handleChangeProp(index, chave, event.target.value);
    const arrayFinalAtividades = intervencaoForm.values.atividades;
    arrayFinalAtividades[index].responsavel = Number(event.target.value);
    intervencaoForm.setFieldValue('atividades', arrayFinalAtividades);
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
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            w="100%"
            bg={'#f5f5f5'}
            px={5}
            py={2}
            borderRadius={'60px'}
            mb={2}
            gap={4}
          >
            <Flex align={'center'} justify={'center'} gap={3}>
              <GiHamburgerMenu color="#2E69FD" size={16} />
              <Text sx={{ fontSize: 16, fontWeight: '600' }}>{index + 1}</Text>
            </Flex>
            <FormControl>
              <Text sx={{ fontSize: 12, fontWeight: '600' }}>ATIVIDADE</Text>
              <Select
                id="atividade"
                name="atividade"
                placeholder="Selecione"
                bg={'#fff'}
                value={item.atividade.id}
                isDisabled
              >
                {list.map(({ atividade }: any) => (
                  <option key={atividade.id} value={atividade.id}>
                    {atividade.obs}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Text sx={{ fontSize: 12, fontWeight: '600' }}>RESPONSÁVEL</Text>
              <Select
                id="responsavel"
                name="responsavel"
                placeholder="Selecione"
                bg={'#fff'}
                value={item.responsavel}
                onChange={(event) => handleChange(event, 'responsavel')}
              >
                {listaResponsaveis.map((responsavel: any) => (
                  <option key={responsavel.id} value={responsavel.id}>
                    {responsavel.nome}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Flex
              p={1}
              align={'center'}
              justify={'center'}
              _hover={{ cursor: 'pointer' }}
            >
              {/* <FiTrash
                onClick={() => remove(index)}
                color="#F94144"
                size={16}
              /> */}
            </Flex>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default AtividadesDraggable;
