// CRIADO EM: 03/11/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE ESTILOS DOS BOTÕES NO PADRÃO ORIGEM

import { mode } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    origemBlueSolid: (props: any) => ({
      height: "56px",
      width: "208px",
      borderRadius: "10px",
      bg: mode("origem.500", "origem.400")(props),
      color: mode("white", "white")(props),
      _hover: {
        bg: mode("origem.600", "origem.500")(props),
        transition: "all 0.4s",
      },
    }),
    origemBlueOutline: (props: any) => ({
      height: "56px",
      width: "208px",
      borderRadius: "10px",
      bg: "transparent",
      border: "2px solid",
      borderColor: mode("origem.500", "origem.400")(props),
      color: mode("origem.500", "origem.500")(props),
      _hover: {
        color: mode("white", "white")(props),
        bg: mode("origem.500", "origem.400")(props),
        transition: "all 0.4s",
      },
    }),
    origemBlueGhost: (props: any) => ({
      height: "56px",
      width: "208px",
      bg: "transparent",
      color: mode("origem.500", "origem.400")(props),
      _hover: {
        bg: mode("origem.500", "origem.400")(props),
        color: mode("white", "white")(props),
        transition: "all 0.4s",
      },
    }),
    origemRedSolid: (props: any) => ({
      height: "56px",
      width: "208px",
      borderRadius: "10px",
      bg: mode("red.500", "red.500")(props),
      color: mode("white", "white")(props),
      _hover: {
        bg: mode("red.600", "red.600")(props),
        transition: "all 0.4s",
      },
    }),
    origemRedOutline: (props: any) => ({
      height: "56px",
      width: "208px",
      borderRadius: "10px",
      bg: "transparent",
      border: "2px solid",
      borderColor: mode("red.500", "red.500")(props),
      color: mode("red.500", "red.500")(props),
      _hover: {
        color: mode("white", "white")(props),
        bg: mode("red.500", "red.500")(props),
        transition: "all 0.4s",
      },
    }),
    origemRedGhost: (props: any) => ({
      height: "56px",
      width: "208px",
      bg: "transparent",
      color: mode("red.500", "red.500")(props),
      _hover: {
        bg: mode("red.500", "red.500")(props),
        color: mode("white", "white")(props),
        transition: "all 0.4s",
      },
    }),
    origemEditSolid: (props: any) => ({
      width: "40px",
      height: "40px",
      bg: mode("origem.500", "origem.400")(props),
      color: mode("white", "white")(props),
      _hover: {
        bg: mode("origem.600", "origem.500")(props),
        transition: "all 0.4s",
      },
    }),
    origemEditOutline: (props: any) => ({
      bg: "transparent",
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      border: "2px solid",
      color: mode("origem.500", "origem.400")(props),
      _hover: {
        bg: mode("origem.500", "origem.400")(props),
        color: mode("white", "white")(props),
        transition: "all 0.4s",
        borderRadius: "10px",
        border: "2px solid transparent",
      },
    }),
    origemEditGhost: (props: any) => ({
      bg: "transparent",
      width: "40px",
      height: "40px",
      color: mode("origem.500", "origem.400")(props),
      _hover: {
        bg: mode("origem.500", "origem.400")(props),
        color: mode("white", "white")(props),
        transition: "all 0.4s",
        borderRadius: "10px",
      },
    }),
    origemDeleteSolid: (props: any) => ({
      width: "40px",
      height: "40px",
      bg: mode("red.500", "red.500")(props),
      color: mode("white", "white")(props),
      _hover: {
        bg: mode("red.600", "red.600")(props),
        transition: "all 0.4s",
      },
    }),
    origemDeleteOutline: (props: any) => ({
      bg: "transparent",
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      border: "2px solid",
      color: mode("red.500", "red.500")(props),
      _hover: {
        bg: mode("red.500", "red.500")(props),
        color: mode("white", "white")(props),
        transition: "all 0.4s",
        border: "2px solid transparent",
      },
    }),
    origemDeleteGhost: (props: any) => ({
      bg: "transparent",
      width: "40px",
      height: "40px",
      color: mode("red.500", "red.500")(props),
      _hover: {
        bg: mode("red.500", "red.500")(props),
        color: mode("white", "white")(props),
        transition: "all 0.4s",
      },
    }),
  },
  defaultProps: {},
};
