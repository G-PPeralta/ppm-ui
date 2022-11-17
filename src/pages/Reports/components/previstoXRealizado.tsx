import { useEffect, useState } from "react";

import { Flex } from "@chakra-ui/react";
import { Projetos } from "interfaces/Projetos";
import { IDadosAtividades } from "interfaces/TabelaAtividades";

import CurvaS from "components/CurvaS";

import {
  getAtivadesPendencia,
  getCurvaS,
} from "services/get/Relatorios-pendencias";

// import { curveSData } from "./data";
import { ProjectSummary } from "./summary";
import { TabelaAtividadesPendentes } from "./TabelaAtividadesPendentes";

export interface SummaryData {
  name: string;
  responsible: string;
  startDate: string;
  endDate: string;
  budget: number;
  realized: number;
}

type Props = {
  data: Projetos;
};

export interface CurveSData {
  mes: string;
  cronogramaPrevisto: number;
  cronogramaRealizado: number;
  capexPrevisto: number;
  capexRealizado: number;
}

export function PrevistoXRealizado({ data }: Props) {
  const [atividades, setAtividades] = useState<IDadosAtividades[]>();
  const [curvas, setCurvas] = useState<CurveSData[]>();

  const summary: SummaryData = {
    name: data.nome_projeto,
    responsible: data.responsavel,
    startDate: data.data_inicio,
    endDate: data.data_fim,
    budget: +data.vlr_cr,
    realized: +data.vlr_orcado,
  };

  const getCurvaSProjeto = async (idProject: number) => {
    const curvaS = await getCurvaS(idProject);
    const curvaDataS: CurveSData[] = [];

    for (let index = 0; index < curvaS.length; index++) {
      const mes = curvaS[index].mesano.toString().substring(0, 4);
      const ano = curvaS[index].mesano.toString().substring(4, 6);
      const _curva: CurveSData = {
        mes: `${mes}/${ano}`,
        cronogramaPrevisto: +curvaS[index].pct_plan,
        cronogramaRealizado: +curvaS[index].pct_real,
        capexPrevisto: +curvaS[index].pct_capex_plan,
        capexRealizado: +curvaS[index].pct_capex_real,
      };

      curvaDataS.push(_curva);
    }

    setCurvas(curvaDataS);
  };

  const getPendentes = async (idProject: number) => {
    const _atividades = await getAtivadesPendencia(idProject);
    setAtividades(_atividades);
  };

  useEffect(() => {
    getCurvaSProjeto(data.id_projeto_real);
  }, []);

  useEffect(() => {
    getPendentes(data.id_projeto_real);
  }, [data]);

  return (
    <>
      <Flex direction={"column"} w={"100%"} gap={"24px"}>
        {atividades && (
          <ProjectSummary data={summary} table={false} dataTable={atividades} />
        )}
        {curvas && <CurvaS data={curvas} />}
        {atividades && (
          <TabelaAtividadesPendentes data={atividades} total={true} />
        )}
      </Flex>
    </>
  );
}
