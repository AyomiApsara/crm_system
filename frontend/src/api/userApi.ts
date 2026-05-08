import api from "./axios";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await api.post("/users", data);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};