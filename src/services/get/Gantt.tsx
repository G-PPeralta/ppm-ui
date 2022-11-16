// import { GanttPayload } from 'interfaces/Services';

import { api } from "services/api";

export async function getAllGanttData(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/gantt/panorama`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getGanttData(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/gantt/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
