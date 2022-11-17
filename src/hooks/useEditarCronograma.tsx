import { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  AreaAtuacao,
  ListaPoco,
  Responsavel,
  Tarefas,
} from "interfaces/CadastrosModaisInfograficos";
import { Operacao } from "interfaces/Estatisticas";
import { cadastroNovoCronogramaSchema } from "validations/Estatisticas";

import { useToast } from "contexts/Toast";

import {
  getPocos,
  getResponsaveis,
  getSonda,
  getTarefas,
} from "services/get/CadastroModaisInfograficos";
import { getOperacoes } from "services/get/Estatisticas";
import { getAreaAtuacaoList } from "services/get/Infograficos";
// import { postCadastroNovoCronograma } from "services/post/Estatistica";

import { useAuth } from "./useAuth";

export function useEditarCronograma(atual: any) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [listaPocos, setListaPocos] = useState<ListaPoco[]>([]);
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);
  const [listaTarefas, setListaTarefas] = useState<Tarefas[]>([]);
  const [listaOperacao, setListaOperacao] = useState<Operacao[]>([]);

  const _atual = {
    nom_usu_create: user?.nome,
    id_sonda: atual.id_sonda,
    id_poco: atual.id_poco,
    atividades: atual.atividades.map((t: any) => ({
      area_id: 0,
      area_nom: "nome area",
      operacao_id: t.id_atividade,
      nom_operacao: t.nome_atividade,
      responsavel_id: 30, // TODO
      responsavel_nom: "Ada Lovelace",
      data_inicio: new Date(t.inicio_planejado),
      duracao: t.hrs_totais,
      precedentes: [
        {
          id: 0,
          nome: "",
          checked: false,
        },
      ],
    })),
    comentarios: "...",
  };

  const reqGet = async () => {
    const sondas = await getSonda();
    const pocos = await getPocos();
    const areaAtuacao = await getAreaAtuacaoList();
    const responsaveis = await getResponsaveis();
    const tarefas = await getTarefas();
    const operacoes = await getOperacoes();

    const sondasSorted = sondas.data.sort((a: any, b: any) =>
      a.nom_sonda.localeCompare(b.nom_sonda)
    );
    const pocosSorted = pocos.data.sort((a: ListaPoco, b: ListaPoco) =>
      a.nom_poco.localeCompare(b.nom_poco)
    );
    const areasAtuacaoSorted = areaAtuacao.data.sort((a: any, b: any) =>
      a.tipo.localeCompare(b.tipo)
    );

    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome)
    );
    const tarefasSorted = tarefas.data.sort((a: Tarefas, b: Tarefas) =>
      a.nom_atividade.localeCompare(b.nom_atividade)
    );
    const operacoesSorted = operacoes.data.sort((a: any, b: any) =>
      a.nom_operacao.localeCompare(b.nom_operacao)
    );

    setListaPocos(pocosSorted);
    setListaAreaAtuacao(areasAtuacaoSorted);
    setListaResponsaveis(responsaveisSorted);
    setListaTarefas(tarefasSorted);
    setListaOperacao(operacoesSorted);
    setListaSondas(sondasSorted);
  };

  const listaAtividadesPrecedentes = listaOperacao.map((atividade) => ({
    id: atividade.id,
    nome: atividade.nom_operacao,
    checked: false,
  }));

  const registerForm: any = useFormik({
    initialValues: _atual,
    validationSchema: cadastroNovoCronogramaSchema,
    // enableReinitialize: true,
    onSubmit: async (values: any) => {
      const newValues: any = {
        nom_usu_create: user?.nome,
        id_sonda: values.id_sonda,
        id_poco: values.id_poco,
        atividades: values.atividades,
        comentarios: values.comentarios,
      };

      setLoading(true);

      try {
        // TODO liberar endpoint de update
        const res = {
          status: 200,
          data: newValues,
        };
        const status = res.status;
        // await postCadastroNovoCronograma(newValues);

        if (status === 200 || status === 201) {
          toast.success("Cronograma cadastrado com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Erro ao cadastrar cronograma!", {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    setLoading(true);
    reqGet();
  }, []);

  useEffect(() => {
    if (listaSondas.length > 0 && listaPocos.length > 0) {
      setLoading(false);
    }
  }, [listaSondas, listaPocos]);

  // useEffect(() => {
  //   console.log(">>>> useEditar");

  //   const setInitialValues = async () => {
  //     // if (atual) await registerForm.setValues(_atual);
  //   };
  //   setInitialValues();
  // }, [atual]);

  return {
    registerForm,
    loading,
    listaSondas,
    listaPocos,
    listaAreaAtuacao,
    listaResponsaveis,
    listaTarefas,
    listaAtividadesPrecedentes,
    listaOperacao,
  };
}
