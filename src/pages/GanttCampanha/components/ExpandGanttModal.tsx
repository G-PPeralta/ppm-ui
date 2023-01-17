//  CRIADO EM: 10/2022
//  AUTOR: Magno Ferreira.
//  DESCRIÇÃO DO ARQUIVO: Gantt na tela toda.

import { useEffect, useState } from "react";

import {
  Text,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
} from "@chakra-ui/react";
import {
  GanttComponent,
  Inject,
  Edit,
  Toolbar,
  ColumnDirective,
  ColumnsDirective,
  Sort,
} from "@syncfusion/ej2-react-gantt";
import { Ring } from "@uiball/loaders";

import ModalEditarAtividade from "pages/ActivitiesSchedule/Components/ModalEditarAtividade";

import { useToast } from "contexts/Toast";

import { useRequests } from "hooks/useRequests";

import { getAtividadesCampanha } from "services/get/ActivitiesSchedule";
import { getGanttCampanhaData } from "services/get/Campanhas";

import "../gantt.css";
import ModalDeletarAtvCampanha from "./ModalDeletarAtvCampanha";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  pocoId: any;
  intervencaoIniciada: boolean | undefined;
}

function ExpandGanttModal({
  isModalOpen,
  setIsModalOpen,
  pocoId,
  intervencaoIniciada,
}: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [ganttData, setGanttData] = useState([]);
  const [atividades, setAtividades] = useState<any[]>([]);
  const [atividade, setAtividade] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [refresh, setRefresh] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshGanttDelete, setRefreshGanttDelete] = useState<number>(0);
  const { optionsAreaAtuacao, optionsResponsaveis } = useRequests();

  const listaOptions = {
    optionsAreaAtuacao,
    optionsResponsaveis,
  };

  const handleToast = (msg: string) => {
    toast.error(msg, {
      id: "toast-principal",
    });
  };

  const cellEdit = (args: any) => {
    if (
      (args.rowData.index === 0 && args.rowData.level === 0) ||
      atividades.length === 0
    ) {
      args.cancel = true;
      handleToast("Não é possível editar esta atividade!");
      return;
    }
    const filteredIndex = atividades.findIndex(
      (atv) => atv.id_filho === args.rowData.TaskID
    );
    const filteredAtv = atividades[filteredIndex];

    if (!filteredAtv) {
      args.cancel = true;
      handleToast("Não é possível editar esta atividade!");
      return;
    }

    setAtividade(filteredAtv);

    setCurrentIndex(filteredIndex);
    setIsEditModalOpen(true);
    args.cancel = true;
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setAtividade("");
    setCurrentIndex(undefined);
  };
  const requestHandler = async () => {
    const atividadesRes = await getAtividadesCampanha(pocoId);
    setAtividades(atividadesRes.data);
    if (pocoId) {
      const { data } = await getGanttCampanhaData(pocoId);
      setGanttData(data);
    }
    setLoading(false);
  };

  const actionsTemplate = (props: any) => (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <ModalDeletarAtvCampanha
        id={props.TaskID}
        setLoading={setLoading}
        setRefreshGanttDelete={setRefreshGanttDelete}
      />
    </Flex>
  );

  const statusTemplate = (props: any) => (
    <Flex justifyContent={"center"} alignItems={"center"}>
      {props.taskData.Progress >= props.taskData.ProgressPlanejado &&
        props.taskData.Progress > 0 && (
          <Box
            w={4}
            h={4}
            bg={"#9FA2B4"}
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            pt={"2px"}
            sx={{ borderRadius: "100%" }}
            style={{ backgroundColor: "#008000" }}
          ></Box>
        )}
      {props.taskData.Progress < props.taskData.ProgressPlanejado && (
        <Box
          w={4}
          h={4}
          bg={"#9FA2B4"}
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          pt={"2px"}
          sx={{ borderRadius: "100%" }}
          style={{ backgroundColor: "red" }}
        ></Box>
      )}
      {props.taskData.Progress == "0" &&
        props.taskData.ProgressPlanejado == "0" && (
          <Box
            w={4}
            h={4}
            bg={"#9FA2B4"}
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            pt={"2px"}
            sx={{ borderRadius: "100%" }}
            style={{ backgroundColor: "gray" }}
          ></Box>
        )}
    </Flex>
  );

  useEffect(() => {
    requestHandler();
  }, [refresh, refreshGanttDelete]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"1em"}
          >
            <Flex justifyContent={"flex-end"} flexGrow={1}>
              <Text fontSize="16px" fontWeight={"bold"}>
                Gráfico Gantt
              </Text>
            </Flex>
            <Flex justifyContent={"flex-end"} flexGrow={1}></Flex>
          </ModalHeader>
          <ModalBody mt={3}>
            {loading ? (
              <Ring speed={2} lineWeight={5} color="blue" size={24} />
            ) : (
              <GanttComponent
                taskFields={{
                  id: "TaskID",
                  name: "TaskName",
                  startDate: "StartDate",
                  endDate: "EndDate",
                  baselineStartDate: "BaselineStartDate",
                  baselineEndDate: "BaselineEndDate",
                  duration: "Duration",
                  progress: "Progress",
                  dependency: "Predecessor",
                  child: "subtasks",
                  segments: "Segment",
                }}
                dataSource={ganttData}
                toolbar={["ZoomIn", "ZoomOut", "ZoomToFit"]}
                renderBaseline={false}
                baselineColor="red"
                editSettings={{
                  allowEditing: true,
                  mode: "Auto",
                  allowTaskbarEditing: false,
                }}
                cellEdit={cellEdit}
                selectionSettings={{
                  mode: "Cell",
                  type: "Single",
                  enableToggle: true,
                }}
                splitterSettings={{
                  position: "47%",
                }}
                height={"90%"}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    field="acao"
                    headerText="Ação"
                    headerTextAlign="Center"
                    textAlign="Center"
                    width="100"
                    template={actionsTemplate}
                  ></ColumnDirective>
                  <ColumnDirective
                    field="TaskName"
                    headerText="Atividade"
                    headerTextAlign="Left"
                    textAlign="Left"
                    width="250"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Fase"
                    headerText="Fase"
                    headerTextAlign="Left"
                    textAlign="Left"
                    width="180"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="StartDate"
                    headerText="Início Real"
                    headerTextAlign="Center"
                    textAlign="Center"
                    type="date"
                    format="dd/MM/yyyy"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="EndDate"
                    headerText="Fim Real"
                    headerTextAlign="Center"
                    textAlign="Center"
                    type="date"
                    format="dd/MM/yyyy"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Duration"
                    headerText="Duração"
                    headerTextAlign="Center"
                    textAlign="Center"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="s"
                    headerText="S"
                    headerTextAlign="Center"
                    textAlign="Center"
                    template={statusTemplate}
                    width="100"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="ProgressPlanejado"
                    headerText="% Plan"
                    headerTextAlign="Center"
                    textAlign="Center"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Progress"
                    headerText="% Real"
                    headerTextAlign="Center"
                    textAlign="Center"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Predecessor"
                    headerText="Predecessor"
                    headerTextAlign="Center"
                    textAlign="Center"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Responsavel"
                    headerText="Responsável"
                    headerTextAlign="Center"
                    textAlign="Center"
                  ></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[Edit, Toolbar, Sort]} />
              </GanttComponent>
            )}
          </ModalBody>
          <ModalCloseButton color={"white"} />
          <ModalFooter justifyContent={"center"}></ModalFooter>
        </ModalContent>
      </Modal>
      {isEditModalOpen ? (
        <ModalEditarAtividade
          listaPrecedentes={atividades}
          index={currentIndex}
          atividade={atividade}
          onClose={() => handleCloseEditModal()}
          setRefresh={setRefresh}
          refresh={refresh}
          listaOptions={listaOptions}
          intervencaoIniciada={intervencaoIniciada}
        />
      ) : undefined}
    </>
  );
}

export default ExpandGanttModal;
