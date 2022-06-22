import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { ResponsePermissions } from 'interfaces/Services';
import { updateProfileSchema } from 'validations/UpdateProfile';

import { useToast } from 'contexts/Toast';

import { getUserPending } from 'services/get/User';
import { putProfile } from 'services/update/Profile';

import { useAuth } from './useAuth';

export function useProfile() {
  const { toast } = useToast();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState<ResponsePermissions>();

  const user = JSON.parse(sessionStorage.getItem('@Origem:user') || '');
  const userId = user?.id;

  const profileForm = useFormik({
    initialValues: {
      name: '',
      telephone: '',
      email: '',
      area: '',
      accessLevel: '',
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const newValues = {
        nome: values.name,
        telefone: values.telephone,
        email: values.email,
        area_atuacao: values.area,
        role_id: values.accessLevel,
      };

      try {
        const { data, status } = await putProfile(userId, newValues);
        if (status === 200) {
          toast.success('Perfil atualizado com sucesso!');

          sessionStorage.setItem(
            '@Origem:user',
            JSON.stringify({ ...user, ...data }),
          );
          setUser({ ...user, ...data });
        }

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao atualizar perfil!');
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    async function findIdPermission(id: string) {
      try {
        setLoading(true);
        const { data, status } = await getUserPending(id);

        if (status === 200) {
          setPermission(data[0]);

          profileForm.setFieldValue('name', data[0]?.nome);
          profileForm.setFieldValue('telephone', data[0]?.telefone);
          profileForm.setFieldValue('email', data[0]?.email);
          profileForm.setFieldValue('area', data[0]?.area_atuacao);
          profileForm.setFieldValue('accessLevel', data[0]?.role_id);
        }

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar perfil!');
        setLoading(false);
      }
    }

    findIdPermission(userId);
  }, [userId]);

  return {
    profileForm,
    loading,
    permission,
  };
}
