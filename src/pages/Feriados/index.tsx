//  CRIADO EM: 10/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Tela de CRUD de feriados.

import { useEffect, useState } from "react";

import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";
import { Filtro } from "interfaces/Feriados";

import ContainerPagina from "components/ContainerPagina";
import FiltragemTabela from "components/FiltragemTabela";
import Sidebar from "components/SideBar";
import TabelaGenerica from "components/TabelaGenerica";
import TituloPagina from "components/TituloPagina";

import { formatarDigitosData } from "utils/formatarDigitosData";

import { useFeriadosContext } from "contexts/Feriados";

import { useAuth } from "hooks/useAuth";

import ModalAdicionarFeriado from "./components/ModaAdicionarFeriado";
import ModalDeletarFeriado from "./components/ModalDeletarFeriado";
import ModalEditarFeriado from "./components/ModalEditarFeriado";

function Feriados() {
  const { user } = useAuth();
  const { registerForm, feriados } = useFeriadosContext();
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [tabelaFiltrada, setTabelaFiltrada] = useState<Filtro[]>([]);
  const [refreshTable, setRefreshTable] = useState<boolean>(false);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const header = [
    "ID",
    "NOME DO FERIADO",
    "TIPO",
    "DATA",
    // "PROJETO",
    "OBSERVAÇÕES",
    "AÇÕES",
  ];
  const footer = [""];

  useEffect(() => {
    if (feriados.isLoading === false) {
      setTabelaFiltrada(feriados.data);
    }
    if (feriados.isFetching === false) {
      setRefreshTable(true);
    }
    setRefreshTable(false);
  }, [feriados]);

  useEffect(() => {
    if (feriados.isLoading === false) {
      setTabelaFiltrada(feriados.data);
    }
    setRefreshTable(false);
  }, [refreshTable]);

  function Body() {
    return (
      <>
        {!feriados.isLoading && tabelaFiltrada.length ? (
          tabelaFiltrada
            .slice(from, to)
            .map((linhaTabela: Filtro, index: number) => (
              <Tr key={index}>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.id}</Text>
                </Td>
                <Td textAlign={"left"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.nome_feriado}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {linhaTabela.ind_global === 1 ? "Nacional" : "Específico"}
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>
                    {linhaTabela.ano_feriado === null
                      ? formatarDigitosData(linhaTabela.dia_feriado) +
                        "/" +
                        formatarDigitosData(linhaTabela.mes_feriado)
                      : formatarDigitosData(linhaTabela.dia_feriado) +
                        "/" +
                        formatarDigitosData(linhaTabela.mes_feriado) +
                        "/" +
                        linhaTabela.ano_feriado}
                  </Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>
                    {linhaTabela.ano_feriado === null ? "Feriado fixo" : "---"}
                  </Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Flex align={"center"} justify={"center"}>
                    <ModalEditarFeriado feriado={linhaTabela} />
                    <ModalDeletarFeriado
                      refreshTable={refreshTable}
                      setRefreshTable={setRefreshTable}
                      id={linhaTabela.id}
                      nome={user?.nome}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))
        ) : (
          <Tr>
            <Td colSpan={header.length} textAlign={"start"}>
              <Text textAlign={"start"} fontWeight={"semibold"}>
                Não há dados
              </Text>
            </Td>
          </Tr>
        )}
      </>
    );
  }

  return (
    <>
      <Sidebar>
        <ContainerPagina>
          {feriados.isLoading || refreshTable ? (
            <Flex
              display={"flex"}
              align={"center"}
              justify={"center"}
              h={"90vh"}
            >
              <Ring speed={2} lineWeight={5} color="blue" size={64} />
            </Flex>
          ) : (
            <>
              <Flex justify={"space-between"} align={"start"}>
                <TituloPagina botaoVoltar={false}>Feriados</TituloPagina>
                <ModalAdicionarFeriado />
              </Flex>
              <FiltragemTabela
                dadosTabela={feriados.data}
                nomeLabel={"Pesquise o feriado"}
                placeholder={"Digite o feriado"}
                setTabelaFiltrada={setTabelaFiltrada}
                propName={"nome_feriado"}
                registerForm={registerForm}
              />

              <TabelaGenerica
                data={tabelaFiltrada}
                header={header}
                fromTo={fromTo}
                footer={footer}
              >
                <Body />
              </TabelaGenerica>
            </>
          )}
        </ContainerPagina>
      </Sidebar>
    </>
  );
}

export default Feriados;
