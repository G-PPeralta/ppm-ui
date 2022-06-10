import { Container } from '@chakra-ui/react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      {children}
    </Container>
  );
}
