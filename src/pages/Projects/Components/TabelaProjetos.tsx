import { useState } from "react";
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
// import { FiPrinter } from "react-icons/fi";
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
  Tooltip,
  // Button,
} from "@chakra-ui/react";
import { Projetos } from "interfaces/Projetos";

import PaginacaoTabela from "components/PaginacaoTabela";

import { formatDate } from "utils/formatDate";
import { formatReal } from "utils/formatReal";

import ModalCadastrarPriorizacao from "./ModalCadastrarPriorizacao";
import ModalDeletarProjeto from "./ModalDeletarProjeto";

import "../projects.css";

interface TableProps {
  data: Projetos[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

export function TabelaProjetos({ data, refresh, setRefresh }: TableProps) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const totalOrcado = data.reduce(
    (accumulator, object) => accumulator + +object.vlr_orcado,
    0
  );

  const totalRealizado = data.reduce(
    (accumulator, object) => accumulator + +object.vlr_cr,
    0
  );

  // console.log({ data });

  const tableData = data.slice(from, to).map((projeto, key) => (
    <Tr key={key}>
      <Td
        // isNumeric
        fontWeight={"semibold"}
        textAlign={"center"}
        color={"#2D2926"}
      >
        {projeto.id_projeto_real}
      </Td>
      <Td>
        <Link to={`/detalhamento/${projeto.id_projeto_real}`}>
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
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
        {projeto.vlr_cpi == 1 ? (
          <Flex alignItems={"center"}>
            <BsCheckCircleFill color="#00B53D" fontSize={25} />{" "}
            <Text marginLeft="8px"> {` CPI = ${projeto.vlr_cpi}`}</Text>
          </Flex>
        ) : (
          <Flex alignItems={"center"}>
            <BsFillXCircleFill color="red" fontSize={25} />{" "}
            <Text marginLeft="8px">{` CPI = ${projeto.vlr_cpi ?? 0}`}</Text>
          </Flex>
        )}
      </Td>
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
        {projeto.vlr_spi == 1 ? (
          <Flex alignItems={"center"}>
            <BsCheckCircleFill color="#00B53D" fontSize={25} />{" "}
            <Text marginLeft="8px">{` SPI = ${projeto.vlr_spi}`}</Text>
          </Flex>
        ) : (
          <Flex alignItems={"center"}>
            <BsFillXCircleFill color="red" fontSize={25} />{" "}
            <Text marginLeft="8px">{` SPI = ${projeto.vlr_spi ?? 0}`}</Text>
          </Flex>
        )}
      </Td>
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
        {formatReal(+projeto.vlr_orcado)}
      </Td>
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
        {formatReal(+projeto.vlr_cr)}
      </Td>
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>{`${
        projeto.vlr_orcado && projeto.vlr_cr
          ? (100 - (+projeto.vlr_cr / +projeto.vlr_orcado) * 100).toFixed(2)
          : 0
      } %`}</Td>
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
        {projeto.complexidade}
      </Td>
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
        {projeto.prioridade}
      </Td>
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
        {projeto.polo}
      </Td>
      <Td textAlign={"center"} fontWeight={"semibold"}>
        {projeto.coordenador}
      </Td>
      <Td textAlign={"center"} fontWeight={"semibold"}>
        {projeto.responsavel}
      </Td>
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
        {formatDate(new Date(projeto.data_inicio))}
      </Td>
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
        {formatDate(new Date(projeto.data_fim))}
      </Td>
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>{`${
        projeto.vlr_cr && projeto.vlr_orcado
          ? ((projeto.vlr_cr / projeto.vlr_orcado) * 100).toFixed(2)
          : 0
      } %`}</Td>
      <Td textAlign={"center"} fontWeight={"semibold"}>
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
      <Td fontWeight={"semibold"} textAlign={"center"} color={"#2D2926"}>
        <ModalCadastrarPriorizacao
          refresh={refresh}
          setRefresh={setRefresh}
          projeto={projeto.id_projeto_real}
        />
        <ModalDeletarProjeto projeto={projeto.id_projeto_real} />
      </Td>
    </Tr>
  ));

  return (
    <Flex direction={"column"} w={"100%"}>
      <TableContainer mt={4} mb={3} borderRadius={"10px"} overflowX={"scroll"}>
        <Table variant="striped" colorScheme="strippedGray">
          <Thead>
            <Tr background={"origem.500"}>
              {/* <Th colSpan={16} color="white">
                Projetos
              </Th> */}
              {/* <Th
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
              </Th> */}
            </Tr>
            <Tr background="origem.500">
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                ID
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Projeto
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                CPI
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                SPI
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Orçamento
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Realizado
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                TCPI
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Prioridade
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Complexidade
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Polo
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Coordenador
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Responsável
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Data Início
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Data de Término
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                %
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Descrições e Justificativas
              </Th>
              <Th
                textAlign={"center"}
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
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                Total
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                {data ? data.length : 0} Projetos
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                {formatReal(totalOrcado)}
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              >
                {formatReal(totalRealizado)}
              </Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
              <Th
                textAlign={"center"}
                style={{
                  color: "white",
                }}
              ></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <PaginacaoTabela data={data} fromTo={fromTo} />
    </Flex>
  );
}
