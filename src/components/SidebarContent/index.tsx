import { useNavigate } from 'react-router-dom';

import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
  Image,
} from '@chakra-ui/react';
import logoImage from 'assets/logo.png';

import { NavItem } from 'components/NavItem';

import { LinkItems } from './items';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export function SidebarContent({ onClose, ...rest }: SidebarProps) {
  const navigate = useNavigate();
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
        <Image src={logoImage} alt="Logo Origem Energias" />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            navigate(link.link || '/');
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
