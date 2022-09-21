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
  Tooltip,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { Project } from "models/Project.model";

import ModalCadastrarPriorizacao from "./ModalCadastrarPriorizaçao";
import ModalDeletarProjeto from "./ModalDeletarProjeto";

import "../projects.css";

interface TableProps {
  data: Project[];
}

export function TabelaProjetos(props: TableProps) {
  const { data } = props;
  const [pagAtual, setPagAtual] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const brl = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // function handlehanking(fornecedor: Fornecedor) {
  //   setEditFornecedor(fornecedor);
  //   onOpen();
  // }

  const total = data.reduce(
    (accumulator, object) => accumulator + +object.valorTotalPrevisto,
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
      {/* <Td isNumeric>{projeto.id}</Td> */}
      <Td>
        <Link to={`/detalhamento/${projeto.id}`}>
          <Text>
            {projeto.nome.length > 28 ? (
              <Tooltip label={projeto.nome} aria-label="">
                {projeto.nome.substring(0, 25) + "..."}
              </Tooltip>
            ) : (
              projeto.nome
            )}
          </Text>
        </Link>
      </Td>
      <Td>
        {projeto.valorTotalPrevisto && brl.format(projeto.valorTotalPrevisto)}
      </Td>
      <Td>{projeto.prioridade}</Td>
      <Td>{projeto.complexidade}</Td>
      <Td>{projeto.responsavel}</Td>
      <Td></Td>
      <Td>
        <ModalCadastrarPriorizacao />
        <ModalDeletarProjeto />
      </Td>
    </Tr>
  ));

  return (
    <div className="table-fix">
      <TableContainer mt={4} mb={3} ml={1}>
        <Table variant="unstyled">
          <Thead>
            <Tr background="origem.500" color="white">
              <Th width="50">Nome</Th>
              <Th>Total Previsto</Th>
              <Th>Prioridade</Th>
              <Th>Complexidade</Th>
              <Th>Responsavel</Th>
              <Th>Coordenador</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
          <Tfoot>
            <Tr background="origem.200" color="white">
              <Th>Total</Th>
              <Th>{brl.format(total)}</Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Tfoot>
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
    </div>
  );
}
