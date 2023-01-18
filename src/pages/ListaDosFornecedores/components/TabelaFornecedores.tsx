//  CRIADO EM: 9/2022
//  AUTOR: Gabriel Peralta.
//  DESCRIÇÃO DO ARQUIVO: Tela com tabela de fornecedores

import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import PaginacaoTabela from "components/PaginacaoTabela";

import { FornecedoreDto } from "..";

import ModalDeletarFornecedor from "./DeletarFornecedor";

type TabelaFornecedoresProps = {
  fornecedores: FornecedoreDto[];
  onEdit: (fornecedor: FornecedoreDto) => any;
  polos: any[];
  loading: boolean;
  onDelete: (fornecedor: any) => void;
};

export function TabelaFornecedores({
  fornecedores,
  onEdit,
  polos,
  loading,
  onDelete,
}: TabelaFornecedoresProps) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(7);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  function Body() {
    return (
      <>
        {fornecedores.length > 0 ? (
          fornecedores
            .sort((a, b) => a.id - b.id)
            .slice(from, to)
            .map((fornecedor, index) => (
              <Tr key={index}>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {fornecedor.id}
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {fornecedor.nomefornecedor}
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {polos.find((pol) => pol.id == fornecedor.poloid)?.polo}
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {fornecedor.servico_txt}
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {fornecedor.representante}
                </Td>
                <Td textAlign={"center"} width="406px" height={"56px"}>
                  {fornecedor.outrasinformacoes}
                </Td>
                <Td textAlign={"center"}>
                  <IconButton
                    icon={<MdModeEdit />}
                    textAlign={"center"}
                    color={"origem.500"}
                    backgroundColor={"transparent"}
                    aria-label="Plus sign"
                    onClick={() => onEdit(fornecedor)}
                    _hover={{
                      backgroundColor: "origem.500",
                      color: "white",
                    }}
                    fontSize={"18px"}
                    fontWeight={"700"}
                  />
                  <ModalDeletarFornecedor
                    onDelete={onDelete}
                    fornecedor={fornecedor}
                  />
                </Td>
              </Tr>
            ))
        ) : (
          <Tr>
            <Td textAlign={"start"} fontWeight={"semibold"}>
              Não há dados
            </Td>
          </Tr>
        )}
      </>
    );
  }

  return (
    <>
      <TableContainer mt={4} mb={3} borderRadius={"10px"} overflowX={"scroll"}>
        <Table variant="striped" colorScheme={"strippedGray"}>
          <Thead>
            <Tr background={"origem.500"}>
              <Th color={"white"} textAlign={"center"}>
                ID
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Fornecedor
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Polo
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Serviço
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Responsável
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Descrição e justificativa
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Ações
              </Th>
            </Tr>
          </Thead>
          <Tbody scrollBehavior={"smooth"}>{<Body />}</Tbody>
          <Tfoot>
            <Tr background={"origem.500"}>
              <Th color="white">Total</Th>
              <Th textAlign={"center"} style={{ color: "white" }}>
                {fornecedores.length > 0
                  ? `${fornecedores.length} fornecedores`
                  : `${fornecedores.length} fornecedor`}
              </Th>
              <Th color="white"></Th>
              <Th color="white"></Th>
              <Th color="white"></Th>
              <Th color="white"></Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Flex>
        <PaginacaoTabela data={fornecedores} fromTo={fromTo} />
      </Flex>
    </>
  );
}
