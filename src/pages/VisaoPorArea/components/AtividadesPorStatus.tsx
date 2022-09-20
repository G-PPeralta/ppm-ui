import { Flex, Text } from "@chakra-ui/react";

function AtividadesPorStatus() {
  const statusAtividades = [
    {
      status: "Não aplicável",
      color: "#F4DD06",
      value: 3,
    },
    {
      status: "Não iniciado",
      color: "#FFB400",
      value: 10,
    },
    {
      status: "Concluído",
      color: "#059502",
      value: 78,
    },
    {
      status: "Em andamento",
      color: "#0047BB",
      value: 27,
    },
    {
      status: "Atrasado",
      color: "#F40606",
      value: 1,
    },
  ];

  return (
    <Flex>
      {statusAtividades.map((status, index) => (
        <Flex
          key={index}
          align={"center"}
          justify={"center"}
          direction={"column"}
          w={"40px"}
        >
          <Flex
            backgroundColor={status.color}
            borderRadius={"50%"}
            width={"10px"}
            height={"10px"}
            mb={2}
          />
          <Text textAlign={"center"} fontWeight={600}>
            {status.value}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default AtividadesPorStatus;
