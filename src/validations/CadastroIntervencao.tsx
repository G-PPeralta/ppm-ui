import * as yup from 'yup';

export const formCadastroIntervencao = yup.object({
  poco: yup.string().required('Poco é obrigatório'),
  campo: yup.string().required('Campo é obrigatório'),
  sonda: yup.string().required('Sonda é obrigatória'),
  sequencia: yup.string().required('Sequência é obrigatória'),
  inicioPrevisto: yup.string().required('Início previsto é obrigatório'),
  projeto: yup.string().required('Projeto é obrigatório'),
  observacoes: yup.string().required('Observações é obrigatório'),
});
