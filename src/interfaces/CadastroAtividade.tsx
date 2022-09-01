interface Precedente {
  id: string;
  tarefa: string;
  tipo: string;
  dias: number;
  restricao: string;
}

export interface CadastroAtividade {
  nomeId: string;
  nomeAtividade: string;
  responsavel: string;
  area: string;
  precedente: Precedente[];
  comentarios: string;
}
