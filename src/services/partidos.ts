import axios from "axios";
import { PartidoInterface } from "../interfaces/Partidos";

export const fetchPartidosData = async (): Promise<PartidoInterface[]> => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  try {
    const response = await axios.get(`${apiUrl}/api/partidos`, {
      withCredentials: true, // Para enviar cookies
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos Partidos:", error);
    throw error;
  }
};
