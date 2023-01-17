// CRIADO EM: 03/10/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: COMPONENTE PADRONIZADO PARA BOTÃO NA COR VERMELHA COM VARIANT PRIMARY

import { Button, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";

import { handleCancelar } from "utils/handleCadastro";

interface Props {
  text: string; // Texto do botão
  leftIcon?: any; // Componente React Icons do Ícone
  rightIcon?: any; // Componente React Icons do Ícone
  formikForm: FormikProps<any>;
  onClose: Function; // Função padrão useDisclosure ChakraUi para fechar o Modal
}

function BotaoVermelhoPrimary({
  text,
  leftIcon,
  rightIcon,
  formikForm,
  onClose,
}: Props) {
  return (
    <Button
      h={"56px"}
      borderRadius={"10px"}
      background={"red.500"}
      variant="primary"
      color="white"
      onClick={() => handleCancelar(formikForm, onClose)}
      _hover={{
        background: "red.600",
        transition: "all 0.4s",
        color: "white",
      }}
      leftIcon={leftIcon || null}
      rightIcon={rightIcon || null}
    >
      <Text fontSize="16px" fontWeight={"bold"}>
        {text}
      </Text>
    </Button>
  );
}

export default BotaoVermelhoPrimary;
