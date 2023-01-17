// CRIADO EM: 10/10/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: COMPONENTE PADRONIZADO PARA BOTÃO COM VISUAL MAIS LARGO NA COR AZUL COM VARIANT GHOST

import { Button, Text } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { FormikProps } from "formik";

import { handleCadastrarRefresh } from "utils/handleCadastro";

interface Props {
  text: string; // Texto do botão
  leftIcon?: any; // Componente React Icons do Ícone
  rightIcon?: any; // Componente React Icons do Ícone
  formikForm: FormikProps<any>;
  onClose: Function; // Função padrão useDisclosure ChakraUi para fechar o Modal
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>; // Função para atualizar a página
  refresh: boolean; // Variável para atualizar a página
  loading: boolean; // Variável para mostrar o loading
}

function BotaoAzulLargoGhost({
  text,
  leftIcon,
  rightIcon,
  formikForm,
  onClose,
  setRefresh,
  refresh,
  loading,
}: Props) {
  return (
    <Button
      h={"56px"}
      borderRadius={"10px"}
      disabled={!formikForm.isValid || !formikForm.dirty}
      background={"white"}
      color={"origem.500"}
      onClick={() =>
        handleCadastrarRefresh(formikForm, onClose, setRefresh, refresh)
      }
      _hover={{
        background: "origem.500",
        transition: "all 0.4s",
        color: "white",
      }}
      leftIcon={leftIcon || null}
      rightIcon={rightIcon || null}
    >
      {loading ? (
        <Ring speed={2} lineWeight={5} color="blue" size={24} />
      ) : (
        <>
          <Text fontSize="16px" fontWeight={"bold"} mx={12}>
            {text}
          </Text>
        </>
      )}
    </Button>
  );
}

export default BotaoAzulLargoGhost;
