import { Flex } from "@chakra-ui/react";

import BotaoDescricaoEJustificativa from "./BotaoDescricaoEJustificativa";
import LicoesAprendidasModal from "./LicoesAprendidas/LicoesAprendidasModal";
import BotaoListadeTarefas from "./Tarefas/BotaoListaDeTarefas";

function BotoesModais({
  licoes,
  setLicoes,
  categorias,
  callBack,
  infoProjeto,
  setRender,
}: any) {
  return (
    <>
      <Flex
        backgroundColor={"white"}
        borderRadius={6}
        direction={"column"}
        flex={1}
        justify={"space-between"}
      >
        <BotaoDescricaoEJustificativa
          infoProjeto={infoProjeto}
          setRender={setRender}
        />
        <BotaoListadeTarefas />
        <LicoesAprendidasModal
          licoes={licoes}
          setLicoes={setLicoes}
          categorias={categorias}
          callBack={callBack}
        />
      </Flex>
    </>
  );
}

export default BotoesModais;
