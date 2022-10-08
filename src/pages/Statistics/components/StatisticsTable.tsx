import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
  IconButton,
  Select,
} from "@chakra-ui/react";
import "../statistics.css";
import { StatisticsTableData } from "interfaces/Services";

interface Props {
  data: StatisticsTableData[];
}

export function StatisticsTable({ data }: Props) {
  const [pagAtual, setPagAtual] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  // const brl = Intl.NumberFormat("pt-BR", {
  //   style: "currency",
  //   currency: "BRL",
  // });

  const innerWidth = window.innerWidth;

  const rowsPerPage = 5;

  const totalRegs = data.length;
  const maxPage = Math.ceil(totalRegs / rowsPerPage);

  const paginate = (pag: number) => {
    setPagAtual(pag);

    const x = (pag - 1) * rowsPerPage;
    const y = (pag - 1) * rowsPerPage + rowsPerPage;
    setFrom(x);
    setTo(y);
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
    <Flex direction={"column"} flex={1} overflowX={"scroll"}>
      <TableContainer mt={4} mb={3} borderRadius={"10px"}>
        <Table variant="striped" colorScheme={"strippedGray"}>
          <Thead>
            <Tr background={"origem.500"}>
              <Th color="white" textAlign={"center"}>
                Item
              </Th>
              <Th color="white" textAlign={"center"}>
                Intervenção
              </Th>
              <Th color="white" textAlign={"center"}>
                Ações
              </Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>
            {data.slice(from, to).map((projeto, key) => (
              <Tr key={key}>
                <Td fontWeight={"semibold"}>
                  <Link
                    to={`/estatisticas/cronograma`}
                    state={{ data: projeto }}
                  >
                    <Text>{projeto.sonda}</Text>
                  </Link>
                </Td>
                <Td fontWeight={"semibold"}>
                  <Link
                    to={`/estatisticas/cronograma`}
                    state={{ data: projeto }}
                  >
                    <Text>{projeto.poco}</Text>
                  </Link>
                </Td>
                <Td fontWeight={"semibold"}>
                  {/* <IconButton
                      aria-label="Plus sign"
                      icon={<AiFillEdit />}
                      background="white"
                      variant="secondary"
                      color="#2D2926"
                      mr={2}
                      isRound={true}
                      size="sm"
                    /> */}
                  {/* <IconButton
                      aria-label="Plus sign"
                      icon={<FaTrash />}
                      background="white"
                      variant="secondary"
                      color="#F94144"
                      mr={2}
                      isRound={true}
                      size="sm"
                    /> */}

                  {/* <EditaValorModal /> */}
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr background={"origem.500"}>
              <Th color="white">Total</Th>
              <Th color="white"></Th>
              <Th color="white"></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <Flex
        alignItems={"center"}
        justifyContent={innerWidth > 428 ? "end" : "center"}
        gap={2}
        flex={1}
        wrap={innerWidth > 428 ? "nowrap" : "wrap"}
      >
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"14px"}>Per page:</Text>
          <Select placeholder="Selecione" h={"32px"} w={"120px"}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Text fontSize={"14px"}>1-10 of 15</Text>
        </Flex>
        <Flex gap={2}>
          <IconButton
            aria-label=""
            icon={<FiChevronsLeft />}
            onClick={() => paginate(1)}
            variant="ghost"
            size="lg"
            h={"24px"}
            _hover={{
              background: "origem.500",
              transition: "all 0.4s",
              color: "white",
              fontWeight: "bold",
            }}
          />
          <IconButton
            aria-label=""
            icon={<FiChevronLeft onClick={back} />}
            variant="ghost"
            size="lg"
            h={"24px"}
            _hover={{
              background: "origem.500",
              transition: "all 0.4s",
              color: "white",
              fontWeight: "bold",
            }}
          />

          <IconButton
            aria-label=""
            icon={<FiChevronRight />}
            onClick={advance}
            variant="ghost"
            size="lg"
            h={"24px"}
            _hover={{
              background: "origem.500",
              transition: "all 0.4s",
              color: "white",
              fontWeight: "bold",
            }}
          />
          <IconButton
            aria-label=""
            icon={<FiChevronsRight />}
            onClick={() => paginate(maxPage)}
            variant="ghost"
            size="lg"
            h={"24px"}
            _hover={{
              background: "origem.500",
              transition: "all 0.4s",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
