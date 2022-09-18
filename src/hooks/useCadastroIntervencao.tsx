import { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  ListaPoco,
  ListaSonda,
  NovaIntervencao,
} from "interfaces/CadastrosModaisInfograficos";
import { cadastroNovaIntervencaoSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { getSondas, getPocos } from "services/get/CadastroModaisInfograficos";
import { postNovaIntervencao } from "services/post/CadastroModaisInfograficos";

export function useCadastroIntervencao() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaSondas, setListaSondas] = useState<ListaSonda[]>([]);
  const [listaPocos, setListaPocos] = useState<ListaPoco[]>([]);

  const reqGet = async () => {
    const sondas = await getSondas();
    const pocos = await getPocos();

    const sondasSorted = sondas.data.sort((a: ListaSonda, b: ListaSonda) =>
      a.nome.localeCompare(b.nome)
    );
    const pocosSorted = pocos.data.sort((a: ListaPoco, b: ListaPoco) =>
      a.poco.localeCompare(b.poco)
    );

    setListaSondas(sondasSorted);
    setListaPocos(pocosSorted);
  };

  const initialValues: NovaIntervencao = {
    pocoId: 0,
    sondaId: 0,
    comentarios: "",
  };

  const intervencaoForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaIntervencaoSchema,
    onSubmit: async (values) => {
      const newValues: NovaIntervencao = {
        pocoId: values.pocoId,
        sondaId: values.sondaId,
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
    intervencaoForm,
    loading,
    listaSondas,
    listaPocos,
  };
}
