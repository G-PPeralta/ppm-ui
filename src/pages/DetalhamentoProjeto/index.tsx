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
// import GraficoCurvaS from "./components/GraficoCurvaS";

// const curveSData = [
//   {
//     mes: "Nov/2022",
//     cronogramaPrevisto: 6,
//     cronogramaRealizado: 30,
//     capexPrevisto: 40,
//     capexRealizado: 50,
//   },
//   {
//     mes: "Dez/2021",
//     cronogramaPrevisto: 60,
//     cronogramaRealizado: 20,
//     capexPrevisto: 35,
//     capexRealizado: 50,
//   },
//   {
//     mes: "Nov/2022",
//     cronogramaPrevisto: 6,
//     cronogramaRealizado: 30,
//     capexPrevisto: 40,
//     capexRealizado: 50,
//   },
// ];

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
  const [licoes, setLicoes] = useState([] as LicoesAprendidasNew[]);
  const [categorias, setCategorias] = useState([] as Categorias[]);
  const [progresso, setProgresso] = useState([] as ProjetoProgresso[]);
  const [render, setRender] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [project, setProject] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  const getData = async () => {
    const priorizacao = await getCurvaSInfos(id);
    setData(priorizacao.data);
  };

  // console.log({ data });

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
    }, 3000);
  }, [refresh]);

  const handleGetInfoProjetos = async () => {
    if (id) {
      const { data } = await getInfoProjetos(id);
      setInfoProjeto(data[0]);
    }
  };

  async function handleGetLicoes() {
    if (id) {
      const response = await getLicoesAprendidas(id);
      // console.log("ENTROU", response);
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

  // useEffect(() => {
  //   handleGetInfoProjetos();
  //   handleGetLicoes();
  //   handleGetCategorias();
  //   handleGetProgresso();

  //   return () =>
  //     setInfoProjeto({
  //       nome_projeto: "",
  //       data_inicio: null,
  //       data_fim: null,
  //       numero: 0,
  //       polo: "",
  //       local: "",
  //       demanda: "",
  //       nome_responsavel: "",
  //       coordenador_nome: "",
  //       descricao: "",
  //       justificativa: "",
  //     });
  //   // handleGetLicoes();
  // }, [render]);

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
              <CardOrcamento />
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

            <Gantt idProjeto={Number(id)} />
            <CurvaS data={data} />
            {/* <GraficoCurvaS /> */}
          </>
        )}
      </Sidebar>
    </>
  );
}

export default DetalhamentoProjeto;
