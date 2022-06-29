import { useState } from 'react';

import { useFormik } from 'formik';
import { projectRegisterSchema } from 'validations/ProjectRegister';

export function useProjects() {
  const [loading, setLoading] = useState(false);
  const projectsForm = useFormik({
    initialValues: {
      name: '',
      description: '',
      budget: '',
      requester: '',
      justification: '',
      pole: '',
      start: '',
      startReal: '',
      end: '',
      endReal: '',
      priority: '',
      complexity: '',
      status: '',
      division: '',
      place: '',
      classification: '',
      demand: '',
      comments: '',
      gate: '',
      typeProject: '',
    },
    validationSchema: projectRegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);

      alert(JSON.stringify(values, null, 2));

      setLoading(false);
    },
  });

  return {
    projectsForm,
    loading,
  };
}
