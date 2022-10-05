import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import StackedBarChart from "components/StackedBarChart";

import { getSonda } from "services/get/CadastroModaisInfograficos";

import StatusIntervencao from "./StatusIntervencao";

export function GraficoPorCadaIntervencao({ Prop }: any) {
  const [listaSondas, setListaSondas] = useState<any[]>([]);

  const dataMock2 = [
    {
      month: "Pir-61",
      Manutenção: 10,
      Recurso_Origem: 20,
      Recurso_Cia: 10,
      Condições_Climáticas: 30,
      Informações_Técnicas: 10,
      Aguardando_Outros: 20,
    },
    {
      month: "Pir-62",
      Manutenção: 5,
      Recurso_Origem: 5,
      Recurso_Cia: 10,
      Condições_Climáticas: 50,
      Informações_Técnicas: 10,
      Aguardando_Outros: 20,
    },
    {
      month: "Pir-63",
      Manutenção: 5,
      Recurso_Origem: 5,
      Recurso_Cia: 10,
      Condições_Climáticas: 50,
      Informações_Técnicas: 10,
      Aguardando_Outros: 20,
    },
    {
      month: "Pir-64",
      Manutenção: 10,
      Recurso_Origem: 20,
      Recurso_Cia: 10,
      Condições_Climáticas: 30,
      Informações_Técnicas: 10,
      Aguardando_Outros: 20,
    },
    {
      month: "Pir-65",
      Manutenção: 10,
      Recurso_Origem: 20,
      Recurso_Cia: 10,
      Condições_Climáticas: 30,
      Informações_Técnicas: 10,
      Aguardando_Outros: 20,
    },
    {
      month: "Pir-66",
      Manutenção: 5,
      Recurso_Origem: 5,
      Recurso_Cia: 10,
      Condições_Climáticas: 50,
      Informações_Técnicas: 10,
      Aguardando_Outros: 20,
    },
    {
      month: "Pir-67",
      Manutenção: 10,
      Recurso_Origem: 20,
      Recurso_Cia: 10,
      Condições_Climáticas: 30,
      Informações_Técnicas: 10,
      Aguardando_Outros: 20,
    },
    {
      month: "Pir-68",
      Manutenção: 20,
      Recurso_Origem: 20,
      Recurso_Cia: 20,
      Condições_Climáticas: 20,
      Informações_Técnicas: 20,
      Aguardando_Outros: 20,
    },
    {
      month: "Pir-69",
      Manutenção: 5,
      Recurso_Origem: 5,
      Recurso_Cia: 10,
      Condições_Climáticas: 50,
      Informações_Técnicas: 10,
      Aguardando_Outros: 20,
    },
    {
      month: "Pir-70",
      Manutenção: 10,
      Recurso_Origem: 20,
      Recurso_Cia: 10,
      Condições_Climáticas: 30,
      Informações_Técnicas: 10,
      Aguardando_Outros: 20,
    },
    {
      month: "Pir-71",
      Manutenção: 10,
      Recurso_Origem: 10,
      Recurso_Cia: 10,
      Condições_Climáticas: 10,
      Informações_Técnicas: 10,
      Aguardando_Outros: 90,
    },
    {
      month: "Pir-72",
      Manutenção: 10,
      Recurso_Origem: 20,
      Recurso_Cia: 10,
      Condições_Climáticas: 30,
      Informações_Técnicas: 10,
      Aguardando_Outros: 20,
    },
  ];

  const dataEntries2 = [
    { name: "Aguardando_Outros", color: "#7030a0" },
    { name: "Informações_Técnicas", color: "#00b0f0" },
    { name: "Condições_Climáticas", color: "#00b050" },
    { name: "Recurso_Cia", color: "#778bd7" },
    { name: "Recurso_Origem", color: "#0047bb" },
    { name: "Manutenção", color: "#f4dd06" },
  ];

  const intervençoes = [
    {
      id: 4,
      status: "Manutenção 36hrs/36%",
      color: "#f4dd06",
    },
    {
      id: 2,
      status: "Recurso Origem 6hrs/6%",
      color: "#0047bb",
    },
    {
      id: 5,
      status: "Recurso Cia de Serviço 8hrs/8%",
      color: "#778bd7",
    },
    {
      id: 3,
      status: "Condições Climáticas 10hrs/10%",
      color: "#00b050",
    },
    {
      id: 1,
      status: "Informações Técnicas 23hrs/23%",
      color: "#00b0f0",
    },
    {
      id: 6,
      status: "Aguardando Outros 18hrs/18%",
      color: "#7030a0",
    },
  ];

  const reqGet = async () => {
    const sondas = await getSonda();

    const sondasSorted = sondas.data.sort((a: any, b: any) =>
      a.nom_sonda.localeCompare(b.nom_sonda)
    );

    setListaSondas(sondasSorted);
  };

  // console.log(listaSondas);

  useEffect(() => {
    reqGet();
  }, []);

  return (
    <>
      {/* {loading && (
          <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
            <Ring speed={2} lineWeight={5} color="blue" size={64} />
          </Flex>
        )} */}
      <Stack spacing="8">
        <Flex
          w={"auto"}
          align="center"
          justify="center"
          bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
        >
          <Box
            py={{ base: "6", sm: "6" }}
            px={{ base: "6", sm: "6" }}
            w={"100%"}
            bg={useBreakpointValue({ base: "transparent", sm: "white" })}
            boxShadow={{
              base: "none",
              sm: useColorModeValue("md", "md-dark"),
            }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // projectsForm.handleSubmit(e);
              }}
            >
              <Stack spacing="5">
                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "column",
                  })}
                >
                  <Flex justifyContent={"space-between"}>
                    <Flex align={"flex-end"}>
                      <FormControl mt={"-50px"}>
                        <FormLabel>
                          <Text
                            mb={"24px"}
                            fontSize={"20px"}
                            color={"#585858"}
                            fontWeight={"700"}
                            fontFamily={"Mulish"}
                          >
                            Gráficos estatísticos
                          </Text>
                        </FormLabel>
                      </FormControl>
                    </Flex>
                    <Flex align={"flex-start"}>
                      <Prop />
                    </Flex>
                  </Flex>

                  <Flex direction={"row"} mb={"15px"} gap={4}>
                    <Flex alignItems={"flex-end"}>
                      <FormControl>
                        <FormLabel
                          mt={"-20px"}
                          fontSize={"12px"}
                          color={"#A7A7A7"}
                          htmlFor="gera-grafico"
                        >
                          GERAR GRÁFICO POR
                        </FormLabel>
                        <Input
                          placeholder="Relatório de cada intervenção"
                          // onChange={handleProjectChange}
                          mt={"-6px"}
                          id="gera-grafico"
                          name="gera-grafico"
                          width={"480px"}
                          height={"56px"}
                          borderRadius={"8px"}
                          color={"#2D2926"}
                        ></Input>
                      </FormControl>
                    </Flex>

                    <Flex>
                      <FormControl>
                        <FormLabel
                          fontSize={"12px"}
                          color={"#A7A7A7"}
                          htmlFor="de"
                        >
                          DE
                        </FormLabel>
                        <Input
                          mt={"-6px"}
                          id="de"
                          name="de"
                          width={"120px"}
                          height={"56px"}
                          borderRadius={"8px"}
                          type={"date"}
                          mb={"-10px"}
                        />
                      </FormControl>
                    </Flex>

                    <Flex>
                      <FormControl>
                        <FormLabel
                          alignItems={"flex-start"}
                          fontSize={"12px"}
                          color={"#A7A7A7"}
                          htmlFor="ate"
                        >
                          ATÉ
                        </FormLabel>
                        <Input
                          mt={"-6px"}
                          id="ate"
                          name="ate"
                          width={"120px"}
                          height={"56px"}
                          borderRadius={"8px"}
                          type={"date"}
                        />
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex gap={4}>
                    <Flex alignItems={"flex-end"}>
                      <FormControl>
                        <FormLabel
                          fontSize={"12px"}
                          color={"#A7A7A7"}
                          htmlFor="sonda"
                        >
                          SONDA
                        </FormLabel>
                        <Select
                          placeholder="Sonda"
                          // onChange={handleProjectChange}
                          mt={"-6px"}
                          id="sonda"
                          name="sonda"
                          width={"208px"}
                          height={"56px"}
                          borderRadius={"8px"}
                        >
                          {listaSondas.map((sonda) => (
                            <option>{sonda.nom_sonda}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </Flex>

                    <Flex>
                      <FormControl className="toBottom">
                        <Button
                          h={"56px"}
                          background={"white"}
                          border={"2.3px solid"}
                          color={"#0047BB"}
                          variant="primary"
                          _hover={{
                            background: "origem.500",
                            color: "white",
                            transition: "all 0.4s",
                          }}
                          rightIcon={<FiPlus />}
                          fontSize={"18px"}
                          fontWeight={"700"}
                        >
                          Gerar
                        </Button>
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex direction={"column"}>
                    <Flex mb={"-20px"}>
                      <Text
                        mt={"20px"}
                        fontSize={"24px"}
                        fontWeight={"700"}
                        color={"#2D2926"}
                      >
                        Relatório de cada intervenção
                      </Text>
                    </Flex>
                    <Flex direction={"row"} gap={2}>
                      <Text
                        mt={"20px"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color={"#0047BB"}
                      >
                        TEMPO TOTAL AGUARDADO:
                      </Text>
                      <Text
                        mt={"20px"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color={"#2D2926"}
                      >
                        100 HORAS
                      </Text>
                    </Flex>

                    <Flex gap={2} wrap={"wrap"} mt={"5px"}>
                      {intervençoes.map((status, index) => (
                        <StatusIntervencao
                          key={index}
                          status={status.status}
                          color={status.color}
                        />
                      ))}
                    </Flex>
                  </Flex>
                  <Flex ml={"-45px"} mt={"50px"}>
                    <StackedBarChart
                      showY={true}
                      sizeW={1050}
                      sizeH={352}
                      data={dataMock2}
                      dataEntries={dataEntries2}
                      barW={40}
                    />
                  </Flex>
                </Flex>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}
