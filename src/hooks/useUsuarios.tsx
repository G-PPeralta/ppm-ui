import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { cadastroUsuario } from "validations/Usuarios";

import { useToast } from "contexts/Toast";

// import { getPolo } from "services/get/Projetos";
import { postCadastroFornecedor } from "services/post/Fornecedor";

import { useAuth } from "./useAuth";

export function useCadastroUsuario() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  // const [listaPolos, setListaPolos] = useState<any>([]);

  // const reqGet = async () => {
  //   const polos = await getPolo();
  //   const polosSorted = polos.data.sort((a: any, b: any) =>
  //     a.polo.localeCompare(b.polo)
  //   );
  //   setListaPolos(polosSorted);
  // };

  // const optionsPolos = listaPolos.map((polo: any) => ({
  //   value: polo.id,
  //   label: polo.polo,
  // }));

  const initialValues: any = {
    nom_usu_create: user?.nome,
    id: 0,
    area: "",
    // deletado: false,
    email: "",
    // login: "",
    nome: "",
    perfil: "",
    // primeiroAcesso: true,
    telefone: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroUsuario,
    onSubmit: async (values) => {
      const newValues: any = {
        nom_usu_create: user?.nome,
        id: values.id,
        area: values.area,
        // deletado: values.deletado,
        email: values.email,
        // login: values.login,
        nome: values.nome,
        perfil: values.perfil,
        // primeiroAcesso: values.primeiroAcesso,
        telefone: values.telefone,
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

  // useEffect(() => {
  //   setLoading(false);
  //   reqGet();
  // }, []);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, []);

  return {
    registerForm,
    loading,
    // optionsPolos,
  };
}
