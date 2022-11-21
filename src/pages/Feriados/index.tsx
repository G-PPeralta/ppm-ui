import { Heading } from "@chakra-ui/react";

import Sidebar from "components/SideBar";

import ModalAdicionarFeriado from "./components/ModaAdicionarFeriado";

function Feriados() {
  return (
    <>
      <Sidebar>
        <Heading>Feriados</Heading>
        <ModalAdicionarFeriado />
      </Sidebar>
    </>
  );
}

export default Feriados;
