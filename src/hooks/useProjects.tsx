import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { projectRegisterSchema } from 'validations/ProjectRegister';

// import { useToast } from 'contexts/Toast';

export function useProjects() {
  // const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  // const [permission, setPermission] = useState<ResponsePermissions>();

  // const user = JSON.parse(sessionStorage.getItem('@Origem:user') || '');
  // const userId = user?.id;

  const projectsForm = useFormik({
    initialValues: {
      // name: '',
      // description: '',
      // email: '',
      // area: '',
      // accessLevel: '',
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
      console.log(values);
      setLoading(false);
    },
  });

  useEffect(() => {
    console.log('Só para não excluir a importação do useEffect');
  }, []);

  // useEffect(() => {
  //   async function findIdPermission(id: string) {
  //     try {
  //       setLoading(true);
  //       const { data, status } = await getUserPending(id);

  //       if (status === 200) {
  //         setPermission(data[0]);

  //         projectsForm.setFieldValue('name', data[0]?.nome);
  //         projectsForm.setFieldValue('telephone', data[0]?.telefone);
  //         projectsForm.setFieldValue('email', data[0]?.email);
  //         projectsForm.setFieldValue('area', data[0]?.area_atuacao);
  //         projectsForm.setFieldValue('accessLevel', data[0]?.role_id);
  //       }

  //       setLoading(false);
  //     } catch (error) {
  //       toast.error('Erro ao carregar perfil!');
  //       setLoading(false);
  //     }
  //   }

  //   findIdPermission(userId);
  // }, [userId]);

  return {
    projectsForm,
    loading,
  };
}
