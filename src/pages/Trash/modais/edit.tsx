import { MdModeEdit } from "react-icons/md";

import { Modal, useDisclosure, Heading, IconButton } from "@chakra-ui/react";

interface TableProps {
  id: number;
}

export function EditModal(id: TableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        color={"origem.500"}
        backgroundColor={"transparent"}
        border={"none"}
        textAlign={"center"}
        _hover={{
          backgroundColor: "origem.500",
          color: "white",
        }}
        icon={<MdModeEdit size={"24px"} />}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <Heading>Oi</Heading>
      </Modal>
    </>
  );
}
