import { Flex, Text } from "@chakra-ui/react";

function AtividadesPorStatus({ status }: any) {
  const innerWidth = window.innerWidth;

  const statusComCor = status.map((item: any) => {
    switch (item.status) {
      case "Não Iniciado":
        return { ...item, cor: "#FFB400" };
      case "Concluído":
        return { ...item, cor: "#059502" };
      case "Em Andamento":
        return { ...item, cor: "#0047BB" };
      case "Atrasado":
        return { ...item, cor: "#F40606" };
      default:
        return { ...item, cor: "#F4DD06" };
    }
  });

  return (
    <Flex>
      {statusComCor.map((status: any, index: number) => (
        <Flex
          key={index}
          align={"center"}
          justify={"center"}
          direction={"column"}
          w={innerWidth >= 425 ? "40px" : "25px"}
        >
          <Flex
            backgroundColor={status.cor}
            borderRadius={"50%"}
            width={"10px"}
            height={"10px"}
            mb={2}
          />
          <Text textAlign={"center"} fontWeight={600}>
            {status.qtde}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default AtividadesPorStatus;
