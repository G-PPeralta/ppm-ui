//  CRIADO EM: 9/2022
//  AUTOR: Bruno Fracaro, Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Popover para seletor de precedentes.

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
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import { PrecedentesCadastroProjetoTipo } from "interfaces/CadastrosModaisInfograficos";

interface Props {
  registerForm: FormikProps<any>;
  index: number;
}

function PopOverPrecedentes({ registerForm, index }: Props) {
  const handlePopoverPrecedentes = (
    indexPrecedente: number,
    precedenteIsChecked: boolean
  ) => {
    const newList = registerForm.values.atividades[index].precedentes;

    newList[indexPrecedente].checked = precedenteIsChecked;

    registerForm.setFieldValue(`atividades[${index}].precedentes`, newList);
  };

  return (
    <FormControl>
      <Popover isLazy>
        <PopoverTrigger>
          <Button
            h={"56px"}
            borderRadius={"8px"}
            backgroundColor={"white"}
            _hover={{
              backgroundColor: "origem.500",
              color: "white",
              transition: "all 0.4s",
            }}
            fontSize={"14px"}
            fontWeight={"400"}
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
            <CheckboxGroup colorScheme="blue">
              <Stack spacing={[1, 3]} direction={"column"}>
                {registerForm.values.atividades[index].precedentes.map(
                  (
                    atividade: PrecedentesCadastroProjetoTipo,
                    index: number
                  ) => (
                    <Checkbox
                      key={index}
                      isChecked={atividade.checked}
                      onChange={() =>
                        handlePopoverPrecedentes(index, !atividade.checked)
                      }
                    >
                      {atividade.nome}
                    </Checkbox>
                  )
                )}
              </Stack>
            </CheckboxGroup>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </FormControl>
  );
}

export default PopOverPrecedentes;
