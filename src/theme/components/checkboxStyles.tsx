import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const origem = definePartsStyle({
  control: {
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    padding: "0.5rem",
  },
});

export const CheckboxStyles = defineMultiStyleConfig({
  variants: { origem },
});
