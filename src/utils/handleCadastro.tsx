export const handleCadastrar = async (form: any, onClose: Function) => {
  form.submitForm();
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
  setRefresh: Function,
  refresh: boolean
) => {
  await form.submitForm();
  setRefresh(!refresh);
  if (form.isValid) {
    await form.resetForm();
    onClose();
  }
};

export const handleCancelarDatePicker = (
  form: any,
  onClose: Function,
  setStartDate: Function,
  setEndDate: Function
) => {
  setStartDate("");
  setEndDate("");
  form.resetForm();
  onClose();
};
