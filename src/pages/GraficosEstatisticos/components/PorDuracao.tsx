import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
// import { Ring } from "@uiball/loaders";

import { getSonda } from "services/get/CadastroModaisInfograficos";
import { getOperacoes } from "services/get/Estatisticas";

import { GraficoPorDuracao } from "../graficos/PorDuracao";

export function GraficoPorDuracaoComponent() {
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [operacao, setOperacao] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  const durationHistory = [
    "Mínimo - 8 horas",
    "Médio - 16 horas",
    "Máxima - 12 horas",
  ];

  const reqGet = async () => {
    const sondas = await getSonda();
    // setLoading(false);

    const sondasSorted = sondas.data.sort((a: any, b: any) =>
      a.nom_sonda.localeCompare(b.nom_sonda)
    );

    const operacao = await getOperacoes();
    // setLoading(false);

    // const operacaoSorted = operacao.data.sort((a: any, b: any) =>
    //   a.campo.localeCompare(b.campo)
    // );

    setOperacao(operacao.data);

    setListaSondas(sondasSorted);
  };

  // console.log(listaSondas);
  // console.log(operacao);

  useEffect(() => {
    reqGet();
  }, []);

  const componentRef = useRef<HTMLDivElement>(null);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [width] = useWindowSize();

  return (
    <>
      {/* {loading && (
        <Flex display={"flex"} align={"center"} justify={"center"} h={"90vh"}>
          <Ring speed={2} lineWeight={5} color="blue" size={64} />
        </Flex>
      )} */}
      {/* <Stack spacing="8"> */}
      {/* <Flex
        w={"auto"}
        align="center"
        justify="center"
        bg={useBreakpointValue({ base: "white", sm: "#EDF2F7" })}
      > */}
      {/* <Box
          py={{ base: "6", sm: "8" }}
          px={{ base: "6", sm: "10" }}
          w={"100%"}
          bg={useBreakpointValue({ base: "transparent", sm: "white" })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{ base: "none", sm: "xl" }}
        > */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // projectsForm.handleSubmit(e);
        }}
      >
        <Flex
          flexDirection={useBreakpointValue({
            base: "column",
            md: "column",
          })}
          gap={4}
        >
          {/* <Flex justifyContent={"space-between"}>
                <Flex align={"flex-end"}>
                  <FormControl mt={"-50px"}>
                    <FormLabel>
                      <Text
                        mb={"1px"}
                        fontSize={"24px"}
                        color={"black"}
                        fontWeight={"700"}
                        fontFamily={"Mulish"}
                      >
                        Gráficos estatísticos
                      </Text>
                    </FormLabel>
                  </FormControl>
                </Flex>
                <Prop />
              </Flex> */}
          {/* <Flex direction={"row"} mb={"10px"} gap={3}>
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
                      mt={"-9px"}
                      id="gera-grafico"
                      name="gera-grafico"
                      width={"480px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      placeholder="Histórico de durações"
                      _placeholder={{ color: "black" }}
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
                      mt={"-9px"}
                      id="de"
                      name="de"
                      width={"146px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      type={"date"}
                      mb={"-10px"}
                      color={"black"}
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
                      mt={"-9px"}
                      id="ate"
                      name="ate"
                      width={"120px"}
                      height={"56px"}
                      borderRadius={"8px"}
                      type={"date"}
                      color={"black"}
                      fontSize={"14px"}
                      fontWeight={"400"}
                    />
                  </FormControl>
                </Flex>
              </Flex> */}
          {/* <Flex flexDir={"column"} wrap={"wrap"} flex={1}> */}
          <Flex mt={"-10px"} gap={4} mb={"10px"} wrap={"wrap"} flex={1}>
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
                  mt={"-9px"}
                  id="sonda"
                  name="sonda"
                  width={"208px"}
                  height={"56px"}
                  borderRadius={"8px"}
                  color={"black"}
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
                  htmlFor="operacao"
                >
                  OPERAÇÃO
                </FormLabel>
                <Select
                  mt={"-9px"}
                  id="operacao"
                  name="operacao"
                  width={"208px"}
                  height={"56px"}
                  borderRadius={"8px"}
                  placeholder="Operação"
                  // onChange={handleProjectChange}
                  color={"#2D2926"}
                  fontSize={"14px"}
                  fontWeight={"400"}
                >
                  {operacao.map((d) => (
                    <option>{d.nom_operacao}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex>

            <Flex alignItems={"flex-end"}>
              <FormControl>
                <FormLabel htmlFor="base">
                  <Text fontSize={"12px"} color={"#949494"} fontWeight={"700"}>
                    BASE DA ZONA INTERVIDA MAIS PROFUNDA
                  </Text>
                </FormLabel>
                {/* <Input
                  placeholder="Base da zona intervida mais profunda"
                  mt={"-9px"}
                  id="base"
                  name="base"
                  width={"328px"}
                  height={"56px"}
                  borderRadius={"8px"}
                  // color={"#2D2926"}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  _placeholder={{ color: "black" }}
                /> */}
                <Input
                  mr={4}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  mt={"-6px"}
                  id="ate"
                  name="ate"
                  width={"125px"}
                  height={"56px"}
                  borderRadius={"8px"}
                  type={"number"}
                />
                <Input
                  fontSize={"14px"}
                  fontWeight={"400"}
                  mt={"-6px"}
                  id="ate"
                  name="ate"
                  width={"125px"}
                  height={"56px"}
                  borderRadius={"8px"}
                  type={"number"}
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
                  mt={"-9px"}
                  id="outro"
                  name="outro"
                  width={"146px"}
                  height={"56px"}
                  _placeholder={{ color: "black" }}
                  fontSize={"14px"}
                  // fontWeight={"400"}
                  borderRadius={"8px"}
                >
                  {durationHistory.map((d) => (
                    <option>{d}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
            {/* </Flex> */}
            {/* <Flex>
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
            </Flex> */}
          </Flex>
          <Flex gap={1} direction={"column"} mt={-2}>
            <Flex mb={"-18px"}>
              <Text
                mt={"5px"}
                fontSize={"24px"}
                fontWeight={"700"}
                color={"black"}
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
                color={"black"}
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
                color={"black"}
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
                color={"black"}
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
                color={"black"}
              >
                12 HORAS
              </Text>
            </Flex>
          </Flex>
          <Box
            overflowX={"scroll"}
            w={innerWidth > 428 ? width * 0.7 : width * 0.85}
            h={460}
            display={"flex"}
            overflowY={"hidden"}
          >
            <Flex>
              <GraficoPorDuracao />
            </Flex>
          </Box>
        </Flex>
        <Flex ref={componentRef} />
      </form>
      {/* </Box> */}
      {/* </Flex> */}
      {/* </Stack> */}
    </>
  );
}
