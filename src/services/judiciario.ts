import axios from "axios";

export const fetchFolhasTribunais = async (): Promise<any> => {
  const apiUrl =
    import.meta.env.VITE_FASTAPI_BACKEND_URL || "http://localhost:8000";

  console.log("API URL configurada:", apiUrl);
  try {
    const tjmg = await axios.get(`${apiUrl}judi/payroll/tjmg/11/2024`, {
      withCredentials: true, // Para enviar cookies
    });
    const tjma = await axios.get(`${apiUrl}judi/payroll/tjma/11/2024`, {
      withCredentials: true, // Para enviar cookies
    });
    const tjpr = await axios.get(`${apiUrl}judi/payroll/tjpr/11/2024`, {
      withCredentials: true, // Para enviar cookies
    });
    const tjrs = await axios.get(`${apiUrl}judi/payroll/tjrs/11/2024`, {
      withCredentials: true, // Para enviar cookies
    });
    return [tjrs.data, tjmg.data, tjma.data, tjpr.data];
  } catch (error) {
    console.error("Erro ao buscar dados dos Partidos:", error);
    throw error;
  }
};
