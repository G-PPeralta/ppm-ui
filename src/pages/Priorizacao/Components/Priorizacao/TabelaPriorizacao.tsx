import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

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
  Select,
} from "@chakra-ui/react";

import { getPriorizacoes } from "services/get/Priorizacoes";

import ModalPriorizacao from "../ModaisDinamicosPriorizacao/ModalPriorizacao";
import ModalDeletarPriorizacao from "./DeletarPriorizacao";

export function TabelaPriorizacao() {
  const [pagAtual, setPagAtual] = useState(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const rowsPerPage = 5;
  const [data, setData] = useState<any[]>([]);

  // const [loading, setLoading] = useState(false);

  const getData = async () => {
    const priorizacao = await getPriorizacoes();
    setData(priorizacao.data);
  };

  // console.log("data", data);

  useEffect(() => {
    getData();
  }, []);

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

  const tableData = data
    .sort((a, b) => a.id - b.id)
    .slice(from, to)
    .map((prio) => (
      <Tr key={prio.id}>
        <Td
          width={"48px"}
          height={"56px"}
          isNumeric
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          fontSize={"13px"}
          fontWeight={"600"}
          color={"#2D2926"}
        >
          {prio.id}
        </Td>
        <Td
          width={"600px"}
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          fontSize={"13px"}
          fontWeight={"600"}
          color={"#2D2926"}
        >
          {prio.nom_ranking}
        </Td>
        {/* <Td
        textAlign={"center"}
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {prio.nome_area}
      </Td> */}
        <Td
          textAlign={"center"}
          style={{
            borderBottom: "0.5px solid #A7A7A7",
            borderRight: "0.5px solid #A7A7A7",
          }}
          width={"104px"}
          height={"56px"}
        >
          <ModalPriorizacao
            nomeRanking={prio.nom_ranking}
            idRanking={prio.id}
          />
          <ModalDeletarPriorizacao />
        </Td>
      </Tr>
    ));

  return (
    <div>
      <Flex direction={"column"}>
        <TableContainer mt={4} mb={4}>
          <Table
            variant="striped"
            style={{
              borderBottom: "0.5px solid #A7A7A7",
              border: "0.5px solid #A7A7A7",
            }}
          >
            <Thead>
              <Tr background="origem.500" color="white">
                <Th
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                  width={"48px"}
                  height={"36px"}
                  color="white"
                >
                  ID
                </Th>
                <Th
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                  width={"944px"}
                  height={"36px"}
                  color="white"
                >
                  Priorizações
                </Th>
                {/* <Th
                  textAlign={"center"}
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                >
                  Área responsável
                </Th> */}
                <Th
                  textAlign={"center"}
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                  width={"104px"}
                  height={"36px"}
                  color="white"
                >
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody>{tableData}</Tbody>
          </Table>
        </TableContainer>

        <Flex alignItems={"center"} justifyContent={"end"} gap={2} flex={1}>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"14px"}>Per page:</Text>
            <Select
              // placeholder="Selecione"
              h={"32px"}
              w={"110px"}
              fontSize={"13px"}
            >
              <option value="option1">10</option>
              <option value="option2">20</option>
              <option value="option3">30</option>
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
    </div>
  );
}
