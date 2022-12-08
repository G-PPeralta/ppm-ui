import { useEffect, useState } from "react";

// import { useLocation } from "react-router-dom";

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
  // rowDataBound,
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

// import { ganttData } from "pages/Reports/components/data";

import "../gantt.css";
import ModalDeletarAtvCampanha from "./ModalDeletarAtvCampanha";

function ExpandGanttModal({
  isModalOpen,
  setIsModalOpen,
  pocoId,
  intervencaoIniciada,
}: any) {
  // const { state }: any = useLocation();
  // const [poco, setPoco] = useState(true);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [ganttData, setGanttData] = useState([]);
  const [atividades, setAtividades] = useState<any[]>([]);
  const [atividade, setAtividade] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [refresh, setRefresh] = useState(false);
  // const [intervencaoIniciada, setIntervencaoIniciada] = useState<any>(false);
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
    // onOpen();
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
    <Flex
      // w={"100%"}
      // style={{ position: "relative", top: "-8px" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ModalDeletarAtvCampanha
        id={props.TaskID}
        // isParent={props.hasChildRecords}
        setLoading={setLoading}
        setRefreshGanttDelete={setRefreshGanttDelete}
      />
    </Flex>
  );

  const statusTemplate = (props: any) => (
    <Flex
      // w={"100%"}
      // style={{ position: "relative", top: "-8px" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {props.taskData.Progress == props.taskData.ProgressPlanejado &&
        props.taskData.Progress != "0" && (
          <Box
            w={5}
            h={5}
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
          w={5}
          h={5}
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
            w={5}
            h={5}
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
            <Flex justifyContent={"flex-end"} flexGrow={1}>
              {/* <Button
                  h={"56px"}
                  borderRadius={"10px"}
                  variant="outline"
                  color="gray.100"
                  border={"2px solid"}
                  borderColor={"gray.100"}
                  onClick={() => setExpandGantt(false)}
                  _hover={{
                    border: "2px solid",
                    borderColor: "gray.100",
                    background: "gray.100",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                >
                  <Text fontSize="16px" fontWeight={"bold"}>
                    Fechar
                  </Text>
                </Button> */}
            </Flex>
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
                  // view: handleShowGantt(),
                  // columnIndex: 5,
                  position: "47%",
                }}
                // rowDataBound={rowDataBound}
                height={"90%"}
              >
                <ColumnsDirective>
                  {/* <ColumnDirective field="Item" type="string"></ColumnDirective>
            <ColumnDirective
              field="TaskID"
              headerText="ID"
              visible={false}
              headerTextAlign="Center"
              textAlign="Center"
            ></ColumnDirective> */}
                  {/* <ColumnDirective
                  field="acao"
                  headerText="Ação"
                  headerTextAlign="Center"
                  textAlign="Center"
                  width="100"
                  template={actionsTemplate}
                ></ColumnDirective> */}
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
                  {/* <ColumnDirective
                    field="BaselineStartDate"
                    headerText="Início Baseline"
                    headerTextAlign="Center"
                    textAlign="Center"
                    type="date"
                    format="dd/MM/yyyy"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="BaselineEndDate"
                    headerText="Fim planejado"
                    headerTextAlign="Center"
                    textAlign="Center"
                    type="date"
                    format="dd/MM/yyyy"
                  ></ColumnDirective> */}
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
                  {/* <ColumnDirective
                    field="BaselineDuration"
                    headerText="Duração Planejada"
                    headerTextAlign="Center"
                    textAlign="Center"
                    // type="number"
                    // format="N"
                  /> */}
                  <ColumnDirective
                    field="Duration"
                    headerText="Duração"
                    headerTextAlign="Center"
                    textAlign="Center"
                    // type="number"
                    // format="N"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="s"
                    headerText="S"
                    headerTextAlign="Center"
                    textAlign="Center"
                    // type="number"
                    template={statusTemplate}
                    width="100"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="ProgressPlanejado"
                    headerText="% Plan"
                    headerTextAlign="Center"
                    textAlign="Center"
                    // type="number"
                  ></ColumnDirective>
                  <ColumnDirective
                    field="Progress"
                    headerText="% Real"
                    headerTextAlign="Center"
                    textAlign="Center"
                    // type="number"
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
          <ModalCloseButton
            color={"white"}
            // onClick={() => setExpandGantt(false)}
          />
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
