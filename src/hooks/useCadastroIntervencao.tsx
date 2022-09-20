import { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  ListaPoco,
  ListaSonda,
  NovaIntervencao,
} from "interfaces/CadastrosModaisInfograficos";
import { cadastroNovaIntervencaoSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { getPocos } from "services/get/CadastroModaisInfograficos";
import { getInfoCampanha } from "services/get/Infograficos";
import { postNovaIntervencao } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useCadastroIntervencao() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaSondas, setListaSondas] = useState<ListaSonda[]>([]);
  const [listaPocos, setListaPocos] = useState<ListaPoco[]>([]);
  const { user } = useAuth();

  const reqGet = async () => {
    const campanha = await getInfoCampanha();
    const pocos = await getPocos();

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

    setListaSondas(sondasSorted);
    setListaPocos(pocosSorted);
  };

  const initialValues: NovaIntervencao = {
    id_pai: 0, // sempre enviar 0
    pct_real: 0, // sempre enviar 0
    dat_ini_plan: null, // sempre enviar null
    dat_fim_plan: null, // sempre enviar null
    id_campanha: 0, // enviar id da sonda
    nom_atividade: "", // enviar nome do poço
    dsc_comentario: "", // enviar comentario
    nom_usu_create: user?.nome, // enviar o nome do usuário logado
  };

  const intervencaoForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaIntervencaoSchema,
    onSubmit: async (values) => {
      const newValues: NovaIntervencao = {
        id_pai: 0,
        pct_real: 0,
        dat_ini_plan: null,
        dat_fim_plan: null,
        id_campanha: values.id_campanha,
        nom_atividade: values.nom_atividade,
        dsc_comentario: values.dsc_comentario,
        nom_usu_create: user?.nome,
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
    intervencaoForm,
    loading,
    listaSondas,
    listaPocos,
  };
}
