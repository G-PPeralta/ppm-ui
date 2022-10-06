import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Flex } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { ICardInfoProjeto } from "interfaces/DetalhamentoProjetos";
import {
  Categorias,
  LicoesAprendidas,
  ProjetoProgresso,
} from "interfaces/Services";

import { Gantt } from "components/Gantt";
import Sidebar from "components/SideBar";

import { getCategorias } from "services/get/Categorias";
import {
  getInfoProjetos,
  getProgressoProjeto,
} from "services/get/DetalhamentoProjetos";
import { getLicoesAprendidas } from "services/get/LicoesAprendidas";

import BotoesModais from "./components/BotoesModais";
import CardInfoProjeto from "./components/CardInfoProjeto";
import CardOrcamento from "./components/CardOrcamento";
import GraficoCurvaS from "./components/GraficoCurvaS";

function DetalhamentoProjeto() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingProgresso, setProgressoLoading] = useState(false);
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
    descricao: "",
    justificativa: "",
  });
  const [licoes, setLicoes] = useState([] as LicoesAprendidas[]);
  const [categorias, setCategorias] = useState([] as Categorias[]);
  const [progresso, setProgresso] = useState([] as ProjetoProgresso[]);
  const [render, setRender] = useState(false);

  const handleGetInfoProjetos = async () => {
    if (id) {
      const { data } = await getInfoProjetos(id);
      setInfoProjeto(data[0]);
      setLoading(false);
    }
  };

  async function handleGetLicoes() {
    if (id) {
      const response = await getLicoesAprendidas(id);
      setLicoes(response.data as LicoesAprendidas[]);
    }
  }

  async function handleGetCategorias() {
    const response = await getCategorias();
    setCategorias(response.data);
  }

  async function handleGetProgresso() {
    setProgressoLoading(true);
    const response = await getProgressoProjeto();
    setProgresso(response.data);
    setProgressoLoading(false);
  }

  useEffect(() => {
    handleGetInfoProjetos();
    handleGetLicoes();
    handleGetCategorias();
    handleGetProgresso();

    return () =>
      setInfoProjeto({
        nome_projeto: "",
        data_inicio: null,
        data_fim: null,
        numero: 0,
        polo: "",
        local: "",
        demanda: "",
        nome_responsavel: "",
        coordenador_nome: "",
        descricao: "",
        justificativa: "",
      });
    // handleGetLicoes();
  }, [render]);

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
              <CardInfoProjeto
                infoProjeto={infoProjeto}
                progresso={
                  !loadingProgresso
                    ? progresso
                    : [{ fn_cron_calc_pct_real: "00.003848750844" }]
                }
                loading={loadingProgresso}
              />
              <CardOrcamento />
              <BotoesModais
                licoes={licoes}
                setLicoes={setLicoes}
                categorias={categorias}
                callBack={handleGetLicoes}
                infoProjeto={infoProjeto}
                setRender={() => setRender(true)}
              />
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
