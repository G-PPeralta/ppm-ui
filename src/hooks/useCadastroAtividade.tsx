import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { AreaAtuacao, RegistroResponsavel } from 'interfaces/Services';
import { cadastroAtividadeSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import {
  getAreaAtuacaoList,
  getResponsavelList,
} from 'services/get/Infograficos';
import { postCadastroAtividade } from 'services/post/CadastroModaisInfograficos';

export function useCadastroAtividade() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [ListaResponsavel, setListaResponsavel] = useState<
    RegistroResponsavel[]
  >([]);
  const [listaArea, setListaArea] = useState<AreaAtuacao[]>([]);

  const carregarListaResponsavel = async () => {
    const { data } = await getResponsavelList();
    setListaResponsavel(data);
  };

  const carregarAreaAtuacao = async () => {
    const { data } = await getAreaAtuacaoList();
    setListaArea(data);
  };

  const registerForm = useFormik({
    initialValues: {
      nomeAtividade: '',
      responsavel: '',
      area: '',
      tarefa: '',
      precedente: [
        {
          ordem: 1,
          atividade: '',
          tipo: '',
          dias: 0,
          restricao: '',
        },
      ],
      comentarios: '',
    },
    validationSchema: cadastroAtividadeSchema,
    onSubmit: async (values) => {
      const newValues = {
        nome: values.nomeAtividade,
        prioridade: false,
        responsavelId: parseInt(values.responsavel),
        areaAtuacaoId: parseInt(values.area),
        // atividadesPrecedentes: values.precedente,
        obs: values.comentarios,
        tarefaId: 50, // Precisa colocar o campo de tarefa
      };

      setLoading(true);

      try {
        const { status } = await postCadastroAtividade(newValues);

        if (status === 200 || status === 201) {
          toast.success('Atividade cadastrada com sucesso!', {
            id: 'toast-principal',
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error('Erro ao cadastrar atividade!', {
          id: 'toast-principal',
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    carregarListaResponsavel();
    carregarAreaAtuacao();
  }, []);

  return {
    registerForm,
    loading,
    ListaResponsavel,
    listaArea,
  };
}
