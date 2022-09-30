import { FaWallet } from "react-icons/fa";

import { Flex, Heading, Text } from "@chakra-ui/react";

export function ProjectSummary() {
  return (
    <Flex
      w={"100%"}
      boxShadow={"md"}
      borderRadius={"2xl"}
      border={"1px"}
      borderColor={"gray.200"}
      marginTop={5}
      padding={4}
      flexDirection={"row"}
      dir={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex direction={"column"} w={"30%"}>
        <Heading as="h3" size="lg" fontWeight={"normal"} color={"gray.800"}>
          Nome do Projeto
        </Heading>
        <Flex direction={"row"} gap={1}>
          <Text fontWeight={"semibold"} color={"gray.400"}>
            Responsável:
          </Text>
          <Text fontWeight={"semibold"} color={"origem.300"}>
            Nome Aqui
          </Text>
        </Flex>
      </Flex>
      <Flex direction={"row"} w={"20%"}>
        <Flex direction={"column"} w={"50%"} alignItems={"center"}>
          <Text fontWeight={"semibold"} color={"gray.400"}>
            Início Reaç
          </Text>
          <Text> 25/07/2022 </Text>
        </Flex>
        <Heading color={"origem.300"} fontWeight={"normal"}>
          |
        </Heading>
        <Flex direction={"column"} w={"50%"} alignItems={"center"}>
          <Text fontWeight={"semibold"} color={"gray.400"}>
            Fim Planejado
          </Text>
          <Text> 25/07/2022 </Text>
        </Flex>
      </Flex>
      <Flex direction={"row"} w={"30%"}>
        <Flex direction={"column"} w={"50%"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={1} textColor={"origem.300"}>
            <FaWallet size={"25px"} />
            <Heading as="h3" size="lg" fontWeight={"medium"} color={"gray.800"}>
              Orçamento
            </Heading>
          </Flex>
          <Heading size="md" color={"gray.600"}>
            R$ 100.000.000{" "}
          </Heading>
        </Flex>
        <Flex direction={"column"} w={"50%"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={1} textColor={"origem.200"}>
            <FaWallet size={"25px"} />
            <Heading as="h3" size="lg" fontWeight={"medium"} color={"gray.800"}>
              Realizado
            </Heading>
          </Flex>
          <Heading size="md" color={"gray.600"}>
            R$ 50.000.000{" "}
          </Heading>
        </Flex>
      </Flex>
      <Flex
        backgroundColor={"origem.300"}
        alignItems={"center"}
        marginY={1}
        borderRadius={"sm"}
      >
        <Heading
          as="h3"
          size="lg"
          fontWeight={"medium"}
          color={"white"}
          padding={2}
        >
          50%
        </Heading>
      </Flex>
    </Flex>
  );
}
