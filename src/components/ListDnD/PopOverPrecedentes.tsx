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

function PopOverPrecedentes() {
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
            <CheckboxGroup>
              <Stack spacing={[1, 3]} direction={'column'}>
                <Checkbox value="Atividade1">Atividade 1</Checkbox>
                <Checkbox value="Atividade2">Atividade 2</Checkbox>
                <Checkbox value="Atividade3">Atividade 3</Checkbox>
                <Checkbox value="Atividade4">Atividade 4</Checkbox>
                <Checkbox value="Atividade5">Atividade 5</Checkbox>
                <Checkbox value="Atividade6">Atividade 6</Checkbox>
                <Checkbox value="Atividade7">Atividade 7</Checkbox>
                <Checkbox value="Atividade8">Atividade 8</Checkbox>
                <Checkbox value="Atividade9">Atividade 9</Checkbox>
              </Stack>
            </CheckboxGroup>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </FormControl>
  );
}

export default PopOverPrecedentes;
