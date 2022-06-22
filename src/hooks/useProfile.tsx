import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useFormik } from 'formik';
import { updateProfileSchema } from 'validations/UpdateProfile';

import { useToast } from 'contexts/Toast';

import { getUserPending } from 'services/get/User';
import { putProfile } from 'services/update/Profile';

export function useProfile() {
  const navigate = useNavigate();
  const params = useParams();
  const idUser = params.id || '0';
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [permission, setPermission] = useState<any>();

  const user = JSON.parse(sessionStorage.getItem('@Origem:user') || '');
  const userId = user?.id;

  const profileForm = useFormik({
    initialValues: {
      name: '',
      telephone: '',
      email: '',
      area: '',
      accessLevel: '',
      avatar: '',
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const newValues = {
        nome: values.name,
        telefone: values.telephone,
        email: values.email,
        area_atuacao: values.area,
        role_id: 2,
        avatar: values.avatar,
      };

      const { status } = await putProfile(idUser, newValues);
      if (status === 200) {
        toast.success('Cadastro atualizado com sucesso!');
        navigate('/permissions');
      } else {
        toast.error('Erro ao atualizar cadastro!');
      }

      setLoading(false);
    },
  });

  useEffect(() => {
    async function findIdPermission(id: string) {
      setLoading(true);
      const { data, status } = await getUserPending(userId || id);

      if (status === 200) {
        setPermission(data);

        profileForm.setFieldValue('name', data?.nome);
        profileForm.setFieldValue('telephone', data?.telefone);
        profileForm.setFieldValue('email', data?.email);
        profileForm.setFieldValue('area', data?.area_atuacao);
        profileForm.setFieldValue('avatar', data?.avatar);
      }

      setLoading(false);
    }

    findIdPermission(idUser as string);
  }, [idUser]);

  return {
    profileForm,
    loading,
    permission,
  };
}
