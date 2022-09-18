import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Flex } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { ICardInfoProjeto } from "interfaces/DetalhamentoProjetos";

import { Gantt } from "components/Gantt";
import Sidebar from "components/SideBar";

import { getInfoProjetos } from "services/get/DetalhamentoProjetos";

import BotoesModais from "./components/BotoesModais";
import CardInfoProjeto from "./components/CardInfoProjeto";
import CardOrcamento from "./components/CardOrcamento";
import GraficoCurvaS from "./components/GraficoCurvaS";

function DetalhamentoProjeto() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [infoProjeto, setInfoProjeto] = useState<ICardInfoProjeto>({
    nome_projeto: "",
    data_inicio: null,
    data_fim: null,
    numero: 0,
    polo: "",
    local: "",
    demanda: "",
    nome_responsavel: "",
    coordenador_nome: "",
  });

  const handleGetInfoProjetos = async () => {
    if (id) {
      const { data } = await getInfoProjetos(id);
      setInfoProjeto(data[0]);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetInfoProjetos();
  }, []);

  return (
    <>
      <Sidebar>
        {loading ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            h={"84vh"}
          >
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Box>
        ) : (
          <>
            <Flex
              w={"100%"}
              justifyContent={"space-between"}
              direction={"row"}
              wrap={"wrap"}
              mb={4}
              grow={1}
              shrink={1}
              gap={4}
            >
              <CardInfoProjeto infoProjeto={infoProjeto} />
              <CardOrcamento />
              <BotoesModais />
            </Flex>
            <Gantt />
            <GraficoCurvaS />
          </>
        )}
      </Sidebar>
    </>
  );
}

export default DetalhamentoProjeto;
