import { useFormik } from "formik";
import { CreateServicoFerramenta } from "interfaces/lookahead";
import { CadastroServicoFerramenta } from "validations/CadastroServicoFerramenta";

import {
  createAtividadeFerramenta,
  createAtividadeServico,
} from "services/post/Lookahead";

export function useFormikFerramentaServicos() {
  const initialValues = {
    id_atividade: 0,
    nome_ferramenta: "",
    nome_servico: "",
    data_hora: "",
    anotacoes: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: CadastroServicoFerramenta,
    onSubmit: async (values) => {
      const newValuesFerramentas: CreateServicoFerramenta = {
        atividade_id: values.id_atividade,
        nome: values.nome_ferramenta,
        data_hora: values.data_hora,
        anotacoes: values.anotacoes,
      };

      const newValuesService: CreateServicoFerramenta = {
        atividade_id: values.id_atividade,
        nome: values.nome_servico,
        data_hora: values.data_hora,
        anotacoes: values.anotacoes,
      };

      try {
        await createAtividadeFerramenta(newValuesFerramentas);
        await createAtividadeServico(newValuesService);
      } catch (error) {
        alert("Erro ao adicionar serviço ou ferramenta");
      }
    },
  });

  return {
    registerForm,
  };
}
