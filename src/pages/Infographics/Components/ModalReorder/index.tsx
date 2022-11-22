import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Text,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import { useToast } from "contexts/Toast";

import { postGetInfoCampanha } from "services/get/Infograficos";
// import { postReorderIntervencao } from "services/post/Infograficos";

import Card from "./components/Card";
import "./components/styles.scss";

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

export default function ModalReorder({ refresh }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [campanhas, setCampanhas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    handleGetAll();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleGetAll();
    }, 3000);
  }, [refresh]);

  const handleGetAll = async () => {
    const deafultPayload = {
      area_atuacao_id: null,
      poco_id: null,
      atividade_id: null,
      responsavel_id: null,
      data_inicio: null,
      data_fim: null,
      sonda_id: null,
      status: null,
    };
    const campanhas = await postGetInfoCampanha(deafultPayload);
    setCampanhas(campanhas.data);
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const oldCampanhas = campanhas;

    const sourceData = oldCampanhas.filter(
      (val) => val.sonda == source.droppableId
    )[0].pocos;

    const sourceIndex = oldCampanhas
      .map((e) => e.sonda)
      .indexOf(source.droppableId);

    const destinationData = oldCampanhas.filter(
      (val) => val.sonda == destination.droppableId
    )[0].pocos;

    const destinationIndex = oldCampanhas
      .map((e) => e.sonda)
      .indexOf(destination.droppableId);

    const newCampanhas = campanhas;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(sourceData, source.index, destination.index);

      newCampanhas[sourceIndex].pocos = items;
      setIsShown(true);
      setTimeout(() => {
        setLoading(true);
      }, 300);
      setTimeout(() => {
        setLoading(false);
        setIsShown(false);
      }, 1000);
    } else {
      const result = move(sourceData, destinationData, source, destination);

      newCampanhas[sourceIndex].pocos = result[0];
      newCampanhas[destinationIndex].pocos = result[1];
    }
    setCampanhas(newCampanhas);
  };

  const save = async () => {
    // try {
    //   const { status } = await postReorderIntervencao(campanhas);

    //   if (status === 200 || status === 201) {
    toast.success("Intervenções reordenadas com sucesso!", {
      id: "toast-principal",
    });
    onClose();
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   toast.error("Erro ao reordenar intervenção!", {
    //     id: "toast-principal",
    //   });
    //   setLoading(false);
    // }
  };

  return (
    <>
      <Button
        h={"56px"}
        borderRadius={"8px"}
        disabled={campanhas.length == 0}
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
        onClick={onOpen}
      >
        Reordenar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"#2E69FD"}
            borderTopRadius={7}
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            fontSize={"14px"}
            fontWeight={"700"}
          >
            Reordenar Poços
          </ModalHeader>
          <ModalCloseButton color={"white"} onClick={() => onClose()} />
          <ModalBody mt={3}>
            {loading ? (
              <Flex
                minHeight={"200px"}
                flexGrow={1}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Ring speed={2} lineWeight={5} color="blue" size={48} />
              </Flex>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Box
                  className={`square ${
                    isShown ? "square-full" : "square-none"
                  }`}
                  overflowX={{ base: "scroll" }}
                  display={"flex"}
                  flexDirection={"row"}
                  gap={10}
                  py={2}
                  flex={1}
                >
                  {campanhas.map((collum, index) => (
                    <Flex
                      key={index}
                      width={"300px"}
                      direction={"column"}
                      gap={2}
                      minHeight={"500px"}
                    >
                      <Flex
                        mt={3}
                        alignItems={"center"}
                        justify={"end"}
                        w="235px"
                      >
                        <Text
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          textAlign={"center"}
                        >
                          {collum.sonda}
                        </Text>
                      </Flex>
                      <Droppable droppableId={collum.sonda}>
                        {(provided: DroppableProvided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            <Flex
                              width={"300px"}
                              direction={"column"}
                              gap={2}
                              minHeight={"500px"}
                            >
                              {collum.pocos.map((val: any, index: number) => (
                                <>
                                  {index < 9 ? (
                                    <Draggable
                                      draggableId={String(val.id_poco)}
                                      index={index}
                                      isDragDisabled={
                                        !!(index == 0 && val.pct_real != 0)
                                      }
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <Card
                                            key={index}
                                            poco={val}
                                            index={index}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                  ) : undefined}
                                </>
                              ))}
                            </Flex>
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </Flex>
                  ))}
                </Box>
              </DragDropContext>
            )}
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Flex gap={2}>
              <Button
                h={"56px"}
                variant="ghost"
                color="red.500"
                w={"208px"}
                onClick={() => onClose()}
                _hover={{
                  background: "red.600",
                  transition: "all 0.4s",
                  color: "white",
                }}
                fontSize={"18px"}
                fontWeight={"700"}
                borderRadius={"8px"}
                fontFamily={"Mulish"}
              >
                <Text
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  mx={12}
                >
                  Cancelar
                </Text>
              </Button>
              <Button
                w={"208px"}
                h={"56px"}
                borderRadius={"8px"}
                background={"origem.500"}
                fontSize={"18px"}
                fontWeight={"700"}
                fontFamily={"Mulish"}
                variant="primary"
                color="white"
                onClick={() => save()}
                _hover={{
                  background: "origem.600",
                  transition: "all 0.4s",
                }}
              >
                <Text
                  fontSize="18px"
                  fontWeight={"700"}
                  fontFamily={"Mulish"}
                  mx={12}
                >
                  Concluir
                </Text>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
