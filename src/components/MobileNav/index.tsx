import { Fragment, useEffect, useState } from "react";
import { FiMenu, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import logoImage from "assets/logo.png";
import Avvvatars from "avvvatars-react";

import { useAuth } from "hooks/useAuth";

interface MobileProps extends FlexProps {
  onOpen: () => void;
  name?: string;
  perfil?: string;
  profileImage?: string;
}

export function MobileNav({
  onOpen,
  name,
  perfil,
  profileImage,
  ...rest
}: MobileProps) {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [way, setWay] = useState<string[]>([]);

  useEffect(() => {
    const nav = window.location.href;
    const splited = nav.split("/");
    if (splited[3] === "") splited[3] = "Dashboad";
    if (splited[splited.length - 1] === "") splited.pop();
    const completeObject = splited.map((split, index) => {
      let newItem: string = translations[split as keyof typeof translations];
      if (newItem === undefined) {
        newItem = split;
      }
      return newItem;
    });
    setWay(completeObject);
  }, []);

  const translations = {
    dashboard: "Dashboard",
    projects: "Projetos",
    "projects-registration": "Cadastro de projetos",
    budgets: "Financeiro",
    upload: "Importat Dados",
    fornecedores: "Fornecedores",
    licoesAprendidas: "Lições Aprendidas",
    detalhamento: "Detalhamento de projetos",
    infographics: "Infográficos",
    atividade: "Atividade",
    precedentes: "Visão por Precedentes",
    "visao-por-area": "Visão por Area",
    estatisticas: "Estatísticas",
    cronograma: "Cronograma",
    reports: "Relatórios",
  };

  // const goNavigate = async (index: number) => {
  //   console.log("index", index);
  //   const nav = window.location.href;
  //   const splited = nav.split("/");
  //   let route = "/";
  //   for (let key = 3; key < splited.length; key++) {
  //     if (key <= index) {
  //       route += splited[key] + "/";
  //     }
  //   }
  //   navigate(route);
  // };

  return (
    <Flex
      ml={{ base: 0, md: 0, lg: 0 }}
      px={{ base: 4, md: 4, lg: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{
        base: "space-between",
        md: "space-between",
        lg: "flex-end",
        xl: "flex-end",
      }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "flex", lg: "none" }}
        ml={{ base: 0, md: 4, lg: 0 }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        className={"noprint"}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="1xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Link to="/">
          <Image
            w={useBreakpointValue({
              base: "10rem",
            })}
            src={logoImage}
            alt="Logo Origem Energias"
          />
        </Link>
      </Text>
      <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
        {way.map((item, index) => (
          <Fragment key={index}>
            {index > 2 ? (
              <>
                <Button
                  variant={"link"}
                  // onClick={() => goNavigate(index)}
                  ml={2}
                  mr={2}
                  fontSize={"20px"}
                  fontWeight={"600"}
                >
                  {item}
                </Button>
                {index == way.length - 1 ? undefined : (
                  <FiChevronRight color={"#0047bb"} />
                )}
              </>
            ) : undefined}
          </Fragment>
        ))}
      </Flex>
      <HStack className={"noprint"} spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"} zIndex={999}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {user?.avatar ? (
                  <Avatar size={"sm"} src={profileImage || user?.avatar} />
                ) : (
                  <Avvvatars value={user?.nome || ""} size={32} />
                )}
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{name || "Nome Perfil"}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {perfil || "Cargo"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Perfil
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/settings");
                }}
              >
                Configurações
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  signOut();
                }}
              >
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
