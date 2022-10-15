import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { NovaCampanha } from "interfaces/CadastrosModaisInfograficos";
import { cadastroNovaCampanhaSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import {
  getServicoSonda,
  getSonda,
} from "services/get/CadastroModaisInfograficos";
import { postNovaCampanha } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useCadastroCampanha() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [listaServicosSondas, setListaServicosSondas] = useState<any[]>([]);

  const reqGet = async () => {
    const sondas = await getSonda();
    const servicosSondas = await getServicoSonda();

    const sondasSorted = sondas.data.sort((a: any, b: any) =>
      a.nom_sonda.localeCompare(b.nom_sonda)
    );

    const servicosSondasSorted = servicosSondas.data.sort((a: any, b: any) =>
      a.nom_sonda.localeCompare(b.nom_sonda)
    );

    setListaSondas(sondasSorted);
    setListaServicosSondas(servicosSondasSorted);
  };

  const initialValues: NovaCampanha = {
    id_projeto: "",
    dsc_comentario: "",
    nom_usu_create: user?.nome,
    nova_campanha: false,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaCampanhaSchema,
    onSubmit: async (values) => {
      const newValues: NovaCampanha = {
        id_projeto: values.id_projeto,
        dsc_comentario: values.dsc_comentario,
        nom_usu_create: user?.nome,
        nova_campanha: values.nova_campanha,
      };

      setLoading(true);

      try {
        const { status } = await postNovaCampanha(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Campanha cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar campanha!`, {
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
    if (listaSondas.length > 0) {
      setLoading(false);
    }
  }, [listaSondas]);

  return {
    registerForm,
    loading,
    listaSondas,
    listaServicosSondas,
  };
}
