// CRIADO EM: 14/10/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de um novo Fornecedor - módulo Confugurações - Fornecedores

import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { cadastroFornecedor } from "validations/Fornecedor";

import { useToast } from "contexts/Toast";

import { getPolo } from "services/get/Projetos";
import { postCadastroFornecedor } from "services/post/Fornecedor";

import { useAuth } from "./useAuth";

type Polos = {
  deletado: boolean;
  id: number;
  polo: string;
};

export function useCadastroFornecedor() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaPolos, setListaPolos] = useState<Polos[]>([]);

  const reqGet = async () => {
    const polos = await getPolo();

    const polosSorted = polos.data.sort((a: Polos, b: Polos) =>
      a.polo.localeCompare(b.polo)
    );
    setListaPolos(polosSorted);
  };

  const optionsPolos = listaPolos.map((polo: Polos) => ({
    value: polo.id,
    label: polo.polo,
  }));

  interface MyFormValues {
    nom_usu_create: string | undefined;
    poloId: number;
    statusId: number;
    servico_txt: string;
    nomeFornecedor: string;
    numeroContrato: string;
    representante: string;
    email: string;
    telefone: string;
    invoice: string;
    cnpj: string;
    justificativa: string;
    outrasInformacoes: string;
  }

  const initialValues: MyFormValues = {
    nom_usu_create: user?.nome,
    poloId: 0,
    statusId: 0,
    servico_txt: "",
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
      const newValues: MyFormValues = {
        nom_usu_create: user?.nome,
        poloId: values.poloId,
        servico_txt: values.servico_txt,
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
          toast.success("Fornecedor cadastrado com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Erro ao cadastrar fornecedor!", {
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
