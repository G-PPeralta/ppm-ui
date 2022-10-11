import { useEffect, useState } from "react";

import { ProjetosLookahead } from "interfaces/lookahead";

import { getProjetosAtividades } from "services/get/Lookahead";

export function useLookahead() {
  const [projetos, setProjetos] = useState<ProjetosLookahead[]>();

  const getProjetos = async () => {
    const projs = await getProjetosAtividades();
    setProjetos(projs);
  };

  useEffect(() => {
    getProjetos();
  }, []);

  return {
    projetos,
  };
}
