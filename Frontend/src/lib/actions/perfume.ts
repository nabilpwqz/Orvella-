import { serverMutation } from "../core/server";

// add perfumes
export const addPerfumes = async (data: unknown) => {
  return await serverMutation(`/api/perfumes`, data, "POST");
};

// delete perfumes
export const deletePerfume = async (id: string) => {
  return await serverMutation(`/api/perfumes/${id}`, {}, "DELETE");
};
