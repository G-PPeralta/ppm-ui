export const handleCadastrar = async (form: any, onClose: Function) => {
  await form.submitForm();
  await onClose();
  await form.resetForm();
};

export const handleCancelar = (form: any, onClose: Function) => {
  form.resetForm();
  onClose();
};

export const handleCadastrarRefresh = async (
  form: any,
  onClose: Function,
  setRefresh: Function,
  refresh: boolean
) => {
  await form.submitForm();
  setRefresh(!refresh);
  await onClose();
  await form.resetForm();
};
