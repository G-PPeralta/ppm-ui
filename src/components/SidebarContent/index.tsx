import { Link } from 'react-router-dom';

import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
  Image,
  Text,
} from '@chakra-ui/react';
import logoImage from 'assets/logo.png';

import { NavItem } from 'components/NavItem';

import { useAuth } from 'hooks/useAuth';

import { LinkItems } from './items';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export function SidebarContent({ onClose, ...rest }: SidebarProps) {
  const { user } = useAuth();

  function verifyPermissionAdmin(linkName: string) {
    if (linkName === 'Alterar Permissões' && user?.role_id !== 1) {
      return true;
    }

    return false;
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to="/">
          <Image src={logoImage} alt="Logo Origem Energias" />
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <>
          {!verifyPermissionAdmin(link.name) && (
            <NavItem key={link.name} icon={link.icon} link={link.link || '/'}>
              <Text
                _hover={{
                  bg: 'origem.400',
                  color: 'white',
                }}
                color={
                  window.location.pathname === link.link
                    ? 'origem.500'
                    : 'black.500'
                }
              >
                {link.name}
              </Text>
            </NavItem>
          )}
        </>
      ))}
    </Box>
  );
}
