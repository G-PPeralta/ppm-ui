import { createContext, useContext } from "react";
import toast from "react-hot-toast";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { PostFeriado } from "interfaces/Feriados";

import { useAuth } from "hooks/useAuth";

import {
  getAllFeriados,
  getFeriados,
  getProjetosSelectFeriado,
} from "services/get/Feriados";
import { postCadastroFeriado } from "services/post/Feriados";

const FeriadosContext = createContext<any>({} as any);

export const FeriadosProvider = ({ children }: any) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const reqGetAllFeriados = useQuery({
    queryKey: ["all-feriados"],
    queryFn: getAllFeriados,
  });

  const reqGetFeriados = useQuery({
    queryKey: ["feriados"],
    queryFn: getFeriados,
  });

  const reqGetProjetosSelectFeriado = useQuery({
    queryKey: ["projetos-chaves"],
    queryFn: getProjetosSelectFeriado,
  });

  const reqPostFeriado = useMutation({
    mutationFn: postCadastroFeriado,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feriados"] });
      toast.success("Feriado cadastrado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao cadastrar feriado!");
    },
  });

  const initialValues: PostFeriado = {
    data_completa: "",
    ind_global: 0,
    id_projeto: 0,
    dia_feriado: "",
    mes_feriado: "",
    nome_feriado: "",
    nom_usu_create: user?.nome,
  };

  const handleClick = (formikForm: any, onClose: Function) => {
    const data = new Date(formikForm.values.data_completa);

    reqPostFeriado.mutate({
      ...formikForm.values,
      dia_feriado: data.getDate(),
      mes_feriado: data.getMonth() + 1,
    });
    formikForm.resetForm();
    onClose();
  };

  const registerForm = useFormik({
    initialValues,
    // validationSchema: cadastroNovaDespesa,
    onSubmit: () => {},
  });

  const value = {
    registerForm,
    todosFeriados: {
      isLoading: reqGetAllFeriados.isLoading,
      error: reqGetAllFeriados.error,
      data: reqGetAllFeriados.data,
    },
    feriados: {
      isLoading: reqGetFeriados.isLoading,
      error: reqGetFeriados.error,
      data: reqGetFeriados.data,
    },
    selectProjetos: {
      isLoading: reqGetProjetosSelectFeriado.isLoading,
      error: reqGetProjetosSelectFeriado.error,
      data: reqGetProjetosSelectFeriado.data,
    },
    handleClick,
  };

  return (
    <FeriadosContext.Provider value={value}>
      {children}
    </FeriadosContext.Provider>
  );
};

export function useFeriadosContext() {
  const context = useContext(FeriadosContext);
  return context;
}
