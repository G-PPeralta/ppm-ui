import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { Reorder } from "interfaces/CadastrosModaisInfograficos";
import { reorderSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { postGetInfoCampanha } from "services/get/Infograficos";
import { postReorder } from "services/post/Infograficos";

export function useReorder() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [listaPocos, setListaPocos] = useState<any[]>([]);

  const reqGet = async () => {
    const deafultPayload = {
      area_atuacao_id: null,
      poco_id: null,
      atividade_id: null,
      responsavel_id: null,
      data_inicio: null,
      data_fim: null,
      sonda_id: null,
      status: null,
    };
    const campanhas = await postGetInfoCampanha(deafultPayload);
    const data = campanhas.data;

    const dataPocos: any = [];
    const dataSondas: any = [];

    data.forEach((val) => {
      const sondaPush = {
        name: val.sonda,
        id: val.id_campanha,
      };
      dataSondas.push(sondaPush);
      val.pocos.forEach((val2: any) => {
        const pocoPush = {
          name: val2.poco,
          id: val2.id_poco,
          sonda: val.id_campanha,
        };
        if (val2.ind_block !== 1) {
          dataPocos.push(pocoPush);
        }
      });
    });
    setListaPocos(dataPocos);
    setListaSondas(dataSondas);
  };

  const initialValues: Reorder = {
    id_campanha_original: "",
    id_campanha_destino: "",
    id_cronograma_original: "",
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: reorderSchema,
    onSubmit: async (values) => {
      const newValues: Reorder = {
        id_campanha_original: values.id_campanha_original,
        id_campanha_destino: values.id_campanha_destino,
        id_cronograma_original: values.id_cronograma_original,
      };

      setLoading(true);

      try {
        const { status } = await postReorder(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Replanejamento feito com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao replanejar sondas`, {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    reqGet();
    setLoading(false);
  }, []);

  const update = () => {
    reqGet();
  };

  return {
    registerForm,
    loading,
    listaSondas,
    listaPocos,
    update,
  };
}
