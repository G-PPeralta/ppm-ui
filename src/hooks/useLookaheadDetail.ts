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
