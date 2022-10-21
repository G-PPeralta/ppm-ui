import { useState } from "react";
import toast from "react-hot-toast";
import { MdModeEdit } from "react-icons/md";

import { Flex, IconButton, Td, Text, Tr } from "@chakra-ui/react";

import FiltragemTabela from "components/FiltragemTabela";
import TabelaGenerica from "components/TabelaGenerica";

interface Props {
  registerForm: any;
}

const data = [
  {
    id: 1,
    nomeCampo: "Agda informação técnica / orientação",
    valor: "0 dias",
  },
  {
    id: 2,
    nomeCampo: "Agdo manutenção",
    valor: "0 dias",
  },
  {
    id: 3,
    nomeCampo: "Agdo outros",
    valor: "0 dias",
  },
  {
    id: 4,
    nomeCampo: "Agdo recursos Cia Serviço",
    valor: "0 dias",
  },
  {
    id: 5,
    nomeCampo: "APR",
    valor: "0 dias",
  },
];

function EditarAtividadeTabCamposPersonalizados({ registerForm }: Props) {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const [tabelaFiltrada, setTabelaFiltrada] = useState<any[]>(data);

  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };

  const header = ["NOME DO CAMPO PERSONALIZADO", "VALOR", "AÇÕES"];

  const handleDeletar = (id: number, licao: string) => {
    toast.success(`${licao} abrir modal!`, {
      id: "toast-principal",
    });
  };

  // console.log("tabelaFiltrada", tabelaFiltrada);

  function Body() {
    return (
      <>
        {tabelaFiltrada.length ? (
          tabelaFiltrada
            .slice(from, to)
            .map((linhaTabela: any, index: number) => (
              <Tr key={index}>
                {/* <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.id}</Text>
                </Td> */}
                <Td textAlign={"start"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.nomeCampo}</Text>
                </Td>
                <Td textAlign={"center"} fontWeight={"semibold"}>
                  <Text>{linhaTabela.valor}</Text>
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
                      onClick={() =>
                        handleDeletar(linhaTabela.id, linhaTabela.nomeCampo)
                      }
                    />
                  </Flex>
                </Td>
              </Tr>
            ))
        ) : (
          <Tr>
            <Td colSpan={header.length} textAlign={"start"}>
              <Text fontSize="lg" fontWeight={500}>
                Não há dados
              </Text>
            </Td>
          </Tr>
        )}
      </>
    );
  }

  return (
    <Flex w={"100%"} direction={"column"} gap={2}>
      <FiltragemTabela
        dadosTabela={data}
        nomeLabel={"PESQUISAR"}
        placeholder={"Pesquisar"}
        setTabelaFiltrada={setTabelaFiltrada}
        propName={"nomeCampo"}
      />
      <TabelaGenerica
        maxHeight={"352px"}
        data={tabelaFiltrada}
        header={header}
        fromTo={fromTo}
      >
        <Body />
      </TabelaGenerica>
    </Flex>
  );
}

export default EditarAtividadeTabCamposPersonalizados;
