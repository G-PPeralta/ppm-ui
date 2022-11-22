import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";

import { Flex, IconButton, Td, Text, Tr } from "@chakra-ui/react";
import { Ring } from "@uiball/loaders";

import ContainerPagina from "components/ContainerPagina";
import FiltragemTabela from "components/FiltragemTabela";
import Sidebar from "components/SideBar";
import TabelaGenerica from "components/TabelaGenerica";
import TituloPagina from "components/TituloPagina";

import { useFeriadosContext } from "contexts/Feriados";

import ModalAdicionarFeriado from "./components/ModaAdicionarFeriado";

function Feriados() {
  const { registerForm, feriados } = useFeriadosContext();
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [tabelaFiltrada, setTabelaFiltrada] = useState<any[]>([]);
  const [refreshTable, setRefreshTable] = useState<any>(false);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const header = ["ID", "NOME DO FERIADO", "TIPO", "DATA", "AÇÕES"];
  const footer = [""];

  // console.log("tabelaFiltrada", tabelaFiltrada);
  // console.log("feriados", feriados);
  // console.log("registerForm", registerForm.values);
  // console.log("feriados", feriados);

  useEffect(() => {
    if (feriados.isLoading === false) {
      setTabelaFiltrada(feriados.data);
    }
    if (feriados.isFetching === false) {
      setRefreshTable(true);
    }
    setRefreshTable(false);
  }, [feriados]);

  function Body() {
    return (
      <>
        {!feriados.isLoading ? (
          tabelaFiltrada
            .slice(from, to)
            .map((linhaTabela: any, index: number) => (
              <Tr key={index}>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.id}</Text>
                </Td>
                <Td textAlign={"left"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.nome_feriado}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  {linhaTabela.ind_global === 1 ? "Nacional" : "Outros"}
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>
                    {linhaTabela.dia_feriado +
                      "/" +
                      linhaTabela.mes_feriado +
                      "/2022"}
                  </Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Flex gap={2} align={"center"} justify={"center"}>
                    <IconButton
                      aria-label="Botão de Editar"
                      icon={<MdModeEdit />}
                      borderRadius={"10px"}
                      background={"transparent"}
                      color={"origem.500"}
                      _hover={{
                        background: "origem.500",
                        transition: "all 0.4s",
                        color: "white",
                      }}
                      // onClick={onOpen}
                    />
                    <IconButton
                      aria-label="Botão de Editar"
                      icon={<FiTrash />}
                      borderRadius={"10px"}
                      background={"transparent"}
                      color={"red.500"}
                      _hover={{
                        background: "red.500",
                        transition: "all 0.4s",
                        color: "white",
                      }}
                      // onClick={() =>
                      //   handleDeletar(
                      //     linhaTabela.id,
                      //     registerForm.values.id_atividade
                      //   )
                      // }
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
                nomeLabelData={"Data"}
                placeholder={"Digite o feriado"}
                setTabelaFiltrada={setTabelaFiltrada}
                propName={"nome_feriado"}
                registerForm={registerForm}
                filtrarData={false}
              />

              <TabelaGenerica
                // maxHeight={"352px"}
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
