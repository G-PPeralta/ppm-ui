//  CRIADO EM: 10/2022
//  AUTOR: Bruno Fracaro.
//  DESCRIÇÃO DO ARQUIVO: Card da tela de priorização de diretores

import { useEffect, useId, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BiExpand } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { IoIosWallet } from "react-icons/io";

import {
  Flex,
  Text,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Box,
  Heading,
} from "@chakra-ui/react";
import { ICardInfoProjeto } from "interfaces/DetalhamentoProjetos";
import { InfoFinanceira } from "interfaces/Services";

import { formatDate } from "utils/formatDate";

import {
  getCPiSPi,
  getInfoFinanceiro,
  getInfoProjetos,
} from "services/get/DetalhamentoProjetos";

interface Props {
  data: any;
  index: number;
}

function Card({ data, index }: Props) {
  const id = useId();
  const [draggableId, setDraggableId] = useState<any>(id);
  const [openModal, setOpenModal] = useState(false);
  const [cpiSpi, setCpiSpi] = useState([{ cpi: 0, spi: 0 }]);
  const [loading, setLoading] = useState(false);
  const [infoFinanceira, setInfoFinanceira] = useState([] as InfoFinanceira[]);
  const [infoProjeto, setInfoProjeto] = useState<ICardInfoProjeto>(data);

  async function handleGetCpiSpi() {
    if (data.id) {
      setLoading(true);
      const reqGet = await getCPiSPi(data.id);
      setCpiSpi(reqGet.data);
      setLoading(false);
    }
  }

  async function handleGetInfoFinanceira() {
    if (data.id) {
      const dataGet: any = await getInfoFinanceiro(data.id);
      setInfoFinanceira(dataGet.data);
    }
  }

  async function handleGetInfos() {
    if (data.id) {
      const dataInfo = await getInfoProjetos(data.id);

      if (dataInfo.data.length === 0) {
        setInfoProjeto(dataInfo.data);
      } else {
        setInfoProjeto(dataInfo.data[0]);
      }
    }
  }

  let formattedDate: any = null;

  if (infoProjeto.dat_usu_update) {
    const hour = infoProjeto.dat_usu_update.substring(10, 13);
    const splitedHour = ` ${Number(hour) - 3}`;

    formattedDate = infoProjeto.dat_usu_update.replace(
      infoProjeto.dat_usu_update.substring(10, 13),
      splitedHour
    );
  }

  useEffect(() => {
    handleGetInfos();
    handleGetCpiSpi();
    handleGetInfoFinanceira();
    setLoading(false);
  }, []);

  const naoPrevisto = infoFinanceira[0]?.naoPrevisto;
  const remanescente = infoFinanceira[0]?.remanescente;
  const pctRealizado = infoFinanceira[0]?.pctRealizado;
  const pctRemanescente = infoFinanceira[0]?.pctRemanescente;
  const pctNaoPrevisto = infoFinanceira[0]?.pctNaoPrevisto;

  useEffect(() => {
    const now = Date.now();
    const newId = draggableId + "-" + now.toLocaleString();
    setDraggableId(newId);
  }, []);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            size="xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton color={"white"} />
              <ModalHeader
                backgroundColor={"#2E69FD"}
                display={"flex"}
                justifyContent={"center"}
                color={"white"}
                fontSize={"14px"}
                fontWeight={"700"}
              >
                {infoProjeto.nome_projeto}
              </ModalHeader>
              <ModalBody mt={3}>
                <Flex direction={"column"} gap={4}>
                  <Flex justifyContent={"space-between"}>
                    <Box>
                      <Flex>
                        <Box display={"flex"}>
                          <Text fontWeight={"600"}>ID Origem:</Text>
                          <Text ml={2} color={"origem.500"} fontWeight={"600"}>
                            {infoProjeto.campo_id}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex alignItems={"center"}>
                        <Text fontWeight={"600"} color={"origem.500"}>
                          <FiMapPin />
                        </Text>
                        <Text ml={1} fontWeight={"600"}>
                          Polo:
                        </Text>
                        <Text ml={2} color={"origem.500"} fontWeight={"600"}>
                          {infoProjeto.polo}
                        </Text>
                      </Flex>

                      <Flex alignItems={"center"}>
                        <Text fontWeight={"600"} color={"origem.500"}>
                          <FaWarehouse />
                        </Text>
                        <Text ml={1} fontWeight={"600"}>
                          Local:
                        </Text>
                        <Text ml={2} color={"origem.500"} fontWeight={"600"}>
                          {infoProjeto.local}
                        </Text>
                      </Flex>

                      <Flex alignItems={"center"}>
                        <Text fontWeight={"600"} fontSize={14}>
                          Coordenador:
                        </Text>
                        <Text
                          ml={2}
                          color={"origem.500"}
                          fontWeight={"600"}
                          fontSize={14}
                        >
                          {infoProjeto.coordenador_nome === null
                            ? "Nome do Coordenador_nom"
                            : infoProjeto.coordenador_nome}
                        </Text>
                      </Flex>

                      <Flex alignItems={"center"}>
                        <Text fontWeight={"600"} fontSize={14}>
                          Responsável:
                        </Text>
                        <Text
                          ml={2}
                          color={"origem.500"}
                          fontWeight={"600"}
                          fontSize={14}
                        >
                          {infoProjeto.nome_responsavel === null
                            ? "Nome do Responsável"
                            : infoProjeto.nome_responsavel}
                        </Text>
                      </Flex>

                      <Flex alignItems={"center"}>
                        <Text fontWeight={"600"} fontSize={14}>
                          Área Demandada:
                        </Text>
                        <Text
                          ml={2}
                          color={"origem.500"}
                          fontWeight={"600"}
                          fontSize={14}
                        >
                          {infoProjeto.solicitante}
                        </Text>
                      </Flex>
                    </Box>

                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={innerWidth > 520 ? "flex-end" : "flex-start"}
                      justifyContent={innerWidth > 520 ? "end" : "start"}
                    >
                      <Flex alignItems={"center"}>
                        <Text fontWeight={"600"} fontSize={14}>
                          Início:
                        </Text>
                        <Text
                          ml={2}
                          color={"origem.500"}
                          fontWeight={"600"}
                          fontSize={14}
                        >
                          {infoProjeto.data_inicio === null
                            ? "---"
                            : formatDate(infoProjeto.data_inicio)}
                        </Text>
                      </Flex>

                      <Flex alignItems={"center"}>
                        <Text fontWeight={"600"} fontSize={14}>
                          Término:
                        </Text>
                        <Text
                          ml={2}
                          color={"origem.500"}
                          fontWeight={"600"}
                          fontSize={14}
                        >
                          {infoProjeto.data_fim === null
                            ? "---"
                            : formatDate(infoProjeto.data_fim)}
                        </Text>
                      </Flex>

                      <Flex alignItems={"center"}>
                        <Text fontWeight={"600"} fontSize={14}>
                          Atraso:
                        </Text>
                        <Text
                          ml={2}
                          color={"origem.500"}
                          fontWeight={"600"}
                          fontSize={14}
                        >
                          {infoProjeto.atraso} dias
                        </Text>
                      </Flex>

                      <Flex alignItems={"center"}>
                        <Text fontWeight={"600"} fontSize={14}>
                          Atualização:
                        </Text>
                        <Text
                          ml={2}
                          color={"origem.500"}
                          fontWeight={"600"}
                          fontSize={14}
                        >
                          {formattedDate}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                  <Flex
                    backgroundColor={"white"}
                    p={5}
                    borderRadius={5}
                    direction={"column"}
                    flex={2}
                    justify={"space-between"}
                  >
                    <Box mb={5}>
                      <Box display={"flex"} alignItems={"center"}>
                        <Heading as="h4" size="lg" color={"origem.300"}>
                          <IoIosWallet />
                        </Heading>
                        <Heading as="h4" size="md" ml={2}>
                          Orçamento
                        </Heading>
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
                        <Text fontSize={18} ml={2} fontWeight={600}>
                          {infoFinanceira[0]?.planejado.toLocaleString(
                            "pt-BR",
                            {
                              style: "currency",
                              currency: "BRL",
                            }
                          )}
                        </Text>
                      </Box>
                    </Box>

                    <Flex direction={"row"} gap={4} wrap={"wrap"}>
                      <Flex
                        justify={"space-between"}
                        direction={"column"}
                        flex={1}
                        gap={2}
                      >
                        <Flex alignItems={"center"} flex={1}>
                          <Box flex={1}>
                            <Box display={"flex"} alignItems={"center"}>
                              <Text fontSize={16} fontWeight={600}>
                                Remanescente
                              </Text>
                            </Box>
                            <Box display={"flex"} alignItems={"center"}>
                              <Text fontSize={16} ml={2} fontWeight={600}>
                                {remanescente
                                  ? remanescente.toLocaleString("pt-BR", {
                                      style: "currency",
                                      currency: "BRL",
                                    })
                                  : "R$ 0,00"}
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            display={"flex"}
                            justifyItems={"center"}
                            justifyContent={"center"}
                            alignItems="center"
                            bg={"#059502"}
                            ml={4}
                            height={"56px"}
                            width={"56px"}
                            borderRadius={4}
                          >
                            <Text
                              p={1}
                              color="#ffffff"
                              fontSize={"16px"}
                              fontWeight={"600"}
                            >
                              {pctRemanescente}%
                            </Text>
                          </Box>
                        </Flex>
                        <Flex alignItems={"center"} flex={1}>
                          <Box flex={1}>
                            <Box display={"flex"} alignItems={"center"}>
                              <Text fontSize={16} fontWeight={600}>
                                Realizado
                              </Text>
                            </Box>
                            <Box display={"flex"} alignItems={"center"}>
                              <Text fontSize={16} ml={2} fontWeight={600}>
                                {infoFinanceira[0]?.realizado.toLocaleString(
                                  "pt-BR",
                                  {
                                    style: "currency",
                                    currency: "BRL",
                                  }
                                )}
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            display={"flex"}
                            justifyItems={"center"}
                            justifyContent={"center"}
                            alignItems="center"
                            bg={"#2E69FD"}
                            ml={4}
                            height={"56px"}
                            width={"56px"}
                            borderRadius={4}
                          >
                            <Text
                              p={1}
                              color="#ffffff"
                              fontWeight={"600"}
                              fontSize={"16px"}
                            >
                              {pctRealizado}%
                            </Text>
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex
                        justify={"space-between"}
                        direction={"column"}
                        flex={1}
                        gap={2}
                      >
                        <Flex alignItems={"center"} flex={1}>
                          <Box flex={1}>
                            <Box display={"flex"} alignItems={"center"}>
                              <Text fontSize={16} fontWeight={600}>
                                Não Previsto
                              </Text>
                            </Box>
                            <Box display={"flex"} alignItems={"center"}>
                              <Text fontSize={16} ml={2} fontWeight={600}>
                                {naoPrevisto > 0
                                  ? naoPrevisto.toLocaleString("pt-BR", {
                                      style: "currency",
                                      currency: "BRL",
                                    })
                                  : "R$ 0,00"}
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            display={"flex"}
                            justifyItems={"center"}
                            justifyContent={"center"}
                            alignItems="center"
                            bg={"#CC0000"}
                            height={"56px"}
                            width={"56px"}
                            borderRadius={4}
                          >
                            <Text
                              p={1}
                              color="#ffffff"
                              fontSize={"16px"}
                              fontWeight={"600"}
                            >
                              {pctNaoPrevisto}%
                            </Text>
                          </Box>
                        </Flex>
                        <Flex alignItems={"center"} flex={1} gap={2}>
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            flex={1}
                            justifyContent={"center"}
                            flexWrap={"wrap"}
                            gap={1}
                          >
                            <Text color={"#00B53D"} fontSize={20}>
                              {(cpiSpi && cpiSpi[0].cpi) == 1 ? (
                                <BsCheckCircleFill />
                              ) : (
                                <BsCheckCircleFill color={"red"} />
                              )}
                            </Text>
                            <Text fontSize={16} fontWeight={600}>
                              CPI = {!loading && cpiSpi[0].cpi.toString()}
                            </Text>
                          </Box>
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            flex={1}
                            justifyContent={"center"}
                            flexWrap={"wrap"}
                            gap={1}
                          >
                            <Text color={"#00B53D"} fontSize={20}>
                              {cpiSpi && cpiSpi[0].spi == 1 ? (
                                <BsCheckCircleFill />
                              ) : (
                                <BsCheckCircleFill color={"red"} />
                              )}
                            </Text>
                            <Text fontSize={16} fontWeight={600}>
                              SPI = {!loading && cpiSpi[0].spi.toString()}
                            </Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Flex
            w="100%"
            maxW={"300px"}
            align="center"
            justify="space-between"
            p={4}
          >
            <Text fontWeight={"700"} fontSize={"16px"}>
              {index + 1}°
            </Text>
            <Flex
              w="80%"
              background={"#f5f5f5"}
              borderRadius={"8px"}
              p={2}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Text
                fontWeight={"700"}
                fontSize={"16px"}
                w="100%"
                textAlign={"center"}
                mb={2}
              >
                {data.nome_projeto}
              </Text>
              <Flex w="100%" align="center" justify="center">
                {/* <BiExpand size={20} /> */}
                <IconButton
                  aria-label="Botão Voltar"
                  icon={<BiExpand size={20} />}
                  borderRadius={"10px"}
                  background={"#f5f5f5"}
                  // color={"origem.500"}
                  _hover={{
                    background: "origem.500",
                    transition: "all 0.4s",
                    color: "white",
                  }}
                  onClick={() => setOpenModal(true)}
                />
              </Flex>
            </Flex>
          </Flex>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
