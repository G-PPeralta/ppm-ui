// import { GanttPayload } from 'interfaces/Services';

import { api } from 'services/api';

export async function getGanttData(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/gantt', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}
