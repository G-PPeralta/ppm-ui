import { Flex, Text } from "@chakra-ui/react";

interface TotalAtividadesProps {
  totalAtividades: number;
}

function TotalAtividades({ totalAtividades }: TotalAtividadesProps) {
  return (
    <Flex direction={"column"} align={"center"} justify={"center"}>
      <Text fontSize="md" fontWeight={500}>
        Atividades
      </Text>
      <Flex
        border={"3px"}
        borderStyle={"inherit"}
        borderColor={"origem.500"}
        borderRadius={"100%"}
        w={"56px"}
        h={"56px"}
        mt={2}
        p={3}
        align={"center"}
        justify={"center"}
      >
        <Text fontSize="md" fontWeight={500}>
          {totalAtividades}
        </Text>
      </Flex>
    </Flex>
  );
}

export default TotalAtividades;
