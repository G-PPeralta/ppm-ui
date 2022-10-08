import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import {
  L10n,
  registerLicense,
  setCulture,
  setCurrencyCode,
} from "@syncfusion/ej2-base";
import theme from "theme/index";

import { App } from "./App";

L10n.load({
  "pt-BR": {
    grid: {
      EmptyRecord: "Nenhum cronograma encontrado",
    },
  },
});
setCulture("pt-BR");
setCurrencyCode("BRL");

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

registerLicense(`${process.env.REACT_APP_SYNCFUSION_KEY}`);

root.render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
  // </React.StrictMode>,
);
