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

function BotaoAzulLargoPrimary({
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
      w={"208px"}
      h={"56px"}
      borderRadius={"8px"}
      disabled={!formikForm.isValid || !formikForm.dirty}
      background={"origem.500"}
      fontSize={"18px"}
      fontWeight={"700"}
      fontFamily={"Mulish"}
      variant="primary"
      color="white"
      onClick={() =>
        handleCadastrarRefresh(formikForm, onClose, setRefresh, refresh)
      }
      _hover={{
        background: "origem.600",
        transition: "all 0.4s",
      }}
      leftIcon={leftIcon || null}
      rightIcon={rightIcon || null}
    >
      {loading ? (
        <Ring speed={2} lineWeight={5} color="white" size={24} />
      ) : (
        <>
          <Text
            fontSize="18px"
            fontWeight={"700"}
            fontFamily={"Mulish"}
            mx={12}
          >
            {text}
          </Text>
        </>
      )}
    </Button>
  );
}

export default BotaoAzulLargoPrimary;
