import { Flex, Text } from "@chakra-ui/react";

interface AtividadesPorStatusProps {
  status: { status: string; qtde: number }[];
}

interface StatusComCor {
  status: string;
  qtde: number;
  cor?: string;
}

function AtividadesPorStatus({ status }: AtividadesPorStatusProps) {
  const innerWidth = window.innerWidth;

  const statusComCor: StatusComCor[] = status.map((item: StatusComCor) => {
    switch (item.status) {
      case "Não Iniciado":
        return { ...item, cor: "#585858" };
      case "Em Andamento":
        return { ...item, cor: "#0047BB" };
      case "Concluído":
        return { ...item, cor: "#027200" };
      case "Atrasado":
        return { ...item, cor: "#BD0000" };
      default:
        return { ...item, cor: "#C2561A" };
    }
  });

  return (
    <Flex>
      {statusComCor.map((status: StatusComCor, index: number) => (
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
