// CRIADO EM: 20/06/2022
// AUTOR: ALEXANDER BRITO
// DESCRIÇÃO DO ARQUIVO: COMPONENTE DE CARD DE PERFIL DO USUÁRIO

import { useNavigate } from "react-router-dom";

import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";

export interface CardProfileProps {
  id?: number;
  name?: string;
  avatar?: string;
  email?: string;
  telephone?: string;
  perfil?: string;
}

export default function CardProfile({
  name,
  avatar,
  email,
  telephone,
  perfil,
  id,
}: CardProfileProps) {
  const navigate = useNavigate();

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "250px", md: "100%" }}
        height={{ sm: "356px", md: "15rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} align="center" justifyContent="center">
          {avatar ? (
            <Image
              objectFit="cover"
              boxSize="100%"
              w="100px"
              h="100px"
              borderRadius="100px"
              src={avatar}
            />
          ) : (
            <Avvvatars value={name || ""} size={100} />
          )}
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {name}
          </Heading>

          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
            fontSize={"sm"}
          >
            Email: {email} <br />
            Telefone: {telephone} <br />
            Perfil: {perfil}
          </Text>

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              background="origem.300"
              variant="primary"
              color="white"
              _hover={{
                background: "origem.500",
                transition: "all 0.4s",
              }}
              onClick={() => {
                navigate(`${id}`);
              }}
            >
              Editar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
