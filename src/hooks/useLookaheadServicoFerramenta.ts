// CRIADO EM: 04/10/2022
// AUTOR: Maxwell
// DESCRIÇÃO DO ARQUIVO: Hook com funções para uso no módulo de Lookahead - gets para serviços e ferramentas.

import { useEffect, useState } from "react";

import { FerramentasAtividade, ServicosAtividade } from "interfaces/lookahead";

import { getFerramentas, getServicos } from "services/get/Lookahead";

export function useLookaheadServicoFerramenta(id: number) {
  const [servicos, setServicos] = useState<ServicosAtividade[]>();
  const [ferramentas, setFerramentas] = useState<FerramentasAtividade[]>();

  const getServicosAividade = async () => {
    const servs = await getServicos(id);
    setServicos(servs);
  };
  const getFerramentasAividade = async () => {
    const ferr = await getFerramentas(id);
    setFerramentas(ferr);
  };

  useEffect(() => {
    getFerramentasAividade();
  }, []);

  useEffect(() => {
    getServicosAividade();
  }, []);

  return {
    ferramentas,
    servicos,
  };
}
