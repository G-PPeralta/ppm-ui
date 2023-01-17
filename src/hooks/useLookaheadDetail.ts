// CRIADO EM: 10/10/2022
// AUTOR: Max
// DESCRIÇÃO DO ARQUIVO: Hook com funções para uso no módulo de Lookahead - Detalhamento.

import { useEffect, useState } from "react";

import { AtividadesLookahead } from "interfaces/lookahead";

import { getAtividades } from "services/get/Lookahead";

export function useLookaheadDetail(id: number) {
  const [atividades, setAtividades] = useState<AtividadesLookahead[]>();

  const loadatividades = async () => {
    if (!id) return [];
    const _atividades = await getAtividades(id);
    setAtividades(_atividades);
  };

  useEffect(() => {
    loadatividades();
  }, []);

  return {
    atividades,
  };
}
