import api from "./axios";

export const getLeads = async () => {
  const response = await api.get("/leads");

  return response.data;
};

export const createLead = async (data: any) => {
  const response = await api.post("/leads", data);

  return response.data;
};

export const updateLead = async (
  id: number,
  data: any
) => {
  const response = await api.put(
    `/leads/${id}`,
    data
  );

  return response.data;
};

export const deleteLead = async (id: number) => {
  const response = await api.delete(`/leads/${id}`);

  return response.data;
};

export const getLeadById = async (id: number) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};