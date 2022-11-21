import { useState } from "react";

import { Flex, Td, Text, Tr } from "@chakra-ui/react";

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
  const [tabelaFiltrada, setTabelaFiltrada] = useState<any[]>(feriados.data);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const header = ["ID", "NOME DO FERIADO", "TIPO", "DATA", "AÇÕES"];
  const footer = [""];

  function Body() {
    return (
      <>
        {tabelaFiltrada.length ? (
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
                  {/* <Text>{formatDate(linhaTabela.data)}</Text> */}
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
                    {/* <ModalEditarLicaoAprendida
                    refreshState={refreshState}
                    idLicao={linhaTabela.id}
                    linhaTabela={linhaTabela}
                    idAtividade={registerForm.values.id_atividade}
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
                    onClick={() =>
                      handleDeletar(
                        linhaTabela.id,
                        registerForm.values.id_atividade
                      )
                    }
                  /> */}
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
          <Flex justify={"space-between"} align={"start"}>
            <TituloPagina botaoVoltar={false}>Feriados</TituloPagina>
            <ModalAdicionarFeriado />
          </Flex>
          <FiltragemTabela
            dadosTabela={registerForm.values.licoes_aprendidas}
            nomeLabel={"Pesquise o feriado"}
            nomeLabelData={"Data"}
            placeholder={"Digite o feriado"}
            setTabelaFiltrada={setTabelaFiltrada}
            propName={"licao_aprendida"}
            registerForm={registerForm}
            filtrarData={true}
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
        </ContainerPagina>
      </Sidebar>
    </>
  );
}

export default Feriados;
