import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useFormik } from 'formik';
import { ResponsePermissions, ResponseRoles } from 'interfaces/Services';
import { updateProfileSchema } from 'validations/UpdateProfile';

import { useToast } from 'contexts/Toast';

import { getRoles } from 'services/get/Roles';
import { getUserPending } from 'services/get/User';
import { putProfile } from 'services/update/Profile';

export function usePermissions() {
  const navigate = useNavigate();
  const params = useParams();
  const idUser = params.id || '0';
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [permission, setPermission] = useState<ResponsePermissions>();
  const [roles, setRoles] = useState<ResponseRoles[]>();

  const permissionsForm = useFormik({
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
        role_id: Number(values.accessLevel),
      };

      try {
        const { status } = await putProfile(idUser, newValues);
        if (status === 200) {
          toast.success('Cadastro atualizado com sucesso!');
          navigate('/permissions');
        }

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao atualizar cadastro!');
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    async function findRoles() {
      try {
        setLoading(true);
        const { data, status } = await getRoles();

        if (status === 200) {
          setRoles(data);
        }
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar dados de acesso!');
        setLoading(false);
      }
    }
    findRoles();
  }, []);

  useEffect(() => {
    async function findIdPermission(id: string) {
      try {
        setLoading(true);
        const { data, status } = await getUserPending(id);

        if (status === 200) {
          setPermission(data[0]);

          permissionsForm.setFieldValue('name', data[0]?.nome);
          permissionsForm.setFieldValue('telephone', data[0]?.telefone);
          permissionsForm.setFieldValue('email', data[0]?.email);
          permissionsForm.setFieldValue('area', data[0]?.area_atuacao);
          permissionsForm.setFieldValue('accessLevel', data[0]?.role_id);
        }

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar cadastro!');
        setLoading(false);
      }
    }

    findIdPermission(idUser as string);
  }, [idUser]);

  return {
    permissionsForm,
    loading,
    permission,
    roles,
  };
}
