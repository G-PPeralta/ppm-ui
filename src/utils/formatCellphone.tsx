/* eslint-disable no-param-reassign */
function formatCellphone(valor: string) {
  if (!valor) return;
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/^(\d)/, '($1');
  valor = valor.replace(/(.{3})(\d)/, '$1)$2');
  if (valor.length == 7) {
    valor = valor.replace(/(.{1})$/, '-$1');
  } else if (valor.length == 8) {
    valor = valor.replace(/(.{2})$/, '-$1');
  } else if (valor.length == 9) {
    valor = valor.replace(/(.{3})$/, '-$1');
  } else if (valor.length == 10) {
    valor = valor.replace(/(.{4})$/, '-$1');
  } else if (valor.length > 11) {
    valor = valor.replace(/(.{4})$/, '-$1');
  }
  return valor;
}

export default formatCellphone;
