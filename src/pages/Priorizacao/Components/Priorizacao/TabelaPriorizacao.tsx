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
} from "@chakra-ui/react";

import { getPriorizacoes } from "services/get/Priorizacoes";

import ModalPriorizacao from "../ModaisDinamicosPriorizacao/ModalPriorizacao";
// import ModalDeletarPriorizacao from "./DeletarPriorizacao";

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

  const tableData = data.slice(from, to).map((prio) => (
    <Tr key={prio.id}>
      <Td
        width={"50px"}
        isNumeric
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {prio.id}
      </Td>
      <Td
        width={"600px"}
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {prio.nom_ranking}
      </Td>
      <Td
        textAlign={"center"}
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {prio.nome_area}
      </Td>
      <Td
        textAlign={"center"}
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        <ModalPriorizacao nomeRanking={prio.nom_ranking} idRanking={prio.id} />
        {/* <ModalDeletarPriorizacao /> */}
      </Td>
    </Tr>
  ));

  return (
    <div>
      <Flex direction={"column"}>
        <TableContainer mt={4} mb={4}>
          <Table
            variant="unstyled"
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
                >
                  ID
                </Th>
                <Th
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                >
                  Priorizações
                </Th>
                <Th
                  textAlign={"center"}
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                >
                  Área responsável
                </Th>
                <Th
                  textAlign={"center"}
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                >
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody>{tableData}</Tbody>
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