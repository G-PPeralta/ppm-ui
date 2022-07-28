import { useState } from 'react';

import { useFormik } from 'formik';
import { projectRegisterSchema } from 'validations/ProjectRegister';

import { useToast } from 'contexts/Toast';

import { postProject } from 'services/post/ProjectRegister';

export function useProjects() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const projectsForm = useFormik({
    initialValues: {
      name: '',
      description: '',
      budget: 0,
      classification: '',
      requester: '',
      justification: '',
      pole: '',
      start: '',
      end: '',
      startReal: '',
      endReal: '',
      priority: '',
      complexity: '',
      place: '',
      division: '',
      status: '',
      gate: '',
      typeProject: '',
      demand: '',
      comments: '',
      modalResponsible: [],
      modalType: [],
    },
    validationSchema: projectRegisterSchema,
    onSubmit: async (values) => {
      const newValues = {
        name: values.name,
        description: values.description,
        budget: Number(values.budget),
        classification: values.classification,
        requester: values.requester,
        justification: values.justification,
        pole: values.pole,
        start: values.start,
        end: values.end,
        startReal: values.startReal,
        endReal: values.endReal,
        priority: values.priority,
        complexity: values.complexity,
        place: values.place,
        division: values.division,
        status: values.status,
        gate: values.gate,
        typeProject: values.typeProject,
        demand: values.demand,
        comments: values.comments,
      };

      setLoading(true);

      try {
        const { status } = await postProject(newValues);

        if (status === 200 || status === 201) {
          toast.success('Projeto cadastrado com sucesso!', {
            id: 'toast-principal',
          });
        }
      } catch (error) {
        toast.error('Erro ao cadastrar projeto!', {
          id: 'toast-principal',
        });
      }

      setLoading(false);
    },
  });

  return {
    projectsForm,
    loading,
  };
}
