// CRIADO EM: 10/06/2022
// AUTOR: ALEXANDRE BRITO
// DESCRIÇÃO DO ARQUIVO: ARQUIVO RESPONSÁVEL POR SETAR AS CONFIGURAÇÕES PERSONALIZADAS DE ESTILOS DO CHAKRA UI

import { extendTheme } from "@chakra-ui/react";

import { ButtonStyles as Button } from "./components/buttonStyles";
import { CheckboxStyles as Checkbox } from "./components/checkboxStyles";
import { InputStyles as Input } from "./components/inputStyles";
import { modalTheme as Modal } from "./components/modalStyles";
import { NumberInputStyles as NumberInput } from "./components/numberInputStyles";
import foundations from "./foundations";

const direction = "ltr";

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  cssVarPrefix: "chakra",
};

export const theme = {
  direction,
  ...foundations,
  config,
  components: {
    Button,
    Input,
    Modal,
    Checkbox,
    NumberInput,
  },
};

export default extendTheme(theme);
