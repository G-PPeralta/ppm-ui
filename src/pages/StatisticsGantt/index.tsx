import { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  Box,
  Flex,
  Text,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { StatisticsGanttProps, StatisticsTableData } from "interfaces/Services";

import BotaoSetaVoltar from "components/BotaoSetaVoltar/BotaoSetaVoltar";
import Sidebar from "components/SideBar";

import { useEditarOperacao } from "hooks/useEditarOperacao";

import { getOperacoesEstatisticas } from "services/get/OperacoesEstatisticas";
import { getRelacoesExecucao } from "services/get/Projetos";

import ModalCadastroOperacao from "../Statistics/components/ModalCadastroOperacao";
import { Gantt } from "./components/Gantt";
// import ModalAdicionarOperacao from "./components/ModalAdicionarOperacao";
import ModalAdicionarAtividade from "./components/ModalAdicionarAtividade";
import ModalEditarOperacao from "./components/ModalEditarOperacao";

function StatisticsGantt() {
  const { sonda, poco } = useParams();
  const [refresh, setRefresh] = useState(false);
  const [refreshDelete, setRefreshDelete] = useState<number>(0);
  const [editOp, setEditOp] = useState({});
  const [sondaN, setSonda] = useState<any>();
  const [pocoN, setPoco] = useState<any>();
  const [projeto, setProjeto] = useState({
    sonda: "",
    id_sonda: 0,
    poco: "",
    id_poco: 0,
    dat_atualizacao: "",
    total_atv: 0,
  });
  const [ganttData, setGanttData] = useState<StatisticsGanttProps[]>();
  const [data, setData] = useState<StatisticsGanttProps[]>();
  const [atividadesCronograma, setAtividadesCronograma] = useState<any[]>();
  const { registerForm, loading, onClose, onOpen, isOpen } = useEditarOperacao(
    refresh,
    setRefresh,
    projeto
  );

  const formatToGanttData = (data: any) => {
    if (!data) return;
    const newGantt = data.atividades
      ?.filter(function (t: any) {
        // console.log("dados atv --", t);
        sessionStorage.setItem("hrs_totais_" + t.id_atividade, t.hrs_totais);
        return t.id_atividade !== null;
      })
      .map((t: any) => ({
        sonda: data.sonda,
        id_sonda: data.id_sonda,
        poco: data.poco,
        id_poco: data.id_poco,
        TaskID: t.id_atividade,
        TaskName: t.nome_atividade,
        StartDate: new Date(t.inicio_real),
        EndDate: new Date(t.fim_real),
        BaselineStartDate: new Date(t.inicio_planejado),
        BaselineEndDate: new Date(t.fim_planejado),
        BaselineDuration: Number(t.hrs_totais),
        Duration: Number(t.hrs_reais),
        pct_plan: Number(t.pct_plan),
        // Work: Number(t.hrs_reais),
        Progress: Number(t.pct_real),
        ProgressPlan: Number(t.pct_plan),
        max: Number(t.vlr_max),
        min: Number(t.vlr_min),
        med: Number(t.vlr_media),
        dp: Number(t.vlr_dp),
        flag: Number(t.flag),
      }));
    setGanttData(newGantt);
    setProjeto({
      sonda: data.sonda,
      id_sonda: data.id_sonda,
      poco: data.poco,
      id_poco: data.id_poco,
      dat_atualizacao: data.dat_atualizacao,
      total_atv: data.total_atv,
    });
  };

  const convertReq = (payload: any): StatisticsTableData[] => {
    const newData: StatisticsTableData[] = [];

    payload.forEach((s: { id_sonda: number; sonda: string; pocos: any[] }) =>
      s.pocos.forEach((p) => {
        // console.log(`DADOS_POCO -->` + p.dat_atualizacao);
        newData.push({
          sonda: s.sonda,
          id_sonda: s.id_sonda,
          poco: p.poco,
          id_poco: p.id_poco,
          atividades: p.atividades,
          total_atv: p.total_atv,
        });
      })
    );
    return newData;
  };

  const handleGetAllData = async () => {
    const { data } = await getOperacoesEstatisticas();
    // GET por onde atividades vem
    setData(data);

    if (!data) return;
    const newData = convertReq(data);

    const _ganttData = newData.find(
      (e) => e.id_sonda === Number(sonda) && e.id_poco === Number(poco)
    );
    formatToGanttData(_ganttData);
    setSonda(_ganttData);
    setPoco(_ganttData);
  };

  const handleReqRelacoes = async () => {
    const reqAtividadesCronograma = await getRelacoesExecucao(Number(poco));
    setAtividadesCronograma(reqAtividadesCronograma);
  };

  useEffect(() => {
    handleGetAllData();
    handleReqRelacoes();
  }, [refresh, refreshDelete]);

  useEffect(() => {
    handleReqRelacoes();
  }, []);

  return (
    <>
      <Sidebar>
        <Stack spacing="8">
          <Box
            py={{ base: "0", sm: "10" }}
            px={{ base: "4", sm: "10" }}
            w={"100%"}
            bg={useBreakpointValue({ base: "transparent", sm: "white" })}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            {!loading ? (
              <>
                <Stack>
                  <Flex mb={5} justify={"space-between"} wrap={"wrap"}>
                    <BotaoSetaVoltar />
                    <Box ml={2}>
                      <Heading as="h3" size="md">
                        {projeto.sonda}
                      </Heading>
                      <Text>{projeto.poco}</Text>
                    </Box>

                    <Flex gap={2} flex={2} justify={"end"} align={"end"}>
                      <ModalCadastroOperacao
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />

                      {/* <ModalAdicionarOperacao
                    refresh={refresh}
                    setRefresh={setRefresh}
                    projeto={projeto}
                  /> */}

                      <ModalAdicionarAtividade
                        refresh={refresh}
                        setRefresh={setRefresh}
                        projeto={projeto}
                        ganttData={ganttData}
                        atividades={atividadesCronograma}
                      />

                      <ModalEditarOperacao
                        data={data}
                        pocoN={pocoN}
                        sondaN={sondaN}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        editOp={editOp}
                        isOpen={isOpen}
                        onClose={onClose}
                        registerForm={registerForm}
                        loading={loading}
                      />
                    </Flex>
                  </Flex>
                </Stack>
                <Stack spacing="8">
                  <Gantt
                    setRefreshDelete={setRefreshDelete}
                    options={{
                      showGantt: true,
                    }}
                    edit={{
                      onOpen,
                      setEditOp,
                    }}
                    data={ganttData}
                  />
                </Stack>
              </>
            ) : (
              <Flex
                display={"flex"}
                align={"center"}
                justify={"center"}
                h={"90vh"}
              >
                <Ring speed={2} lineWeight={5} color="blue" size={64} />
              </Flex>
            )}
          </Box>
        </Stack>
      </Sidebar>
    </>
  );
}

export { StatisticsGantt };
