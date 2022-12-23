// import { GanttPayload } from 'interfaces/Services';

import { api, token } from "services/api";

export async function getAllGanttData(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/gantt/panorama`, token());

  return { data, status };
}

export async function getGanttData(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/gantt/${id}`, token());

  return { data, status };
}
