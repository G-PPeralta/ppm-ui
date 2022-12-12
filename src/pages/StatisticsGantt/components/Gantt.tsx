import { useEffect, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";
import {
  Edit,
  ColumnDirective,
  ColumnsDirective,
  GanttComponent,
  Inject,
  Selection,
  Sort,
  SortSettingsModel,
  Toolbar,
} from "@syncfusion/ej2-react-gantt";
import { Ring } from "@uiball/loaders";
import { StatisticsGanttProps } from "interfaces/Services";

import ModalDeletar from "./ModalDeletar";

import "./gantt.css";

type ganttOptionsProps = {
  data: StatisticsGanttProps[] | undefined; // TODO: tirar undefined
  setRefreshDelete: Function;
  options?: {
    showGantt?: boolean;
  };
  edit: {
    onOpen: Function;
    // handleEdit: Function;
    setEditOp: any;
  };
};

export function Gantt({
  data,
  options,
  edit,
  setRefreshDelete,
}: ganttOptionsProps) {
  const [loading, setLoading] = useState(true);

  const queryTaskbarInfo = (args: any) => {
    // console.log(":::args.data.taskData", args.data.taskData);
    let color;
    const { TaskName, Duration, min, med, max, dp } = args.data.taskData;

    // console.log("Dados Cores -->", args.data.taskData);
    // console.log("Dados Cores -->", med + dp);
    // const dp_med = dp / 2;

    if (Duration < min) color = "green";
    if (Duration >= min && Duration <= med) color = "yellow";
    if (Duration >= med) color = "yellow";
    if (Duration >= max) color = "red";
    if (Duration >= max + dp) color = "black";

    console.log("Dados --> ", TaskName, " -->", color);

    if (color === "black") {
      // black (duração > média + desvio padrão)
      args.progressBarBgColor = "rgb(45, 41, 38)"; //     #2D2926
      args.taskbarBgColor = "rgb(115, 115, 115)"; // #737373 //
      args.taskbarBorderColor = "white";
    } else if (color === "red") {
      // red (duração >  média + DP/2)
      args.progressBarBgColor = "rgb(244, 6, 6)";
      args.taskbarBgColor = "rgb(255, 124, 124)";
      args.taskbarBorderColor = "white";
    } else if (color === "yellow") {
      // yellow (duração >  média - DP)
      args.progressBarBgColor = "rgb(244, 221, 6)";
      args.taskbarBgColor = "rgb(255, 245, 154)";
      args.taskbarBorderColor = "white";
    } else if (color === "green") {
      // green (duração < média - DP)
      args.progressBarBgColor = "rgb(5, 149, 2)";
      args.taskbarBgColor = "rgb(147, 224, 27)";
      args.taskbarBorderColor = "white";
    }
  };

  const labelSettings = {
    // leftLabel: "TaskID",
    // taskLabel: "${Progress}%",
    // eslint-disable-next-line no-template-curly-in-string
    rightLabel:
      // eslint-disable-next-line no-template-curly-in-string
      "Med: ${taskData.med}h - Min: ${taskData.min}h - Max: ${taskData.max}h - DP: ${taskData.dp}h",
  };

  const actionsTemplate = (props: any) => (
    <Flex
      // w={"100%"}
      style={{ position: "relative", top: "-8px" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ModalDeletar
        id={props.TaskID}
        setLoading={setLoading}
        setRefreshDelete={setRefreshDelete}
      />
      {/* <FiTrash onClick={() => remove(props)} color="#F94144" size={16} /> */}
    </Flex>
  );

  const statusTemplate = (props: any) => (
    <Flex
      // w={"100%"}
      // style={{ position: "relative", top: "-8px" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {props.taskData.Progress >= props.taskData.pct_plan && (
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
      {props.taskData.Progress < props.taskData.pct_plan && (
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
      {props.taskData.Progress == 0 && props.taskData.pct_plan == 0 && (
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

  const cellEdit = (args: any) => {
    // if (args.columnName !== "Progress") {
    // if (["TaskID", "TaskName"].includes(args.columnName)) {
    //   args.cancel = true;
    // }
    // console.log(">>>>", args.rowData);
    edit?.setEditOp({
      // id_sonda: number;
      // id_poco: number;
      id_atividade: args.rowData.TaskID,
      nome_atividade: args.rowData.TaskName,

      inicio_realizado: new Date(args.rowData.StartDate),
      inicio_planejado: new Date(args.rowData.BaselineStartDate),
      hrs_totais: args.rowData.BaselineDuration,
      hrs_reais: args.rowData.Duration,

      fim_realizado: new Date(args.rowData.EndDate),
      fim_planejado: new Date(args.rowData.BaselineEndDate),
      pct_real: args.rowData.Progress,
      pct_plan: args.rowData.ProgressPlan,
      // id_responsavel: number;
    });
    edit?.onOpen();
    args.cancel = true;
  };

  const sortingOptions: SortSettingsModel = {
    columns: [{ field: "StartDate", direction: "Ascending" }],
  };

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  return (
    <>
      {!loading ? (
        <GanttComponent
          id="gantt-control"
          dataSource={data}
          taskFields={{
            id: "TaskID",
            name: "TaskName",
            startDate: "StartDate",
            endDate: "EndDate",
            baselineStartDate: "BaselineStartDate",
            baselineEndDate: "BaselineEndDate",
            // work: "Work",
            duration: "Duration",
            progress: "Progress",
            // child: "subtasks",
            // parentID: "ParentId",
          }}
          allowSorting={true}
          sortSettings={sortingOptions}
          queryTaskbarInfo={queryTaskbarInfo}
          labelSettings={labelSettings}
          includeWeekend={true}
          renderBaseline={true}
          baselineColor="red"
          durationUnit={"Hour"}
          // workUnit={"Hour"}
          dayWorkingTime={[{ from: 0, to: 24 }]}
          timezone="UTC"
          toolbar={["ZoomIn", "ZoomOut", "ZoomToFit"]}
          editSettings={{
            allowEditing: true,
            mode: "Auto",
            allowTaskbarEditing: false,
          }}
          // endEdit={endEdit}
          cellEdit={cellEdit}
          allowSelection={true}
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
          height={"100vh"}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="acao"
              headerText=" "
              headerTextAlign="Center"
              textAlign="Center"
              width="60"
              template={actionsTemplate}
            ></ColumnDirective>
            {/* <ColumnDirective
              field="TaskID"
              headerText="ID"
              headerTextAlign="Center"
              textAlign="Center"
            ></ColumnDirective> */}
            <ColumnDirective
              field="TaskName"
              headerText="Operação"
              headerTextAlign="Left"
              textAlign="Left"
              width="300"
            ></ColumnDirective>
            <ColumnDirective
              field="StartDate"
              headerText="Início real"
              headerTextAlign="Center"
              textAlign="Center"
              type="date"
              format="dd/MM/yyyy HH:mm"
            ></ColumnDirective>
            <ColumnDirective
              field="EndDate"
              headerText="Fim real"
              headerTextAlign="Center"
              textAlign="Center"
              type="date"
              format="dd/MM/yyyy HH:mm"
            ></ColumnDirective>
            <ColumnDirective
              field="Duration"
              headerText="Duração"
              headerTextAlign="Center"
              textAlign="Center"
              type="number"
              format="N"
              width="100"
            ></ColumnDirective>
            <ColumnDirective
              field="s"
              headerText="Status"
              headerTextAlign="Center"
              textAlign="Center"
              // type="number"
              template={statusTemplate}
              width="100"
            ></ColumnDirective>
            <ColumnDirective
              field="pct_plan"
              headerText="% Plan"
              headerTextAlign="Center"
              textAlign="Center"
              type="number"
              format="N"
              width="100"
            ></ColumnDirective>
            <ColumnDirective
              field="Progress"
              headerText="% Real"
              headerTextAlign="Center"
              textAlign="Center"
              type="number"
              format="N"
              width="100"
            ></ColumnDirective>
            <ColumnDirective
              field="BaselineStartDate"
              headerText="Início planejado"
              headerTextAlign="Center"
              textAlign="Center"
              type="date"
              format="dd/MM/yyyy HH:mm"
            ></ColumnDirective>
            <ColumnDirective
              field="BaselineEndDate"
              headerText="Fim planejado"
              headerTextAlign="Center"
              textAlign="Center"
              type="date"
              format="dd/MM/yyyy HH:mm"
            ></ColumnDirective>
            <ColumnDirective
              field="BaselineDuration"
              headerText="Duração planejada"
              headerTextAlign="Center"
              textAlign="Center"
              type="number"
              format="N"
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Edit, Selection, Toolbar, Sort]} />
        </GanttComponent>
      ) : (
        <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
          <Ring speed={2} lineWeight={5} color="blue" size={64} />
        </Flex>
      )}
    </>
  );
}
