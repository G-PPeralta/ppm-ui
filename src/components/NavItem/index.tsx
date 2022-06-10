import { ReactNode } from 'react';
import { IconType } from 'react-icons';

import { Flex, Icon, Link, FlexProps } from '@chakra-ui/react';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
}
export function NavItem({ icon, children, ...rest }: NavItemProps) {
  return (
    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}
