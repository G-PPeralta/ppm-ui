// CRIADO EM: 20/09/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: ASTERISCO PARA CAMPOS OBRIGATÓRIOS

import styles from "./RequiredField.module.scss";

export function RequiredField() {
  return <span className={styles.required}>*</span>;
}
