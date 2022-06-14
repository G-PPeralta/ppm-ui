import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  telefone: yup.string().required('O telefone é obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  area: yup.string().required('O área é obrigatória'),
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas não conferem'),
});
