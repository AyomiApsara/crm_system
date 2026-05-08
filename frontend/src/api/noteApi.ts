import api from "./axios";

export const getLeadNotes = async (leadId: number) => {
  const response = await api.get(`/leads/${leadId}/notes`);
  return response.data;
};

export const createNote = async (leadId: number, content: string) => {
  const response = await api.post(`/leads/${leadId}/notes`, {
    content,
  });

  return response.data;
};