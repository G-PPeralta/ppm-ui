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
      departament: '',
      totalDays: '',
      realDays: '',
      start: '',
      end: '',
      priority: '',
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
