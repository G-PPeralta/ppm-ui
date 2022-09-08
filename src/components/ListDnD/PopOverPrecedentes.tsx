import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';

function PopOverPrecedentes({ handlePopover, atividades }: any) {
  return (
    <FormControl>
      <Popover isLazy>
        <PopoverTrigger>
          <Button
            backgroundColor={'white'}
            fontWeight={'400'}
            _hover={{
              backgroundColor: 'origem.500',
              color: 'white',
              transition: 'all 0.4s',
            }}
          >
            Selecionar
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">
            Selecione as atividades precedentes
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <CheckboxGroup
              colorScheme="green"
              defaultValue={['naruto', 'kakashi']}
            >
              <Stack spacing={[1, 3]} direction={'column'}>
                {atividades.map((atividade: any, index: any) => (
                  <Checkbox
                    isChecked={atividade.checked}
                    onChange={(event) =>
                      handlePopover(index, !atividade.checked)
                    }
                  >
                    {atividade.nome}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </FormControl>
  );
}

export default PopOverPrecedentes;
