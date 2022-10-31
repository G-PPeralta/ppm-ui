import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Button, Flex, Text } from "@chakra-ui/react";

import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";
import TituloPagina from "components/TituloPagina";

import Card from "./Componentes/Card";

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = source;
  const destClone = destination;
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = [];
  result.push(sourceClone);
  result.push(destClone);

  return result;
};

export function PriorizacaoDiretores() {
  const [dataBaixa, setDataBaixa] = useState([
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
  ]);
  const [dataMedia, setDataMedia] = useState([
    "lorem1",
    "ipsum1",
    "dolor1",
    "sit1",
    "amet1",
  ]);
  const [dataAlta, setDataAlta] = useState([
    "lorem2",
    "ipsum2",
    "dolor2",
    "sit2",
    "ame2t",
  ]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const sourceData =
      // eslint-disable-next-line no-nested-ternary
      source.droppableId === "droppableBaixa"
        ? dataBaixa
        : source.droppableId === "droppableMedia"
        ? dataMedia
        : dataAlta;

    const destinationData =
      // eslint-disable-next-line no-nested-ternary
      destination.droppableId === "droppableBaixa"
        ? dataBaixa
        : destination.droppableId === "droppableMedia"
        ? dataMedia
        : dataAlta;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(sourceData, source.index, destination.index);

      const state = items;

      if (source.droppableId === "droppableBaixa") {
        setDataBaixa(state);
      }

      if (source.droppableId === "droppableMedia") {
        setDataMedia(state);
      }

      if (source.droppableId === "droppableAlta") {
        setDataAlta(state);
      }
    } else {
      const result = move(sourceData, destinationData, source, destination);

      if (source.droppableId === "droppableBaixa") {
        setDataBaixa(result[0]);
      }

      if (source.droppableId === "droppableMedia") {
        setDataMedia(result[0]);
      }

      if (source.droppableId === "droppableAlta") {
        setDataAlta(result[0]);
      }
      if (destination.droppableId === "droppableBaixa") {
        setDataBaixa(result[1]);
      }

      if (destination.droppableId === "droppableMedia") {
        setDataMedia(result[1]);
      }

      if (destination.droppableId === "droppableAlta") {
        setDataAlta(result[1]);
      }
    }
  };

  return (
    <>
      <Sidebar>
        <ContainerPagina>
          <TituloPagina>Priorização Diretores</TituloPagina>
          <DragDropContext onDragEnd={onDragEnd}>
            <Flex direction={"row"} wrap={"wrap"} mb={2} mt={8} flex={1}>
              <Flex
                width={"300px"}
                direction={"column"}
                gap={2}
                borderRight={"1px solid #D6D4D4"}
                minHeight={"500px"}
              >
                <Flex
                  height={"50px"}
                  alignItems={"center"}
                  pt={2}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    Baixa
                  </Text>
                  <Button
                    variant={"none"}
                    _hover={{
                      background: "#ddd",
                      transition: "all 0.4s",
                    }}
                    py={1}
                    px={1}
                    ml={1}
                  >
                    <BsThreeDotsVertical size={22} />
                  </Button>
                </Flex>
                <Droppable droppableId={"droppableBaixa"}>
                  {(provided: DroppableProvided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {dataBaixa.map((val, index) => (
                        <Card key={index} data={val} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Flex>
              <Flex
                width={"300px"}
                gap={2}
                direction={"column"}
                borderRight={"1px solid #D6D4D4"}
                borderLeft={"1px solid #D6D4D4"}
                minHeight={"500px"}
              >
                <Flex
                  height={"50px"}
                  alignItems={"center"}
                  pt={2}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    Média
                  </Text>
                  <Button
                    variant={"none"}
                    _hover={{
                      background: "#ddd",
                      transition: "all 0.4s",
                    }}
                    py={1}
                    px={1}
                    ml={1}
                  >
                    <BsThreeDotsVertical size={22} />
                  </Button>
                </Flex>
                <Droppable droppableId={"droppableMedia"}>
                  {(provided: DroppableProvided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {dataMedia.map((val, index) => (
                        <Card key={index} data={val} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Flex>
              <Flex
                width={"300px"}
                gap={2}
                direction={"column"}
                borderLeft={"1px solid #D6D4D4"}
                minHeight={"500px"}
              >
                <Flex
                  height={"50px"}
                  alignItems={"center"}
                  pt={2}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    Alta
                  </Text>
                  <Button
                    variant={"none"}
                    _hover={{
                      background: "#ddd",
                      transition: "all 0.4s",
                    }}
                    py={1}
                    px={1}
                    ml={1}
                  >
                    <BsThreeDotsVertical size={22} />
                  </Button>
                </Flex>
                <Droppable droppableId={"droppableAlta"}>
                  {(provided: DroppableProvided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {dataAlta.map((val, index) => (
                        <Card key={index} data={val} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Flex>
            </Flex>
          </DragDropContext>
        </ContainerPagina>
      </Sidebar>
    </>
  );
}