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

import { getOpcoesRankings } from "services/get/Priorizacoes";

import ModalDeletarOpcaoPriorizacao from "./DeletarOpcaoPriorizacao";
import ModalEditarOpcaoPriorizacao from "./EditarOpcaoPriorizacao";

interface TableProps {
  idRanking: any;
  nomeRanking: any;
}

export function TabelaOpcoesPriorizacao(rankingInfos: TableProps) {
  const [pagAtual, setPagAtual] = useState(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const rowsPerPage = 5;
  const [data, setData] = useState<any[]>([]);

  const rankingId = rankingInfos.idRanking;
  const rankingNome = rankingInfos.nomeRanking;

  const getData = async () => {
    const priorizacao = await getOpcoesRankings(rankingId);
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

  const sortData = data.sort((a: any, b: any) => a.id - b.id);
  // console.log("sortData", sortData);

  const tableData = sortData.slice(from, to).map((op) => (
    <Tr key={op.id} height={"56px"}>
      <Td
        w={"48px"}
        h={"56px"}
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
        fontSize={"13px"}
        fontWeight={"600"}
        color={"#2D2926"}
      >
        {op.id}
      </Td>
      <Td
        h={"56px"}
        width={"486px"}
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
        fontSize={"13px"}
        fontWeight={"600"}
        color={"#2D2926"}
      >
        {op.nom_opcao}
      </Td>
      <Td
        h={"56px"}
        width={"104px"}
        textAlign={"center"}
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
        fontSize={"13px"}
        fontWeight={"600"}
        color={"#2D2926"}
      >
        {op.num_nota}
      </Td>
      <Td
        textAlign={"center"}
        style={{
          borderBottom: "0.5px solid #A7A7A7",
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        <ModalEditarOpcaoPriorizacao
          opcaoId={op.id}
          opcaoName={op.nom_opcao}
          idRanking={rankingInfos}
          nameRanking={rankingNome}
          initialGrade={op.num_nota}
        />
        <ModalDeletarOpcaoPriorizacao />
      </Td>
    </Tr>
  ));

  return (
    <div>
      <Flex direction={"column"}>
        <TableContainer mt={6} mb={1}>
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
                  width={"486px"}
                  height={"36px"}
                  color="white"
                >
                  {rankingNome}
                </Th>
                <Th
                  textAlign={"center"}
                  style={{
                    borderBottom: "0.5px solid #A7A7A7",
                    borderRight: "0.5px solid #A7A7A7",
                  }}
                  width={"166px"}
                  height={"36px"}
                  color="white"
                >
                  Nota
                </Th>
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
