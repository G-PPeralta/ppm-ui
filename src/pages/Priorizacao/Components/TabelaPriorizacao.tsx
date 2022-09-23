import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";

import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Text,
} from "@chakra-ui/react";

// import ModalCadastrarPriorizacao from "./ModalCadastrarPriorizacao";
import ModalDeletarPriorizacao from "./ModalDeletarPriorizacao";

// import "../projects.css";

const data = {
  beneficios: ["x", "s", "x", "s", "d", "d"],
};

export function TabelaPriorizacao() {
  const [pagAtual, setPagAtual] = useState(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const rowsPerPage = 5;

  const totalRegs = data.beneficios.length;
  const maxPage = Math.ceil(totalRegs / rowsPerPage);

  const paginate = (pag: number) => {
    setPagAtual(pag);

    const x = (pag - 1) * rowsPerPage;
    const y = (pag - 1) * rowsPerPage + rowsPerPage;
    setFrom(x);
    setTo(y);
    console.log(from, to);
  };

  const advance = () => {
    if (pagAtual == maxPage) {
      return;
    }

    const _pag = pagAtual + 1;

    paginate(_pag);
  };

  const back = () => {
    if (pagAtual == 1) {
      return;
    }
    const _pag = pagAtual - 1;
    paginate(_pag);
  };

  return (
    <div className="table-fix">
      <Flex flexDirection={"column"}>
        <TableContainer mt={4} mb={3} ml={1}>
          <Table variant="unstyled">
            <Thead>
              <Tr background="origem.500" color="white">
                <Th>ID</Th>
                <Th width={"900px"}>Priorizações</Th>
                <Th textAlign={"center"} width={"100px"}>
                  Atividades
                </Th>
                <Th textAlign={"center"}>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1</Td>
                <Td>Benefício</Td>
                <Td textAlign={"center"}>06</Td>
                <Td>
                  <IconButton
                    variant="outline"
                    aria-label="open menu"
                    color={"origem.500"}
                    backgroundColor={"white"}
                    border={"none"}
                    icon={<MdModeEdit />}
                  />
                  <ModalDeletarPriorizacao />
                </Td>
              </Tr>
              <Tr>
                <Td>2</Td>
                <Td>Regulatório</Td>
                <Td textAlign={"center"}>03</Td>
                <Td>
                  <IconButton
                    variant="outline"
                    aria-label="open menu"
                    color={"origem.500"}
                    backgroundColor={"white"}
                    border={"none"}
                    icon={<MdModeEdit />}
                  />
                  <ModalDeletarPriorizacao />
                </Td>
              </Tr>
              <Tr>
                <Td textAlign={"center"}>3</Td>
                <Td>Operação</Td>
                <Td textAlign={"center"}>04</Td>
                <Td>
                  <IconButton
                    variant="outline"
                    aria-label="open menu"
                    color={"origem.500"}
                    backgroundColor={"white"}
                    border={"none"}
                    icon={<MdModeEdit />}
                  />
                  <ModalDeletarPriorizacao />
                </Td>
              </Tr>
              <Tr>
                <Td textAlign={"center"}>4</Td>
                <Td>Prioridade</Td>
                <Td textAlign={"center"}>03</Td>
                <Td>
                  <IconButton
                    variant="outline"
                    aria-label="open menu"
                    color={"origem.500"}
                    backgroundColor={"white"}
                    border={"none"}
                    icon={<MdModeEdit />}
                  />
                  <ModalDeletarPriorizacao />
                </Td>
              </Tr>
              <Tr>
                <Td textAlign={"center"}>5</Td>
                <Td>Complexidade</Td>
                <Td textAlign={"center"}>03</Td>
                <Td>
                  <IconButton
                    variant="outline"
                    aria-label="open menu"
                    color={"origem.500"}
                    backgroundColor={"white"}
                    border={"none"}
                    icon={<MdModeEdit />}
                  />
                  <ModalDeletarPriorizacao />
                </Td>
              </Tr>
              <Tr>
                <Td>6</Td>
                <Td>Estratégia para Negócio</Td>
                <Td textAlign={"center"}>03</Td>
                <Td>
                  <IconButton
                    variant="outline"
                    aria-label="open menu"
                    color={"origem.500"}
                    backgroundColor={"white"}
                    border={"none"}
                    icon={<MdModeEdit />}
                  />
                  <ModalDeletarPriorizacao />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Flex justifyContent={"center"}>
          <Flex
            width={"300px"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <IconButton
              aria-label=""
              icon={<FiChevronsLeft />}
              onClick={() => paginate(1)}
            />
            <IconButton aria-label="" icon={<FiChevronLeft onClick={back} />} />

            <Text>Página atual: {pagAtual}</Text>

            <IconButton
              aria-label=""
              icon={<FiChevronRight />}
              onClick={advance}
            />
            <IconButton
              aria-label=""
              icon={<FiChevronsRight />}
              onClick={() => paginate(maxPage)}
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
