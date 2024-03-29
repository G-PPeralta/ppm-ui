// CRIADO EM: 10/06/2022
// AUTOR: ALEXANDRE BRITO
// DESCRIÇÃO DO ARQUIVO: ARQUIVO RESPONSÁVEL POR CRIAR E ARMAZENAR OS VALORES DE BREAKPOINTS

import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

export default breakpoints;
