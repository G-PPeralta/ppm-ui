//  CRIADO EM: 6/2022
//  AUTOR: Bruno Fracaro.
//  DESCRIÇÃO DO ARQUIVO: tle de rota invalida 404

import { useNavigate } from "react-router-dom";

import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, origem.400, origem.600)"
          backgroundClip="text"
        >
          Em Desenvolvimento
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Esta página está em desenvolvimento
        </Text>

        <Button
          colorScheme="origem"
          bgGradient="linear(to-r, origem.400, origem.500, origem.600)"
          color="white"
          variant="solid"
          onClick={() => {
            navigate("/");
          }}
        >
          Voltar para o início
        </Button>
      </Box>
    </Flex>
  );
}
