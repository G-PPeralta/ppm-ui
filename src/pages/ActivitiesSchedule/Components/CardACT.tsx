import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Flex, Text, useDisclosure } from "@chakra-ui/react";

import { formatDate } from "utils/formatDate";
import { validateDate } from "utils/validateDate";

import { useAuth } from "hooks/useAuth";

import { deleteInfograficos } from "services/delete/DeleteInfografico";

import ModalDeletar from "./ModalDeleteAtividade";

type Atividade = {
  atividade: string;
  comp_pct: number;
  finalplanejado: any;
  id_poco: number;
  inicioplanejado: any;
  pct_plan: number;
  pct_real: number;
  qtddias: number;
  sonda: string;
  ind_alerta?: number;
  ind_status?: number;
};

type Props = {
  atividade: Atividade;
  id?: any;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>; // Função para atualizar a página
  refresh: boolean;
};

function CardACT({ atividade, id, setRefresh, refresh }: Props) {
  const dataInicioFormatada = formatDate(new Date(atividade.inicioplanejado));
  const dataFinalFormatada = formatDate(new Date(atividade.finalplanejado));
  const [atividadeId, setAtividadeId] = useState(0);
  const { onClose } = useDisclosure();

  const { user } = useAuth();

  // console.log({ atividade });

  // console.log("id", id.id_filho);

  // console.log({ atividadeId });

  useEffect(() => {
    setAtividadeId(id.id_filho);
  }, []);

  useEffect(() => {}, [id.id_filho]);

  async function handleDeleteAtividade() {
    // "Deleta" o atividade na lista
    if (atividadeId !== undefined) {
      try {
        if (!id.id_filho) throw new Error("Erro ao remover a atividade!");
        const { status } = await deleteInfograficos(id.id_filho, user?.nome);
        if (status === 200 || status === 201) {
          toast.success("Atividade removida com sucesso!", {
            id: "toast-principal",
          });

          onClose();
        }
      } catch (error) {
        toast.error("Erro ao remover!", {
          id: "toast-principal",
        });

        onClose();
      }
    }
  }

  return (
    <Flex
      zIndex={1000}
      direction={"column"}
      align={"right"}
      justify={"right"}
      backgroundColor={validateDate(
        Number(atividade.pct_plan),
        Number(atividade.comp_pct),
        Number(atividade.pct_real),
        atividade.finalplanejado,
        Number(atividade.ind_alerta),
        Number(atividade.ind_status)
      )}
      px={5}
      py={3}
      borderRadius={12}
      minW={"220px"}
      gap={2}
      flex={1}
    >
      <Flex>
        <Text fontSize={"lg"} color={"white"} fontWeight={"bold"}>
          {atividade.atividade}
        </Text>
      </Flex>
      <Flex direction={"column"} w={"100%"}>
        <Flex direction={"row"} justify={"space-between"} w={"100%"}>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Data Início:
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"end"}
            ml={1}
            flex={1}
          >
            {dataInicioFormatada}
          </Text>
        </Flex>
        <Flex direction={"row"} justify={"space-between"} w={"100%"}>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Data Fim:
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"end"}
            ml={1}
            flex={1}
          >
            {dataFinalFormatada}
          </Text>
        </Flex>
        <Flex direction={"row"} justify={"space-between"} w={"100%"}>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Planejado:
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"end"}
            ml={1}
            flex={1}
          >
            {`${atividade.pct_plan}%`}
          </Text>
        </Flex>
        <Flex direction={"row"} justify={"space-between"} w={"100%"}>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"start"}
            flex={1}
          >
            Realizado:
          </Text>
          <Text
            fontSize={"md"}
            color={"white"}
            fontWeight={"semi-bold"}
            textAlign={"end"}
            ml={1}
            flex={1}
          >
            {`${atividade.pct_real}%`}
          </Text>
        </Flex>
        <Flex alignSelf={"center"} mt={4}>
          <ModalDeletar
            onDelete={handleDeleteAtividade}
            newRender={() => setRefresh(!refresh)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CardACT;
