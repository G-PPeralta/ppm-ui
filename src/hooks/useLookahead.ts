import { ProjetosLookahead } from "interfaces/lookahead";
import { useEffect, useState } from "react";

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
