import { useEffect, useState } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import ContainerPagina from "components/ContainerPagina";
import { Loading } from "components/Loading";
import RequestError from "components/RequestError";
import Sidebar from "components/SideBar";
import StatusProjeto from "components/StatusProjeto";
import TituloPagina from "components/TituloPagina";

import { useFiltragemCampanha } from "hooks/useFiltragemCampanha";

import { postGetInfoCampanha } from "services/get/Infograficos";

import { statusProjeto } from "../../utils/validateDate";
import ColumnSPT from "./Components/ColumnSPT";
import FiltrosModal from "./Components/FiltrosModal";
import ModalCadastrarSonda from "./Components/ModalCadastrarSonda";
import ModalCadastroAtividade from "./Components/ModalCadastroAtividade";
import ModalCadastroPoco from "./Components/ModalCadastroPoco";
import ModalCadastroProjetoTipo from "./Components/ModalCadastroProjetoTipo";
import ModalNovaCampanha from "./Components/ModalNovaCampanha";
import ModalReorderSimples from "./Components/ModalReorderSimples";

export function Infographics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [campanhas, setCampanhas] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  const {
    registerForm,
    listaAreaAtuacao,
    listaPocos,
    listaTarefas,
    listaResponsaveis,
    listaSondas,
  } = useFiltragemCampanha();

  const listas = {
    registerForm,
    listaAreaAtuacao,
    listaPocos,
    listaTarefas,
    listaResponsaveis,
    listaSondas,
  };

  const handleGetAll = async () => {
    try {
      const campanhas = await postGetInfoCampanha(registerForm.values);
      setCampanhas(campanhas.data);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleGetAll();
    }, 1000);
  }, [refresh]);

  if (loading) {
    return (
      <Sidebar>
        <ContainerPagina>
          <Loading />
        </ContainerPagina>
      </Sidebar>
    );
  }

  if (error) {
    return (
      <Sidebar>
        <ContainerPagina>
          <RequestError />
        </ContainerPagina>
      </Sidebar>
    );
  }

  return (
    <>
      <Sidebar>
        <ContainerPagina>
          <TituloPagina>Acompanhamento de Poços</TituloPagina>
          <Flex
            direction={"column"}
            justify={"space-between"}
            gap={4}
            wrap={"wrap"}
            mb={2}
            flex={1}
          >
            <Flex gap={2} wrap={"wrap"} flex={1} justify={"space-between"}>
              <Flex gap={2} wrap={"wrap"}>
                <ModalCadastrarSonda
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
                <ModalCadastroPoco refresh={refresh} setRefresh={setRefresh} />
                <ModalCadastroAtividade />
                <ModalCadastroProjetoTipo
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
                <ModalNovaCampanha refresh={refresh} setRefresh={setRefresh} />
              </Flex>
              <Flex gap={2}>
                <ModalReorderSimples
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
                <FiltrosModal
                  refresh={refresh}
                  setRefresh={setRefresh}
                  listas={listas}
                  registerForm={registerForm}
                />
              </Flex>
            </Flex>
            <Flex gap={4} wrap={"wrap"} flex={1} justify={"end"}>
              {statusProjeto.map((status, index) => (
                <StatusProjeto
                  key={index}
                  status={status.status}
                  color={status.color}
                />
              ))}
            </Flex>
          </Flex>
          <Flex align={"center"} justify={"center"}>
            {campanhas.length !== 0 ? (
              <Box
                overflowX={{ base: "scroll" }}
                display={"flex"}
                flexDirection={"row"}
                gap={10}
                py={2}
                flex={1}
              >
                {campanhas.map((column, index) => (
                  <Flex
                    key={index}
                    direction={"column"}
                    gap={4}
                    align={"end"}
                    justify={"space-between"}
                  >
                    <ColumnSPT
                      column={column}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  </Flex>
                ))}
              </Box>
            ) : (
              <Flex h={180} align={"center"} justify={"center"}>
                <Heading as="h4" size="md">
                  Nenhuma campanha Cadastrada
                </Heading>
              </Flex>
            )}
          </Flex>
        </ContainerPagina>
      </Sidebar>
    </>
  );
}
