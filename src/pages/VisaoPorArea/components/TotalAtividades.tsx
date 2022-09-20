import { Flex, Text } from "@chakra-ui/react";

function TotalAtividades() {
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
        mt={2}
        p={3}
      >
        <Text fontSize="md" fontWeight={500}>
          347
        </Text>
      </Flex>
    </Flex>
  );
}

export default TotalAtividades;
