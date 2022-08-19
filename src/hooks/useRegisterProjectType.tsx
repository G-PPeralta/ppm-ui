import { useState } from 'react';

import { useFormik } from 'formik';
import { registerProjectTypeSchema } from 'validations/RegisterProjectType';

import { useToast } from 'contexts/Toast';

export function useRegisterProjectType() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      nameId: '',
      projectName: '',
      activityId: '',
      activityBase: '',
      activityTask: '',
      activityPrecedent: '',
      activityDays: '',
      comments: '',
    },
    validationSchema: registerProjectTypeSchema,
    onSubmit: async (values) => {
      const newValues = {
        nameId: values.nameId,
        projectName: values.projectName,
        activityId: values.activityId,
        activityBase: values.activityBase,
        activityTask: values.activityTask,
        activityPrecedent: values.activityPrecedent,
        activityDays: values.activityDays,
        comments: values.comments,
      };

      setLoading(true);

      console.log(newValues);
      toast.succes('Tipo de projeto cadastrado com sucesso', {
        id: 'toast-principal',
      });
    },
  });

  return {
    registerForm,
    loading,
  };
}
