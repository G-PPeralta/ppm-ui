import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

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
} from '@chakra-ui/react';
import logoImage from 'assets/logo.png';
import Avvvatars from 'avvvatars-react';

import { useAuth } from 'hooks/useAuth';

interface MobileProps extends FlexProps {
  onOpen: () => void;
  name?: string;
  cargo?: string;
  profileImage?: string;
}

const linkPhoto =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80';

export function MobileNav({
  onOpen,
  name,
  cargo,
  profileImage,
  ...rest
}: MobileProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="1xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Image src={logoImage} alt="Logo Origem Energias" />
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                {linkPhoto ? (
                  <Avatar size={'sm'} src={profileImage || linkPhoto} />
                ) : (
                  <Avvvatars value={'Nome do Perfil'} size={32} />
                )}
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{name || 'Nome Perfil'}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {cargo || 'Cargo'}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem
                onClick={() => {
                  navigate('/profile');
                }}
              >
                Perfil
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/settings');
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
