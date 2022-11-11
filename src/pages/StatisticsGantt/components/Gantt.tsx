import { useEffect, useState } from "react";

import { Flex } from "@chakra-ui/react";
import {
  Edit,
  ColumnDirective,
  ColumnsDirective,
  GanttComponent,
  Inject,
  Selection,
  Toolbar,
} from "@syncfusion/ej2-react-gantt";
import { Ring } from "@uiball/loaders";
import { StatisticsGanttProps } from "interfaces/Services";

import ModalDeletar from "./ModalDeletar";

type ganttOptionsProps = {
  data: StatisticsGanttProps[] | undefined; // TODO: tirar undefined
  callbackSetRefresh: Function;
  options?: {
    toolbarOptions?: string[];
    showGantt?: boolean;
  };
  edit: {
    onOpen: Function;
    // handleEdit: Function;
    setEditOp: any;
  };
  handleGetAllData: any;
};

export function Gantt({
  data,
  options,
  edit,
  callbackSetRefresh,
  handleGetAllData,
}: ganttOptionsProps) {
  const [loading, setLoading] = useState(true);

  const queryTaskbarInfo = (args: any) => {
    // console.log(":::args.data.taskData", args.data.taskData);
    let color;
    const { Duration, med, dp } = args.data.taskData;

    if (Duration >= med + dp) color = "black";
    if (Duration < med + dp) color = "red";
    if (Duration < med + dp / 2) color = "yellow";
    if (Duration < med - dp) color = "green";

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
        callbackSetRefresh={callbackSetRefresh}
        handleGetAllData={handleGetAllData}
      />
      {/* <FiTrash onClick={() => remove(props)} color="#F94144" size={16} /> */}
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
      // id_responsavel: number;
    });
    edit?.onOpen();
    args.cancel = true;
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
          queryTaskbarInfo={queryTaskbarInfo}
          labelSettings={labelSettings}
          includeWeekend={true}
          renderBaseline={true}
          baselineColor="red"
          durationUnit={"Hour"}
          // workUnit={"Hour"}
          dayWorkingTime={[{ from: 0, to: 24 }]}
          timezone="UTC"
          toolbar={options?.toolbarOptions || []}
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
              headerText="Ação"
              headerTextAlign="Center"
              textAlign="Center"
              width="100"
              template={actionsTemplate}
            ></ColumnDirective>
            <ColumnDirective
              field="TaskID"
              headerText="ID"
              headerTextAlign="Center"
              textAlign="Center"
            ></ColumnDirective>
            <ColumnDirective
              field="TaskName"
              headerText="Operação"
              headerTextAlign="Center"
              textAlign="Center"
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
              field="Duration"
              headerText="Duração real"
              headerTextAlign="Center"
              textAlign="Center"
              type="number"
              format="N"
            ></ColumnDirective>
            <ColumnDirective
              field="BaselineDuration"
              headerText="Duração planejada"
              headerTextAlign="Center"
              textAlign="Center"
              type="number"
              format="N"
            ></ColumnDirective>
            <ColumnDirective
              field="Progress"
              headerText="Progresso (%)"
              headerTextAlign="Center"
              textAlign="Center"
              type="number"
              format="N"
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Edit, Selection, Toolbar]} />
        </GanttComponent>
      ) : (
        <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
          <Ring speed={2} lineWeight={5} color="blue" size={64} />
        </Flex>
      )}
    </>
  );
}
