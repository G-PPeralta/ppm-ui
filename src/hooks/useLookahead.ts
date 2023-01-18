// CRIADO EM: 04/10/2022
// AUTOR: Maxwell
// DESCRIÇÃO DO ARQUIVO: Hook com funções para uso no módulo de Lookahead.

import { useEffect, useState } from "react";

import { ProjetosLookahead } from "interfaces/lookahead";

import { getProjetosAtividades } from "services/get/Lookahead";

export function useLookahead() {
  const [loading, setLoading] = useState(false);

  const getProjetos = async () => {
    setLoading(true);
    const data: ProjetosLookahead[] = await getProjetosAtividades();
    setLoading(false);
    return data;
  };

  useEffect(() => {
    getProjetos();
  }, []);

  return {
    getProjetos,
    loading,
  };
}
