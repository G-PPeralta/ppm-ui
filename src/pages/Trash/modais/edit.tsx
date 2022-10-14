import { Button, Modal, Text, useDisclosure, Heading } from "@chakra-ui/react";

interface TableProps {
  id: number;
}

export function EditModal(id: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        background="white"
        variant="primary"
        border={"#0047BB solid 1px"}
        color="origem.500"
        _hover={{
          background: "origem.500",
          color: "white",
          transition: "all 0.4s",
        }}
        h={"56px"}
        w={"134px"}
        fontSize={"18px"}
        fontWeight={"700"}
        borderRadius={"8px"}
      >
        <Text>Configuração</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <Heading>Oi</Heading>
      </Modal>
    </>
  );
}
