import { Flex } from "@chakra-ui/react";

import BotaoDescricaoEJustificativa from "./BotaoDescricaoEJustificativa";
import ModalConfiguracoes from "./Configuracoes/ModalConfiguracoes";
import LicoesAprendidasModal from "./LicoesAprendidas/LicoesAprendidasModal";
import BotaoListadeTarefas from "./Tarefas/BotaoListaDeTarefas";

function BotoesModais({
  licoes,
  setLicoes,
  categorias,
  callBack,
  infoProjeto,
  setRender,
  projeto,
  refresh,
  setRefresh,
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
        <ModalConfiguracoes
          projeto={projeto}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </Flex>
    </>
  );
}

export default BotoesModais;
