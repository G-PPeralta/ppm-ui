import { useEffect, useState } from "react";
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiPrinter,
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
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { Projetos } from "interfaces/Projetos";

import { formatDate } from "utils/formatDate";
import { formatReal } from "utils/formatReal";

import ModalCadastrarPriorizacao from "./ModalCadastrarPriorizacao";
import ModalDeletarProjeto from "./ModalDeletarProjeto";

import "../projects.css";

interface TableProps {
  data: Projetos[];
}

export function TabelaProjetos(props: TableProps) {
  const { data } = props;
  const [pagAtual, setPagAtual] = useState(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [perPage, setPerPage] = useState<number>(5);

  const totalOrcado = data.reduce(
    (accumulator, object) => accumulator + +object.vlr_orcado,
    0
  );

  const totalRealizado = data.reduce(
    (accumulator, object) => accumulator + +object.vlr_cr,
    0
  );
  const totalRegs = data.length;
  const maxPage = Math.ceil(totalRegs / perPage);

  const paginate = (pag: number) => {
    setPagAtual(pag);

    const x = (pag - 1) * perPage;
    const y = (pag - 1) * perPage + perPage;
    setFrom(x);
    setTo(y);
  };

  const changePerPage = (value: number) => {
    setPerPage(value);
    const x = perPage;
    const y = perPage + perPage;
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

  useEffect(() => {
    paginate(pagAtual);
  }, [from, to]);

  const tableData = data.slice(from, to).map((projeto, key) => (
    <Tr key={key}>
      <Td
        isNumeric
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {projeto.id}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        <Link to={`/detalhamento/${projeto.id}`}>
          {projeto.nome_projeto.length > 25 ? (
            <Tooltip label={projeto.nome_projeto} aria-label="Nome do projeto">
              <Text color={"#0047BB"}>
                {projeto.nome_projeto.substring(0, 25) + "..."}
              </Text>
            </Tooltip>
          ) : (
            <Text color={"#0047BB"}>{projeto.nome_projeto}</Text>
          )}
        </Link>
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {projeto.vlr_cpi_corrigido >= 1 ? (
          <Flex alignItems={"center"}>
            <BsCheckCircleFill color="#00B53D" fontSize={25} />{" "}
            <Text marginLeft="8px">
              {" "}
              {` CPI = ${projeto.vlr_cpi_corrigido}`}
            </Text>
          </Flex>
        ) : (
          <Flex alignItems={"center"}>
            <BsFillXCircleFill color="red" fontSize={25} />{" "}
            <Text marginLeft="8px">{` CPI = ${
              projeto.vlr_cpi_corrigido ?? 0
            }`}</Text>
          </Flex>
        )}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {projeto.vlr_spi_corrigido >= 1 ? (
          <Flex alignItems={"center"}>
            <BsCheckCircleFill color="#00B53D" fontSize={25} />{" "}
            <Text marginLeft="8px">{` SPI = ${projeto.vlr_spi_corrigido}`}</Text>
          </Flex>
        ) : (
          <Flex alignItems={"center"}>
            <BsFillXCircleFill color="red" fontSize={25} />{" "}
            <Text marginLeft="8px">{` SPI = ${
              projeto.vlr_spi_corrigido ?? 0
            }`}</Text>
          </Flex>
        )}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {formatReal(+projeto.vlr_orcado)}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {formatReal(+projeto.vlr_cr)}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >{`${
        projeto.vlr_orcado && projeto.vlr_cr
          ? (100 - (+projeto.vlr_cr / +projeto.vlr_orcado) * 100).toFixed(2)
          : 0
      } %`}</Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {projeto.complexidade}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {projeto.prioridade}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {projeto.polo}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {projeto.coordenador}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {projeto.responsavel}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {formatDate(new Date(projeto.data_inicio))}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {formatDate(new Date(projeto.data_fim))}
      </Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >{`${
        projeto.vlr_cr && projeto.vlr_orcado
          ? ((projeto.vlr_cr / projeto.vlr_orcado) * 100).toFixed(2)
          : 0
      } %`}</Td>
      <Td
        style={{
          borderRight: "0.5px solid #A7A7A7",
        }}
      >
        {/* <ExpansibleText
          text={projeto.descricao + " " + projeto.justificativa}
        /> */}
        {(projeto.descricao + " " + projeto.justificativa).length > 25 ? (
          <Tooltip
            label={projeto.nome_projeto + " " + projeto.justificativa}
            aria-label="Nome do projeto"
          >
            <Text>
              {(projeto.descricao + " " + projeto.justificativa).substring(
                0,
                50
              ) + "..."}
            </Text>
          </Tooltip>
        ) : (
          <Text>{projeto.descricao + " " + projeto.justificativa}</Text>
        )}
      </Td>
      <Td>
        <ModalCadastrarPriorizacao projeto={projeto.id} />
        <ModalDeletarProjeto projeto={projeto.id} />
      </Td>
    </Tr>
  ));

  return (
    <Flex direction={"column"} w={"100%"}>
      <TableContainer mt={4} mb={3} borderRadius={"10px"} overflowX={"scroll"}>
        <Table variant="striped" colorScheme="strippedGray">
          <Thead>
            <Tr background={"origem.500"}>
              <Th colSpan={16} color="white">
                Projetos
              </Th>
              <Th
                borderTopRightRadius={"10px"}
                colSpan={1}
                textAlign={"center"}
              >
                <Button
                  backgroundColor="#0239c3"
                  rightIcon={<FiPrinter />}
                  variant="solid"
                  color="white"
                >
                  Imprimir
                </Button>
              </Th>
            </Tr>
            <Tr background="origem.500">
              <Th
                style={{
                  color: "white",
                }}
              >
                ID
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Projeto
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                CPI
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                SPI
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Orçamento
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Realizado
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                TCPI
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Prioridade
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Complexidade
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Polo
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Coordenador
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Responsável
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Data Início
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Data de Término
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                %
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Descrições e Justificativas
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                Ações
              </Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>{tableData}</Tbody>
          <Tfoot>
            <Tr background="origem.500" color="white">
              <Th
                style={{
                  color: "white",
                }}
              >
                Total
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                {data ? data.length : 0} Projetos
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                {formatReal(totalOrcado)}
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              >
                {formatReal(totalRealizado)}
              </Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                style={{
                  color: "white",
                }}
              ></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Flex justifyContent="end">
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text>Per page</Text>
          <Select
            width={100}
            marginLeft="10px"
            marginRight="15px"
            onChange={(e) => changePerPage(+e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Select>

          <Text>
            {pagAtual} - {perPage} of {data.length}{" "}
          </Text>

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
    </Flex>
  );
}
