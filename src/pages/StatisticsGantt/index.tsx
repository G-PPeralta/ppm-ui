import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  IconButton,
  Text,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { StatisticsGanttProps, StatisticsTableData } from "interfaces/Services";

import ModalCadastroCronograma from "pages/Statistics/components/ModalCadastroCronograma";

import Sidebar from "components/SideBar";

import { useEditarOperacao } from "hooks/useEditarOperacao";

import { getOperacoesEstatisticas } from "services/get/OperacoesEstatisticas";

import ModalCadastroOperacao from "../Statistics/components/ModalCadastroOperacao";
import { Gantt } from "./components/Gantt";
import ModalEditarOperacao from "./components/ModalEditarOperacao";

function StatisticsGantt() {
  const { sonda, poco } = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [editOp, setEditOp] = useState({});
  const [projeto, setProjeto] = useState({
    sonda: "",
    id_sonda: 0,
    poco: "",
    id_poco: 0,
  });
  const [ganttData, setGanttData] = useState<StatisticsGanttProps[]>();
  const { registerForm, loading, onClose, onOpen, isOpen } = useEditarOperacao(
    refresh,
    setRefresh,
    projeto
  );
  const toolbarOptions = ["ZoomIn", "ZoomOut"];

  const formatToGanttData = (data: any) => {
    if (!data) return;
    const newGantt = data.atividades?.map((t: any) => ({
      sonda: data.sonda,
      id_sonda: data.id_sonda,
      poco: data.poco,
      id_poco: data.id_poco,
      TaskID: t.id_atividade,
      TaskName: t.nome_atividade,
      StartDate: new Date(t.inicio_real),
      EndDate: new Date(t.fim_real),
      BaselineStartDate: new Date(t.inicio_planejado), // new Date('04/21/2019')
      BaselineEndDate: new Date(t.fim_planejado),
      BaselineDuration: Number(t.hrs_totais),
      Duration: Number(t.hrs_reais),
      // Work: Number(t.hrs_reais),
      Progress: Number(t.pct_real),
      max: Number(t.vlr_max),
      min: Number(t.vlr_min),
      med: Number(t.vlr_media),
      dp: Number(t.vlr_dp),
    }));
    setGanttData(newGantt);
    setProjeto({
      sonda: data.sonda,
      id_sonda: data.id_sonda,
      poco: data.poco,
      id_poco: data.id_poco,
    });
  };

  const convertReq = (payload: any): StatisticsTableData[] => {
    const newData: StatisticsTableData[] = [];
    payload.forEach((s: { id_sonda: number; sonda: string; pocos: any[] }) =>
      s.pocos.forEach((p) => {
        newData.push({
          sonda: s.sonda,
          id_sonda: s.id_sonda,
          poco: p.poco,
          id_poco: p.id_poco,
          atividades: p.atividades,
        });
      })
    );
    return newData;
  };

  const handleGetAllData = async () => {
    const { data } = await getOperacoesEstatisticas();
    if (!data) return;
    const newData = convertReq(data);

    const _ganttData = newData.find(
      (e) => e.id_sonda === Number(sonda) && e.id_poco === Number(poco)
    );
    formatToGanttData(_ganttData);
  };

  useEffect(() => {
    handleGetAllData();
  }, [refresh]);

  // console.log("registerForm", registerForm.values);

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
            <Stack>
              <Flex mb={5} justify={"space-between"} wrap={"wrap"}>
                <IconButton
                  aria-label="voltar"
                  color={"black"}
                  backgroundColor="transparent"
                  size="lg"
                  icon={<FiChevronLeft />}
                  onClick={() => navigate(`/estatisticas`)}
                />
                <Box>
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
                  <ModalCadastroCronograma
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                  <ModalEditarOperacao
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
                refresh={refresh}
                setRefresh={setRefresh}
                options={{
                  showGantt: true,
                  toolbarOptions,
                }}
                edit={{
                  onOpen,
                  setEditOp,
                }}
                data={ganttData}
              />
            </Stack>
          </Box>
        </Stack>
      </Sidebar>
    </>
  );
}

export { StatisticsGantt };
