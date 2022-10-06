import { useEffect, useRef, useState } from "react";
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

import { getCampo, getSonda } from "services/get/CadastroModaisInfograficos";

export function GraficoPorDuracao({ Prop }: any) {
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [campos, setCampos] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  const durationHistory = [
    "Mínimo - 8 horas",
    "Médio - 16 horas",
    "Máxima - 12 horas",
  ];

  const dataMock1 = [
    {
      month: "Pir-61",
      Durações: 90,
    },
    {
      month: "Pir-62",
      Durações: 80,
    },
    {
      month: "Pir-63",
      Durações: 70,
    },
    {
      month: "Pir-64",
      Durações: 60,
    },
    {
      month: "Pir-65",
      Durações: 50,
    },
    {
      month: "Pir-66",
      Durações: 40,
    },
    {
      month: "Pir-67",
      Durações: 30,
    },
    {
      month: "Pir-68",
      Durações: 20,
    },
    {
      month: "Pir-69",
      Durações: 90,
    },
    {
      month: "Pir-70",
      Durações: 70,
    },
    {
      month: "Pir-71",
      Durações: 50,
    },
    {
      month: "Pir-72",
      Durações: 100,
    },
  ];

  const dataEntries1 = [{ name: "Durações", color: "#0047BB" }];

  const reqGet = async () => {
    const sondas = await getSonda();
    // setLoading(false);

    const sondasSorted = sondas.data.sort((a: any, b: any) =>
      a.nom_sonda.localeCompare(b.nom_sonda)
    );

    const campos = await getCampo();
    // setLoading(false);

    const camposSorted = campos.data.sort((a: any, b: any) =>
      a.campo.localeCompare(b.campo)
    );

    setCampos(camposSorted);

    setListaSondas(sondasSorted);
  };

  // console.log(listaSondas);
  // console.log(campos);

  useEffect(() => {
    reqGet();
  }, []);

  const componentRef = useRef<HTMLDivElement>(null);

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
            py={{ base: "6", sm: "8" }}
            px={{ base: "6", sm: "10" }}
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
              <Stack spacing="3">
                <Flex
                  flexDirection={useBreakpointValue({
                    base: "column",
                    md: "column",
                  })}
                  gap={4}
                >
                  <Flex justifyContent={"space-between"}>
                    <Flex align={"flex-end"}>
                      <FormControl mt={"-50px"}>
                        <FormLabel>
                          <Text
                            mb={"1px"}
                            fontSize={"24px"}
                            color={"#585858"}
                            fontWeight={"700"}
                            fontFamily={"Mulish"}
                          >
                            Gráficos estatísticos
                          </Text>
                        </FormLabel>
                      </FormControl>
                    </Flex>
                    <Prop />
                  </Flex>
                  <Flex direction={"row"} mb={"10px"} gap={3}>
                    <Flex alignItems={"flex-end"}>
                      <FormControl>
                        <FormLabel
                          mt={"-20px"}
                          fontSize={"12px"}
                          color={"#949494"}
                          fontWeight={"700"}
                          htmlFor="gera-grafico"
                        >
                          GERAR GRÁFICO POR
                        </FormLabel>
                        <Input
                          mt={"-6px"}
                          id="gera-grafico"
                          name="gera-grafico"
                          width={"480px"}
                          height={"56px"}
                          borderRadius={"8px"}
                          placeholder="Histórico de durações"
                          _placeholder={{ color: "#2D2926" }}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          // onChange={handleProjectChange}
                        ></Input>
                      </FormControl>
                    </Flex>

                    <Flex>
                      <FormControl>
                        <FormLabel
                          fontSize={"12px"}
                          color={"#949494"}
                          fontWeight={"700"}
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
                          color={"#2D2926"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                        />
                      </FormControl>
                    </Flex>

                    <Flex>
                      <FormControl>
                        <FormLabel
                          alignItems={"flex-start"}
                          fontSize={"12px"}
                          color={"#949494"}
                          fontWeight={"700"}
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
                          color={"#2D2926"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                        />
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex mt={"-10px"} gap={4} mb={"10px"}>
                    <Flex alignItems={"flex-end"}>
                      <FormControl>
                        <FormLabel
                          fontSize={"12px"}
                          color={"#949494"}
                          fontWeight={"700"}
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
                          color={"#2D2926"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                        >
                          {listaSondas.map((sonda) => (
                            <option>{sonda.nom_sonda}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </Flex>

                    <Flex alignItems={"flex-end"}>
                      <FormControl>
                        <FormLabel
                          fontSize={"12px"}
                          color={"#949494"}
                          fontWeight={"700"}
                          htmlFor="campo"
                        >
                          CAMPO
                        </FormLabel>
                        <Select
                          mt={"-6px"}
                          id="campo"
                          name="campo"
                          width={"208px"}
                          height={"56px"}
                          borderRadius={"8px"}
                          placeholder="Campo"
                          // onChange={handleProjectChange}
                          color={"#2D2926"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                        >
                          {campos.map((d) => (
                            <option>{d.campo}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </Flex>

                    <Flex alignItems={"flex-end"}>
                      <FormControl>
                        <FormLabel htmlFor="base">
                          <Text
                            fontSize={"12px"}
                            color={"#949494"}
                            fontWeight={"700"}
                          >
                            BASE DA ZONA INTERVIDA MAIS PROFUNDA
                          </Text>
                        </FormLabel>
                        <Input
                          placeholder="Base da zona intervida mais profunda"
                          mt={"-6px"}
                          id="base"
                          name="base"
                          width={"328px"}
                          height={"56px"}
                          borderRadius={"8px"}
                          // color={"#2D2926"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          _placeholder={{ color: "#2D2926" }}
                        />
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex flexDir={"row"} gap={4} mt={"-10px"}>
                    {" "}
                    <Flex alignItems={"flex-end"}>
                      <FormControl>
                        <FormLabel
                          fontSize={"12px"}
                          color={"#949494"}
                          fontWeight={"700"}
                          htmlFor="outro"
                        >
                          OUTRO
                        </FormLabel>
                        <Select
                          placeholder="Selecione"
                          // onChange={handleProjectChange}
                          mt={"-6px"}
                          id="outro"
                          name="outro"
                          width={"120px"}
                          height={"56px"}
                          color={"#2D2926"}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          borderRadius={"8px"}
                        >
                          {durationHistory.map((d) => (
                            <option>{d}</option>
                          ))}
                        </Select>
                      </FormControl>
                    </Flex>
                    <Flex>
                      <FormControl className="toBottom">
                        <Button
                          h={"56px"}
                          background={"#0047BB"}
                          border={"2.3px solid"}
                          color={"white"}
                          variant="primary"
                          _hover={{
                            background: "white",
                            color: "#0047BB",
                            transition: "all 0.4s",
                          }}
                          rightIcon={<FiPlus />}
                          fontSize={"18px"}
                          fontWeight={"700"}
                          borderRadius={"8px"}
                        >
                          Gerar
                        </Button>
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex gap={1} direction={"column"}>
                    <Flex mb={"-18px"}>
                      <Text
                        mt={"5px"}
                        fontSize={"24px"}
                        fontWeight={"700"}
                        color={"#2D2926"}
                      >
                        Histórico de durações
                      </Text>
                    </Flex>
                    <Flex mb={"-10px"} direction={"row"} gap={2}>
                      <Text
                        mt={"10px"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color={"#0047BB"}
                      >
                        Mínimo:
                      </Text>
                      <Text
                        mt={"10px"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color={"#2D2926"}
                      >
                        8 HORAS
                      </Text>
                    </Flex>

                    <Flex mb={"-10px"} direction={"row"} gap={2}>
                      <Text
                        mt={"10px"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color={"#0047BB"}
                      >
                        Médio:
                      </Text>
                      <Text
                        mt={"10px"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color={"#2D2926"}
                      >
                        16 HORAS
                      </Text>
                    </Flex>

                    <Flex mb={"-10px"} direction={"row"} gap={2}>
                      <Text
                        mt={"10px"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color={"#0047BB"}
                      >
                        Máxima:
                      </Text>
                      <Text
                        mt={"10px"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color={"#2D2926"}
                      >
                        24 HORAS
                      </Text>
                    </Flex>

                    <Flex mb={"-10px"} direction={"row"} gap={2}>
                      <Text
                        mt={"10px"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color={"#0047BB"}
                      >
                        Tendência de duração:
                      </Text>
                      <Text
                        mt={"10px"}
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color={"#2D2926"}
                      >
                        12 HORAS
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex ml={"-45px"} mt={"15px"}>
                    <StackedBarChart
                      showY={true}
                      sizeW={1050}
                      sizeH={352}
                      data={dataMock1}
                      dataEntries={dataEntries1}
                      barW={40}
                    />
                  </Flex>
                </Flex>
                <Flex ref={componentRef} />
              </Stack>
            </form>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}
