//  CRIADO EM: 9/2022
//  AUTOR: Bruno Fracaro, Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Popover para selecionar tipo.

import {
  Button,
  Flex,
  FormControl,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import { PrecedentesCadastroProjetoTipo } from "interfaces/CadastrosModaisInfograficos";

interface Props {
  registerForm: FormikProps<any>;
  index: number;
}

function PopOverTipo({ registerForm, index }: Props) {
  return (
    <FormControl>
      <Popover isLazy>
        <PopoverTrigger>
          <Button
            h={"56px"}
            w={"100px"}
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
            Configurar
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">
            Tipo de cada precedente
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Stack direction={"column"}>
              {registerForm.values.atividades[index].precedentes.map(
                (atividade: PrecedentesCadastroProjetoTipo, i: number) =>
                  atividade.checked ? (
                    <Flex align={"center"} justify={"space-between"}>
                      <Text>{atividade.nome}</Text>
                      <Input
                        h={"56px"}
                        _placeholder={{ color: "#949494" }}
                        fontSize={"14px"}
                        fontWeight={"400"}
                        color={"black"}
                        maxW={"128px"}
                        placeholder="IF+0"
                        type={"text"}
                        bg={"#fff"}
                        id={`atividades[${index}].precedentes[${i}].tipo`}
                        name={`atividades[${index}].precedentes[${i}].tipo`}
                        value={atividade.tipo}
                        onChange={(event) => {
                          registerForm.setFieldValue(
                            `atividades[${index}].precedentes[${i}].tipo`,
                            event.target.value
                          );
                        }}
                      />
                    </Flex>
                  ) : null
              )}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </FormControl>
  );
}

export default PopOverTipo;
