import { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  AreaAtuacao,
  ListaCampo,
  ListaPoco,
  ProjetoTipo,
  Responsavel,
  Tarefas,
  // NovaIntervencao,
} from "interfaces/CadastrosModaisInfograficos";
import { cadastroNovaIntervencaoSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import {
  getCampo,
  getPocos,
  getProjetosTipo,
  getResponsaveis,
  getTarefas,
} from "services/get/CadastroModaisInfograficos";
import {
  getAreaAtuacaoList,
  getInfoCampanha,
  getSondaCampanha,
} from "services/get/Infograficos";
import { postNovaIntervencao } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useCadastroIntervencao() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [listaPocos, setListaPocos] = useState<ListaPoco[]>([]);
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);
  const [listaCampos, setListaCampo] = useState<ListaCampo[]>([]);
  const [listaProjetosTipo, setListaProjetosTipo] = useState<ProjetoTipo[]>([]);
  const [listaSondaCampanha, setListaSondaCampanha] = useState<any[]>([]);
  const [listaTarefas, setListaTarefas] = useState<Tarefas[]>([]);

  const reqGet = async () => {
    const campanha = await getInfoCampanha();
    const pocos = await getPocos();
    const areaAtuacao = await getAreaAtuacaoList();
    const responsaveis = await getResponsaveis();
    const campos = await getCampo();
    const projetosTipo = await getProjetosTipo();
    const sondaCampanha = await getSondaCampanha();
    const tarefas = await getTarefas();

    const arraySondas = campanha.data.map(({ sonda, id_campanha }: any) => ({
      sonda,
      id_campanha,
    }));
    const sondasSorted = arraySondas.sort((a: any, b: any) =>
      a.sonda.localeCompare(b.sonda)
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
    const camposSorted = campos.data.sort((a: ListaCampo, b: ListaCampo) =>
      a.campo.localeCompare(b.campo)
    );
    const projetosTipoSorted = projetosTipo.data.sort(
      (a: ProjetoTipo, b: ProjetoTipo) =>
        a.nom_projeto_tipo.localeCompare(b.nom_projeto_tipo)
    );
    const sondaCampanhaSorted = sondaCampanha.data.sort((a: any, b: any) =>
      a.nom_campanha.localeCompare(b.nom_campanha)
    );
    const tarefasSorted = tarefas.data.sort((a: Tarefas, b: Tarefas) =>
      a.nom_atividade.localeCompare(b.nom_atividade)
    );

    setListaSondas(sondasSorted);
    setListaPocos(pocosSorted);
    setListaAreaAtuacao(areasAtuacaoSorted);
    setListaResponsaveis(responsaveisSorted);
    setListaCampo(camposSorted);
    setListaProjetosTipo(projetosTipoSorted);
    setListaSondaCampanha(sondaCampanhaSorted);
    setListaTarefas(tarefasSorted);
  };

  const initialValues: any = {
    nom_usu_create: user?.nome,
    poco_id: 0,
    campo_id: 0,
    id_campanha: 0,
    dat_ini_prev: "",
    projeto_tipo_id: 0,
    atividades: [
      {
        area_id: 0,
        tarefa_id: 0,
        responsavel_id: 0,
        qtde_dias: 0,
      },
    ],
    comentarios: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroNovaIntervencaoSchema,
    onSubmit: async (values) => {
      const newValues: any = {
        nom_usu_create: user?.nome,
        poco_id: values.poco_id,
        campo_id: values.campo_id,
        id_campanha: values.id_campanha,
        dat_ini_prev: values.dat_ini_prev,
        projeto_tipo_id: values.projeto_tipo_id,
        atividades: values.atividades,
        comentarios: values.comentarios,
      };

      setLoading(true);

      try {
        const { status } = await postNovaIntervencao(newValues);

        if (status === 200 || status === 201) {
          toast.success("Intervenção cadastrada com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Erro ao cadastrar intervenção!", {
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
    listaCampos,
    listaProjetosTipo,
    listaSondaCampanha,
    listaTarefas,
  };
}
