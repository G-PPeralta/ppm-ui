import { Link } from "react-router-dom";

import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
  Image,
  Text,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import logoImage from "assets/logo.png";

import { NavItem } from "components/NavItem";
import { NavItemMain } from "components/NavItemMain";

import { useAuth } from "hooks/useAuth";

import { LinkItems } from "./items";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export function SidebarContent({ onClose, ...rest }: SidebarProps) {
  const { user } = useAuth();

  function verifyPermissionAdmin(linkName: string) {
    if (linkName === "Alterar Permissões" && user?.role_id !== 1) {
      return true;
    }

    return false;
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "full", lg: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      overflowX="auto"
      over
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to="/">
          <Image src={logoImage} alt="Logo Origem Energias" />
        </Link>
        <CloseButton
          display={{ base: "flex", md: "flex", lg: "none" }}
          onClick={onClose}
        />
      </Flex>
      <Accordion allowMultiple border={"none"}>
        {LinkItems.map((link, index) => (
          <div key={index}>
            {!verifyPermissionAdmin(link.name) && (
              <AccordionItem border={"none"}>
                <AccordionButton>
                  <Flex
                    w={"100%"}
                    align={"center"}
                    justifyContent={"space-between"}
                  >
                    <NavItemMain
                      key={link.name}
                      icon={link.icon}
                      link={link.link || "/"}
                      color={
                        link.children.some(
                          (e) => e.link == window.location.pathname
                        )
                          ? "origem.500"
                          : "black.500"
                      }
                    >
                      <Text
                        color={
                          link.children.some(
                            (e) => e.link == window.location.pathname
                          )
                            ? "origem.500"
                            : "black.500"
                        }
                      >
                        {link.name}
                      </Text>
                    </NavItemMain>
                    <AccordionIcon
                      color={
                        link.children.some(
                          (e) => e.link == window.location.pathname
                        )
                          ? "origem.500"
                          : "black.500"
                      }
                    />
                  </Flex>
                </AccordionButton>
                <AccordionPanel>
                  {link.children.map((link) => (
                    <NavItem
                      key={link.name}
                      icon={link.icon}
                      link={link.link || "/"}
                    >
                      <Text
                        sx={{ fontSize: 12 }}
                        _groupHover={{
                          color: "white",
                        }}
                        _hover={{
                          bg: "origem.400",
                          color: "white",
                        }}
                        color={
                          window.location.pathname === link.link
                            ? "origem.500"
                            : "black.500"
                        }
                      >
                        {link.name}
                      </Text>
                    </NavItem>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            )}
          </div>
        ))}
      </Accordion>
    </Box>
  );
}
