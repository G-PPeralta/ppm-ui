import { useState } from "react";
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
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
  Tooltip,
  Flex,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { Projetos } from "interfaces/Projetos";

import ModalCadastrarPriorizacao from "./ModalCadastrarPriorizacao";
import ModalDeletarProjeto from "./ModalDeletarProjeto";

import "../projects.css";

interface TableProps {
  data: Projetos[];
}

export function TabelaProjetos(props: TableProps) {
  const { data } = props;
  const [pagAtual, setPagAtual] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const brl = Intl.NumberFormat("pt-BR");

  // console.log("dados tabela-projeto", data);

  const totalOrcado = data.reduce(
    (accumulator, object) => accumulator + +object.vlr_orcado,
    0
  );

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

  const tableData = data.slice(from, to).map((projeto, key) => (
    <Tr key={key}>
      <Td isNumeric>{projeto.id_projeto}</Td>
      <Td>
        <Link to={`/detalhamento/${projeto.id_projeto}`}>
          <Text color={"#0047BB"}>
            {projeto.nome_projeto.length > 28 ? (
              <Tooltip label={projeto.nome_projeto} aria-label="">
                {projeto.nome_projeto.substring(0, 25) + "..."}
              </Tooltip>
            ) : (
              projeto.nome_projeto
            )}
          </Text>
        </Link>
      </Td>
      <Td>
        {+projeto.vlr_cpi >= 1 ? (
          <BsCheckCircleFill color="#00B53D" fontSize={25} />
        ) : (
          <BsFillXCircleFill color="red" fontSize={25} />
        )}
      </Td>
      <Td>
        {+projeto.vlr_spi >= 1 ? (
          <BsCheckCircleFill color="#00B53D" fontSize={25} />
        ) : (
          <BsFillXCircleFill color="red" fontSize={25} />
        )}
      </Td>
      <Td>{projeto.vlr_orcado && brl.format(projeto.vlr_orcado)}</Td>
      <Td>{projeto.vlr_realizado && brl.format(projeto.vlr_realizado)}</Td>
      <Td>{projeto.tcpi}</Td>
      <Td>{projeto.prioridade}</Td>
      <Td>{projeto.complexidade}</Td>
      <Td>{projeto.polo}</Td>
      <Td>{projeto.coordenador}</Td>
      <Td>{projeto.responsavel}</Td>
      <Td>{projeto.data_inicio}</Td>
      <Td>{projeto.data_fim}</Td>
      <Td>{projeto.pct}</Td>
      <Td>
        <ModalCadastrarPriorizacao projeto={projeto.id_projeto} />
        <ModalDeletarProjeto projeto={projeto.id_projeto} />
      </Td>
    </Tr>
  ));

  return (
    <div className="table-fix">
      <TableContainer mt={4} mb={3} ml={1}>
        <Table variant="unstyled">
          <Thead>
            <Tr background="origem.500" color="white">
              <Th>ID</Th>
              <Th>Projeto</Th>
              <Th>CPI</Th>
              <Th>SPI</Th>
              <Th>Orçamento</Th>
              <Th>Realizado</Th>
              <Th>TCPI</Th>
              <Th>Prioridade</Th>
              <Th>Complexidade</Th>
              <Th>Polo</Th>
              <Th>Coordenador</Th>
              <Th>Responsável</Th>
              <Th>Data Início</Th>
              <Th>Data de Término</Th>
              <Th>%</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
          <Tfoot>
            <Tr background="origem.200" color="white">
              <Th>Total</Th>
              <Th>{data ? data.length : 0} Projetos</Th>
              <Th></Th>
              <Th></Th>
              <Th>{brl.format(totalOrcado)}</Th>
              <Th>{brl.format(totalOrcado)}</Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Flex justifyContent={"center"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text>Per page</Text>
          <Select width={100} marginLeft="10px" marginRight="15px">
            <option value="10">10</option>
            <option value="15">15</option>
          </Select>

          <Text>1 - 1 of {pagAtual}</Text>

          <IconButton
            bgColor="#FFFF"
            marginLeft="10px"
            marginRight="5px"
            aria-label=""
            icon={<FiChevronsLeft />}
            onClick={() => paginate(1)}
          />

          <IconButton
            bgColor="#FFFF"
            marginLeft="5px"
            marginRight="5px"
            aria-label=""
            icon={<FiChevronLeft onClick={back} />}
          />

          {/* <Text>Página atual: {pagAtual}</Text> */}

          <IconButton
            bgColor="#FFFF"
            marginLeft="5px"
            marginRight="5px"
            aria-label=""
            icon={<FiChevronRight />}
            onClick={advance}
          />
          <IconButton
            bgColor="#FFFF"
            marginLeft="5px"
            marginRight="5px"
            aria-label=""
            icon={<FiChevronsRight />}
            onClick={() => paginate(maxPage)}
          />
        </Flex>
      </Flex>
    </div>
  );
}
