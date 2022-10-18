import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { NovaAtividade } from "interfaces/CadastrosModaisInfograficos";
import { cadastroNovaAtividadeSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { getArea } from "services/get/CadastroModaisInfograficos";
import { postNovaAtividade } from "services/post/Infograficos";

import { useAuth } from "./useAuth";

export function useCadastroAtividade() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [listaAreas, setListaAreas] = useState<any>([]);

  const reqGet = async () => {
    const areas = await getArea();

    const arrayAreas = areas.data.map(({ id, nom_area }: any) => ({
      id,
      nom_area,
    }));

    const areasSorted = arrayAreas.sort((a: any, b: any) =>
      a.nom_area.localeCompare(b.nom_area)
    );

    setListaAreas(areasSorted);
  };

  const initialValues: NovaAtividade = {
    id_pai: 0, // enviar o id da poco (pai)
    nom_atividade: "", // enviar nome da atividade
    pct_real: 0, // porcentagem realizada
    dat_ini_plan: "", // data inicio planejada
    dat_fim_plan: "", // data fim planejada
    dsc_comentario: "", // comentario
    id_campanha: 0, // enviar id da campanha
    nom_usu_create: user?.nome,
    id_area: 0, // enviar id da area de atuação
    nom_recurso: "", // enviar nome do recurso
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaAtividadeSchema,
    onSubmit: async (values) => {
      const newValues: NovaAtividade = {
        nom_atividade: values.nom_atividade,
        pct_real: values.pct_real,
        dat_ini_plan: values.dat_ini_plan,
        dat_fim_plan: values.dat_fim_plan,
        dsc_comentario: values.dsc_comentario,
        id_campanha: values.id_campanha,
        id_pai: values.id_pai,
        id_area: values.id_area,
        nom_recurso: values.nom_recurso,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await postNovaAtividade(newValues);

        if (status === 200 || status === 201) {
          toast.success(
            `Atividade ${values.nom_atividade} cadastrada com sucesso!`,
            {
              id: "toast-principal",
            }
          );
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar atividade ${values.nom_atividade}!`, {
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
    if (listaAreas.length > 0) {
      setLoading(false);
    }
  }, [listaAreas]);

  return {
    registerForm,
    loading,
    listaAreas,
  };
}
