// CRIADO EM: 14/11/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Funções para padronização e refresh no cadastro e cancelamento, atrelados ao clique de um botão.

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
  setRefresh: Function,
  refresh: boolean
) => {
  await form.submitForm();

  if (form.isValid) {
    await form.resetForm();
    setRefresh(!refresh);
    onClose();
  }
  // setRefresh(!refresh);
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

export const handleCadastrarPagina = async (form: any) => {
  await form.submitForm();
  if (form.isValid) {
    await form.resetForm();
    window.history.back();
  }
};
