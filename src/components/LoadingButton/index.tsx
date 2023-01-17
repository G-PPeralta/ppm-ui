// CRIADO EM: 10/01/2023
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: COMPONENTE PARA COMPOR BOTÕES DO SISTEMA COM ANIMAÇÃO DE LOADING

import { Ring } from "@uiball/loaders";

function LoadingButton() {
  return <Ring speed={2} lineWeight={5} color="white" size={24} />;
}

export default LoadingButton;
