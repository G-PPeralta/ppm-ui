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

import { getGanttCampanhaData } from "services/get/Campanhas";

// import { ganttData } from "pages/Reports/components/data";

function ExpandGanttModal({ isModalOpen, setIsModalOpen, pocoId }: any) {
  const [ganttData, setGanttData] = useState([]);

  const handleGetGanttData = async () => {
    if (pocoId) {
      const { data } = await getGanttCampanhaData(pocoId);
      setGanttData(data);
    }
  };

  console.log(ganttData);

  useEffect(() => {
    handleGetGanttData();
  }, []);
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
              // cellEdit={cellEdit}
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
          </ModalBody>
          <ModalCloseButton
            color={"white"}
            // onClick={() => setExpandGantt(false)}
          />
          <ModalFooter justifyContent={"center"}></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ExpandGanttModal;
