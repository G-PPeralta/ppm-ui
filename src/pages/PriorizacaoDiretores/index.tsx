import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
// import { BsThreeDotsVertical } from "react-icons/bs";

import { Button, Flex, Spinner, Text } from "@chakra-ui/react";

import ContainerPagina from "components/ContainerPagina";
import Sidebar from "components/SideBar";
import TituloPagina from "components/TituloPagina";

import { useProjects } from "hooks/useProjects";

import {
  postPriorizacaoDiretores,
  getPriorizacaoDiretores,
} from "services/post/PriorizacaoDiretores";

import Card from "./Componentes/Card";

function compare(a: any, b: any) {
  if (a.order > b.order) {
    return 1;
  }
  if (a.order < b.order) {
    return -1;
  }
  return 0;
}

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
  const { loading, getProjetosDetalhados } = useProjects();
  const [dataBaixa, setDataBaixa] = useState<any[]>([]);
  const [dataMedia, setDataMedia] = useState<any[]>([]);
  const [dataAlta, setDataAlta] = useState<any[]>([]);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    const getPayload = async () => {
      const prioridades = await getPriorizacaoDiretores();
      console.log("prioridades", prioridades);
      const data = await getProjetosDetalhados();
      const low = data.filter(
        (val: any) => val.prioridade == "Baixo" || val.prioridade == null
      );
      low.forEach((val: any, index: number) => {
        const newItem = {
          ...val,
          order: prioridades.data.filter(
            (item: any) => item.id_projeto == val.id
          )[0]?.prioridade,
        };
        low[index] = newItem;
      });
      setDataBaixa(low.sort(compare));
      const medium = data.filter((val: any) => val.prioridade == "Médio");
      medium.forEach((val: any, index: number) => {
        const newItem = {
          ...val,
          order: prioridades.data.filter(
            (item: any) => item.id_projeto == val.id
          )[0]?.prioridade,
        };
        medium[index] = newItem;
      });
      setDataMedia(medium.sort(compare));
      const high = data.filter((val: any) => val.prioridade == "Alto");
      high.forEach((val: any, index: number) => {
        const newItem = {
          ...val,
          order: prioridades.data.filter(
            (item: any) => item.id_projeto == val.id
          )[0]?.prioridade,
        };
        high[index] = newItem;
      });
      setDataAlta(high.sort(compare));
    };
    getPayload();
  }, []);

  const onDragEnd = (result: any) => {
    setWait(true);
    const { source, destination } = result;
    if (!destination) {
      setTimeout(() => {
        setWait(false);
      }, 1000);
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
    setTimeout(() => {
      setWait(false);
    }, 1000);
  };

  const save = async () => {
    console.log("baixos", dataBaixa);
    console.log("medios", dataMedia);
    console.log("altos", dataAlta);
    const payload: any[] = [];
    dataBaixa.forEach((val: any, index: number) => {
      const newItem = {
        id_projeto: val.id,
        prioridade: index,
      };
      payload.push(newItem);
    });
    dataMedia.forEach((val: any, index: number) => {
      const newItem = {
        id_projeto: val.id,
        prioridade: index,
      };
      payload.push(newItem);
    });
    dataAlta.forEach((val: any, index: number) => {
      const newItem = {
        id_projeto: val.id,
        prioridade: index,
      };
      payload.push(newItem);
    });
    console.log("payload", payload);
    const result = await postPriorizacaoDiretores(payload);
    console.log("result", result);
  };

  return (
    <>
      <Sidebar>
        <ContainerPagina>
          <TituloPagina>Priorização Diretores</TituloPagina>
          <DragDropContext onDragEnd={onDragEnd}>
            {loading || wait ? (
              <Spinner />
            ) : (
              <Flex
                justifyContent={"space-between"}
                direction={"row"}
                wrap={"wrap"}
                mb={2}
                mt={8}
                flex={1}
              >
                <Flex
                  width={"300px"}
                  direction={"column"}
                  gap={2}
                  // borderRight={"1px solid #D6D4D4"}
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
                    {/* <Button
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
                    </Button> */}
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
                  // borderRight={"1px solid #D6D4D4"}
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
                    {/* <Button
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
                    </Button> */}
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
                    {/* <Button
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
                    </Button> */}
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
            )}
          </DragDropContext>
          <Flex w={"100%"} justifyContent={"center"}>
            <Button
              h={"56px"}
              borderRadius={"10px"}
              background={"white"}
              border={"2px solid"}
              color={"origem.500"}
              _hover={{
                border: "2px solid",
                borderColor: "origem.500",
                background: "origem.500",
                transition: "all 0.4s",
                color: "white",
              }}
              textColor={"origem.500"}
              onClick={() => save()}
            >
              Salvar Alterações
            </Button>
          </Flex>
        </ContainerPagina>
      </Sidebar>
    </>
  );
}
