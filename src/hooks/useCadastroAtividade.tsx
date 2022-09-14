import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import {
  AreaAtuacao,
  AtividadeLista,
  RegistroResponsavel,
  Tarefa,
} from 'interfaces/Services';
import { cadastroAtividadeSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import {
  getAreaAtuacaoList,
  getAtividadesList,
  getResponsavelList,
  getTarefaList,
} from 'services/get/Infograficos';
import { postCadastroAtividade } from 'services/post/CadastroModaisInfograficos';

export function useCadastroAtividade() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [ListaResponsavel, setListaResponsavel] = useState<
    RegistroResponsavel[]
  >([]);
  const [listaArea, setListaArea] = useState<AreaAtuacao[]>([]);
  const [listaAtividades, setListaAtividades] = useState<AtividadeLista[]>([]);
  const [listaTarefa, setListaTarefa] = useState<Tarefa[]>([]);

  const carregarListaResponsavel = async () => {
    const { data } = await getResponsavelList();
    setListaResponsavel(data);
  };

  const carregarAreaAtuacao = async () => {
    const { data } = await getAreaAtuacaoList();
    setListaArea(data);
  };

  const carregarListaAtividade = async () => {
    const { data } = await getAtividadesList();
    setListaAtividades(data);
  };

  const carregarListaTarefa = async () => {
    const { data } = await getTarefaList();
    setListaTarefa(data);
  };

  const registerForm = useFormik({
    initialValues: {
      nomeAtividade: '',
      dias: 0,
      area: '',
      comentarios: '',
    },
    validationSchema: cadastroAtividadeSchema,
    onSubmit: async (values) => {
      const newValues = {
        tarefaId: parseInt(values.nomeAtividade),
        areaAtuacaoId: parseInt(values.area),
        obs: values.comentarios,
        dias: values.dias,
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
    carregarListaAtividade();
    carregarListaTarefa();
  }, []);

  return {
    registerForm,
    loading,
    ListaResponsavel,
    listaTarefa,
    listaArea,
    listaAtividades,
  };
}