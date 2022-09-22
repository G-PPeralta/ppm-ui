export const handleCadastrar = async (form: any, onClose: Function) => {
  await form.submitForm();

  if (form.isValid) {
    await form.resetForm();
    onClose();
  }
};

export const handleCancelar = (form: any, onClose: Function) => {
  form.resetForm();
  onClose();
};

export const handleCadastrarRefresh = async (
  form: any,
  onClose: Function,
  setRefresh: Function
) => {
  await form.submitForm();
  setRefresh((refresh: Boolean) => !refresh);
  await onClose();
  await form.resetForm();
};
