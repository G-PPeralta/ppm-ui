import { useState } from 'react';

import { useFormik } from 'formik';
import { newPasswordSchema } from 'validations/NewPassword';

export function usePassword() {
  const [loading, setLoading] = useState(false);

  const newPasswordForm = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: newPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);

      console.log(values);

      setLoading(false);
    },
  });

  return {
    newPasswordForm,
    loading,
  };
}
