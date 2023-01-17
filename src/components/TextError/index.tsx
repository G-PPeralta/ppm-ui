// CRIADO EM: 14/06/2022
// AUTOR: ALEXANDER BRITO
// DESCRIÇÃO DO ARQUIVO: TEXTO DE ERRO COM ESTILO PADRÃO PARA FORMULÁRIOS

import styles from "./TextError.module.scss";

export function TextError({ children }: { children: React.ReactNode }) {
  return <span className={styles.error}>{children}</span>;
}
