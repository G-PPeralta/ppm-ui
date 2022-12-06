import { useEffect, useState } from "react";
import { BiExpand } from "react-icons/bi";

import {
  Flex,
  // Button,
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
  Box,
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
    // console.log(">>>> rowDataBound", args);
    if (args.data.hasChildRecords) {
      args.row.style.fontWeight = 500;
      // args.row.style.backgroundColor = "red";
    }
  };

  const actionsTemplate = (props: any) => (
    <Flex
      // w={"100%"}
      // style={{ position: "relative", top: "-8px" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ModalDeletar
        id={props.TaskID}
        isParent={props.hasChildRecords}
        setLoading={setLoading}
        refreshGanttDelete={refreshGanttDelete}
        setRefreshGanttDelete={setRefreshGanttDelete}
        handleSetGanttData={handleSetGanttData}
      />
    </Flex>
  );

  async function handleSetGanttData() {
    if (id) {
      const reqGanttData = await getGanttData(Number(id));
      if (!reqGanttData) return;

      // console.log(">>>> reqGanttData", reqGanttData.data);

      // const calculateDaysBetween = (date1: Date, date2: Date) => {
      //   const one_day = 1000 * 60 * 60 * 24;
      //   const date1_ms = date1.getTime();
      //   const date2_ms = date2.getTime();
      //   const difference_ms = date2_ms - date1_ms;

      //   const days = Math.round(difference_ms / one_day);
      //   const weeks = Math.floor(days / 7);
      //   const daysInWeek = days % 7;
      //   const daysInWeekWithoutWeekends =
      //     daysInWeek - 2 * Math.floor(daysInWeek / 5);
      //   const daysWithoutWeekends = weeks * 5 + daysInWeekWithoutWeekends;

      //   return daysWithoutWeekends;
      // };

      // const minBaselineStartDate = reqGanttData.data[0].subtasks.reduce(
      //   (acc: any, curr: any) => {
      //     if (acc > curr.BaselineStartDate) {
      //       return curr.BaselineStartDate;
      //     }
      //     return acc;
      //   },
      //   reqGanttData.data[0].subtasks[0].BaselineStartDate
      // );

      // const maxBaselineEndDate = reqGanttData.data[0].subtasks.reduce(
      //   (acc: any, curr: any) => {
      //     if (acc < curr.BaselineEndDate) {
      //       return curr.BaselineEndDate;
      //     }
      //     return acc;
      //   },
      //   reqGanttData.data[0].subtasks[0].BaselineEndDate
      // );

      // const duracaoPlanejadaSemFinaisDeSemana = calculateDaysBetween(
      //   new Date(minBaselineStartDate),
      //   new Date(maxBaselineEndDate)
      // );

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
        // BaselineEndDate: maxBaselineEndDate,
        // BaselineStartDate: minBaselineStartDate,
      }));

      // console.log("minBaselineStartDate", minBaselineStartDate);
      // console.log("maxBaselineEndDate", maxBaselineEndDate);
      // console.log("baselineDuration", baselineDuration);

      // const _gantt: IGantt = reqGanttData.data;
      // // setGanttData(_gantt);
      // ganttFormatter(_gantt);
      setGantt(ganttFormatter);
    }
  }

  const sortingOptions: SortSettingsModel = {
    columns: [{ field: "BaselineStartDate", direction: "Ascending" }],
  };

  const statusTemplate = (props: any) => (
    <Flex
      // w={"100%"}
      // style={{ position: "relative", top: "-8px" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {props.taskData.pct_real == props.taskData.pct_plan &&
        props.taskData.pct_real !== "0" && (
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
      {props.taskData.pct_real < props.taskData.pct_plan && (
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
      {props.taskData.pct_real == "0" && props.taskData.pct_plan == "0" && (
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

  // useEffect(() => {
  //   setGantt(ganttDataLocal);
  // }, []);

  // const ganttDataLocal = ganttData.macroatividades?.map((gantt) => ({
  //   TaskId: gantt.macroatividade_id,
  //   Item: gantt.macroatividade_item,
  //   TaskName: gantt.macroatividade_nome,
  //   subtasks: gantt.micro?.map((micro) => ({
  //     TaskID: micro.microatividade_id,
  //     Item: micro.item,
  //     TaskName: micro.nome_atividade,
  //     StartDate: micro.data_inicio,
  //     Duration: micro.duracao,
  //     Progress: micro.progresso,
  //   })),
  // }));

  // const ganttDataLocal = [
  //   {
  //     TaskID: 1,
  //     Item: "1",
  //     TaskName: "Projeto 1",
  //     subtasks: [
  //       {
  //         TaskID: 2,
  //         Item: "1.1",
  //         TaskName: "Ação 1",
  //         StartDate: new Date("07/11/2022"),
  //         Duration: 4,
  //         Progress: 70,
  //       },
  //       {
  //         TaskID: 3,
  //         Item: "1.2",
  //         TaskName: "Ação 2",
  //         StartDate: new Date("07/11/2022"),
  //         Duration: 4,
  //         Progress: 50,
  //         Predecessor: `${2}FS`,
  //       },
  //       {
  //         TaskID: 4,
  //         Item: "1.3",
  //         TaskName: "Ação 3",
  //         StartDate: new Date("07/11/2022"),
  //         Duration: 4,
  //         Progress: 50,
  //         Predecessor: `${3}FS`,
  //       },
  //     ],
  //     StartDate: null,
  //     Duration: null,
  //   },
  //   {
  //     TaskID: 8,
  //     Item: "2.3",
  //     TaskName: "Ação 3",
  //     StartDate: new Date("07/11/2022"),
  //     Duration: 3,
  //     Progress: 80,
  //     Predecessor: `${7}FS`,
  //   },
  // ];

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
      {/* {!loading && ( */}
      <>
        <Flex
          backgroundColor={"white"}
          borderTopRadius={"8px"}
          borderBottomRadius={"0px"}
          // borderBottom={"1px solid #F0F3F7"}
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
            // atividades={atividades}
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
          // taskFields={ganttData.macroatividades.map((macroatividade) => ({
          //   id: macroatividade.macroatividade_id,
          //   item: macroatividade.macroatividade_item,
          //   name: macroatividade.macroatividade_nome,
          //   child: macroatividade.micro.map((microatividade) => ({
          //     id: microatividade.macroatividade_id,
          //     item: microatividade.item,
          //     name: microatividade.nome_projeto,
          //     startDate: microatividade.data_inicio,
          //     endDate: microatividade.data_fim,
          //     duration: microatividade.duracao,
          //     progress: microatividade.progresso,
          //   })),
          // }))}
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
            // view: handleShowGantt(),
            // columnIndex: 5,
            position: "80%",
          }}
          rowDataBound={rowDataBound}
          height={"100vh"}
          taskMode={"Auto"}
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
              // type="number"
              // format="N"
            ></ColumnDirective>
            <ColumnDirective
              field="Progress"
              headerText="Progresso (%)"
              headerTextAlign="Center"
              textAlign="Center"
              // type="number"
              format="N"
            ></ColumnDirective>
            <ColumnDirective
              field="s"
              headerText="S"
              headerTextAlign="Center"
              textAlign="Center"
              // type="number"
              template={statusTemplate}
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
          <HolidaysDirective>
            {/* <HolidayDirective
              from="07/09/2022"
              label="Independencia do Brasil"
              cssClass="e-custom-holiday"
            ></HolidayDirective>
            <HolidayDirective
              from="12/10/2022"
              label="Nossa Senhora Aparecida"
              cssClass="e-custom-holiday"
            ></HolidayDirective>
            <HolidayDirective
              from="02/11/2022"
              label="Finados"
              cssClass="e-custom-holiday"
            ></HolidayDirective> */}
            {/* <HolidayDirective
              from="15/11/2022"
              label="Proclamação da República"
              cssClass="e-custom-holiday"
            ></HolidayDirective> */}
            {/* <HolidayDirective
              from="25/12/2022"
              label="Natal"
              cssClass="e-custom-holiday"
            ></HolidayDirective>
            <HolidayDirective
              from="01/01/2023"
              label="Ano Novo"
              cssClass="e-custom-holiday"
            ></HolidayDirective> */}
            {/* <HolidayDirective
              from="21/02/2023"
              label="Carnaval"
              cssClass="e-custom-holiday"
            ></HolidayDirective> */}
          </HolidaysDirective>
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
                  // dependency: "Predecessor",
                  child: "subtasks",
                }}
                // taskFields={ganttData.macroatividades.map((macroatividade) => ({
                //   id: macroatividade.macroatividade_id,
                //   item: macroatividade.macroatividade_item,
                //   name: macroatividade.macroatividade_nome,
                //   child: macroatividade.micro.map((microatividade) => ({
                //     id: microatividade.macroatividade_id,
                //     item: microatividade.item,
                //     name: microatividade.nome_projeto,
                //     startDate: microatividade.data_inicio,
                //     endDate: microatividade.data_fim,
                //     duration: microatividade.duracao,
                //     progress: microatividade.progresso,
                //   })),
                // }))}
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
                  // view: handleShowGantt(),
                  // columnIndex: 5,
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
                  // {
                  //   field: "BaselineStartDate",
                  //   headerText: "Início planejado",
                  //   headerTextAlign: "Center",
                  //   textAlign: "Center",
                  //   format: "dd/MM/yyyy",
                  //   type: "date",
                  // },
                  // {
                  //   field: "BaselineEndDate",
                  //   headerText: "Fim planejado",
                  //   headerTextAlign: "Center",
                  //   textAlign: "Center",
                  //   format: "dd/MM/yyyy",
                  //   type: "date",
                  // },
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
                {/* <footer
              style={{
                background: "white",
                height: "2px",
                borderRadius: "8px",
              }}
            ></footer> */}
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
      {/* )} */}
    </>
  );
}
