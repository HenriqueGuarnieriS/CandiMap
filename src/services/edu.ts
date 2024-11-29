import axios from "axios";
import EduEscolasEstado from "../interfaces/Edu";

export const fetchEduEscolas = async (): Promise<EduEscolasEstado[]> => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  try {
    const response = await axios.get(`${apiUrl}/api/escolas-por-estado`, {
      withCredentials: true, // Para enviar cookies
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos Partidos:", error);
    throw error;
  }
};
