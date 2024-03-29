//  CRIADO EM: 06/2022
//  AUTOR: Eduardo Muchak, Bruno Fracaro.
//  DESCRIÇÃO DO ARQUIVO: tela de detalhamento de projetos.

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { Box, Flex } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { ICardInfoProjeto } from "interfaces/DetalhamentoProjetos";
import {
  Categorias,
  LicoesAprendidasNew,
  ProjetoProgresso,
} from "interfaces/Services";

import CurvaS from "components/CurvaS";
import Sidebar from "components/SideBar";

import { getCategorias } from "services/get/Categorias";
import { getCurvaSInfos } from "services/get/Detalhamento";
import {
  getInfoProjetos,
  getProgressoProjeto,
} from "services/get/DetalhamentoProjetos";
import { getLicoesAprendidas } from "services/get/LicoesAprendidas";
import { getProjeto } from "services/get/Projetos";

import BotoesModais from "./components/BotoesModais";
import CardInfoProjeto from "./components/CardInfoProjeto";
import CardOrcamento from "./components/CardOrcamento";
import { Gantt } from "./components/Gantt";

function DetalhamentoProjeto() {
  const initCardInfo = {
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
    campo_id: "",
  };
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingProgresso, setProgressoLoading] = useState(false);
  const [infoProjeto, setInfoProjeto] =
    useState<ICardInfoProjeto>(initCardInfo);
  const [licoes, setLicoes] = useState([] as LicoesAprendidasNew[]);
  const [categorias, setCategorias] = useState([] as Categorias[]);
  const [progresso, setProgresso] = useState([] as ProjetoProgresso[]);
  const [render, setRender] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [project, setProject] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [infoProjetoRefresh, setInfoProjetoRefresh] = useState(false);

  const getData = async () => {
    const priorizacao = await getCurvaSInfos(id);
    setData(priorizacao.data);
  };

  useEffect(() => {
    handleGetInfoProjetos();
    handleGetLicoes();
    handleGetCategorias();
    handleGetProgresso();
    getData();
    getProject();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleGetInfoProjetos();
      handleGetLicoes();
      handleGetCategorias();
      handleGetProgresso();
      getData();
      getProject();
      setRender(!render);
    }, 1000);
  }, [refresh]);

  useEffect(() => {
    setTimeout(() => {
      handleGetInfoProjetos();
      handleGetLicoes();
      handleGetCategorias();
      handleGetProgresso();
      getData();
      getProject();
      setRender(!render);
    }, 1000);
  }, [infoProjetoRefresh]);

  const handleGetInfoProjetos = async () => {
    if (id) {
      const { data } = await getInfoProjetos(id);

      if (data.length === 0) {
        setInfoProjeto(initCardInfo);
      } else {
        setInfoProjeto(data[0]);
      }
    }
  };

  async function handleGetLicoes() {
    if (id) {
      const response = await getLicoesAprendidas(id);
      setLicoes(response.data as LicoesAprendidasNew[]);
    }
  }

  async function handleGetCategorias() {
    const response = await getCategorias();
    setCategorias(response.data);
  }

  async function handleGetProgresso() {
    if (id) {
      setProgressoLoading(true);
      const response = await getProgressoProjeto(Number(id));
      setProgresso(response.data);
      setProgressoLoading(false);
    }
  }

  async function getProject() {
    try {
      if (id) {
        const { data } = await getProjeto(+id);
        if (data) {
          setProject(data);
          setLoading(false);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

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
              flex={1}
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
              <CardOrcamento refresh={refresh} setRefresh={setRefresh} />
              <BotoesModais
                licoes={licoes}
                setLicoes={setLicoes}
                categorias={categorias}
                callBack={handleGetLicoes}
                infoProjeto={infoProjeto}
                setRender={() => setRender(true)}
                projeto={project[0]}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </Flex>

            <Gantt
              idProjeto={Number(id)}
              setInfoProjetoRefresh={() =>
                setInfoProjetoRefresh(!infoProjetoRefresh)
              }
              infoProjeto={infoProjeto}
            />
            <CurvaS data={data} />
          </>
        )}
      </Sidebar>
    </>
  );
}

export default DetalhamentoProjeto;
