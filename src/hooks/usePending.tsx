// CRIADO EM: 08/06/2022
// AUTOR: Alexander
// DESCRIÇÃO DO ARQUIVO: Hook com funções para a ativação de usuários pendentes.

import { useEffect, useState } from "react";

import { ResponseUserPending } from "interfaces/Services";

import { useToast } from "contexts/Toast";

import { getPending } from "services/get/Pending";

export function usePending() {
  const { toast } = useToast();
  const [userPending, setUserPending] = useState<ResponseUserPending[]>([]);
  const [loading, setLoading] = useState(false);

  async function findAllPending() {
    try {
      setLoading(true);
      const { data, status } = await getPending();

      if (status === 200) {
        setUserPending(data);
      }

      setLoading(false);
    } catch (error) {
      toast.error("Erro ao carregar usuários", {
        id: "toast-principal",
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    findAllPending();
  }, []);

  return {
    userPending,
    setUserPending,
    loading,
  };
}
