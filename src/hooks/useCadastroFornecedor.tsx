import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { cadastroFornecedor } from "validations/Fornecedor";

import { useToast } from "contexts/Toast";

import { getPolo } from "services/get/Projetos";
import { postCadastroFornecedor } from "services/post/Fornecedor";

import { useAuth } from "./useAuth";

export function useCadastroFornecedor() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaPolos, setListaPolos] = useState<any>([]);

  const reqGet = async () => {
    const polos = await getPolo();
    const polosSorted = polos.data.sort((a: any, b: any) =>
      a.polo.localeCompare(b.polo)
    );
    setListaPolos(polosSorted);
  };

  const optionsPolos = listaPolos.map((polo: any) => ({
    value: polo.id,
    label: polo.polo,
  }));

  const initialValues: any = {
    nom_usu_create: user?.nome,
    poloId: 0,
    servicoId: 0,
    statusId: 0,
    nomeFornecedor: "",
    numeroContrato: "",
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
    validationSchema: cadastroFornecedor,
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
        const { status } = await postCadastroFornecedor(newValues);

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
    optionsPolos,
  };
}
