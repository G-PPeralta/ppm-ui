import { useState } from "react";

import { Flex } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import Sidebar from "components/SideBar";

import { useCadastroAtividadeProjeto } from "hooks/useCadastroAtividadeProjeto";

import ModalCadastroAtividade from "./components/ModalCadastroAtividades";

export function Reports() {
  const { loading } = useCadastroAtividadeProjeto();
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Sidebar>
        {!loading ? (
          <>
            <h1>Reports</h1>
            <ModalCadastroAtividade
              setRefresh={setRefresh}
              refresh={refresh}
              // atividades={atividades}
            />
          </>
        ) : (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )}
      </Sidebar>
    </>
  );
}
