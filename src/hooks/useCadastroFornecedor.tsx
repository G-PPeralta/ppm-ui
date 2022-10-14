import { useEffect, useState } from "react";

import { useFormik } from "formik";

import { useToast } from "contexts/Toast";

import { postNovaIntervencao } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useCadastroFornecedor() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const reqGet = async () => {};

  const initialValues: any = {
    nom_usu_create: user?.nome,
    poloId: 0,
    servicoId: 0,
    statusId: 0,
    nomeFornecedor: "",
    numeroContrato: 0,
    representante: "",
    email: "",
    telefone: "",
    invoice: "",
    cnpj: "",
    justificativa: "",
    outrasInformacoes: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    // validationSchema: cadastroNovaIntervencaoSchema,
    onSubmit: async (values) => {
      const newValues: any = {
        nom_usu_create: user?.nome,
        poloId: values.poloId,
        servicoId: values.servicoId,
        statusId: values.statusId,
        nomeFornecedor: values.nomeFornecedor,
        numeroContrato: values.numeroContrato,
        representante: values.representante,
        email: values.email,
        telefone: values.telefone,
        invoice: values.invoice,
        cnpj: values.cnpj,
        justificativa: values.justificativa,
        outrasInformacoes: values.outrasInformacoes,
      };

      setLoading(false);

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
    setLoading(false);
    reqGet();
  }, []);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, []);

  return {
    registerForm,
    loading,
  };
}
