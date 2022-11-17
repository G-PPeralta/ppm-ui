import { useEffect, useState } from "react";

import { Flex } from "@chakra-ui/react";
import { Projetos } from "interfaces/Projetos";
import { IDadosAtividades } from "interfaces/TabelaAtividades";

import { getAtivadesPendencia } from "services/get/Relatorios-pendencias";

import { ProjectSummary } from "./summary";
import { TabelaAtividadesPendentes } from "./TabelaAtividadesPendentes";

type Props = {
  data: Projetos;
};

export interface SummaryData {
  name: string;
  responsible: string;
  startDate: string;
  endDate: string;
  budget: number;
  realized: number;
}

export function Pendencias({ data }: Props) {
  const [atividades, setAtividades] = useState<IDadosAtividades[]>();

  const summary: SummaryData = {
    name: data.nome_projeto,
    responsible: data.responsavel,
    startDate: data.data_inicio,
    endDate: data.data_fim,
    budget: +data.vlr_cr,
    realized: +data.vlr_orcado,
  };

  const getPendentes = async (idProject: number) => {
    const _atividades = await getAtivadesPendencia(idProject);
    setAtividades(_atividades);
  };

  useEffect(() => {
    getPendentes(data.id_projeto_real);
  }, [data]);

  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"24px"}>
        {atividades && (
          <ProjectSummary data={summary} table={false} dataTable={atividades} />
        )}
        {atividades && <TabelaAtividadesPendentes data={atividades} />}
      </Flex>
    </>
  );
}
