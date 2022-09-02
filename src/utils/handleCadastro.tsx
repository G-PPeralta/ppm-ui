export const handleCadastrar = (form: any, onClose: any) => {
  form.handleSubmit();
  onClose();
};

export const handleCancelar = (form: any, onClose: any) => {
  form.resetForm();
  onClose();
};
