import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {
    bg: "rgba(0,0,0, 0.3)",
    backdropFilter: "blur(5px)",
  },
  dialog: {},
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
