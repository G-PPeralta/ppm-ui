import { useEffect, useState } from 'react';

import { getPending } from 'services/get/Pending';

export function usePending() {
  const [userPending, setUserPending] = useState([]);
  const [loading, setLoading] = useState(false);

  async function findAllPending() {
    setLoading(true);
    const { data, status } = await getPending();

    if (status === 200) {
      setUserPending(data);
    }

    setLoading(false);
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
