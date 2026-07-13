import axios from "axios";

export const api = axios.create({
  baseURL: "https://groweasy-ai-importer-backend-mpfn.onrender.com/api",
});

export const importCsv = async (records: any[]) => {
  const response = await api.post("/import", {
    records,
  });

  return response.data;
};