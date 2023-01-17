// CRIADO EM: 10/06/2022
// AUTOR: ALEXANDER BRITO
// DESCRIÇÃO DO ARQUIVO: COMPONENTE SIDEBAR COM MENU E HEADER PARA PADRONIZAR A FORMATAÇÃO DAS PÁGINAS DO SISTEMA, ONDE A PROPRIEDADE CHILDREN RECEBE O CONTEÚDO DA PÁGINA

import { ReactNode } from "react";

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

import { MobileNav } from "components/MobileNav";
import { SidebarContent } from "components/SidebarContent";

import { useAuth } from "hooks/useAuth";

import styles from "./Sidebar.module.scss";

export default function Sidebar({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      className={styles.sidebar}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "none", lg: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        onOpen={onOpen}
        name={user?.nome}
        perfil={user?.nome_role}
        profileImage={user?.avatar}
      />
      <Box ml={{ base: 0, md: 0, lg: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
