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
import { postCadastroNovoCronograma } from "services/post/Estatistica";

import { useAuth } from "./useAuth";

export function useCadastroCronograma() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [listaPocos, setListaPocos] = useState<ListaPoco[]>([]);
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);
  const [listaTarefas, setListaTarefas] = useState<Tarefas[]>([]);
  const [listaOperacao, setListaOperacao] = useState<Operacao[]>([]);

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
      a.poco.localeCompare(b.poco)
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

  const initialValues: any = {
    nom_usu_create: user?.nome,
    sonda_id: 0,
    poco_id: 0,
    atividades: [
      {
        area_id: 0,
        operacao_id: 0,
        responsavel_id: 0,
        data_inicio: "",
        duracao: 0,
        precedentes: [
          {
            id: 0,
            nome: "",
            checked: false,
          },
        ],
      },
    ],
    comentarios: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroNovoCronogramaSchema,
    onSubmit: async (values) => {
      const newValues: any = {
        nom_usu_create: user?.nome,
        sonda_id: values.sonda_id,
        poco_id: values.poco_id,
        atividades: values.atividades,
        comentarios: values.comentarios,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroNovoCronograma(newValues);

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
