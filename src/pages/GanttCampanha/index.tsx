import { useEffect, useState } from "react";
import { MdViewList } from "react-icons/md";

import {
  Box,
  Flex,
  IconButton,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ColumnDirective,
  ColumnsDirective,
  Edit,
  GanttComponent,
  Inject,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-gantt";

import Sidebar from "components/SideBar";

import { getCampanhasInfo } from "services/post/Campanhas";

import ExpandGanttModal from "./components/ExpandGanttModal";

// import { Gantt } from "../StatisticsGantt/components/Gantt";
// import ModalAdicionarOperacao from "./components/ModalAdicionarOperacao";

interface GanttCampanha {
  id_poco: number;
  inicioprojplanejado: Date;
  finalprojplanejado: Date;
  pct_plan: string;
  pct_real: string;
}

function GanttCampanha() {
  const [ganttData, setGanttData] = useState<GanttCampanha[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <IconButton
        onClick={() => setIsModalOpen(true)}
        color={"#0047DB"}
        fontWeight={"700"}
        backgroundColor={"transparent"}
        aria-label="Botão excluir"
        _hover={{
          backgroundColor: "#0047DB",
          color: "white",
        }}
        w={"24px"}
        minW={"24px"}
        maxW={"24px"}
        h={"16px"}
        minH={"14px"}
        maxH={"18px"}
      >
        <MdViewList size={14} />
      </IconButton>
    </Flex>
  );

  const payload = {
    area_atuacao_id: null,
    poco_id: null,
    atividade_id: null,
    data_inicio: null,
    data_fim: null,
    sonda_id: null,
    status: null,
    responsavel_id: null,
  };

  const handleGetAllData = async () => {
    const { data } = await getCampanhasInfo(payload);
    if (data) {
      const list: any = [];
      data.forEach((item: any) => {
        const formatted = item.pocos.map((poc: any) => ({
          TaskID: poc.poco || "",
          startDate: poc.inicioprojplanejado || "",
          endDate: poc.finalprojplanejado || "",
          pct_plan: Number(poc.pct_plan) || "",
          Progress: Number(poc.pct_real),
        }));
        list.push(...formatted);
      });

      setGanttData(list);
    }
  };

  useEffect(() => {
    handleGetAllData();
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
            {
              <>
                <Stack spacing="8">
                  <GanttComponent
                    taskFields={{
                      id: "TaskID",
                      startDate: "startDate",
                      endDate: "endDate",
                      progress: "Progress",
                    }}
                    dataSource={ganttData}
                    toolbar={["ZoomIn", "ZoomOut", "ZoomToFit"]}
                    renderBaseline={false}
                    baselineColor="red"
                    editSettings={{
                      allowEditing: false,
                      mode: "Auto",
                      allowTaskbarEditing: false,
                    }}
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
                  >
                    <ColumnsDirective>
                      {/* <ColumnDirective
                        field="acao"
                        headerText="Ação"
                        headerTextAlign="Center"
                        textAlign="Center"
                        width="100"
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
                        field="TaskID"
                        headerText="Poço"
                        headerTextAlign="Left"
                        textAlign="Left"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="startDate"
                        headerText="Início planejado"
                        headerTextAlign="Center"
                        textAlign="Center"
                        type="date"
                        format="dd/MM/yyyy"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="endDate"
                        headerText="Fim planejado"
                        headerTextAlign="Center"
                        textAlign="Center"
                        type="date"
                        format="dd/MM/yyyy"
                      ></ColumnDirective>
                      {/* <ColumnDirective
                        field="pct_plan"
                        headerText="Progresso Planejado (%)"
                        headerTextAlign="Center"
                        textAlign="Center"
                        // type="number"
                        format="N"
                      ></ColumnDirective> */}
                      <ColumnDirective
                        field="Progress"
                        headerText="Progresso Real (%)"
                        headerTextAlign="Center"
                        textAlign="Center"
                        // type="number"
                        format="N"
                      ></ColumnDirective>
                      <ColumnDirective
                        field="pct_plan"
                        headerText="Progresso Planejado (%)"
                        headerTextAlign="Center"
                        textAlign="Center"
                        // type="number"
                        format="N"
                      ></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Edit, Toolbar, Sort]} />
                  </GanttComponent>
                </Stack>
              </>
            }
          </Box>
        </Stack>
      </Sidebar>
      {isModalOpen && (
        <ExpandGanttModal
          isModalOpen={isModalOpen}
          setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
        />
      )}
    </>
  );
}

export default GanttCampanha;
