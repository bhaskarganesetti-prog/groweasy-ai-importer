import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const importCsv = async (records: any[]) => {
  const response = await api.post("/import", {
    records,
  });

  return response.data;
};