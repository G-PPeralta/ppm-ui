import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

import { Flex, Icon, Link, FlexProps } from '@chakra-ui/react';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  link: string;
}
export function NavItem({ icon, children, link, ...rest }: NavItemProps) {
  const navigate = useNavigate();

  return (
    <Link
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={() => {
        navigate(link);
      }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'origem.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            _activeLink={{
              color: 'white',
            }}
            color={
              window.location.pathname === link ? 'origem.500' : 'black.500'
            }
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}
