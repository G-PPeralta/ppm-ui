import { Flex } from "@chakra-ui/react";

import BotaoDescricaoEJustificativa from "./BotaoDescricaoEJustificativa";
import BotaoListadeTarefas from "./BotaoListaDeTarefas";
import LicoesAprendidasModal from "./LicoesAprendidas/LicoesAprendidasModal";

function BotoesModais({ licoes, setLicoes }: any) {
  return (
    <>
      <Flex
        backgroundColor={"white"}
        borderRadius={6}
        direction={"column"}
        grow={1}
        shrink={1}
        basis={"100px"}
      >
        <BotaoDescricaoEJustificativa />
        <BotaoListadeTarefas />
        <LicoesAprendidasModal licoes={licoes} setLicoes={setLicoes} />
      </Flex>
    </>
  );
}

export default BotoesModais;
