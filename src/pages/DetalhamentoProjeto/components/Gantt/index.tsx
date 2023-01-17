/*

  Criado por: ...
  Data de criação ...

*/

import { useEffect, useState } from "react";
import { BiExpand } from "react-icons/bi";

import {
  Flex,
  Text,
  Heading,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  ColumnsDirective,
  ColumnDirective,
  GanttComponent,
  Inject,
  Edit,
  Toolbar,
  Sort,
  HolidaysDirective,
  SortSettingsModel,
  // HolidayDirective,
} from "@syncfusion/ej2-react-gantt";

import { useEditarAtividadeGantt } from "hooks/useEditarAtividadeGantt";

import { getGanttData } from "services/get/Gantt";

import ModalCadastroAtividades from "../ModalCadastroAtividades";
import ModalDeletar from "../ModalDeletar";
import ModalEditarAtividade from "../ModalEditarAtividade";

import "./gantt.css";

type ganttOptionsProps = {
  ganttOptions?: any;
  idProjeto?: number;
  setInfoProjetoRefresh: () => void;
  infoProjeto: any;
};

export function Gantt({
  idProjeto: id,
  setInfoProjetoRefresh,
  infoProjeto,
}: ganttOptionsProps) {
  // const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [gantt, setGantt] = useState<any[]>([]);
  const [expandGantt, setExpandGantt] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshGanttCriacao, setRefreshGanttCriacao] = useState(false);
  const [refreshGanttDelete, setRefreshGanttDelete] = useState<number>(0);

  const {
    registerForm,
    refresh: refreshGant,
    editAtividade,
    setEditAtividade,
    cellEdit,
    isOpen,
    onClose,
  } = useEditarAtividadeGantt();

  const rowDataBound = (args: any) => {
    if (args.data.hasChildRecords) {
      args.row.style.fontWeight = 500;
    }
  };

  const actionsTemplate = (props: any) => (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <ModalDeletar
        id={props.TaskID}
        isParent={props.hasChildRecords}
        setLoading={setLoading}
        setRefreshGanttDelete={setRefreshGanttDelete}
      />
    </Flex>
  );

  async function handleSetGanttData() {
    if (id) {
      const reqGanttData = await getGanttData(Number(id));
      if (!reqGanttData) return;

      const formatter = (list: any) => {
        if (list.length === 0) return [];
        return list.map((sub: any) => ({
          ...sub,
          BaselineDuration: sub.BaselineDuration?.toString().concat(" dias"),
          subtasks: formatter(sub.subtasks),
        }));
      };

      const paiSemFilho = reqGanttData.data[0]?.subtasks.length === 0;
      if (paiSemFilho) {
        setGantt([]);
        return;
      }
      const ganttFormatter = reqGanttData.data.map((item: any) => ({
        ...item,
        BaselineDuration: item.BaselineDuration?.toString() // duracaoPlanejadaSemFinaisDeSemana
          // .toString() //  //
          .concat(" dias"),
        subtasks: item.subtasks?.map((sub: any) => ({
          ...sub,
          BaselineDuration: sub.BaselineDuration?.toString().concat(" dias"),
          subtasks: formatter(sub.subtasks),
        })),
      }));

      setGantt(ganttFormatter);
    }
  }

  const sortingOptions: SortSettingsModel = {
    columns: [{ field: "BaselineStartDate", direction: "Ascending" }],
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [gantt, refreshGant]);

  useEffect(() => {
    handleSetGanttData();
  }, [refreshGant, refreshGanttCriacao, refreshGanttDelete]);

  return (
    <>
      <>
        <Flex
          backgroundColor={"white"}
          borderTopRadius={"8px"}
          borderBottomRadius={"0px"}
          align={"center"}
          pl={"20px"}
          gap={5}
          h={"100%"}
          py={2}
        >
          <Heading as="h4" size="md">
            Gráfico Gantt
          </Heading>
          <ModalCadastroAtividades
            refresh={refresh}
            setRefresh={setRefresh}
            setRefreshGanttCriacao={setRefreshGanttCriacao}
            refreshGanttCriacao={refreshGanttCriacao}
            idProjeto={id}
            infoProjeto={infoProjeto}
          />
          <ModalEditarAtividade
            setRefresh={setRefresh}
            refresh={refresh}
            editAtividade={editAtividade}
            setEditAtividade={setEditAtividade}
            isOpen={isOpen}
            onClose={onClose}
            registerForm={registerForm}
            loading={loading}
            setInfoProjetoRefresh={setInfoProjetoRefresh}
          />
          <Flex flexGrow={1} justifyContent={"flex-end"} pr={4}>
            <IconButton
              onClick={() => setExpandGantt(true)}
              aria-label="Expand"
              icon={<BiExpand size={20} color="#496ac8" />}
            />
          </Flex>
        </Flex>
        <GanttComponent
          id="gantt-control"
          dataSource={gantt}
          allowSorting={true}
          sortSettings={sortingOptions}
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
          toolbar={["ZoomIn", "ZoomOut", "ZoomToFit"]}
          renderBaseline={true}
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
            position: "80%",
          }}
          rowDataBound={rowDataBound}
          height={"100vh"}
          taskMode={"Auto"}
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
              headerText="Ação/Projeto"
              headerTextAlign="Left"
              textAlign="Left"
            ></ColumnDirective>
            <ColumnDirective
              field="BaselineStartDate"
              headerText="Início planejado"
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
            ></ColumnDirective>
            <ColumnDirective
              field="StartDate"
              headerText="Início real"
              headerTextAlign="Center"
              textAlign="Center"
              type="date"
              format="dd/MM/yyyy"
            ></ColumnDirective>
            <ColumnDirective
              field="EndDate"
              headerText="Fim real"
              headerTextAlign="Center"
              textAlign="Center"
              type="date"
              format="dd/MM/yyyy"
            ></ColumnDirective>
            <ColumnDirective
              field="BaselineDuration"
              headerText="Duração Planejada"
              headerTextAlign="Center"
              textAlign="Center"
              // type="number"
              // format="N"
            />
            <ColumnDirective
              field="Duration"
              headerText="Duração Realizada"
              headerTextAlign="Center"
              textAlign="Center"
            ></ColumnDirective>
            <ColumnDirective
              field="ProgressPlan"
              headerText="% Plan"
              headerTextAlign="Center"
              textAlign="Center"
              width="100"
              format="N"
            ></ColumnDirective>
            <ColumnDirective
              field="Progress"
              headerText="% Real"
              headerTextAlign="Center"
              textAlign="Center"
              width="100"
              format="N"
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
          <HolidaysDirective></HolidaysDirective>
          <Inject services={[Edit, Toolbar, Sort]} />
        </GanttComponent>
        <Modal
          isOpen={expandGantt}
          onClose={() => setExpandGantt(false)}
          size="full"
        >
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
              <GanttComponent
                id="gantt-control"
                dataSource={gantt}
                taskFields={{
                  id: "TaskID",
                  name: "TaskName",
                  startDate: "StartDate",
                  endDate: "EndDate",
                  baselineStartDate: "BaselineStartDate",
                  baselineEndDate: "BaselineEndDate",
                  duration: "Duration",
                  progress: "Progress",
                  child: "subtasks",
                }}
                toolbar={["ZoomIn", "ZoomOut", "ZoomToFit"]}
                renderBaseline={true}
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
                rowDataBound={rowDataBound}
                height={"90%"}
                columns={[
                  { field: "Item", type: "string" },
                  {
                    field: "TaskID",
                    headerText: "ID",
                    visible: false,
                  },
                  {
                    field: "TaskName",
                    headerText: "Ação/Projeto",
                    headerTextAlign: "Center",
                    textAlign: "Center",
                    type: "string",
                  },
                  {
                    field: "StartDate",
                    headerText: "Início real",
                    headerTextAlign: "Center",
                    textAlign: "Center",
                    format: "dd/MM/yyyy",
                  },
                  {
                    field: "EndDate",
                    headerText: "Fim real",
                    headerTextAlign: "Center",
                    textAlign: "Center",
                    format: "dd/MM/yyyy",
                  },
                  {
                    field: "Duration",
                    headerText: "Duração",
                    headerTextAlign: "Center",
                    textAlign: "Center",
                  },
                  {
                    field: "Progress",
                    headerText: "Progresso (%)",
                    headerTextAlign: "Center",
                    textAlign: "Center",
                    format: "n",
                  },
                  {
                    field: "Predecessor",
                    headerText: "Predecessor",
                    headerTextAlign: "Center",
                    textAlign: "Center",
                  },
                ]}
              >
                <Inject services={[Edit, Toolbar]} />
              </GanttComponent>
            </ModalBody>
            <ModalCloseButton
              color={"white"}
              onClick={() => setExpandGantt(false)}
            />
            <ModalFooter justifyContent={"center"}></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
}
